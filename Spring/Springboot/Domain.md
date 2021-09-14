# Springboot Domain

`@Entity`
- 테이블과 링크될 클래스임을 나타냅니다.
- 기본값으로 클래스의 카멜케이스 이름을 언더스코어 메이밍으로 테이블 이름을 매칭합니다.

`@GeneratedValue`
- PK의 생성 규칙을 나타냅니다.
- `strategy = GenerationType.IDENTITY`옵션을 추가해야만 `auto_increment`가 적용됩니다.

*Setter 메소드가 없는데 이는 `@Builder`를 통해서 제공되는 빌더 클래스를 이용합니다.*

```java
@Getter
@NoArgsConstructor
@Entity
public class Posts extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;

    @Builder
    public Posts (String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
```