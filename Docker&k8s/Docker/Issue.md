# 도커 프로젝트를 진행하면서 발생한 이슈들 모음입니다.

2021/09/30
`docker: Error response from daemon: Cannot link to a non running container: /wordpressdb AS /wordpress/mysql.`

link할 container가 실행되지 않은 상태에서 명령어를 사용하면 위와 같은 error를 반환한다.

2021/10/1
`mysql container가 실행되지 않고 즉시 종료됨`
실행 명령어를 바꾸니 실행이 되었다.

`-e MYSQL_ALLOW_EMPTY_PASSWORD=false \` 이 환경변수를 추가하였다.

그러고 나서 
`docker exec -it [container id] mysql -u root -p [password]`를 이용해서 접속하려 했는데 다시 비밀번호를 요청하면서 접속이 거부되었다.
그래서 `docker exec -it [container id] mysql`로 접속하였더니 잘 접속이 되었다. 
왜 그런지는 container 환경 변수 때문으로 생각하고 있다. 

# 응 아니야 오타야