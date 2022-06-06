# 20220512

### 시간대별 정리

<details>
<summary>시간대별 정리</summary>

### 아침

코넥트: edit api pr요청

pr 구경

### 오전

useReducer + contextApi 리팩토링 + 비동기 요청 로직 알아보기

api 설계

### 오후

useCallback, useMemo, React.memo

useReducer + contextApi를 비동기 요청 로직 분리 및 구조 리팩토링

useState기 있는데 usereduer왜쓰니

### 저녁

msw 로직 설정

</details>
<br>

# 코드스쿼드

> useReducer, 예시 만들어서 비교하기,

### 1. 이론적인 비교뿐만 아니라 예시도 직접 코드로 만들고 비교해보기

그룹리뷰시간에 `useState도 있는데 useReducer를 왜 쓸까? type만 복잡하게 나눈 것 같고, action함수도 여러가지 setState를 만들면 될 것 같은데`라는 의견이 있었다. 나는 관리해야하는 상태가 복잡하고, 데이터 변경 흐름을 확인하거나 테스트를 해야할 경우 useReducer가 편할 것 같다고 말했다. 이전에 redux를 공부해본 경험을 가지고 말하긴 했는데 명쾌한 답이 된 것 같지 않아 useState vs useReducer라는 키워드로 학습을 더 해봤다.

학습한 내용도 기존에 내가 알고 있는 내용과 비슷했지만 왜 나는 명쾌하게 이럴 땐 useState가 좋고 이럴 땐 useReudcer가 편해요!라고 말하지 못했을까? `앞으로 비슷한 기술이 있으면 이론적인 비교도 좋지만 집적 예시를 통해 비교도 해보면 좋을 것 같다.`

### 2. useCallback, useMemo, React.memo 정리

[pr 리뷰어분이 useCallback에 대한 새로운 키워드를 알려주셨다!](https://github.com/codesquad-members-2022/fe-vm/pull/6#issuecomment-1124000679) `useCallback`을 쓴다고 해서 의존성이 바뀌지 않았을 때 무조건 함수가 새로 생성되지 않는게 아니라, 매 렌더마다 함수 생성은 되지만 의존성이 바뀌지 않았다면 새로 생성된 함수를 무시하고 기존 함수를 반환한다고 한다.

또한, hooks 자체가 함수를 새롭게 생성하는게 맞고, 이러한 동작이 퍼포먼스에 그렇게 큰 영향을 주지 않는다고 한다. 오히려 최적화하는 것 자체가 최적화를 하지 않았을 때에 비해 퍼포먼스에 영향을 줄 수 있다고 사용하면 좋은 상황을 정확히 파악하고 사용하는 것이 좋다고 한다.

[useCallback, useMemp, React.memo notion정리](https://www.notion.so/useMemo-useCallback-React-memo-b67785e9189a48d28bf06d39fac90b1f)

### 3. ContextAPI + useReducer + 비동기 요청

상태관리에 대해 학습하고 나니 프론트는 백 데이터의 상태를 적절히 보여줄 수 있어야 한다고 생각했다. 프론트에서 어떻게 상태관리를 하든 백 데이터와 동기화하기 위해선 비동기 요청이 필수라고 생각해 기존에 사용하던 로직 (Context API + useReducer)에 비동기 요청 로직을 추가했다.

단점: 기능을 하나 추가할 때마다 action, type, reducer, mocking 작업 등등 해야할 일이 많아진다. (코드가 길어진다.)
