# Systems  Manager
Systems  Manager는 AWS 애플리케이션 및 리소스를 위한 운영 허브이자, 안전한 운영이 대규모로 활성화되는 하이브리드 및 멀티클라우드 환경을 위한 한정한 엔드 투 엔드 관리 솔루션이다.라고 AWS가  말하긴한다. 


필자가 생각했을 때 이 서비스는 다음과 같은 상황에서 사용하면 좋을 것 같다.


1. 새로 생성하는 서버의 정보를 일관성 있게 유지하고 싶을때
2. 사용 중인 모든 인스턴스에 새로운 컨테이너를 생성해야할 때


## Application management
### Application Manager
## Change management
## Node management
## Operation management


## 저는 이렇게 사용했는데요
필자가 했던 프로젝트 중 Systems Manager의 Parameter Store를 이용하여 민감한 값을 EC2에서 받을 수 있도록 했다. 

이렇게 했던 이유는 

1. 스프링의 프로파일 설정 내용은 런타임에 적용된다. 
2. 현재 CI/CD 파이프 라인에서는 깃허브 액션에서 빌드된 파일을 S3에 올린다. 

그렇다면 데이터베이스 관련 민감 정보들은 EC2의 환경 변수 파일에 들어가야 한다. 

이 시점에서 좋지 못하게 생각한 점은 EC2에 올려두었을때 EC2가 공격당한다면 해당 데이터베이스 민감 정보도 같이 탈취 당할 수 있다는 점이다. 

그래서 외부에서 주입해줄 수 있는게 필요했고, 비용이 들지 않는 Parameter Store를 이용하는 것이었다. 

[AWS와 Github로 CI/CD 파이프 라인 구축하기](/tech/AWS,%20Github%20이용해서%20파이프라인%20구축하기.md)