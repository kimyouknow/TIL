# useState 자주할 수 있는 실수 및 useEffect 동작 이해하기

[발표자료](https://codesandbox.io/s/balpyojaryo-4r43vl)

# 요약

useState, useEffect를 이해하기 위해선 `함수형 컴포넌트가 렌더링되는 흐름`과 `언제 리렌더링되는지`를 반드시 먼저 이해야한다!

# 들어가기 전에 꼭! 이해해야하는 부분들

## 1. 함수형 컴포넌트에서 렌더링

함수형 컴포넌트는 함수!

함수형 컴포넌트가 렌더링되는 다는 것은 해당 함수가 호출된다는 뜻. 호출될 때 모든 내부 변수는 초기화됨.

```jsx
function Component() {
  const something = getSomething();
  return <div>{something}</div>;
}
```

**흐름: 컴포넌트 호출 → 모든 내부 변수 초기화 → 렌더링**

## 2. React는 언제 리렌더링할까? (shallow compare)

1. state 변경이 있을 때
2. 부모 컴포넌트가 렌더링 될 때
3. 새로운 props이 들어올 때
4. shouldComponentUpdate에서 true가 반환될 때
5. forceUpdate가 실행될 때

`1번과 2번의 경우 얕은 비교를 통해 새로운 값인지 아닌지 판단` → 객체, 배열, 함수와 같은 참조타입은 실제 내부 값이 아닌 동일참조여부에 따라 판단한다.

⇒ state에 push, pop 등등 원본을 변형하는 메소드를 사용하면 안되는 이유(`state는 immutable하기 사용하자`)

따라서, React는 객체, 배열, 함수일 경우 컴포넌트가 다시 호출되면서 새로운 props가 생성될 때 새로운 참조타입으로 형성되기 때문에 새로운 값이라고 판단한다.

### 3. 모든 렌더링은 고유의 Prop과 state, \***\*이벤트 핸들러를 가진다.\*\***

> 출처: [https://www.rinae.dev/posts/a-complete-guide-to-useeffect-ko#모든-랜더링은-고유의-prop과-state가-있다](https://www.rinae.dev/posts/a-complete-guide-to-useeffect-ko#%EB%AA%A8%EB%93%A0-%EB%9E%9C%EB%8D%94%EB%A7%81%EC%9D%80-%EA%B3%A0%EC%9C%A0%EC%9D%98-prop%EA%B3%BC-state%EA%B0%80-%EC%9E%88%EB%8B%A4) : 아래 예시는 코드는 해당 글에서 나온 예제를 복사했어요. 자세한 내용은 해당 글을 참고하세요.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

**state를 업데이트할 때마다, 리액트는 컴포넌트를 호출한다. 매 랜더 결과물은 고유의 `counter` 상태 값을 보고 있다. 그리고 이 값(count)은 함수 안에 *`상수`로* 존재하는 값.**

```jsx
// 처음 랜더링 시
function Counter() {
  const count = 0; // useState() 로부터 리턴
  // ...
  <p>You clicked {count} times</p>;
  // ...
}
// 클릭하면 함수가 다시 호출된다
function Counter() {
  const count = 1; // useState() 로부터 리턴
  // ...
  <p>You clicked {count} times</p>;
  // ...
}
// 또 한번 클릭하면, 다시 함수가 호출된다
function Counter() {
  const count = 2; // useState() 로부터 리턴
  // ...
  <p>You clicked {count} times</p>;
  // ...
}
```

**‼️ 주의 사항**

특정 랜더링 시 그 안에 있는 `count` 상수는 시간이 지난다고 바뀌는 것이 아님!

컴포넌트가 다시 호출되고, 각각의 랜더링마다 격리된 고유의 `count` 값을 “보는” 것.  `count`  값은 매번 별개의 함수 호출마다 존재하는 상수값이다.

**‼️ 결론**

**함수는 여러번 호출되지만(랜더링마다 한 번씩), 각각의 랜더링에서 함수 안의 `count` 값은 상수이자 독립적인 값(특정 랜더링 시의 상태)으로 존재한다.**

# useState쓰면서 자주 할 수 있는 실수들

### 1. useState 비동기적?

`각 렌더링마다 고유의 state, props, 이벤트 핸들러가 있다!`만 이해하면 된다.

### 2. 동시에 여러가지 setState실행

> [https://immigration9.github.io/react/2021/06/12/automatic-batching-react.html](https://immigration9.github.io/react/2021/06/12/automatic-batching-react.html) : 자세한 내용은 해당 글(출처)을 참고하세요.

React가 더 나은 성능을 위해 `여러 개의 state 업데이트를 하나의 리렌더링 (re-render)로 묶는 것`을 의미한다.

이 과정은 `불필요한 리렌더링을 줄이기 때문에 성능에 굉장히 좋다.` 또한, 컴포넌트가 “반만 완료된” state를 렌더링하는 것을 방지한다. (이 것 또한 버그를 발생시킬 수 있다). 레스토랑 웨이터에 비유를 하면 더 쉽게 와닿을 수 있는데, 주문을 할 때 하나 고를 때마다 주방으로 달려가지 않고, 오더를 완성시킬 때까지 대기하는 것과 같다

### 3. 불변으로 관리

`javascript 참조 타입`

hooks dependency, 상태관리 등등 고려해야할 부분이 많은데 저는 계속 실수하는 부분이었습니다.

```jsx
// pass by reference
const 객체1 = { a: 1 };
const 객체2 = { a: 1 };
console.log(객체1 === 객체2); // false
console.log(객체1.a === 객체2.a);
true;
```

# useEffect 이해하기

요약: `useEffect`는 하나의 함수가 라이프사이클 3개의 역할을 하는 것은 맞지만(`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`)을 한다고 하는 것보다 단순히 **렌더링 후 `사이드 이펙트`를 실행하는 방법으로만 생각하는 것이 더 유용할 수 있다**.컴포넌트가 랜더링 안에 있는 **모든** 함수는 (이벤트 핸들러, 이펙트, 타임아웃이나 그 안에서 호출되는 API 등) 랜더가 호출될 때 정의된 props와 state 값을 잡아둔다.

⇒ **렌더링** 이후에 side effect를 실행하는 로직이라고 이해하고 있어요

```tsx
function Component() {
  const something = getSomething(); // 1번

  useEffect(() => {
    // effect -> // 3번
  }, []);

  return <div>{something}</div>; // 2번
}
```

### 1. side effect

- 함수가 실행되면서 함수 외부에 존재하는 값이나 상태를 변경시키는 행위
- 데이터 fetch, 타이머, 등등
- 함수형 컴포넌트 본문에 있으면 버그 및 UI 불일치를 야기할 수 있음.

⇒ `작은 프로그램을 개발할 때는 문제가 없겠지만, 다양한 개발자들이 대규모 프로그램을 협업 개발할 때 실행상태를 예측하기 힘들게 합니다.`

⇒ 무거운 작업을 수행하는 코드였다면, 컴포넌트가 렌더링 될 때마다 프로그램을 지연시키게 될 것

### 2. React는 effect가 수행되는 시점에 이미 DOM이 업데이트되었음을 보장

리액트는 [브라우저가 페인트 하고 난 뒤에야](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f) 이펙트를 실행한다. 이렇게 하여 대부분의 이펙트가 스크린 업데이트를 가로막지 않기 때문에 앱을 빠르게 만들어 준다. 마찬가지로 이펙트의 클린업도 미뤄집니다. **이전 이펙트는 새 prop과 함께 리랜더링 되고 난 *뒤에* 클린업된다.**

이와 같이 React가 DOM을 업데이트한 뒤 추가로 코드를 실행해야 하는 경우가 있다. 네트워크 리퀘스트, DOM 수동 조작, 로깅 등은 `정리(clean-up)가 필요 없는 경우`다. 반면, 외부 데이터에 **구독(subscription)을 설정해야 하는 경우 메모리 누수가 발생하지 않도록 `정리(clean-up)를 해야한다.`**

### 3. clean up이란?

클린업의 목적은 구독과 같은 `이펙트를 “되돌리는”` 것이다.

React는 컴포넌트가 마운트 해제되는 때에 정리(clean-up)를 실행한디. 이 때 effect가 한번이 아니라 `렌더링이 실행될 때마다 실행`된다. React가 `다음 차례의 effect를 실행하기 전에 이전의 렌더링에서 파생된 effect를 정리하는 이유`가 바로 이 때문이다.

아래 예시를 보자.

```tsx
function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // effect 이후에 어떻게 정리(clean-up)할 것인지 표시합니다.
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

- 위의 코드 동작흐름
  prop이 `{id: 20}` 으로 바뀌고 나서도 이전 이펙트의 클린업이 여전히 예전 값인 `{id: 10}`
   을 “본다”.
  - 리액트가 `{id: 20}` 을 가지고 UI를 랜더링한다.
  - 브라우저가 실제 그리기를 한다. 화면 상에서 `{id: 20}` 이 반영된 UI를 볼 수 있다.
  - 리액트는 `{id: 10}` 에 대한 이펙트를 클린업한다.
  - 리액트가 `{id: 20}` 에 대한 이펙트를 실행한다
- 더 구체적인 흐름

  > `useEffect`가 *기본적으로* 업데이트를 다루기 때문에 더는 업데이트를 위한 특별한 코드가 필요 없습니다. 다음의 effect를 적용하기 전에 이전의 effect는 정리(clean-up)합니다. 구독과 구독 해지 호출을 반복해서 만들어내는 컴포넌트를 통해 이를 가시화해봅시다. ([공식문서](https://ko.reactjs.org/docs/hooks-effect.html#explanation-why-effects-run-on-each-update))

  ```tsx
  // { friend: { id: 100 } } state을 사용하여 마운트합니다.
  ChatAPI.subscribeToFriendStatus(100, handleStatusChange); // 첫번째 effect가 작동합니다.

  // { friend: { id: 200 } } state로 업데이트합니다.
  ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // 이전의 effect를 정리(clean-up)합니다.
  ChatAPI.subscribeToFriendStatus(200, handleStatusChange); // 다음 effect가 작동합니다.

  // { friend: { id: 300 } } state로 업데이트합니다.
  ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // 이전의 effect를 정리(clean-up)합니다.
  ChatAPI.subscribeToFriendStatus(300, handleStatusChange); // 다음 effect가 작동합니다.

  // 마운트를 해제합니다.
  ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // 마지막 effect를 정리(clean-up)합니다.
  ```

위의 동작흐름을 예상하기 어렵지만 앞서 설명한 3번, `컴포넌트가 랜더링 안에 있는 **모든** 함수는 (이벤트 핸들러, 이펙트, 타임아웃이나 그 안에서 호출되는 API 등) 랜더가 호출될 때 정의된 props와 state 값을 잡아둔다` 설명을 기억하면 이해할 수 있다.

⇒ 이펙트의 클린업은 “최신” prop을 읽지 않고, 클린업이 정의된 시점의 랜더링에 있던 값을 읽는 것이다!

**참고자료**
[https://www.rinae.dev/posts/a-complete-guide-to-useeffect-ko](https://www.rinae.dev/posts/a-complete-guide-to-useeffect-ko#%EB%AA%A8%EB%93%A0-%EB%9E%9C%EB%8D%94%EB%A7%81%EC%9D%80-%EA%B3%A0%EC%9C%A0%EC%9D%98-prop%EA%B3%BC-state%EA%B0%80-%EC%9E%88%EB%8B%A4)
[https://ko.reactjs.org/docs/hooks-effect.html](https://ko.reactjs.org/docs/hooks-effect.html)
[https://dmitripavlutin.com/react-useeffect-explanation/#5-side-effect-cleanup](https://dmitripavlutin.com/react-useeffect-explanation/#5-side-effect-cleanup)
