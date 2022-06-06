# 20220517

<details>
<summary>시간대별 정리</summary>

### 아침

### 오전

context 분리

### 오후

context분리하면서 생긴문제

product요청이면서 유저도 변경해야함

⇒ api대로 store를 만들어야한다고 생각했는데 그렇게 하지 않는 것으로 해결

- products는 계속 get요청만하고
- 유저가 주문하고 dispatch로 getProducts요청함

api를 어떻게 모아둘까?

- 1번: 사용하는 주체별로
- 2번: path기준으로

### 저녁

기술 구현 마무리

protected router vs privated router

[https://cotak.tistory.com/108](https://cotak.tistory.com/108)

</details>
<br>

# 코드스쿼드

> context(store)분리, api와 store관리

### context(store)분리

context api의 provider를 전역적으로 사용하다보니 context에서 뿌려주는 state를 안쓰는 컴포넌트도 특정 state가 변하면 다시 리렌더링되는 이슈가 발생하였다. 그래서 store를 유저, 상품 등등 특징별로 나눠서 사용하는 컴포넌트를 묶어서 관리했다.

아직 context api가 어떻게 props를 비교해서 컴포넌트를 다시 렌더링하는지 정확히 알지 못했지만, react dev-tool을 이용해 언제 리렌더링되는지 확인하면서 코딩하고 있다.

[https://stackoverflow.com/questions/65638750/react-context-provider-all-children-re-rendering](https://stackoverflow.com/questions/65638750/react-context-provider-all-children-re-rendering)

### api와 store관리

`PATCH /product/:id/add` 여서 매니저가 특정 상품을 증가시키는 로직이 있고, `PATCH /product/:id/order`라고 유저가 특정 상품을 주문하는 로직이 있다.

이 때, api폴더를 구분할 때, user가 하는 행동이니까 `src/api/user`에 두어야할까, 아니면 `src/api/product`에 두어야할까?

우선은 url기준이 아니라 사용자 중심으로 폴더를 구분하기는 했다.
