# 20220509

<details>
<summary>시간대별 정리</summary>

### 아침

4월 월간 회고 작성

### 오전

코드스쿼드

- 미션 분석
- cra: manifest.json, reportwebvitals 학습
- eslint,prettier 프로젝트 세팅

### 오후

크롱강의

- react-router-dom 라이브러리

react 상태관리 툴학습 [context api, useReducer, react-redux](https://www.notion.so/context-api-useReducer-react-redux-635311871f1242e497e7a8d2863737d0)

### 저녁

상태에 대한 정리 및 각 상태에 따른 도구들 공부

mock data generater

</details>
<br>

# 코드스쿼드

> 상태란? react에서 상태를 관리하는 기술들

## 상태란?

상태에 대한 정의 및 분류에 대해서 알아보고 react에서 상태를 어떻게 다루는지 공부했다. 간단히 정리하면

`상태관리란?`

- 초기 값을 저장한다.
- 현재 값을 읽을 수 있다.
- 값 업데이트가 가능하다.

`상태란?(상태의 종류)`

**서버상태**

- 원격 서버의 상태

**로컬 상태**

- 전역 상태: 프로젝트 전체에 영향을 주는 상태(theme, modal 등등)
- 지역 상태: 다른 컴포넌트와 공유하지 않은 상태(input, form 등등)
- 컴포넌트 간 상태: 여러 컴포넌트에서 서로 쓰는 상태(전역 상태보다 좁은 범위)

어떻게 보면 프론트엔드는 유저에게 서버의 데이터 상태를 표현하는 역할을 담당한다고 할 수 있다. 화면이 복잡하거나, 여러 가지 기능들이 추가되면 상태를 적절하게 변경하는 로직이 필요하다. 백에서 데이터를 fetch로 받아오고 프론트에서 전역 혹은 지역 상태로 관리해야한다. 혹시나 프론트에서 백 상태를 create/update/delete 한다면 변경된 백 상태를 프론트에도 반영해야한다.

지금까지는 redux를 써서 react-redux와 redux-thunk로 관리했는데 다른 적절한 방법을 고려해야봐야겠다. (코넥트 프로젝트에서 redux가 상태관리뿐만 아니라 fetch요청까지 담당해서 불편한 점이 많았다.) 찾아보니까 react-query, swr등등으로 캐시?해서 서버 상태를 관리하고 프론트 상태는 recoil 같은 사용법이 간단한 라이브러리를 쓰던데 이번 달에 코넥트 프로젝트하면서 해결해야 봐야겠다.

# spa에서 라우팅

history api를 활용해서 라우팅한다. react roueter도 내부적으로는 history ap를 활용한다.

히스토리 stack

- js로 histroy stack을 관리하는 방법
- 요청은 응답에대한 분석 결과인데 클라이언트에서 요청을 해결한다?
- spa에서 ux와 관련된 중요한 사항
- browser의 histroy api

[history api](https://www.notion.so/history-api-60e64433e4f145dfaed94f02fb324667)
