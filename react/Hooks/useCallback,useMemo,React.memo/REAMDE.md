# 들어가기 전에

## 1. 함수형 컴포넌트에서 렌더링

함수형 컴포넌트는 함수!

함수형 컴포넌트가 렌더링되는 다는 것은 해당 함수가 호출된다는 뜻. 호출될 때 모든 내부 변수는 초기화됨.

```jsx
function Component() {
  const something = getSomethingHeavy();
  return <div>{something}</div>;
}
```

**흐름: 컴포넌트 호출 → 모든 내부 변수 초기화 → 렌더링**

## 2. Reference type

모두가 아는 js개념이지만 다시 한 번 집고 넘어간다.

**pass by reference:** 얕은 복사,

**pass by value:** 깊은 복사

⇒ `같은 참조 값인가? = 메모리에 할당된 값을 사용하는가?`

```jsx
// pass by reference
const 객체1 = { a: 1 };
const 객체2 = { a: 1 };
console.log(객체1 === 객체2); // false
console.log(객체1.a === 객체2.a);
true;
```

## 3. React는 언제 리렌더링할까? (shallow compare)

1. state 변경이 있을 때
2. 부모 컴포넌트가 렌더링 될 때
3. 새로운 props이 들어올 때
4. shouldComponentUpdate에서 true가 반환될 때
5. forceUpdate가 실행될 때

`1번과 2번의 경우 얕은 비교를 통해 새로운 값인지 아닌지 판단` → 객체, 배열, 함수와 같은 참조타입은 실제 내부 값이 아닌 동일참조여부에 따라 판단한다.

⇒ state에 push, pop 등등 원본을 변형하는 메소드를 사용하면 안되는 이유(`state는 immutable하기 사용하자`)

따라서, React는 객체, 배열, 함수일 경우 컴포넌트가 다시 렌더링되면서 새로운 props가 생성될 때 새로운 참조타입으로 형성되기 때문에 새로운 값이라고 판단한다.

## 4. 불필요한 렌더링이 발생할 가능성

1. 상위 컴포넌트의 state 변경
2. 하위 컴포넌트로 넘겨주는 props가 변경됨
3. value값은 변화가 없더라도, reference값의 변화가 있으므로 얕은 비교를 통해 리렌더링됨

→ useCallback과 React.memo로 해결가능!

# useMemo

공식문서

> “생성(create)” 함수와 그것의 의존성 값의 배열을 전달하세요. `useMemo`
> 는 의존성이 변경되었을 때에만 메모이제이션된 값만 다시 계산 할 것입니다. 이 최적화는 모든 렌더링 시의 고비용 계산을 방지하게 해 줍니다.

Memoization: 동일한 값을 리턴하는 함수를 반복적으로 리턴해야한다면, 처음 값을 메모리에 기억(캐싱)해두고 필요할 때마다 재사용하는 기법

**흐름: 컴포넌트 호출 → 모든 내부 변수 초기화, Memoization된 값 사용 → 렌더링**

### ‼️주의사항

무분별하게 남용한다면 오히려 성능에 안 좋을 수 있다.

값을 재활용하기 위해 따로 메모리를 소비하기 때문에 불필요한 값들을 모두 memoization한다면 비효율적일 수도 있다. 공식문서에도 아래와 같이 말하고 있다.

> Write your code so that it still works without `useMemo` — and then add it to optimize performance.

# useCallback

**useCallback은 상위 컴포넌트에서 하위 컴포넌트에 함수를 props로 넘겨줄 때 사용**

> 컴포넌트 내부에 `useCallback` 으로 함수를 wrapping 하고자 하실 때는 해당 함수가 단순히 컴포넌트 안에서 호출되는 함수인지, 아님 최적화된 자식 컴포넌트의 props로 넘겨지는 함수인지를 확인하시고 사용하기

### 언제사용할까?

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const add = () => {
    setCount((prev) => prev + 1);
  };
  // ....
}
```

add는 Parent의 모든 렌더링에서 다른 함수 개체다.

인라인 함수는 저렴(cheap)하기 때문에 각 렌더링에서 함수를 다시 생성하는 것은 문제가 되지 않는다. 컴포넌트당 약간의 인라인 함수는 허용된다(acceptable).

그러나 다음의 경우에는 렌더링 간에 단일 함수 인스턴스를 유지해야 한다.

- React.memo() 내부에 래핑된 함수형 컴포넌트로 함수 객체를 넘겨줬을 때 해당 함수에 적용 (자식 컴포넌트로 넘겨줬을 때)
- 함수 객체가 다른 후크에 대한 종속성인 경우, 예를 들어 useEffect(..., [callback])
- 함수에 내부 상태가 있는 경우, 예를 들어 기능이 디바운스되거나 제한될 때.(?)

> 인라인 콜백과 그것의 의존성 값의 배열을 전달하세요. `useCallback`은 콜백의 메모이제이션된 버전을 반환할 것입니다. 그 메모이제이션된 버전은 콜백의 의존성이 변경되었을 때에만 변경됩니다. 이것은, 불필요한 렌더링을 방지하기 위해 (예로 `shouldComponentUpdate`를 사용하여) 참조의 동일성에 의존적인 최적화된 자식 컴포넌트에 콜백을 전달할 때 유용 (공식문서)

### 좋은 사용 예시

아래와 같이 길이가 긴 배열 요소를 자식으로 렌더링할 때, 쓸모 없는 리렌더링을 방지하기 위해 React.memo로 감싼다.

add 콜백은 useCallback()에 의해 메모화됩니다. term이라는 변수가 동일한 한 useCallback()은 동일한 함수 객체를 반환한다.

Parent 컴포넌트가 다시 렌더링될 때 add 함수 객체는 동일하게 유지되며 Child의 메모이제이션을 깨지 않습니다.

```jsx
function Parent({term}){
  const [count, setCount] = useState(0);
  const add = useCallback(() => {
    setCount(prev => prev + 1);
  },[term])
  return (
    <>
      {길이간 긴 Child배열.map(child => <Child add={add} child={child} />)
    </>
  )
}

function Child({add, child}){
  return <button onClick={add}>Click Me!</button>
}
```

### 안좋은 예시

Child 컴포넌트가 가볍기 때문에 다시 렌더링해도 성능 문제가 발생하지 않기 때문일 가능성이 큽니다.

Parent가 렌더링될 때마다 useCallback() 후크가 호출된다는 것을 잊지 말아야한다! `useCallback()이 동일한 함수 객체를 반환하더라도 여전히 인라인 함수는 다시 렌더링할 때마다 다시 생성됩니다(useCallback()은 그냥 건너뜁니다).`

useCallback()을 사용하면 코드 복잡성도 증가했습니다. useCallback(..., deps)의 deps를 메모화된 콜백 내부에서 사용 중인 것과 동기화된 상태로 유지해야 한다.

결론적으로, `최적화는 최적화를 하지 않는 것보다 더 많은 비용이 듭니다.`

렌더링이 새로운 함수 객체를 생성한다는 사실을 받아들이기만 하면 됩니다.

```jsx
function Parent(){
  const [count, setCount] = useState(0);
  const add = useCallback(() => {
    setCount(prev => prev + 1);
  },[term])
  return (
    <>
      {길이간 긴 Child배열.map(child => <Child add={add} child={child} />)
    </>
  )
}

function Child({add, child}){
  return <button onClick={add}>Click Me!</button>
}
```

### ‼️주의사항

1. 새로 생성되지 않아서 동일 참조 값을 사용하는 게 아니라 매 렌더마다 항상 함수의 생성까지는 되는데, 의존성이 바뀌지 않았다면 useCallback은 인자로 들어온, 생성된 함수를 무시하고 기존 함수를 반환

hooks에 넘겨주는 `함수 자체는 기본적으로 항상 렌더링마다 생성`되는 게 맞고, 이러한 동작이 `퍼포먼스적인 문제를 크게 일으키지는 않는다`고 이야기하고 있으며, useCallback은 단순히 함수의 참조를 유지해 불필요한 리렌더링을 막을 수 있는 기법으로 소개하고 있습니다. (useCallback이 함수의 생성을 막진 않습니다)

[https://ko.reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render](https://ko.reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render)

1. 다음과 같은 상황을 생각해보자. 부모 자식 관계의 컴포넌트가 있을 때, 자식 컴포넌트가 부모 컴포넌트의 렌더링 여부에 따라 자동으로 렌더링된다면, useCallback을 써도 의미가 없을 수 있다.

> 불필요한 렌더링을 방지하기 위해 (예로 `shouldComponentUpdate`를 사용하여) 참조의 동일성에 의존적인 최적화된 자식 컴포넌트에 콜백을 전달할 때 유용합니다. (공식문서)

다시 말해, `useCallback` 사용만으로는 하위 컴포넌트의 리렌더를 막을 수 없다! **하위 컴포넌트가 참조 동일성에, 의존적인, 최적화된 Purecomponent!이어야만 비로소 불필요한 리렌더링을 막을 모든 것이 완성된다.**

# React.memo

> 고차 컴포넌트(HOC)로, 컴포넌트가 동일한 props로 동일한 결과를 렌더링해낸다면, `React.memo`
> 를 호출하고 결과를 메모이징(Memoizing)하도록 래핑하여 경우에 따라 성능 향상을 누릴 수 있습니다. 즉, React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용합니다.
> `React.memo`는 props 변화에만 영향을 줍니다. `React.memo`로 감싸진 함수 컴포넌트 구현 `[useState](https://ko.reactjs.org/docs/hooks-state.html)`
> , `[useReducer](https://ko.reactjs.org/docs/hooks-reference.html#usereducer)` 또는 `[useContext](https://ko.reactjs.org/docs/hooks-reference.html#usecontext)` 훅을 사용한다면, 여전히 state나 context가 변할 때 다시 렌더링됩니다.
> 이 메서드는 오직 **[성능 최적화](https://ko.reactjs.org/docs/optimizing-performance.html)**를 위하여 사용됩니다. 렌더링을 “방지”하기 위하여 사용하지 마세요. 버그를 만들 수 있습니다. (공식문서)

**React.memo를 사용해야하는 경우**

1. Pure Functional Component에서
2. Rendering이 자주일어날 경우
3. re-rendering이 되는 동안에도 계속 같은 props값이 전달될 경우
4. UI element의 양이 많은 컴포넌트의 경우

[https://alexsidorenko.com/blog/react-render-always-rerenders/](https://alexsidorenko.com/blog/react-render-always-rerenders/)

[https://alexsidorenko.com/blog/react-list-rerender/](https://alexsidorenko.com/blog/react-list-rerender/)

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const add = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);
  return (
    <>
      <Child add={add} />
    </>
  );
}

const Child = React.memo(function Child({ add }) {
  return <button onClick={add}>Click Me!</button>;
});
```

출처:

[https://www.youtube.com/watch?v=e-CnI8Q5RY4&list=PLZ5oZ2KmQEYjwhSxjB_74PoU6pmFzgVMO&index=6](https://www.youtube.com/watch?v=e-CnI8Q5RY4&list=PLZ5oZ2KmQEYjwhSxjB_74PoU6pmFzgVMO&index=6)

[https://velog.io/@yejinh/useCallback과-React.Memo을-통한-렌더링-최적화](https://velog.io/@yejinh/useCallback%EA%B3%BC-React.Memo%EC%9D%84-%ED%86%B5%ED%95%9C-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94)

[https://github.com/codesquad-members-2022/fe-vm/pull/6#issuecomment-1124000679](https://github.com/codesquad-members-2022/fe-vm/pull/6#issuecomment-1124000679)

[https://student513.tistory.com/76](https://student513.tistory.com/76)

[https://www.daleseo.com/react-hooks-use-memo/](https://www.daleseo.com/react-hooks-use-memo/)

[https://dmitripavlutin.com/dont-overuse-react-usecallback/](https://dmitripavlutin.com/dont-overuse-react-usecallback/)
