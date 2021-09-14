# Gradle

그래이들 버전이 달라지면서 6에 맞게 변경한 내용입니다.

*Grale6*

### build.gradle

```java
plugins {
  id 'org.springframework.boot' version '2.4.1'
  id 'io.spring.dependency-management' version '1.0.10.RELEASE'
  id 'java'
}

group 'org.example'
version '1.0.4-SNAPSHOT-'+new Date().format("yyyyMMddHHmmss")
sourceCompatibility = 1.8   

repositories {
  mavenCentral()
  jcenter()
}

test {
  useJUnitPlatform()
}

dependencies {
  implementation('org.springframework.boot:spring-boot-starter-web')
  implementation('org.springframework.boot:spring-boot-starter-mustache')

  implementation('org.projectlombok:lombok')
  annotationProcessor('org.projectlombok:lombok')
  testImplementation('org.projectlombok:lombok')
  testAnnotationProcessor('org.projectlombok:lombok')

  implementation('org.springframework.boot:spring-boot-starter-data-jpa')
  implementation("org.mariadb.jdbc:mariadb-java-client")
  implementation('com.h2database:h2')

  implementation('org.springframework.boot:spring-boot-starter-oauth2-client') 
  implementation('org.springframework.session:spring-session-jdbc') 

  testImplementation('org.springframework.boot:spring-boot-starter-test')
  testImplementation("org.springframework.security:spring-security-test")
}

```java
plugins {
  id 'org.springframework.boot' version '2.4.1'
  id 'io.spring.dependency-management' version '1.0.10.RELEASE'
  id 'java'
}
```

Gradle Plugin입니다.
spring boot를 사용하기 위한 플러그인들을 명시합니다.


```
repositories {
  mavenCentral()
  jcenter()
}
```

각종 의존성들을 어떤 원격 저장소에서 받을 지 정합니다. 

```
test {
  useJUnitPlatform()
}
```
Junit5를 사용하기 위해서 필수로 선언되어야 합니다.
Junit이란 테스트 코드 작성을 도와주는 프레임워크입니다.

```
dependencies {
  implementation('org.springframework.boot:spring-boot-starter-web')
  implementation('org.springframework.boot:spring-boot-starter-mustache')

  implementation('org.projectlombok:lombok')
  annotationProcessor('org.projectlombok:lombok')
  testImplementation('org.projectlombok:lombok')
  testAnnotationProcessor('org.projectlombok:lombok')

  implementation('org.springframework.boot:spring-boot-starter-data-jpa')
  implementation("org.mariadb.jdbc:mariadb-java-client")
  implementation('com.h2database:h2')

  implementation('org.springframework.boot:spring-boot-starter-oauth2-client') 
  implementation('org.springframework.session:spring-session-jdbc') 

  testImplementation('org.springframework.boot:spring-boot-starter-test')
  testImplementation("org.springframework.security:spring-security-test")
}
```

프로젝트 개발에 필요한 의존성들을 선언하는 곳입니다.

Gradle6가 되면서 `compile`, `testCompile`은 soft deprecate 되었습니다.
대신 `implementation`, `testImplementation`이 추가되었습니다.




