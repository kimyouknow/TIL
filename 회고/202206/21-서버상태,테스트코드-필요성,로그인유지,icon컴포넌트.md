# 20220621

<details>
<summary>시간대별 정리</summary>

### 아침

recoil 학습

- selector

axios with typescript

### 오전

error 타입 with typescript

크롱수업

- 테스트

### 오후

- 커리어 특강
- access token 및 refresh token 공부
- 로그인 구현 블로깅

### 저녁

- icon 컴포넌트 리팩토링

</details>
<br>

# 코드스쿼드

### 상태관리

생각보다 reducer처럼 `로컬에서 처리할 복잡한 흐름은 없다고 생각`한다. 로컬에서만 쓰는 상태면 전역적으로 사용하는 theme, 로그인 등과 같은 정보 외에는 없고, `특정 컴포넌트끼리 함께 사용하는 상태도 수정,삭제 로직보다는 단순히 상태를 공유하는 경우가 많았다.`

이번 미션에서 핵심은 서버 상태를 어떻게 적절하게 받아오느냐에 달렸다고 생각한다.

### 테스트 코드

테스트 코드를 짜야할까? 뭘 테스트해야하지? 라는 궁금증이 있었다. 미션을 진행하면서 기능 구현이나 새로운 기술 적용에 초점을 두었을 때 테스트 코드의 필요성을 느끼지 못했다.

아직까지는 코드를 유지보수한 경험이 없어서 필요성을 못 느꼈을까. `무엇보다 테스트 코드를 만들어도 당장 효과를 느끼기 어려웠다.` 테스트 코드를 잘 만들어둔다면 기능이 추가되거나 수정되었때, 기존에 만들어둔 테스트 케이스를 활용할 수 있다고 생각이 들었다.

단순히 순수함수를 테스트하는 것 뿐만 아니라 UI(mouse, input, keyboard 등등..)를 테스트하는 것에 대해서도 고민해봐야겠다.

### error 핸들링

typescript 4.0부터 try/catch를 사용할 때 error가 unknown타입이 되었다.

axios로 api 에러 핸들링 로직을 다룰 때 적절한 커스텀 타입을 어떻게 지정해야할지 공부하고 있다.

### 로그인 유지 (access token, refresh token)

미뤄왔던 로그인 유지 공부를 차근차근해봤다. access token과 refresh token에 대해서 알아봤고, 토큰들과 만료시간과 같은 정보를 어디에 저장해야하는지 알아봤다.

이전까지는 유저의 정보 (profile image, nickname 등등)을 브라우저에서 저장해야한다고 생각했다. (쿠키, localstroage, session stroage 등등) `token이 있다면 token만 저장해두고, GET user/info와 같은 유저 정보를 요청하는 api를 통해 로그인 기능을 유지하면 될 것 같다.`

**간단한 흐름**

- 클라이언트가 로그인 요청을 보내면 서버는 `Access Token` 및 그보다 `긴 만료 기간을 가진 Refresh Token`을 발급
- `클라이언트는 Access Token이 만료되었을 때 Refresh Token을 사용하여 Access Token의 재발급을 요청`
- 서버는 DB에 저장된 Refresh Token과 비교하여 유효한 경우 새로운 Access Token을 발급하고, 만료된 경우 사용자에게 로그인을 요구합니다.
- 실질적인 인증 정보는 accessToken에 있지만, 일정 시간이 지나면 만료됨
- refreshToken, accessToken을 클라이언트에 저장해둔다. 이때, refreshToken을 이용하면 로그인은 지속적으로 유지할 수 있다. **refreshToken을 서버에 보내면 그때마다 새로운 accessToken을 발급해 돌려주는 것**이다.
- accessToken을 필요할 때 서버에 보내면 **서버는 토큰이 유효한지 확인**한다.

### icon 컴포넌트 오류 해결

webpack-react-typescript 보일러 템플릿을 만들면서 svg icon컴포넌트를 만들면서 type 및 import에러가 발생한 문제를 해결했다.

declare 을 활용해 .svg 확장자에 적절한 커스텀 type을 지정해서 해결했다.

```tsx
// 1번 src/custom.d.ts -> styled컴포넌트 extends 활용하는 용도
declare module '*.svg' {
  import React from 'react';
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

// 2번 src/custom.d.ts -> img태그에 src로 삽입하는 용도
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}
```
