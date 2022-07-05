# React strict 모드

> useEffect를 내부의 effect가 두 번씩 호출되는 문제

아래와 같이 useEffect로 데이터를 fetch하는 로직을 구현하다가 fetch가 두 번씩 호출되는 것을 발견했습니다. 디버거로 확인해보니 `useEffect내부의 effect가 두 번 실행`되고 있었습니다.

```jsx
function App() {
  const fetcher = () => {
    // GET: 요청
  };
  useEffect(() => {
    fetcher();
  }, []);
}
```

위와 같은 결과는 버그가 아니라 의도된 기능이라고 하네요.  React 문서에 따르면, 이렇게 두 번 호출되는 것은 버그가 아니라 **의도된 기능이고**, `StrictMode`에서 실행되는 이 기능은 사이드 이펙트를 발견할 수 있도록 도와준다고하네요.

### 요약

> Strict 모드는 CRA로 설치했다면 자동으로 적용됩니다. 
> Strict 모드는 `개발 모드에서만 활성화`되기 때문에, 프로덕션 빌드에는 영향을 끼치지 않습니다. 
> Strict 모드는 `예상치 못한 부작용 검사`에 도움됩니다.
>
> Strict 모드가 자동으로 부작용을 찾아주는 것은 불가능합니다. 하지만, `조금 더 예측할 수 있게끔 만들어서` 문제가 되는 부분을 발견할 수 있게 도와줍니다. 이는 `아래의 함수를 의도적으로 이중으로 호출`하여 찾을 수 있습니다.
>
> - 클래스 컴포넌트의 `constructor`, `render` 그리고 `shouldComponentUpdate` 메서드
> - 클래스 컴포넌트의 `getDerivedStateFromProps` static 메서드
> - 함수 컴포넌트 바디
> - State updater 함수 (`setState`의 첫 번째 인자)
> - `useState`, `useMemo` 그리고 `useReducer`에 전달되는 함수

### 실습 코드

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Strict mode
function App() {
  console.log('run App'); // 1번째 실행 -> 2번째 실행
  useEffect(() => {
    console.log('run effect'); // 3번째 실행 -> 5번째 실행
    return () => {
      console.log('run effect return fn'); // 4번째 실행
    };
  }, []);
}

// 콘솔결과
// run App
// run App
// run effect
// run effect return fn
// run effect

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// 일반 Mode
function App() {
  console.log('run App'); // 1번째 실행
  useEffect(() => {
    console.log('run effect'); // 2번째 실행
    return () => {
      console.log('run effect return fn'); // 실행되지 않음.
    };
  }, []);
}
// 콘솔결과
// run App
// run effect

root.render(<App />);
```

자세한 내용은  첨부한 링크를 보시면 됩니다!

[https://devsoyoung.github.io/posts/react-usestate-double-invoked/](https://devsoyoung.github.io/posts/react-usestate-double-invoked/) : react stict모드 관련 정리된 블로그

[https://ko.reactjs.org/docs/strict-mode.html](https://ko.reactjs.org/docs/strict-mode.html): 공식문서

[https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar](https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar) : 관련 내용 stackoverflow
