'use strict';

const cluster = require('cluster'); 
const fs = require('fs');

class logs extends require("./Distributor/server.js") {
  constructor() {
    super("logs", 
      process.argv[2] ? Number(process.argv[2]) : 9040,
      ["POST/logs"]
    );
    this.writeStream = fs.createWriteStream("./log.txt", {flags: "a"});
    this.connectToDistributor("127.0.0.1", 9000, (data) => {
      console.log("Distributor Notification", data);
    });
  }
  //로그가 입력되면 화면에 출력합니다.
  onRead(socket, data) {
    const sz = new Date().toLocaleString + "\t" + socket.remoteAddress + "\t" + socket.remotePort + "\t" + data;
    console.log(sz);
    this.writeStream.write(sz);
  }
}

if(cluster.isMaster) {
  cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    console.log('worker ${worker.process.pid} died');
    cluster.fork();
  });
} else {
  new logs();
}