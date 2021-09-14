# Spring Data JPA

인터페이스로서 자바 표준명세서로 JPA를 사용하기 위해서는 구현체가 필요합니다. 

- Hibernate
- Eclipse
- Link

Spring에서 JPA를 이용할 때 Spring Data JPA를 이용한다. 

Hibernate를 쓰는 것과 Spring Data JPA를 쓰는 것 사이에는 큰 차이가 없으나, Sprign은 이를 권장하고 있습니다. 이유는 다음과 같습니다.

- 구현체 교체의 용이성
- 저장소 교체의 용이성

### 구현체 교체의 용이성
Hibernate 외에 다른 구현체로 쉽게 교체하기 위함입니다.

### 저장소 교체의 용이성
관계형 데이터베이스 외에 다른 저장소로 쉽게 교체하기 위함입니다.