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

    case "DELETE":
      return unregister(method, pathname, params, response => {
        process.nextTick(cb, res, response);
      });

    default:
      return process.nextTick(cb, res, null);
  }
}

/**
 * 회원 등록
 * @param {*} method 
 * @param {*} pathname
 * @param {*} pararms
 * @param {*} cd
 */
function register(method, pathname, pararms, cd) {
  var response = {
    key: params.key,
    errorCode: 0,
    errorMessage: "success"
  }

  if(pararms.name == null ||pararms.password == null) {
    response.errorCode = 1;
    response.errorMessage = "Invalid Parameters";
    cd(response);
  } else {
    var connection = mysql.createConnection(conn);
    connection.connect();

    connection.query("insert into members(name, password) values(?, ?)"
      ,[pararms.name, pararms.password],
      (error, results, fields) => {
        if(error) {
          response.errorCode = 1;
          response.errorMessage = error;
        }
        cd(response);
      }
    );
    connection.end(); 
  } 

}

/**
 * 회원 인증
 * @param {*} method
 * @param {*} pathname
 * @param {*} params
 * @param {*} cd
 * @returns 
 */
function inquiry(method, pathname, params, cd) {}
