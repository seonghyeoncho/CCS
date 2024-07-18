'use strict';

const net = require('net');
const tcpClient = require('./client');

/**
 * Distributor Server
 * @param {string} name
 * @param {number} port
 * @param {string} urls
 */
class tcpServer {
  constructor(
    name,
    port, 
    urls
  ) {
    this.context = {
      port: port,
      name: name,
      urls: urls
    };
    this.merge = {};

    //서버 생성
    this.server = net.createServer((socket) => {
      this.onCreate(socket);

      socket.on("error", (exception) => {
        this.onClose(socket);
      });
      socket.on("close", () => {
        this.onClose(socket);
      });
      socket.on("data", (data) => {
        var key = socket.remoteAddress + ":" + socket.remotePort;
        var sz = this.merge[key] ? this.merge[key] + data.toString() : data.toString();

        var arr = sz.split('¶');
        for(var n in arr) {
          //clinet와 동일한 로직
          if(sz.charAt(sz.length - 1) != '¶' && n == arr.length - 1) {
            this.merge[key] = arr[n];
            break;
          } else if(arr[n] == "") {
            break;
          } else {
            this.onRead(socket, JSON.parse(arr[n]));
          }
        }
      });

    });

    this.server.on("error", (err) => {
      console.log(err);
    });

    this.server.listen(port, () => {
      console.log("listen", this.server.address());
    });
  }

  onCreate(socket) {
    console.log("onCreate", socket.remoteAddress, socket.remotePort);
  }
  onClose(socket) {
    console.log("onClose", socket.remoteAddress, socket.remotePort);
  }

  connectToDistributor(host, port, onNoti) {
    var packet = {
      uri: "/distributes",
      method: "POST",
      key: 0,
      params: this.context
    };

    var isConnectedDistributor = false;
    
    this.clientDistributor = new tcpClient(
      host, 
      port,
      //onCreate
      (options) => {
        isConnectedDistributor = true;
        this.clientDistributor.write(packet);
      },
      //onRead
      (options, data) => { onNoti(data); },
      //onEnd
      (options) => { isConnectedDistributor = false; },
      //onError
      (options) => { isConnectedDistributor = false; }
    );

    //3초마다 재연결 시도
    setInterval(() => {
      if(isConnectedDistributor != true) {
        this.clientDistributor.connect();
      }
    }, 3000);

  }
}

module.exports = tcpServer;