var map = {};
/**
 * map: 노드의 정보를 저장하는 변수
 * map[key]: 노드의 정보를 저장하는 변수
 * map[key].socket: 노드의 소켓 정보
 * map[key].info: 노드의 정보
 * map[key].info.host: 노드의 호스트 정보
 * ex)
 * map = {
 *  "172.0.0.1:9000": {
 *    socket: socket,
 *    info: {
 *      name: "distributor",
 *      port: 9000,
 *      urls:[],
 *     host: "", 
 *    },
 *  },
 * ...
 * 
 * }
 */


class distributor extends require('./server.js') {
  constructor() {
    super("distributor", 9000 ,["POST/distributes", "GET/distributes"]);
  }
  
  //노드 접속 이벤트 처리
  //노드가 접속한다면 map에 저장합니다
  onCreate(socket) {
    console.log("onCreate", socket.remoteAddress, socket.remotePort);
    this.sendInfo(socket);
  }
  
  //노드 통신 오류 처리
  onClose(socket) {
    var key = socket.remoteAddress + ":" + socket.remotePort;
    console.log("onClose", socket.remoteAddress, socket.remotePort);
    delete map[key];
    this.sendInfo();
  }

  //클라이언트 요청에 대한 처리
  write(socket, packet) {
    socket.write(JSON.stringify(packet) + '¶')
  }
 //정보를 전달합니다.
 //소켓이 있다면 특정 소켓에만 정보를 전달하고, 소켓이 없다면 모든 소켓에 정보를 전달합니다.
  sendInfo(socket) {
    var packet = {
      uri: "/distributes",
      method: "GET",
      key: 0,
      params: []
    };
    
    for(var n in map) {
      packet.params.push(map[n].info);
    }

    if(socket) {
      this.write(socket, packet);
    } else {
      for(var n in map) {
        this.write(map[n].socket, packet);
      }
    }
  }
  //노드가 접속하고자 할 때 사용합니다.
  //접속할 때 마다 map에 노드의 정보를 저장합니다. 
  //소켓 정보에서 호스트의 정보와 포트 정보를 추출하여 key로 사용합니다.
  onRead(socket, json) {
    var key = socket.remoteAddress + ":" + socket.remotePort;
    console.log("onRead", socket.remoteAddress, socket.remotePort, json);

    if(json.uri == "/distributes" && json.method == "POST") {
      map[key] = {
        socket: socket
      };
      map[key].info = json.params;
      map[key].info.host = socket.remoteAddress;

      this.sendInfo();
    }
  }
}

new distributor();