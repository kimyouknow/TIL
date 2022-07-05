# axios interceptor 세팅 및 활용

> 모든 HTTP 작업에 대한 `체크포인트`라고 할 수 있다. 이루어진 모든 API 호출은 이 인터셉터를 통해 전달

## 요약

`middleware`라고 생각하면 편하다

`반복되는 api로직`을 줄일 수 있다.

실제 api 요청(응답) 전에 `검증` 및 `분석` 로직으로 사용 가능하다.

원하는 instance마다 interceptor를 별도로 추가할 수 있다. (유저 api `전용 interceptor` 만들기 가능)

# 기본 세팅

- 코드 예시

```tsx
// 요청 인터셉터 추가
axios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일
    // ...
    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
axios.interceptors.response.use(
  function (response) {
    // 응답 데이터를 가공
    // ...
    return response;
  },
  function (error) {
    // 오류 응답을 처리
    // ...
    return Promise.reject(error);
  }
);
```

많은 튜토리얼에서 위와 같은 코드만 보여주지만 어떤 상황에서 사용해야하는지 구체적인 사례는 찾기 어렵다.

어떻게 활용되고 있는지 확인해보자.

# request interceptor 활용

- 실제 api요청을 보내기 전에 interceptor 부분에서 credentials이 유효한지 확인할 수 있다. (refresh token 로직)
- 모든 request마다 token을 붙혀야 한다면 (쿠키를 사용하지 않는 상황에서) axios의 모든 로직에 utils함수를 따로 만들기보다 interceptor를 활용하면 문제를 해결할 수 있다.

<details>
<summary>매 요청마다 token 삽입</summary>

```jsx
const setAcessTokenInrequestConfig = (config: AxiosRequestConfig) => {
  const accessToken = localStorageDB.get(ACCESS_TOKEN);
  if (!config?.headers) {
    console.error(`Expected 'config' and 'config.headers' not to be undefined`);
    return;
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

httpClient.interceptors.request.use(
  (config) => {
    const newConfig = setAcessTokenInrequestConfig(config);
    return newConfig;
  },
  (error) => {
    // 요청 에러가 발생했을 때 수행할 로직
    console.log(error); // 디버깅
    return Promise.reject(error);
  }
);
```

</details>

<details>
<summary>api 요청마다 refresh token 검증</summary>

```tsx
const checkAccessToken = () => {
  const isExpired = isTokenExpired(ACCESS_TOKEN);
  const refreshToken = localStorageDB.get(REFRESH_TOKEN);
  const shoudRequestRefreshAceessToken = isExpired && refreshToken;
  return shoudRequestRefreshAceessToken;
};

const refreshAccessToken = async () => {
  const refreshToken = localStorageDB.get(REFRESH_TOKEN);
  try {
    if (refreshToken) {
      const response = await authApi.refreshAccessToken(refreshToken);
      const accessToken = response.data?.accessToken;
      if (accessToken) {
        localStorageDB.set(ACCESS_TOKEN, accessToken);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

httpClient.interceptors.request.use(
  async (config) => {
    const shoudRequestRefreshAceessToken = checkAccessToken();
    if (shoudRequestRefreshAceessToken) {
      await refreshAccessToken();
    }
    const newConfig = setAcessTokenInrequestConfig(config);
    return newConfig;
  },
  (error) => {
    // 요청 에러가 발생했을 때 수행할 로직
    console.log(error); // 디버깅
    return Promise.reject(error);
  }
);
```

</details>

# response interceptor 활용

- api 응답으로 사용자가 로그인한 것인지 추론할 수 있다. response interceptor에서 사용자의 로그인 상태를 처리하는 클래스를 초기화하고 response에 따라 업데이트할 수 있다.
- interceptor 단계에서 response를 parsing하고 response 값으로 parsing된 응답값을 전달할 수 있다. api가 여러 곳에서 동일한 방식으로 사용되는 경우 반복되는 parsing 로직을 줄일 수 있다.

<details>
<summary>refresh token을 활용한 access token 최신화</summary>

```tsx
apiInstance.interceptors.response.use(
  response => {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  async error => {
    if (error.response.data) {
      const { errorCode } = error.response.data;
      if (errorCode === 'AUTH002') {
        await refreshAccessToken();
      }
    }
// 생략
);

export default apiInstance;
```

</details>

<details>
<summary>에러 로직을 interceptor에서 확인하고 상태에 따라 parsing해서 넘겨준다.</summary>

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

</details>

<details>
<summary>반복되는 로직 줄이기(parsing)</summary>

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

</details>

## 꼭 중앙에서 모든 interceptor를 처리해야하는 건 아님!

### 사용자 정의 instance에 interceptor를 추가 가능

- 유저관련 api마다 추가하면 로그인 정보를 파싱할 수도 있을 듯

```jsx
const instance = axios.create();
instance.interceptors.request.use(function () {
  /*...*/
});
```

### 제거도 가능

- 모든 api마다 필요하지만 특정 api에는 필요없는 interceptor인 경우 제거 가능

```jsx
const myInterceptor = axios.interceptors.request.use(function () {
  /*...*/
});
axios.interceptors.request.eject(myInterceptor);
```

## 의문 1 : react에서 에러 처리

interceptor로직에서 에러를 잡는다고 해도 react 컴포넌트로 전달할 수 있는 방법이 있을까?

### 참고자료

좀 더 자세한 내용, 혹은 원래 작성된 글을 보고 싶으면 아래 링크를 참고하세요

👍 [https://stackoverflow.com/questions/52737078/how-can-you-use-axios-interceptors](https://stackoverflow.com/questions/52737078/how-can-you-use-axios-interceptors)

[https://dev.to/charlintosh/setting-up-axios-interceptors-react-js-typescript-12k5](https://dev.to/charlintosh/setting-up-axios-interceptors-react-js-typescript-12k5)

[https://velog.io/@yiyb0603/React에서-axios-커스텀하기](https://velog.io/@yiyb0603/React%EC%97%90%EC%84%9C-axios-%EC%BB%A4%EC%8A%A4%ED%85%80%ED%95%98%EA%B8%B0)

[https://khaledgarbaya.net/articles/4-ways-to-use-axios-interceptors](https://khaledgarbaya.net/articles/4-ways-to-use-axios-interceptors)

[https://yamoo9.github.io/axios/guide/interceptors.html](https://yamoo9.github.io/axios/guide/interceptors.html)
