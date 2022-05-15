# 20220513

<details>
<summary>시간대별 정리</summary>

### 아침

- 미션
  - 재고관리
  - 잔고관리
- hooks
  - useCallback 정리 마무리
  - useReducer vs useState

### 오전

- pr 정리
- 리팩토링
- 기능구현

### 오후

- 그룹 공유 시간
  - react 렌더링 원리 공유

### 저녁

- 코넥트
</details>
<br>

# 코드스쿼드

> react렌더링 원리 및 state,props 상태

# 코넥트

> \***\*Infinite Scroll 구현, 화면 및 요소의 높이구하기\*\***

기존에 있던 useInfinitiScroll의 문제점을 해결하려고 했다.

문제점

- page = 1일 때 데이터(처음 데이터)가 화면에 가득차지 않을 때, page가 무한으로 증가함.

원인

- hooks 내부로직 중 target이 화면 요소 안에 있기 때문에 `isIntersecting`가 true(관찰 대상의 교차 상태)이기 때문.

해결책

- Intetsection api 다시 공부해보기
- 화면안에 Cards의 맨 아래 요소가 포함되어 있으면 추가 로딩 막기
