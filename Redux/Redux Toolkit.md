# Redux Toolkit

기존 리덕스 사용자라면 
action을 만들어야하고,
action creator를 만들어야하고,
reducer를 만들어 준 다음에,
store에 연결하는 과정을 필요할 때마다 해야한다.
그리고 나서 비동기 작업을 하기 위해서는 thunk또는 saga를 추가적으로 설치를 해야한다.

이렇게 하면 굉장히 많은 bolierplate를 작성해야한다. 
어렵다기보단 엄청 귀찮다.

그리고 Jotai와 같은 상태관리 라이브러리들이 많이 나오는 상태에서 redux에서 Toolkit를 추가하였다,
기존의 전역관리 Redux와는 약간 다른 성격을 가지고 있다.

Toolkit은 기본적으로 Ts를 공식적으로 지원하고 있다. 

나 또한 프로젝트에서 bolierplate를 엄청나게 작성했던 경험이 있었고, 무언가를 할때마다 작성했던 귀찮음이 있어서 Toolkit을 사용해보기로 했다.
또한 이번 프로젝트에서 사용하는 Presenter & Container pattern을 사용하면서, Toolkit을 사용해도 괜찮을 것 같다고 판단을 하였다.

먼저 Toolkit의 공식 문서들을 보면 하나의 Compoenet 안에 하나의 slice가 있다. 
이름 자체가 slice이니 상태를 최대한 작게 나누어서 관리하려는 방향이 보였다.

간단한 Counter를 예시로 들어보겠다.

먼저 디렉토리 구조는 다음과 같이 구성한다.

Counter
  |_ slice.ts
  |_ CounterContainer.tsx
  |_ CounterPresenter.tsx
store.ts

