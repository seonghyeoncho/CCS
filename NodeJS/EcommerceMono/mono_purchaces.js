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

exports.onRequest = function (res, method, pathname, params, cb) {
  switch (method) {
    case "POST":
      //res에게 response를 전달하기 위해 콜백 호출
      //nextTick은 바로 다음 틱에 실행된다. 
      //이벤트 루프의 페이즈가 어디에 있는지 상관없이 실행된다.
      //nextTickQueue에 들어가기 때문에 정확히는 다음 이벤트가 실행되기 직전에 실행된다.
      //즉, 이 코드는 결과를 최대한 빠르게 받기 위해서 사용된다. 
      return register(method, pathname, params, response => {
        process.nextTick(cb, res, response);
      });

    case "GET":
      return inquiry(method, pathname, params, response => {
        process.nextTick(cb, res, response);
      });

    default:
      return process.nextTick(cb, res, null);
  }
}

/**
 * 구매
 */
function register( method, pathname, params, cb) {
  var response = {
    key: params.key,
    errorCode: 0,
    errorMessage: "success"
  }

  if(params.userId == null || params.goodsId == null) {
    response.errorCode = 1;
    response.errorMessage = "Invalid Parameters";
    cb(response);
  } else {
    redis.get(params.goodsId, (err, result) => {
      if(err || result == null) {
        response.errorCode = 1;
        response.errorMessage = "Redis failure";
        cb(response);
        return;
      }

      var connection = mysql.createConnection(conn);
      connection.connect();
  
      connection.query("insert into purchases(userId, goodsId) values(?, ?)"
        , [params.userId, params.goodsId],
        (error, results, fields) => {
          if(error) {
            response.errorCode = 1;
            response.errorMessage = error;
          }
          cb(response);
        }
      );
      connection.end();
    });
  }
}

/**
 * 구매 내역 조회
 */

function inquiry(res, method, pathname, params, cb) {
  var response = {
    key: params.key,
    errorCode: 0,
    errorMessage: "success"
  }

  if(params.userId == null) {
    response.errorCode = 1;
    response.errorMessage = "Invalid Parameters";
    cb(response);
  } else {
    var connection = mysql.createConnection(conn);
    connection.connect();

    connection.query("select id, goodsId, date from purchases where userId = ?"
      , [params.userId]
      , (error, results, fields) => {
        if(error) {
          response.errorCode = 1;
          response.errorMessage = error;
        } else {
          response.results = results;
        }
        cb(response);
      }
    );
    connection.end();
  }
}