const mysql = require('mysql');
const conn = {
  host: 'localhost', 
  user: 'micro',
  password: "service",
  database: "monolithic"
};

const redis = require("redis").createClient();
redis.on("error", (err) => {
  console.log("Redis Error " + err);
});

exports.onRequest = function(res, method, pathname, params, cb) {
  switch(method) {
    case "POST":
      return register(method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });

    case "GET":
      return inquiry(method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    
    case "DELETE":
      return unregister(method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    
    default:
      return process.nextTick(cb, res, null);
  }
}

/**
 * 상품 등록
 * @param {*} method 
 * @param {*} pathname 
 * @param {*} params 
 * @param {*} cd 
 */
function register(method, pathname, params, cd) {
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: "success"
  };
  
  if(params.name = null || params.name === "") {
    response.errorcode = 1;
    response.errormessage = "Invalid Name";
    cd(response);
  } else {
    var connection = mysql.createConnection(conn);
    connection.connect();
    connection.query("insert into goods(name, category, price, description) values (?, ?, ?, ?); select LAST_INSERT_ID() as id;"
      ,[params.name, params.category, params.price, params.description]
      , (error, results, fields) => {
        if(error) {
          response.errorcode = 1;
          response.errormessage = error;
        } else {
          const id = results[1][0].id;
          redis.set(id, JSON.stringify(params));
        }
        cd(response);
    });
    connection.end();
  }
}

/**
 * 상품 조회
 * @param {*} method 
 * @param {*} pathname 
 * @param {*} params 
 * @param {*} cd 
 */
function inquiry(method, pathname, params, cd) {
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: "success"
  };

  var connection = mysql.createConnection(conn);
  connection.connect();
  connection.query("select * from goods", (error, results, fields) => {
    if(error || results.length == 0) {
      response.errorcode = 1;
      response.errormessage = error ? error : "no data";
    }
  });
}

/**
 * 상품 삭제
 * @param {*} method    메서드
 * @param {*} pathname  URI
 * @param {*} params    입력 파라미터
 * @param {*} cd        콜백
 */
function unregister(method, pathname, params, cd) {
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: "success"
  };

  if(params.id == null) {
    response.errorcode = 1;
    response.errormessage = "Invalid Parameters";
    cd(response);
  } else {
    var connection = mysql.createConnection(conn);
    connection.connect();
    connection.query("delete from goods where id = ?"
      , [params.id]
      , (error, results, fields) => {
        if(error) {
          response.errorcode = 1;
          response.errormessage = error;
        } else redis.del(params.id);
        cd(response);
    });
    connection.end();
  }
}