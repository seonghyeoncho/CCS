# Install
## “jdk” can’t be opened because Apple cannot check it for malicious software.
Env: Intell MacBook
엘라스틱서치를 다운로드한 후 설치하려고 할 때 jdk가 실행되지 않는 문제가 있다.

이는 맥에서 확인되지 않은 프로그램을 막기 때문이다. 다음 명령어로 실행하고자 하는 폴더의 속성을 변경한다.

`xattr -dr < directory >`

xattr : display and manipulate extended attributes

# Start
## flood stage disk watermark [95%] exceeded on [], all indices on this node will be marked read-only

사용할 수 있는 디스크가 가득 찼을 때 표시
## received plaintext http traffic on an https channel, closing connection Netty4HttpChannel{localAddress=/[0:0:0:0:0:0:0:1]:9200, remoteAddress=/[0:0:0:0:0:0:0:1]:63688}

```
xpack.security.enabled: false
xpack.security.enrollment.enabled: false
xpack.security.http.ssl: enabled: false
xpack.security.transport.ssl: enabled: false
```

## Health RED
