# 20220518

<details>
<summary>시간대별 정리</summary>

### 아침

느낌표 두개 연산자는 null이나 undefined 값을 false로 변환할 때 사용할 수가 있습니다. 가끔 null이나 undefined 때문에 자바스크립트 코드를 짜다가 애를 먹는 경우가 있는데, 그런 경우에 무척 요긴하게 사용할 수 있는 연산자인 것 같네요.

protecting route

### 오전

액션 로그

로그인할 때만 사용가능하게

action과 axios요청 분리

### 오후

pr정리
미션 문서정리(stroy, figma, api설계)

### 저녁

비동기요청

</details>
<br>

# 코드스쿼드

> redux-action과 비동기 요청 분리, protected router, 문서정리

## redux-ation에서 비동기 요청 로직 분리

`Context+useReducer 조합은 클라이언트에서 사용하는 로컬 상태를 관리`하는데 목적이 있고, `데이터를 요청하는 작업은 별도의 함수로 분리`하는게 좋다고 생각이 들었다.

그래서 1번과 같은 방법으로 api요청을 action 함수에 포함시켰다가 2번처럼 별도로 분리했다. 분리하면서 느낀 장점은 다음과 같습니다!

- 비동기 요청이후 에러 핸들링을 분리할 수 있다.
- context가 순수해졌다.
  - 클라이언트 상태 관리 목적에 부합
  - 서버에 데이터 요청을 하는 로직을 context에서 분리할 수 있었음.
  - 서버에서 받은 데이터 요청이 여러 store의 변화를 일으킬 때 처리하기가 용이해졌다.

1. action에 같이 넣기

```jsx
// action
const someAction = async (dispatch, opt) => {
  const response = await someAxiosInstance(opt);
  // error처리를 어떻게 할까?
  dispatch({ type, payload: response });
};

// component
const Component = () => {
  const fetcher = async () => {
    someAction(dispatch, opt);
  };
  //..
  return <Child />;
};
```

2. action에서 fetch요청분리

```jsx
// action
const someAction = async (dispatch, responseData) => {
  dispatch({ type, payload: responseData });
};

// component
const Component = () => {
  const fetcher = async () => {
    try {
      const response = await someAxiosInstance(opt);
      someAction(dispatch, response);
    } catch (error) {
      // error 처리
    }
  };
  //..
  return <Child />;
};
```

## protected router

이전엔 hoc/auth로 auth 컴포넌트 내부에서 다음과 같이 일반, 로그인, 어드민 유저를 if문으로 관리했는데

이번엔 hoc/protectedRouter hoc/adminRouter와 같이 필요한 상태에 따라 별도의 라우터를 만들어서 관리했다.

## 문서정리

혼자 하는 사이드 프로젝트이지만 문서관리를 제대로 해봤다.

**장점**

- 머리 속에 있는 로직을 문서로 작성해 코드를 짤 때 기준이 생겨서 타이핑하는 시간이 줄어들었다. (변수명, 폴더구조, 등등 structure가 존재)
- 흐름을 가시적으로 볼 수 있어 할 일 관리, 지금 작업 상태를 파악하기 편했다.

**단점**

- 문서 정리를 하는데 오래걸린다.
- 처음 보일러 템플릿이 없다보니 어떤 양식으로 문서를 작성해야하는지 고민하는데 오래걸렸다.
- 코드를 짜다보면 수정사항이 생기는데 수정사항이 생길 때마다 문서에 반영하기 번거롭다.
