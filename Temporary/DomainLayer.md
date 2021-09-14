# Domain Layer

## 도메인 레이어의 유형
- Transaction Script
- Domain Model Pattern

### Transaction Script
*간단한 경우에 사용될 수 있으며, Application Logic과 함께 처리한다.*

```
public Order cancelOrder(Long orderId) {
	Order order = orderRepository.findById(orderId);

	order.setCanceled(true);
	someAdditionalMethodWithCancel();
	someAdditionalMethod2WithCancel();

	OrderRepository.save(order);

	return order;
}
```
Transaction Script는 data를 가진 객체에 대해 getter, setter만을 호출하기 때문에, 실질적으로 대부분의 로직은 Transaction Script안에 담긴다.
Applicatino Ligic도 담을 수 있기 때문에 db에서 데이터 불러오기, db에 저장하는 명령도 포함한다.

간단한 로직에서는 큰 문제점을 느낄 수 없을 수 있지만, 복잡해질 수록 문제점들이 발생한다.
- 비대해지는 서비스 메서드
- 이해하기 어려운 서비스 메서드
- 테스트하기 어려운 메서드

### Domain Model Pattern
*행위가 관련된 데이터와 함께 객체를 이루는 형태*

객체지향 요소들을 더 적극적으로 활용하여, 다음과 같은 이점들을 제공할 수 있다.
- 설계의 이해가 쉬워진다.
- 설계를 관리하기 쉬워진다.
- 테스트하기 쉬워진다.
- Design Pattern 등의 도움을 받을 수 있다.

```
public Order cancelOrderService(Long orderId){
	Order order = orderRepository.findById(orderId);

	order.cancel();

	OrderRepository.save(order);

	return order;
}
```

위의 코드에서 대부분의 코드는 Domain 객체 안에 담긴다.

*참고*

https://tech.junhabaek.net/%EB%B0%B1%EC%97%94%EB%93%9C-%EC%84%9C%EB%B2%84-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98-domain-layer1-domain-layer%EC%99%80-ddd-e97a7587a7b0 