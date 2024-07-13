# 모놀리식 아키텍처

하마의 애플리케이션 안에 모든 컴포넌트를 포함하는 구조.

## 장점

구조가 단순해서 개발과 배포가 간편하다.

## 단점
일체형 시스템이기 때문에 문제가 발생한다.

- 분산 처리가 비효율적이다. 

  모놀리식 구조는 모든 기능을 프로세스 하나 또는 코드 베이스로 개발한다.

  이 때문에 기능별로 분산 처리를 할 수 없다. 항상 전체를 같이 분산해야한다.

- 코드를 관리하기 어렵다.
  
  코드 구조가 하나이기에 새로운 코드를 추가하기 위해서 전체 코드를 이해해야한다.
  ```
  (전체를 이해하면 좋은거 아닌가?)
  ```

- 새로운 기술을 적용하기 어렵다
  
  특정 기능에 새로운 기술을 적용하고 싶어도 기능별로 코드가 독립적이지 않아 적용하기 쉽지 않다.

```
근데 정말 이게 단점으로 보이기 때문에 분산 구조를 선택해야하나? 

상황에 따라 맞게 진행해야한다. 유연하게 변화가능한 코드와 구조를 만들어야한다.
```
