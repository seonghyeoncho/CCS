# OAuth

사용자들이 비밀번호를 제공하지 않고, 다른 웹사이트상의 자신들의 정보에 대해 웹사이트나 애플리케이션의 접근 원한을 부여할 수 있는 공통적인 수단으로서 사용되는, 접근 위임을 위한 개방형 표준이다.

쉽게 맗해서, 흔히 보는 Google 계정으로 회원가입, 로그인 같은 기능들을 말한다. 

여기서는 OAuth 중 Github를 통한 OAuth에 대한 내용이다.
Github Dosc에 있는 내용을 참고하였다.

먼저 Github OAuth에서는 2가지 유형을 지원한다.
  - Authorricatoin code grant
  - OAuth 2.0 Device Authorization grant

## Authorricatoin code grant
OAuth에서 가장 많이 볼 수 있는 유형으로, Web App, Native App에서 Access Token을 얻는데 사용한다.

앱이 브라우저를 띄워서 인증을 시작하는 점이 다른 인증과의 차이점이다.

공식문서를 확인해보면, 

  +----------+
  | Resource |
  |   Owner  |
  |          |
  +----------+
       ^
       |
      (B)
  +----|-----+          Client Identifier      +---------------+
  |         -+----(A)-- & Redirection URI ---->|               |
  |  User-   |                                 | Authorization |
  |  Agent  -+----(B)-- User authenticates --->|     Server    |
  |          |                                 |               |
  |         -+----(C)-- Authorization Code ---<|               |
  +-|----|---+                                 +---------------+
    |    |                                         ^      v
   (A)  (C)                                        |      |
    |    |                                         |      |
    ^    v                                         |      |
  +---------+                                      |      |
  |         |>---(D)-- Authorization Code ---------'      |
  |  Client |          & Redirection URI                  |
  |         |                                             |
  |         |<---(E)----- Access Token -------------------'
  +---------+       (w/ Optional Refresh Token)

1. 애플리케이션이 OAuth 서버에 요청, 사용자가 브라우저를 열어서 인증을 진행하게 한다.
2. 사용자는 브라우저의 프롬프트를 통해서 인증 후 어플리케이션의 요청을 승인한다.
3. 사용자는 인증 서버로부터 인등 코드를 받아 어플리케이션으로 돌아온다.
4. 어플리케이션은 인증 코드를 access token으로 교환한다.

