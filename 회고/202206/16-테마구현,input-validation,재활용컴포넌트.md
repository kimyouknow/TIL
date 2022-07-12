# 20220616

<details>
<summary>시간대별 정리</summary>

### 아침

pr구경

- react 컴포넌트 타입들
- svg 컴포넌트
- 테마 구현

### 오전

- pr 반영
- 컴포넌트 설계

### 오후

- global styles 설정
- form, input validation 로직 고민

### 저녁

- 버튼 컴포넌트 재사용 가능하게 만들어보기
- input validation 로직

</details>
<br>

# 코드스쿼드

### 테마구현

코드스쿼드 미션하면서 디자인에 신경을 많이 안썼는데 이번 프로젝트에서는 디자인도 어느 정도 신경써보고 싶다.

styled-component를 활용해 theme을 global로 구성했다. 이미 다른 분들이 프로젝트을 진행하면서 다양한 방식으로 구현해둔 걸 참고해서 어렵지 않게 구성할 수 있었다.

### form input validation

이전에 썼던 react-hooks-form라이브러리가 아닌 직접 커스텀으로 구현해봤다. geon이 이전에 작성해둔 useform hooks가 있어 이번 프로젝트에 적용하기로 했다.

코드에서 아쉬운 부분은 다음과 같다.

- 모든 input을 한 번에 처리하는 점 → input마다 handle change함수를 만들면 좋을 것 같다. 혹은 useCallback으로 감싸면 되지 않을까
- input태그에 validate로직이 있어 관심사가 분리되지 않았다. → 레이아웃, 디자인, 로직이 분리되었으면 한다.

### 재활용 가능한 버튼 컴포넌트

버튼을 재활용 가능하게 만들 계획이다.

커스텀 스타일 범위를 먼저 고려해야겠다. 이번 프로젝트에서 사용할 목적으로 피그마에 있는 디자인에 따른 컴포넌트만 만들 생각이다.
