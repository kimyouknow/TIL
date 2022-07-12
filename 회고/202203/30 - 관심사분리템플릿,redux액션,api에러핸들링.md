# 30 - 관심사분리템플릿,redux액션,api에러핸들링

## 코드스쿼드

---

> 나만의 vanilla 템플릿 만들기

- 컴포넌트마다 store를 둬서 관리하기, `store와 view는 서로를 모르게 만들기`
- view에서는 store의 state에 직접 접근할 수 없게 하기 (private으로 관리하기)
- store와 view는 서로를 모르게 하기 위해 connectInterface 객체를 만들어서 `view와 store가 서로 직접 접근할 수 없게 만들기.`

템플릿 코드: [https://github.com/kimyouknow/soc-template](https://github.com/kimyouknow/soc-template)

## 코넥트

---

이전엔 redux액션에 두 가지 기능이 있었다.

- 서버에 api요청
- redux store의 상태 변경 trigger

위와 같이 하나의 action에 두 가지 기능있을 때, 다음과 같은 문제점이 있었다.

- 에러처리: global한 에러처리가 불가능
- 액션마다 예외처리를 해야함

그래서 다음과 같이 두 개의 action으로 기능을 나눠봤다.

- 순수 action: api action이 올바른 상태코드와 함께 완료되면 해당 값으로 redux store의 상태 변경 트리거
- api action: 이벤트가 트리거 되면 호출됨, 성공 혹은 실패 상태코드를 받음.

### 아쉬운점

1. 통합적으로 에러 핸들링하기

- 만들어둔 axios instance의 intercepter에서 response를 받기 전에 에러 핸들링을 한다면 api action마다 에러 핸들링 로직을 만들지 않고 한 곳에서 처리할 수 있을 것 같았다.
- redux의 store.dispatch는 react 컴포넌트 안에서만 사용하고 있고, axios instance를 생성하는 부분은 컴포넌트 바깥에 있기 때문에 dispatch를 사용한 에러 모달 띄우기가 안 됨

1. 댓글, 유저, 팀 로직 반복

- 유저와 팀 사이 비슷한 로직이 많아 코드가 상당히 반복적이다.

## 코드 스쿼드 구글 시트

---

vanilla js로 store와 view를 나누는 템플릿을 고민해보았다. 그룹 리뷰 시간에 내가 고민한 부분을 조원들이랑 나누는데 용어를 서로 약간씩 다르게 이해해 전달하는데 어려움이 있었다. 예를 들어, 내 코드에서는 view가 HtmlElement라는 이름으로 쓰이고 있고, model의 역할 중 데이터를 저장하는 부분을 store가 맡고 있다. 둘 사이를 연결하면서 데이터를 바인딩하는 로직을 connectInterface 객체를 통해서 구현했다. 이벤트 핸들러도 따로 있다.

내가 고민한 템플릿뿐만 아니라 `관심사를 나눈다`⁠를 구현한 여러 아키텍처( mvc, mvvm, mvp,,, 등등 ) 관련해서 전체적인 흐름은 비슷해도 디테일한 로직과 역할이 조금씩 달라서 다른 사람 의견을 듣거나 내 의견을 전달하기 어려운 것 같다.
