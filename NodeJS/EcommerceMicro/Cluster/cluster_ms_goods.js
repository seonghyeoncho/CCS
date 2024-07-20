'use district';

const business = require('../../EcommerceMono/mono_goods.js');
const cluster = require('cluster');

class goods extends require('../Distributor/server.js') {
  constructor() {
    super(
      "goods", 
      process.argv[2] ? Number(process.argv[2]) : 9010,
      ["POST/goods", "GET/goods", "DELETE/goods"]
    );

    this.connectToDistributor("127.0.0.1", 9000, (data) => {
      console.log("Distributor Notification", data);
    });
  }
  onRead(socket, data) {
    console.log("onRead", socket.remoteAddress, socket.remotePort, data);
    business.onRequest(socket, data.method, data.uri, data.params, (s, packet) => {
      socket.write(JSON.stringify(packet) + '¶');
    });
  }
}
if (cluster.isMaster) {

  // 자식 프로세스 실행
  cluster.fork();
  
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  })
} else {
  new goods();
}

