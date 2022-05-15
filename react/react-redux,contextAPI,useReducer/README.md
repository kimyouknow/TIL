> [React Hooks가 Redux를 대체할 수 있냐고 물어보지 마세요](https://delivan.dev/react/stop-asking-if-react-hooks-replace-redux-kr/), [[번역] React Hooks가 Redux를 대체할 수 있냐고 물어보지 마세요](https://delivan.dev/react/stop-asking-if-react-hooks-replace-redux-kr/) 두 글의 내용을 요약했습니다.

# React Hooks가 Redux를 대체할 수 있냐고 물어보지 마세요. (context api, useReducer, react-redux)

### 요약

`hooks와 redux는 서로 다른 문제를 해결하기 위해 필요한 기술이다.`

### 기술별 해결하려는 문제들

- **`Context`**:
  - Passing down a value to nested components **without prop-drilling**
- **`useReducer`**
  - Moderately complex React component **state management** using a reducer function
- **`Context` + `useReducer`**:
  - Moderately complex React component **state management** using a reducer function, *and* passing that state value down to nested components **without prop-drilling**
- **`Redux`**
  - Moderate to highly complex state management using reducer functions
  - Traceability for when, why, and how state changed over time
  - Wanting to write your state management logic completely separate from the UI layer
  - Sharing state management logic between different UI layers
  - Using the power of Redux middleware to add additional logic when actions are dispatched
  - Being able to persist portions of the Redux state
  - Enabling bug reports that can be replayed by developers
  - Faster debugging of logic and UI while in development
- **`Redux` + `React-Redux`**
  - All of the use cases for Redux, plus interacting with the Redux store in your React components

### 추천 사항

- 단순 prop-drilling 을 피하는 것이 목적이라면 Context 를 사용해라
- 적당히 복잡한 컴포넌트가 있거나 외부 라이브러리를 사용하고 싶지 않다면 Context + useReducer 를 사용해라
- 특정 구성 요소만 re-render 시키거나, 사이드이펙트를 줄이기 위해 더 강력한 기능이 필요하다면 Redux + React-Redux 를 사용해라

## 1. 목적 및 사례를 고려해보자.

### 1-1. useState와 useReducer

컴포넌트의 상태를 관리하는 방법일 뿐이며, 클래스 컴포넌트에서 사용하는 `this.state`와 `this.setState`와 똑같이 동작한다. 위 메소드들로도 여전히 props를 내려줘야 한다.

### 1-2. Context API

공식문서에 따르면, `자주 변경되는 것들은 context API로 관리하지 말라고한다.` 애초에 상태관리를 목적으로 만들어진 기능이 아니다. `Context Tree`는 컨텍스트 안에 포함된 모든 레벨에서 명시적으로 prop 을 전달하지 않고, 어디서든 상태값에 접근 할 수 있는 방법을 제공한다.

Context API 는 `단지 전달되는 값을 결정`할뿐 아무것도 관리하지 않는다. 상태관리는 일반적으로 `useState`와 `useReducer`를 통해 일어난다.

### 1-3. Redux란

상태관리 라이브러리의 한 종류 [Redux 정리](https://www.notion.so/Redux-90f2baf8109e4b51af74592edcd68102)

Redux 자체는 ui 에 구애받지 않는다. React, Vue, vanilla JS 등과 함께 사용 가능

**React-Redux**

- Redux 에서 상태 값을 읽고 action 을 React 컴포넌트에게 전달하여 Redux 저장소와 상호 작용 할 수 있도록 도와주는 UI 바인딩 레이어
- React-Redux 내부에서 Context 를 사용
- 현재의 상태값이 아닌 Context 를 통해 Redux 저장소 인스턴스만 전달

## 2. Context API + useReducer vs Redux

### 2-1. **비슷한 점**

- 값의 저장
- reducer 함수
- action 전달
- 값을 전달하고 컴포넌트에서 읽는 방법

### 2-2. **다른 점**

- Context + useReducer 는 Context 를 통해 `현재 상태 값을 전달하는데 의존`한다. React-Redux 는 Context 를 통해 현재 `Redux 스토어 인스턴스를 전달`한다.
- useReducer 의 경우 `새로운 상태 값을 생성 할 때` 해당 Context 내부에 포함된 컴포넌트들은 상태값의 일부에만 관심이 있더라도 `전부 강제로 re-render` 되기 때문에 성능 문제가 발생 할 수 있다. React-Redux 를 사용하면 저장소 상태의 특정 부분만 사용하고 `해당 값이 변경 될 때만 re-render` 할 수 있다.
- Context + useReducer 는 React 의 기능이기 때문에 React 외부에서는 사용이 불가하다. Redux 는 UI 독립적이기 때문에 React 와 별도로 사용이 가능하다.
- React DevTools 를 사용하면 현재의 상태 값은 볼 수 있지만 전달된 action, 과 payload, 처리 된 후의 상태등 시간에 따른 변화를 볼 수 없다. Redux Devtools 을 이용하면 시간에 따른 상태 차이를 볼 수 있다.
- useReducer 는 미들웨어가 없다.

### 출처

- [https://blog.isquaredsoftware.com/2021/01/context-redux-differences/](https://blog.isquaredsoftware.com/2021/01/context-redux-differences/)
- Context API
  - [https://dev-yakuza.posstree.com/ko/react/context-api/](https://dev-yakuza.posstree.com/ko/react/context-api/)
  - [https://ko.reactjs.org/docs/context.html](https://ko.reactjs.org/docs/context.html)
  - [Context API 를 사용한 전역 값 관리](https://react.vlpt.us/basic/22-context-dispatch.html)
  - [react context api 개념 & 예시](https://kyounghwan01.github.io/blog/React/react-context-api/#모달-만들기-예제)
- Context API + useReducer
  - \***\*[react hooks에서 useContext(context API), useReducer로 상태관리 하기](https://jcon.tistory.com/176)\*\***
- hooks와 redux 비교
  - [Context API vs Redux 😇 닭잡는데 소잡는 칼 쓰지말자](https://olaf-go.medium.com/context-api-vs-redux-e8a53df99b8)
  - [[번역] React Hooks가 Redux를 대체할 수 있냐고 물어보지 마세요](https://delivan.dev/react/stop-asking-if-react-hooks-replace-redux-kr/)
