const http = require('http');
const url = require('url');
const querystring = require('querystring');

const goods = require('./mono_goods');
const members = require('./mono_members');
const purchases = require('./mono_purchases');

var server = http.createServer(function (req, res) {
  // 메서드 정보
  var method = req.method;

  var uri = url.parse(request.url, true);
  var pathname = uri.pathname;

  // post, put은 data와 end를 통해서 받아야 함
  if (method === 'POST' || method === 'PUT') {
    var body = "";
    
    // data를 통해 데이터 받기
    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function () {
      var params;
      // 헤더 정보가 json이면 파싱해서 넣고 아니면 querystring으로 파싱해서 넣기
      if (req.headers['content-type'] == 'application/json') {
        params = JSON.parse(body);
      } else {
        params = querystring.parse(body);
      }

      onRequest(res, method, pathname, params);
    });
  } else {
    //get, delete면 query로 받기
    onRequest(res, method, pathname, uri.query);
  }

}).listen(8080);

/**
 * 
 * @param {*} res 
 * @param {*} method 
 * @param {*} pathname 
 * @param {*} params 
 * @returns on success 200, onfail 404
 */
function onRequest(res, method, pathname, params) {
  switch(pathname) {
    case "/goods":
      goods.onRequest(res, method, pathname, params, response);
      break;
    case "/members":
      members.onRequest(res, method, pathname, params, response);
      break;  
    case "/purchases":
      purchases.onRequest(res, method, pathname, params, response);
      break; 
    default:
      res.writeHead(404);
      return response.end();
  }
}

/**
 * 
 * @param {*} res 
 * @param {*} packet 
 * @returns 
 */
function response(res, packet) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(packet));
}
