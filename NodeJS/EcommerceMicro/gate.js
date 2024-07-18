const http = require("http");
const url = require("url");
const qureystring = require("querystring");

const tcpClient = require("./Distributor/client");

/**
 * 
 * 게이트웨이에서는 클라이언트의 요청을 받습니다.
 * 받은 요청은 Distributor로 보내어 처리합니다.
 * 이떄 어느 클라이언트로 응답을 보낼지 결정해야 합니다.
 * 그렇기 위해서 각 클라이언트의 정보를 저장합니다.
 * 
 * mapClients: 클라이언트 정보를 저장하는 객체
 * mapUrls: 요청 URL 정보를 저장하는 객체
 * mapResponse: 클라이언트의 응답 정보를 저장하는 객체
 * mapRR: 클라이언트의 Round Robin 정보를 저장하는 객체
 * index: Round Robin 방식으로 클라이언트를 선택하기 위한 index

 */
// 클라이언트의 정보를 저장합니다. 
var mapClients = {};
// 요청 URL 정보를 저장합니다.
var mapUrls = {};
var mapResponse = {};
var mapRR = {};
var index = 0;

var server = http.createServer((req, res) => {
  var method = req.method;
  var uri = url.parse(req.url, true);
  var pathname = uri.pathname;

  //method: POST and PUT
  if (method == "POST" || method == "PUT") {
    var body = "";

    req.on("data", (data) => {
      body += data;
    });
    // http 통신이 종료됨 -> 모든 데이터 수신 완료
    req.on("end", () => {
      var params;
      //if data id JSON
      if (req.headers["content-type"] == "application/json") {
        params = JSON.parse(body);
      } else {
        params = qureystring.parse(body);
      }
      onRequest(res, method, pathname, params);
    });
  } else {
    onRequest(res, method, pathname, uri.query);
  }
}).listen(8000, () => {
  console.log("Gate server is listening on port", server.address());

  // Distributor에 접속하기 위해서 등록할 패킷을 생성합니다.
  var packet = {
    uri: "/distributes",
    method: "POST",
    key: 0,
    params: {
      part: 8000,
      name: "gate", 
      urls: []
    }
  }

  var isConnectedDistributor = false; 

  this.clientDistributor = new tcpClient(
    "127.0.0.1",
    9000,
    (options) => {
      isConnectedDistributor = true;
      this.clientDistributor.write(packet);
    },
    (options, data) => { onDistribute(data); }, // Distributor로부터 데이터를 받았을 때
    (options) => { isConnectedDistributor = false; },
    (options) => { isConnectedDistributor = false; }
  );

  setInterval(() => {
    if (isConnectedDistributor != true) {
      this.clientDistributor.connect();
    }
  }, 3000);
});
function onRequest(res, method, pathname, params) {
  // method와 pathname을 합쳐서 key를 생성합니다.
  // key는 클라이언트의 정보를 저장하는 mapClients 객체의 key로 사용됩니다.
  var key = method + pathname;
  var client = mapUrls[key];

  if(client == null) {
    res.writeHead(404);
    res.end();
    return;
  } else {
    params.key = index;

    var packet = {
      uri: pathname,
      method: method,
      params: params
    };
    //
    mapResponse[index] = res;
    index++;
    
    // Round Robin 방식으로 클라이언트를 선택합니다.
    // 클라이언트의 수가 많아지면 부하가 발생할 수 있습니다.
    // 이를 해결하기 위해서는 부하 분산 로직을 추가해야 합니다.

    /* 
      mpaRR[0] = 0이라고 합니다.
      그렇다면 mapRR[0] % client.length는 0 % client.length가 됩니다.
      그러면 client[0]이 선택됩니다.
      그 다음에는 mapRR[0] = 1이 됩니다.
      그러면 mapRR[0] % client.length는 1 % client.length가 됩니다.
      그러면 client[1]이 선택됩니다.
    */
    if(mapRR[key] == null) {
      mapRR[key] = 0;
    }
    mapRR[key]++;
    client[mapRR[key] % client.length].write(packet);
  }
}

function onReadClient(packet) {
  console.log("onReadClient", packet);
  mapResponse[packet.key].writeHead(200, {
    "Content-Type": "application/json"
  });
  mapResponse[packet.key].end(JSON.stringify(packet));
  delete mapResponse[packet.key];
} 

// Distributor로부터 접속 가능한 서비스의 정보를 받습니다.
/**
 * Distributor로부터 다음 데이터를 받습니다.
 * data: {
 *  uri: "/distributes",
 *  method: "GET",
 *  key: 0,
 *  params: [
 *    {
 *    part: 8000,
 *    name: "gate",
 *    urls: [
 *    "POST/login",
 *    "POST/logout",
 *    "POST/register",
 *    "POST/inquiry",
 *    "POST/order",
 *    "POST/orderlist",
 *    "POST/product",
 *    "POST/products",
 *    "POST/review",
 *    "POST/reviews",
 *    "POST/update",
 *     ...
 *    ]
 *  },
 * ...
 * 
 * }
 * 
 */
function onDistribute(data) {
  for(var n in data.params) {
    var node = data.params[n];
    var key = node.host + ":" + node.port;
    console.log("node", node);
    if(mapClients[key] == null && node.name != "gate") {
      var client = new tcpClient(node.host, node.port, onCreateClient, onReadClient, onEndClient, onErrorClient);
      
      mapClients[key] = {
        client: client, 
        info: node,
      };

      for(var m in node.urls) {
        //"POST/orderlist"
        var key = node.urls[m];
        // 만약에 mapUrls[key]가 없다면 새로운 배열을 생성합니다.
        if(mapUrls[key] == null) {
          mapUrls[key] = [];
        }

        // mapUrls[key]에 클라이언트 정보를 저장합니다.
        //각 URL마다 해당 URL을 담당하는 클라이언트가 여러 개일 수 있습니다.
        //즉, 하나의 서비스 인스턴스를 여러 개 띄워서 부하를 분산할 수 있습니다.
        mapUrls[key].push(client);
      }
      
      client.connect();
    }
  }
}
function onCreateClient(options) {
  console.log("onCreateClient");
}
// 장애 등으로 접속이 끊어지면 해당 클라이언트 정보를 삭제합니다.
function onEndClient(options) {
  var key = options.host + ":" + options.port;  
  console.log("onEndClient", mapClients[key]);

  for(var n in mapClients[key].info.urls) {
    var node = mapClients[key].info.urls[n];
    delete mapUrls[node];
  }
  delete mapClients[key];
}
function onErrorClient(options) {
  console.log("onErrorClient");
}
