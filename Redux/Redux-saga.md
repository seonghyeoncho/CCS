# Redux-saga

redux를 사용하면서 비동기 작업을 처리할 때 필요한 라이브러리 중 하나이다. 
saga의 작동 원리는 Generator 함수를 이용하고 있다.

Generator functoin은 다음과 같이 생겼다.

```ts
function* generatorFunction() {
  yield console.log('hello!');
}
```

먼저 Generator란 반복을 제어할 수 있는 함수라고 이해하면 된다. 이 generator를 사용하기 위해서  `function*` 키워드를 사용한다.
`yield` 키워드를 사용해서 해당 표현식으로부터 반환값을 받는다.

saga에서 사용하는 키워드 중 일부는 다음과 같다.

call: 함수의 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수이다.
put: 특정 액션 dispatch
takeEvey: 들어오는 모든 액션에 대해 특정 작업을 처리해준다.
takeLatest: 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행한다.
all: 제네레이터 함수를 배열 인자로 넣어주며느 각 함수들이 병핼적으로 동시레 실행되고, 전부 resolve될 때까지 기다린다.