# 20220621

<details>
<summary>시간대별 정리</summary>

### 아침

회고작성

### 오전

- github oauth 학습 및 구현

### 오후

- 주니어 개발자
- refresh token, access token 학습

### 저녁

- axios interceptor활용
- oauth 구현

</details>
<br>

# 코드스쿼드

### OAuth흐름 이해 및 구현

늘 백엔드에서 일어나는 일이라 제대로 구현해본적이 없는데 이번 기회에 로그인 흐름을 이해하고 싶어 express로 구현해보려고 한다. 구현하기 전 개념 정리를 해봤다.

**구성요소**

| Client               | 서비스 제공자에게 서비스를 제공받는 서버 또는 서비스 (우리가 만든 앱)                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Resource Owner       | 서비스 제공자의 서비스(github, google, kakao)에 가입되어 있어서 개인정보를 소유 중인 사용자, 내가 만든 앱을 사용할 사용자 |
| Resource Server      | Resource Owner의 개인정보를 가지고 있는 서비스 제공자의 서버                                                              |
| Authorization Server | OAuth 2.0 엑세스 토큰을 발급닫기 위한 서비스 제공자의 인증 서버                                                           |

**간단한 흐름**

> 클라이언트에서 사용자가 github로그인 버튼 클릭 → api서버로 요청 → api서버에서 (A)과정을 실행 → github Authorization Server에서(B) 수행 → api서버에서 (C) → github Resource Server에서 (D) 실행 → api 서버에서 우리를 서비스를 위한 access token및 refresh token 생성 → 클라이언트에 전달

```tsx
+--------+                                           +---------------+
  |        |--(A)------- Authorization Grant --------->|               |
  |        |                                           |               |
  |        |<-(B)----------- Access Token -------------|               |
  |        |               & Refresh Token             |               |
  |        |                                           |               |
  |        |                            +----------+   |               |
  |        |--(C)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(D)- Protected Resource --| Resource |   | Authorization |
  | Client |                            |  Server  |   |     Server    |
  |        |--(E)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(F)- Invalid Token Error -|          |   |               |
  |        |                            +----------+   |               |
  |        |                                           |               |
  |        |--(G)----------- Refresh Token ----------->|               |
  |        |                                           |               |
  |        |<-(H)----------- Access Token -------------|               |
  +--------+           & Optional Refresh Token        +---------------+
```

### refresh token 및 access token 공부

클라이언트가 로그인 요청을 보내면 서버는 `Access Token` 및 그보다 `긴 만료 기간을 가진 Refresh Token`을 발급하는 전략.

`클라이언트는 Access Token이 만료되었을 때 Refresh Token을 사용하여 Access Token의 재발급을 요청`

서버는 DB에 저장된 Refresh Token과 비교하여 유효한 경우 새로운 Access Token을 발급하고, 만료된 경우 사용자에게 로그인을 요구

`access token`: 실제 인증에 사용되는 토큰

`refresh token`: access token을 재발급하기 위한 토큰

**refresh token이 나온 이유**

기존에 access token만 있었을 때는, access token이 만료시간이 길다면 탈취돼었을 때 서버에서 아무런 방어적인 행동을 할 수 없고, 만료시간이 짧다면 사용자가 자주 로그인해야하는 번거로움을 야기할 수 있습니다.

따라서, refresh token을 사용하여 서버가 해킹된 토큰에 대한 방어 행동을 취할 수 있으면서 로그인 상태를 유지할 수 있게 한다고 이해했습니다.

저장 위치에 대해서는 localstroage와 cookie 장단점을 비교하면서 고민중입니다!

### axios interceptor

`middleware`라고 생각하면 편하다

`반복되는 api로직`을 줄일 수 있다.

실제 api 요청(응답) 전에 `검증` 및 `분석` 로직으로 사용 가능하다.

원하는 instance마다 interceptor를 별도로 추가할 수 있다. (유저 api `전용 interceptor` 만들기 가능)

**request interceptor 활용**

- 실제 api요청을 보내기 전에 interceptor 부분에서 credentials이 유효한지 확인할 수 있다. (refresh token 로직)
- 모든 request마다 token을 붙혀야 한다면 (쿠키를 사용하지 않는 상황에서) axios의 모든 로직에 utils함수를 따로 만들기보다 interceptor를 활용하면 문제를 해결할 수 있다.

`예를 들어,`

- 매 요청마다 token 삽입
  ```jsx
  httpClient.interceptors.request.use(req => {
    // `req` is the Axios request config, so you can modify
    // the `headers`.
    req.headers.authorization = ‘Bearer mytoken’;
    return req;
  });
  ```

**response interceptor 활용**

- api 응답으로 사용자가 로그인한 것인지 추론할 수 있다. response interceptor에서 사용자의 로그인 상태를 처리하는 클래스를 초기화하고 response에 따라 업데이트할 수 있다.
- interceptor 단계에서 response를 parsing하고 response 값으로 parsing된 응답값을 전달할 수 있다. api가 여러 곳에서 동일한 방식으로 사용되는 경우 반복되는 parsing 로직을 줄일 수 있다.

`예를 들어,`

- 에러 로직을 interceptor에서 확인하고 상태에 따라 parsing해서 넘겨준다.

  ```tsx
  httpClient.interceptors.response.use(
    (response: AxiosResponse) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response.data;
    },
    (err: AxiosError) => {
      if(error.response) {
  			// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
  	    const status = err.response.status || 500;
  	    // we can handle global errors here
  	    switch (status) {
  	      // authentication (token related issues)
  	      case 401: {
  	        return Promise.reject(new APIError(err.message, 409));
  	      }

  	      // forbidden (permission related issues)
  	      case 403: {
  	        return Promise.reject(new APIError(err.message, 409));
  	      }

  	      // bad request
  	      case 400: {
  	        return Promise.reject(new APIError(err.message, 400));
  	      }

  	      // not found
  	      case 404: {
  	        return Promise.reject(new APIError(err.message, 404));
  	      }

  	      // conflict
  	      case 409: {
  	        return Promise.reject(new APIError(err.message, 409));
  	      }

  	      // unprocessable
  	      case 422: {
  	        return Promise.reject(new APIError(err.message, 422));
  	      }

  	      // generic api error (server related) unexpected
  	      default: {
  	        return Promise.reject(new APIError(err.message, 500));
  	      }
       } else if (error.request) {
  			// 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
       } else {
  			// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log('Error', error.message);
       }
      }
    }
  );
  ```

- 반복되는 로직 줄이기(parsing)
  ```jsx
  user.interceptors.response.use(
    (response) => {
      if (response.config.parse) {
        //perform the manipulation here and change the response object
      }
      return response;
    },
    (error) => {
      return Promise.reject(error.message);
    }
  );
  ```

### 꼭 중앙에서 모든 interceptor를 처리해야하는 건 아님!

**사용자 정의 instance에 interceptor를 추가 가능**

- 유저관련 api마다 추가하면 로그인 정보를 파싱할 수도 있을 듯

```jsx
const instance = axios.create();
instance.interceptors.request.use(function () {
  /*...*/
});
```

**제거도 가능**

- 모든 api마다 필요하지만 특정 api에는 필요없는 interceptor인 경우 제거 가능

```jsx
const myInterceptor = axios.interceptors.request.use(function () {
  /*...*/
});
axios.interceptors.request.eject(myInterceptor);
```
