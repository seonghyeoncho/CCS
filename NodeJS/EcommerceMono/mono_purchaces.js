const mysql = require('mysql');
const conn = {
  host: 'localhost', 
  user: 'micro',
  password: "service",
  database: "monolithic"
};

exports.onRequest = function (res, method, pathname, params, cb) {
  switch (method) {
    case "POST":
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
function register(res, method, pathname, params, cb) {
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