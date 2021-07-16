# NGINX와 React

nginx.conf내에서 어플리케이션을 바로 연결해서 구동할 수 있도록 할 수도 있지만, 조금 더 깔끔하게 사용하기 위해서 선호되는 방식은
/etc/nginx내에 sites-enabled디렉토리를 생성해서 여기에 각 서비스 설정을 넣고 nginx.conf가 이들을 확인하도록 하는 방식으로 하겠다.

기존에 있는 server 블록은 주석처리를 하고,

```
include /etc/nginx/conf.d/*.conf;
include /etc/nginx/sites-enabled/*.conf;
```

2번째 줄을 추가해준다. 이로써 sites-enabled하위의 설정파일들을 포함하도록한다.

처음 nginx를 설치 했다면 sites-enabled 디렉토리가 없다. 그러므로 직접 생성해준다.
이제 /etc/nginx아래에 sites-available 디렉토리를 생성해줄 것인데, 이 디렉토리에 필요한 파일들을 작성후, symlik로 sites-enabled에 추가하는 방식으로 할 것이다.

```
sudo mkdir /etc/nginx/sites-available
sudo mkdir /etc/nginx/sites-enabled
sudo vi /etc/nginx/sites-available/[AppName].conf
```
여기서는 React 앱을 배포하는 과정만 포함되어있다.
HTTP에 해당하는 port 80에 대한 설정만 해보자.

```
server {
  listen 80;

  location / {
    root /home/ec2-user/##/build;
    index index.html index.htm;
    try_files $uri %uri/ /index.html;
  }
}
```

```
listen 80;
```
이 부분은 80 port를 listen한다는 설정이다. 

```
location / {
    root /home/ec2-user/##/build;
    index index.html index.htm;
    try_files $uri %uri/ /index.html;
  }
```
location 블록 nginx에서 가장 많이 사용하는 부분인데, 

location 뒤 '/'는 **directive**라고 하는 부분이다.
IP 주소나 도메인의 뒷부분인 URI에 대응이 된다.

root는 React project의 build 디렉토리 경로를 입력한다.

```
sudo ln -s /etc/nginx/sites-available/[AppName]conf /etc/nginx/sites-enabled/[AppName]conf
sudo nginx -t
```
symlink를 설정하고, 설정 테스트를 진행한다.

이제 nginx를 동작시키면 된다.
```
sudo systemctl start nginx
```
실행 후에 접속은 되나 500 Internal Server Error가 발생할 수 있다.

이때 build까지의 경로로 접근을 할 때 거치는 디렉토리에 대해서 실행권한이 없어서 발생할 수 있는 문제일 수 있다.

/home/ec2-user의 권한은 711로 주도록하자.
```
chmod 711 /home/ec2-user
```
이후로 제대로 동작할 것이다.