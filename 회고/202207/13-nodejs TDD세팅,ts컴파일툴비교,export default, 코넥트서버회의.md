# 20220713

<details>
<summary>시간대별 정리</summary>

### 오전

gitbook

- babel 정리
- 모듈 정리
- export / export default / import

jest, nodejs, typescript 환경설정

jest module 에러 해결

### 오후

nodejs - jest, typescript,nodemon,babel 세팅 마무리

- babel vs typescrip 컴파일 비교

### 저녁

코넥트

- 회의

</details>
<br>

# 개인공부

### nodejs TDD세팅 - typescript babel nodemon alias jest

typescript, babel, nodemon, jest, alias를 이용한 nodesj서버 TDD환경설정을 했다.

[설치과정 및 툴 비교 정리](https://kimyouknow.gitbook.io/til/js/node-js/nodejs-jest-typescript-nodemon-babel)

- `jest환경설정`과 `개발환경설정`을 따로 신경써야한다.
- typescript와 es최신문법을 어떻게 트랜스파일(컴파일?)할 것인지 차이점을 알아야 한다.

결론적으로 babel을 사용하기보다 ts-node와 ts-jest를 사용했다.

**via Babel vs via ts-node**

어제 학습한 내용을 토대로 1번방법과 2번 방법을 비교해보면서 설치 과정을 정리해봤다.

**1번: 바벨로 ts 및 es6컴파일**

개발환경: @babel/node + @babel/cli + @babel/core + @babel/preset-typescript + babel-plugin-module-resolver

테스트환경: babel-jest

**✅ 2번: ts-node로 ts 및 es6컴파일**

개발환경: ts-node

테스트환경: ts-jest + @types/jest

### export default vs export

[자바스크립트 모듈과 export / import 정리](https://kimyouknow.gitbook.io/til/js/undefined/export-import)

export / import에 관한 내용을 학습하다가 export default를 사용하지 말아야하는 이유에 대한 글을 많이 볼 수 있었다. 내가 몇몇 블로그를 읽고 공감하는 부분은 다음과 같다.

- \***\*리팩토링이 어렵다: `default export`**는 가져다 쓰는 곳에서 네이밍을 바꿔서 쓸 수 있다.
- \***\*클래스나 함수가 아니면 한줄이 더 필요하다.\*\***
- **트리쉐이킹:** `default export`는 여러 개의 변수(함수)를 하나의 object로 모아서 내보기 때문에 import하는 곳에서 사용하지 않은 코드까지 번들링된다.

하지만 airbnb 컨벤션을 살펴보면 `prefer-default-export`과 같은 내보내는 코드가 하나라면 export default를 권장하는 규칙이 있는 것을 알 수 있다.

아래 이슈를 확인하면 `What is the benefit of prefer-default-export?` 이라는 질문에 대한 많은 논의가 있었음을 알 수 있다.

우선 차이만 인지하고 적절하게 사용해보자.

# 코넥트

저번주부터 호은씨와 코넥트 프론트를 다시 시작했다. 우선 프론트 할 일을 정리했었다. 프론트의 할 일 정리는 어느 정도 마무리가 되었다.

코드스쿼드를 하면서 학습한 내용들을 코넥트에도 적용하기 위해 백엔드분들과 아래 주제들을 가지고 이야기를 나눠봤다.

### 배포

현재 spring 빌드를 할 때 gradle로 react를 빌드해서 프론트서버 없어 한 번에 배포하고 있다. 하지만 찾아보니 `프론트 서버 + api 서버로 + rds`로 배포하는 경우가 많았다. (코드스쿼드 프로젝트할 때 백엔드분들도 이와 같은 방식으로 진행했다) 아직 각 방법의 장단점을 정확히 파악하지 못했지만 코넥트 백엔드분들이 괜찮은 것 같다고하셔서 후자의 방식을 선택했다.

⇒ 추후 배포관련 학습이 필요하다.

### API 명세

이전까지 swagger와 노션을 통해 API명세를 확인했는데 다음과 같은 불편한 점이 있었다.

- 로컬로 spring을 돌려 swagger를 확인해서 백엔드 브랜치를 업데이트하기 전까지 최신화된 swagger를 확인하기 어렵다.
- swagger가 있음에도 API 명세 최신화를 위해 노션에 번거롭게 한 번 더 정리해야한다.

이러한 문제를 해결하기 위해 `mock 서버(혹은 실제서버)를 배포해서 해당 url로 swagger를 확인`하기로 했다.

### OAuth 흐름 및 로그인 유지

OAuth, 일반 로그인 이후 [localhost:3000/callback으로](http://localhost:3000/callback으로) 서버에서 redirect시켜주면 파라미터로 access_token을 받기로 했다. 유저 id와 닉네임같은 경우는 쿠키 혹은 파라미터로 받기로 했다. 유저정보가 필요하면 `GET user/detail/:id`로 요청하기로 했다. 우선 refresh token없이 access token만 사용해서 자동 로그아웃은 없게 하기로 했다.

구체적인 구현은 배포가 완료되면 하기로 했다.

### api CRUD (댓글)

이전까지 `추가/수정/삭제 요청 → 서버에서 바뀐 데이터 값만 전달 → 프론트에서 바뀐 데이터를 골라서 반영` 로직으로 댓글이 작동했다. 하지만 이 방식은 여러 클라이언트에서 동시에 추가/수정/삭제 요청이 일어날 때 특정 클라이언트에서 적절하게 반영하기 어렵다는 단점이 있어서 `추가/수정/삭제 요청 → 서버에서 성공 메세지 받기 (별도의 데이터는 받지 않음) → get요청으로 다시 목록 전체 받기`와 같은 흐름으로 변경하기로 했다.

이렇게해야 특정 클라이언트 브라우저에서 서버 상태를 적절하게 최신화할 수 있다고 생각했다.
