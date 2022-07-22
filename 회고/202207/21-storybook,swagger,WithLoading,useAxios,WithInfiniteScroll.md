# 20220721

<details>
<summary>시간대별 정리</summary>

### 오전

회고작성

### 오후

storybook 설치 및 예제 실습

이슈트래커 FE, BE 개발환경설정

### 저녁

코넥트

- hoc만들기 (WithLoading, WithInfiniteScroll)
- 반복되는 get요청 줄이기
</details>
<br>

# 개인공부

## storybook 설치

storybook 설치 및 간단한 예제 실습

## express + typescript 보일러 템플릿

[tsc build 이후 alias가 적용되지 않은 문제](https://stackoverflow.com/questions/59179787/tsc-doesnt-compile-alias-paths) ⇒ `tsc-alias` 패키지로 문제해결

eslint + prettier 설정

## **swagger 설치**

- open api가 뭐지?
- yaml 확장자?

## babel-loader vs ts-laoder -ing

아직 코드량이 프로젝트를 직접 만들어보지 않아 구체적인 장단점을 체감하기 힘들다. 프로젝트를 진행하면서 코드량이 많아졌을 때 비교해볼 예정이다.

# 코넥트

반복되는 GET요청 이후 loading, error 처리를 hoc와 hooks를 사용해 선언적으로 처리해봤다. GET요청일 경우 데이터가 보여질 컴포넌트 자체에 loading UI를 보여주면 간단하게 해결되지만 그 외 요청일 때는 다르게 처리해야할 것 같다.

POST, PATCH의 경우 작성중이던 form이 통채로 사라지고 loading UI가 보이기보다 현재 페이지는 그대로 보여주고 간단한 얼럿창으로 사용자에게 처리중인 사실만 알리면 될 것 같다.

## 반복되는 GET 요청 이후 loading, error 처리 줄이기

`useAxios`: GET 요청이 로딩 처리, 에러 처리등을 담당

  <details>
  <summary>코드</summary>

```js
import { useEffect, useState } from 'react';

const useAxios = (axiosInstance, config) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ isError: false, msg: '' });
  const [responseData, setResponseData] = useState(null);
  const [trigger, setTrigger] = useState(Date.now());

  const forceRefetch = () => {
    setTrigger(Date.now());
  };

  const resetState = () => {
    setError({ isError: false, msg: '' });
    setResponseData(null);
    setIsLoading(false);
  };

  const fetchData = async (signal) => {
    setIsLoading(true);
    try {
      const {
        status,
        data: { data },
      } = await axiosInstance({ ...config, signal });
      setResponseData(data);
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        msg: error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    resetState();
    fetchData(signal);
    return () => {
      controller.abort();
    };
  }, [trigger]);

  return [responseData, isLoading, error, forceRefetch];
};

export default useAxios;
```

</details>
<br>

`WithLoading`: useAxios가 반환한 상태에 따른 컴포넌트 렌더링

<details>
<summary>코드</summary>

```js
WithLoading.propTypes = {
  Component: PropTypes.element.isRequired,
  responseDataKey: PropTypes.string.isRequired,
  axiosInstance: PropTypes.func.isRequired,
  axiosConfig: PropTypes.object.isRequired,
  LoadingFallback: PropTypes.element.isRequired,
  ErrorFallback: PropTypes.element.isRequired,
};

export default function WithLoading({
  Component, // 데이터 요청 이후 순수한 데이터 렌더링만 담당하는 컴포넌트
  responseDataKey, // 렌더링을 담당하는 컴포넌트에서 사용할 데이터의 키 값
  axiosInstance,
  axiosConfig,
  LoadingFallback,
  ErrorFallback,
}) {
  return function Wrapper(props) {
    const [responseData, isLoading, error, forceRefetch] = useAxios(
      axiosInstance,
      axiosConfig
    );

    if (isLoading) return <LoadingFallback />;
    if (error.isError) return <ErrorFallback forceRefetch={forceRefetch} />;

    const propsWithResponseData = { ...props, [responseDataKey]: responseData };
    return <Component {...propsWithResponseData} />;
  };
}
```

</details>
<br>

`WithInfiniteScroll`: useIntersect를 사용하는 컴포넌트를 감싸는 HOC

  <details>
  <summary>코드</summary>

```js
WithInfiniteScroll.propTypes = {
  CardComponent: PropTypes.func.isRequired,
  axiosInstance: PropTypes.func.isRequired,
};

export default function WithInfiniteScroll({
  Component,
  axiosInstance,
  clickLink,
}) {
  return function Wrapper(props) {
    const [loadMoreRef, page, resetPage] = useIntersect();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ isError: false, msg: '' });
    const [cardList, setCardList] = useState([]);
    const IsShowLoadRef = isLoading || error.isError ? 'none' : 'block';

    const resetError = () => {
      setError({ isError: false, msg: '' });
      setCardList([]);
      setIsLoading(false);
    };

    const refetchData = async () => {
      resetError();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      resetPage();
    };

    const fetchData = async (lastPage, signal) => {
      setIsLoading(true);
      try {
        const {
          status,
          data: { data },
        } = await axiosInstance({ params: { lastPage }, signal });
        setCardList((prev) => [...prev, ...data]);
      } catch (error) {
        console.error(error);
        setError({
          isError: true,
          msg: error,
        });
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      const controller = new AbortController();
      const { signal } = controller;
      fetchData(page, signal);
      return () => {
        controller.abort();
      };
    }, [page]);

    return (
      <>
        <Component {...props} />
        {error.isError && (
          <button onClick={refetchData}>데이터 다시 요청</button>
        )}
        <div ref={loadMoreRef} style={{ display: IsShowLoadRef }}>
          {isLoading && <div>Loading...</div>}
        </div>
        <UpperButton />
      </>
    );
  };
}
```

</details>
<br>

## fetch 요청 중 컴포넌트를 벗어나면 memory leak 문제가 발생

**해결**

[AbortController](https://developer.mozilla.org/ko/docs/Web/API/AbortController)과 useEffect return을 활용

컴포넌트가 unmount될 때 `controller.abort();`를 활용해서 fetch 요청을 취소한다.

  <details>
  <summary>코드</summary>

```js
useEffect(() => {
  const controller = new AbortController();
  const { signal } = controller;
  resetState();
  fetchData(signal);
  return () => {
    controller.abort();
  };
}, []);
```

</details>
<br>

[관련 PR- [FE] 데이터 요청(GET) 이후 로직(로딩, 에러)을 선언적으로 처리하는 컴포넌트 #91](https://github.com/yulpumta-clone-team/Co-nect/pull/91)
