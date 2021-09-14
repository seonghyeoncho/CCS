# Springboot Test Code

`@Test`
- JUnit에서 쓰이는 annotation입니다. 테스트 케이스임을 알립니다.

`@ExtendWith(SpringExtension.class)`
- 테스트를 진행할 때 JUnit에 내장된 실행자 외에 다른 실행자를 실행시킵니다.
- SpringExtension이라는 실행자를 실행시킵니다.
- 스프링 부트 테스트와 JUnit 사이에 연결자 역할을 합니다.

`@WebMvcTest(controllers = HelloController.class)`
- 여러 스프링 어노테이션 중, Web에 집중할 수 있는 어노테이션입니다.
- 선언할 경우 @Controller, @ControllerAdvice 등을 사용할 수 있습니다.

`mvc.perform(get("/hello"))`
- MockMvc를 통해 /hello 주소로 HTTP GET을 요청합니다.
- 체이닝이 지원되어서 여러 검증 기능을이어서 선언할 수 있습니다.

`.andExpect()`
- mvc.perform의 결과를 검증합니다.

`param`
- API 테스트할 때 사용될 요청 파라미터를 설정합니다.
- String만 허용

`jsonPath`
- JSON 응답값을 필드별로 검증할 수 있는 메소드입니다.
- `&`를 기준으로 필드명을 명시합니다.



`@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)`

`@Autowired`
- 스프링이 관리하는 Bean을 주입 받습니다.

`assretThat`
- assertj라는 테스트 검증 라이브러리의 검증 메소드입니다.
- 검증하고 싶은 대상을 메소드 인자를 받습니다.
- 메소드 체이닝을 지원합니다.

`@AfterEach`
- Junit에서 단위 테스트가 끝날 때 마다 수행되는 메소드를 지정
- 보통은 배포 전에 전체 테스트를 수행할 때 테스트간 데이터 침법을 막기 위해 사용합니다.



```java
@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = HelloController.class)
public class HelloControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void hello가_리턴된다() throws Exception {
        String hello = "hello";

        mvc.perform(get("/hello"))
                .andExpect(status().isOk())
                .andExpect(content().string(hello));
    }

    @Test
    public void helloDto가_리턴된다() throws Exception {
        String name = "hello";
        int amount = 1000;

        mvc.perform(
                get("/hello/dto")
                        .param("name", name)
                        .param("amount", String.valueOf(amount)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is(name)))
                .andExpect(jsonPath("$.amount", is(amount)));
    }
}
```

```java
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PostApiControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private PostsRepository postsRepository;

    @AfterEach
    public void tearDown() throws Exception {
        postsRepository.deleteAll();
    }

    @Test
    public void Posts_등록된다() throws Exception {
        String title = "title";
        String content = "content";
        PostsSaveRequestDto requestDto = PostsSaveRequestDto.builder()
                    .title(title)
                    .content(content)
                    .author("author")
                    .build();

        String url = "http://localhost:" + port + "/api/v1/posts";

        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<Posts> all = postsRepository.findAll();

        assertThat(all.get(0).getTitle()).isEqualTo(title);
        assertThat(all.get(0).getContent()).isEqualTo(content);
    }

    @Test
    public void Posts_수정된다() throws Exception {
        Posts savedPosts = postsRepository.save(Posts.builder()
                .title("title")
                .content("content")
                .author("author")
                .build());

        Long updatedId = savedPosts.getId();
        String expectedTitle = "title2";
        String expectedContent = "content2";

        PostsUpdateRequestDto requestDto = PostsUpdateRequestDto.builder()
                .title(expectedTitle)
                .content(expectedContent)
                .build();

        String url = "http://localhost:" + port + "/api/v1/posts/" + updatedId;

        HttpEntity<PostsUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);

        ResponseEntity<Long> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, Long.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<Posts> all = postsRepository.findAll();
        assertThat(all.get(0).getTitle()).isEqualTo(expectedTitle);
        assertThat(all.get(0).getContent()).isEqualTo(expectedContent);
    }
}
```


