# 20220627

<details>
<summary>시간대별 정리</summary>

### 아침

저번주 주간회고

### 오전

popup(dropdown모달)만들기

### 오후

크롱 수업

- 좋은 개발자란?

### 저녁

oauth 예제 만들기

</details>
<br>

# 코드스쿼드

### popup(dropdown모달)만들기

- 데이터 fetching 로직분리

### OAuth 예제 만들기

> 로딩 UI 관점으로

## 의견1: **서버에서 모든 처리를 하는 OAuth흐름**

github에 등록한 callback url(`백url/api/auth/github`)을 서버 api로 함.

- 흐름
  1. github 세팅에 `redirect_url: 백url/api/auth/github`으로 등록한다.
  2. 사용자가 로그인 페이지에 접속
  3. 사용자가 github로 로그인 버튼 클릭
  4. 프론트에서 백으로 `GET: /oauth/github/login` 요청하면 응답값으로 `https://github.com/login/oauth/authorize?client_id`을 받는다.
  5. 프론트에서 응답받은 `https://github.com/login/oauth/authorize?client_id`으로 이동시킨다.
  6. 이동한 페이지에서 사용자가 동의하면 등록한 callback으로`GET: /oauth/github/callback?code={code}` 요청한다.
  7. 백에서 해당 code를 가지고 `POST: [https://github.com/login/oauth/access_token](https://github.com/login/oauth/access_token)` 요청해서 `access_token`을 받는다.
  8. 백에서 `access_token`을 가지고 `GET: [https://api.github.com/user`으로](https://api.github.com/user으로) 요청해서 유저 정보를 가져온다.
  9. 유저 정보를 DB에 저장하고, jwt 토큰을 생성한다.
  10. 현재 브라우저는 외부페이지이므로 [`localhost](http://localhost):3000`으로 돌리기 위해 redirect를 활용해 [`localhost](http://localhost):3000/callback`으로 이동한다.
  11. [`localhost:3000](http://localhost:3000)/callback` 에서 6번 요청에 대한 응답을 받아서 잘 받았으면 home으로 이동하고, 에러가 발생하면 login페이지로 이동한다.

⚠️ 에러1 : github에 등록한 callback url( **[`oauth/github/callback`](http://43.200.37.159/swagger-ui/index.html#/login-controller/receiveCallback)** )에 대한 응답인 토큰을 클라이언트 측에서 받을 수 없다.

⚠️ 에러2: 클라이언트로 redirect할 때 token을 넘겨받는 방법

- cookie: cors문제로 인해 network header에는 보이지만 브라우저에는 저장이 안 됨.
- body: redirect으로 같이 넘어온 데이터를 받을 방법이 없다.

## ✅ 의견2 : **클라이언트에서 Callback을 처리 OAuth흐름**

github에 등록한 callback url을 브라우저 url로 했다.

이후 access token과 refresh token을 body로 받는다.

- 흐름
  [localhost:3000](http://localhost:3000) (브라우저 창 - 프론트)
  1. github 세팅에 `redirect_url: [localhost:3000](http://localhost:3000)/callback`으로 등록한다.
  2. 사용자가 로그인 페이지에 접속
  3. 사용자가 github로 로그인 버튼 클릭
  4. 프론트에서 백으로 `GET: /oauth/github/login` 요청하면 응답값으로 `https://github.com/login/oauth/authorize?client_id`을 받는다.
  5. 프론트에서 응답받은 `https://github.com/login/oauth/authorize?client_id`으로 이동시키고 code값을 받는다.
  6. 응답받은 code값으로 백으로 `GET: /oauth/github/callback?code={code}` 요청
  7. 백에서 해당 code를 가지고 `POST: [https://github.com/login/oauth/access_token](https://github.com/login/oauth/access_token)` 요청해서 `access_token`을 받는다.
  8. 백에서 `access_token`을 가지고 `GET: [https://api.github.com/user`으로](https://api.github.com/user으로) 요청해서 유저 정보를 가져온다.
  9. 유저 정보를 DB에 저장하고, jwt 토큰을 생성한다.
  10. body에 access token, refresh token을 담아서 6번 요청에 응답한다.
  11. [`localhost:3000](http://localhost:3000)/callback` 에서 6번 요청에 대한 응답을 받아서 잘 받았으면 home으로 이동하고, 에러가 발생하면 login페이지로 이동한다.

### 좋은 개발자란?

- 모든 조건을 만족
- 함께 일하고 싶은 사람?
