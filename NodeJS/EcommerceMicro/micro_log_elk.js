'use strict';

const cluster = require('cluster'); 
const fs = require('fs');
const elastic = new require('elasticsearch').Client({
  node: "https://9a61d6e772cf41fdbaa0516b31a982f4.us-central1.gcp.cloud.es.io:443",
  auth: {
    apiKey: "8Km-Dn68R3SzqQ4ocL_Ysg"
  },
  log: "trace"
})
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
    data.timestamp = new Date().toISOString();
    data.pararms = JSON.parse(data.pararms);
    elastic.index({
      index: 'micro',
      type: "logs", 
      body: data
    })
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

// ?{
//   "id": "WF7f0ZABNWN27i6Ew6oH",
//   "name": "test",
//   "expiration": 1724100020999,
//   "api_key": "8Km-Dn68R3SzqQ4ocL_Ysg",
//   "encoded": "V0Y3ZjBaQUJOV04yN2k2RXc2b0g6OEttLURuNjhSM1N6cVE0b2NMX1lzZw==",
//   "beats_logstash_format": "WF7f0ZABNWN27i6Ew6oH:8Km-Dn68R3SzqQ4ocL_Ysg"
// }