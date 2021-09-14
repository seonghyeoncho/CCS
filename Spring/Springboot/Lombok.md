# Lombok

`@Getter`
- 선언된 모든 필드의 get 메소드를 생성해 줍니다.

`@RequiredArgsConstructor`
- 선언된 모든 `final` 필드가 포함된 생성자를 생성해 줍니다.

`@NoArgsConstructor`
- 기본 생성자 자동 추가

`@Builder`
- 해당 클래스의 빌더 패턴 클래스를 생성
- 생성자 상단에 선언 시 생성자에 포함된 필드만 빌더에 포함

```java
@Getter
@RequiredArgsConstructor
public class HelloResponseDto {

    private final String name;
    private final int amount;

}
```
```java
@Getter
@NoArgsConstructor
public class PostsUpdateRequestDto {
    private String title;
    private String content;

    @Builder
    public PostsUpdateRequestDto(String title, String content) {
        this.title = title;
        this.content = content;
    }
}

```