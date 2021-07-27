리엑트는 UI라이브러리로 소개되고 있다. 또한 높은 자유도를 주고 있어서 설계를 잘 하고 개발하지 않으면, 효율성이나 확장 가능성, 협업 효율이 떨어질 수 있게 된다.
그래서 다양한 패턴들이 각 팀마다, 기업마다 존재한다. 

여기서는 가장 대중적이고 기본적인 Design Pattern 2가지를 소개한다. 
이 2가지를 반드시 사용해야하는 것은 아니며, 이 둘을 조합해서 사용할 수 도 있고, 다른 라이브러리과 같이 사용해서 서비스에 맞는 Design Pattern을 설계할 수 있다.

## Presentational and Container 
데이터 처리와 데이터 출력을 분리하여 관리하는 패턴.

### Container
  - 데이터 fetch
  - 서브 컴포넌트 렌더링
  - 스타일이나 마크업이 없다.
  - 데이터를 전달해준다. 
  - stateful하다. 
### Presentational
  - 화면에 보여지는 것만을 담당한다. 
  - 마크업과 스타일을 가지고 있다.
  - props로 데이터를 받아올 수 있다. 
  - stateless하다.


```ts
const Container = (): JSX.Element => {
  const [data, setData] = useState<string>('');

  return (
    <Presenter data={data}/>
  );
};
const Presenter = (data: string): JSX.Element => (
  <div>
    {data}
  </div>
);
```

### 장점
  - 관심사의 분리가 명확해진다. 
  - 재사용성을 높힐 수 있다.
  - 마크업 작업이 편하다.

## Atomic Design Pattern
디자인 요소들을 나누어 파악하고 이 요소들이 조합되는 과정을 통해서 디자인을 구성하는 방식.

5개의 구분된 단계가 존재한다. 
  - Atoms
  - Molecules
  - Organisms
  - Templates
  - Pages

### Atomic
하나의 구성 요소. 본인 자체의 스타일만 가지고 있으며, 다른 곳에 영향을 미치는 스타일은 적용되지 않아야 한다.
form labels, inputs, buttons와 같은 basic html elements를 포함한다.

### Molecules
Atom이 모여서 만들어지는 하나의 구성요소. Atom들이 모여서 실절적으로 어떤 동작을 할 수 있는 단위.

### Organisms
Molecules들이 모여서 비교적 복잡한 구조를 가진다. Molecule처럼 하나의 동작을 수행하는 것이 아니라, 여러 기능들이 모여서 하나의 구성이 된다.

### Templates
Organisms을 모아서 페이지의 기본 내용 구조에 초점을 맞추어 구성하는 단계이다. 

### Pages
실제 페이지를 구성하는 단계이다.

Atomic Design Pattern은 초기에 설계하기 굉장히 까다롭고, 어플리케이션에 대한 이해나, 디자인에 대해서 합의가 이루어지지 않은 상태면 더더욱 어렵다. 
재사용과 효율성에 초점을 둔 프로젝트에 적용한다면 매우 좋을 디자인 패턴이다. 

참고

https://ko.reactjs.org/docs/design-principles.html
https://velog.io/@holim0/React-Design-Pattern
https://atomicdesign.bradfrost.com/table-of-contents/