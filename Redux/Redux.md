# Redux

리덕스의 기본 구조는 

Action, Action Creator, Reducer, Store, dispatch, subscribe가 있다.

### Store
스토어는 현재의 앱 상태, 리듀서가 들어있다.
리덕스를 거치는 데이터를 모두 가지고 있다고 생각하면 된다.
한 애플리케이션 당 하나의 스토어만 만들 수 있다.

### Actoin
리덕스에서 스토어의 변화를 일으키려면 액션을 발생시켜야 한다.
액션은 하나의 객체로 표현된다.

### Action Creator
액션은 만드는 함수로, 파라미터를 받아와서 액션 객체를 만들어준다.

### Reducer
스토어의 변화를 일으키는 함수로, 두 개의 파라미터를 받아온다.
하나는 현재의 상태이고, 다른 하나는 전달받은 액션이다.

### dispatch
액션을 발생시키는 함수로, 스토어 안에 내장되어 있다.
디스패티는 액션을 파라미터로 받아서 액션을 호출하고, 스토어는 리듀서를 실행시키고, 리듀서는 새로운 상태를 만들어 준다.

### subscribe
스토어 안에 내장되어 있는 함수로, 특정함수를 전달해주면 액션이 디스패치가 되는 순간 마다 전달된 함수가 호출된다.
