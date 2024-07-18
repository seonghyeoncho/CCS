//실행 시점 표시
'use strict';

const net = require('net');

/**
 * tcoClient 클래스
 * 
 * @param {string} host
 * @param {number} port
 * @param {function} onCreate
 * @param {function} onRead
 * @param {function} onEnd
 * @param {function} onError
 * 
 */

class tcpClient {
  constructor(host, port, onCreate, onRead, onEnd, onError) {
    this.options = {
      host: host,
      port: port
    };

    this.onCreate = onCreate;
    this.onRead = onRead;
    this.onEnd = onEnd;
    this.onError = onError;
  }

  connect() {
    //연결
    this.client = net.connect(this.options, () => {
      if(this.onCreate)
        this.onCreate(this.options);
    });

    //연결이 되었을 때
    this.client.on("data", (data) => {
      //데이터 수신. merge는 데이터가 분할되어 수신되었을 때 데이터를 합치기 위한 변수
      //이전의 데이터와 합쳐서 하나의 데이터로 만들어줍니다.
      //이전 데이터가 없는 경우에는 그냥 넘어갑니다.
      /**
       * 분할된 패킷은 ¶ 기호를 사용하여 다음 패킷이 존재함을 알릴 수 있습니다. 마지막 패킷이라면 ¶가 없습니다.
       * 이 점을 이용하여 전체 데이터를 받기 위해 로직을 아래와 같이 작성합니다.
       */
      var sz = this.merge ? this.merge + data.toString() : data.toString();
      
      /*
        ¶로 데이터 구분
        ¶는 단락 기호로, 하나의 긴 복사본으로 새로운 단락을 지정할 때 쓰입니다.
        패킷 별로 구분하기 위해 사용합니다.
      */
      var arr = sz.split('¶');

      for(var n in arr) {
        //마지막 패킷이 아닌 경우 계속해서 패킷을 받기 위해 merge에 저장합니다.
        if(sz.charAt(sz.length - 1) != '¶' && n == arr.length - 1) {
          this.merge = arr[n];
          break;
        } else if(arr[n] == "") {
          //패킷이 빈 경우는 무시합니다.
          break;
        } else {
          //패킷이 완성된 경우에는 onRead를 호춣합니다.
          this.onRead(this.options, JSON.parse(arr[n]));
        }
      }
    });

    //연결 종료
    this.client.on("end", () => {
      if(this.onEnd)
        this.onEnd(this.options);
    });

    this.client.on("error", (err) => {
      if(this.onError)
        this.onError(this.options, err);
    });
  }

  write(packet) {
    this.client.write(JSON.stringify(packet) + '¶');
  }
}

module.exports = tcpClient;