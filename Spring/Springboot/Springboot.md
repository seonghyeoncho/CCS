# Springboot [스프링 부트와 AWS로 혼자 구현하는 웹 서비스]
## 예제 디렉토리 구조

src
  - main
    - java
      - org.example
        - Application
        - domain 
        - service
        - web
          - dto
          - controllers
    - resources
      - application.properties
  - test
    - java
      - org.example
        - domain 
        - service
        - web

### Application
Application 클래스는 해당 프로젝트의 메인 클래스이다. 

### web
컨트롤러와 관련된 클래스들은 모두 이 패키지에 담겨있다.

### domain
도메인을 담는 패키지이다.

### service
서비스 클래스들이 담긴 패키지이다.

## Spring Web Layer
스프링 웹 계층은 크게 3가지로 나뉜다.
- Web(Presentation)
- Service(Business)
- Repository(Data)

그리고 2개의 영역이 있다.
- DTOS
- Domain Model

### Web
- 컨트롤러와 JSP/Freemarker 등의 뷰 템플릿 영역이다. 외부 요청과 응답에 대한 전반적인 영역을 표현한다.

### Service
- Controller와 Dao의 중각 영역에서 사용이 된다.
- @Transactional이 사용되어야 하는 영역이다.
- 트랜젝션과 도메인 간의 순서만 보장하는 레이어이다.

### Repository
- DB에 접근하는 영역이다.

### DTOs
- 계층 간에 데이터 교환을 위한 객체이다.

### Domain Model
- Entity가 사용된 영역이다.
- 비즈니스 로직이 실행되는 곳이다.
- 예를 들어 택시 앱이라고 한다면, 배차, 탑승, 요금 등이 모두 도메인이 될 수 있다. 




