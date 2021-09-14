# Springboot Repository

DB Layer 접근자로, 인터페이스로 생성합니다.
*Entity Class와 기본 Entity Repository는 함께 위치해야합니다.*

```java
public interface PostsRepository extends JpaRepository<Posts, Long>{
    @Query("SELECT p FROM Posts p ORDER BY p.id DESC")
    List<Posts> findAllDesc();
}

```