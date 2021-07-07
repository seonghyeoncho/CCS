# EC2에 NGINX 구축하기

환경은 EC2 (AWS Linux 2)를 이용하며 CodeDploy와 Github Action을 이용한다.
NGINX 설치는 yum을 이용하고 있다.

ssh로 EC2 인스턴스에 접근한다.

```
sudo yum install nginx
```
설치를 계속 진행한다.

설치가 완료되었으면,
```
sudo service nginx start
```
실행해준다.

```
ps -ef | grep nginx
```
nginx의 구동 여부를 확인한다.

정상적으로 작동하고 있지만, 접근이 되지 않을 경우

```
sudo netstat -ntlp
```

이를 통해서 3000번 포트가 열려있는지 확인한다.

모두 확인이 된 상태에서도 접속이 되지 않았다면, EC2에서 인바운드 규칙을 설정하지 않을 가능성이 크다.
