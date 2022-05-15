`useEffect의 Dependency`에 `객체`를 넣었더니 의도한 대로 동작하지 않는 문제를 발견했습니다. (effect가 실행되지 않거나, effect가 무한으로 실행).

## 요약

> dependency에 넣은 변수의 타입을 주의해서 쓸 것. (원시타입, 참조타입, 함수 등등)

1. `원시타입`
   - state가 변경되면 함수가 다시 호출
   - state가 변경되지 않으면 함수가 다시 호출되지 않음
2. `참조타입`
   - 참조타입의 reference가 변경될 때 함수가 다시 호출
   - Imutable하게 관리하기 때문에, 매번 새로운 reference를 생성
     ```jsx
     const 객체1 = { a: 1 };
     const 객체2 = { a: 1 };
     console.log(객체1 === 객체2); // false
     console.log(객체1.a === 객체2.a);
     true;
     ```
   - Object의 값이 변할 때마다 실행하길 원한다면 별도의 방법을 참고 (JSON.stringify, useDeepCompareEffect, useRef 등을 알아보고 사용하기)
3. `함수`
   - 컴포넌트가 호출될 때마다 새롭게 함수가 생성되기 때문에 매번 호출된다.
   - useCallback hooks를 사용해 함수가 변경될 때 호출되게 할 수 있다.

## 문제파악 및 해결

아래와 같이 hooks를 써서, hooks 내부에 있는 useEffect의 dependency가 바뀔 때마다 `fetch()` 를 실행하게 했다.  dependency에서 쓰는 apiConfig는 useExample이 호출되는 시점에서 바뀐다.

```jsx
// useHooksExample.js
const useHooksExample = ({apiConfig}) => {
 const [response, setResponse] = useState([]);
 const fetch = () => {
  doSomething(apiConfig).then(res => setResponse(res);
 };
 useEffect(()=>{
  fetch();
 },[apiConfig])
}

// someComponent.jsx
const SomeComponent = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const [mealsArr, setMealsArr] = useState([]);
  const { response: meals } = useHooksExample({
    apiConfig: currIndex,
  });
 const addCurrnetIndex = () => {
    setCurrIndex((prev) => prev + 1);
  }
}

```

하지만, 위의 코드는 무한루프에 빠지게 된다. 이유가 뭘까? `useEffect의 dependency는 기본적으로 이전상태와 바뀐 상태를 비교해서 상태가 바뀌면 내부 effect를 실행`한다. 상태가 원시타입이면 의도한 대로 비교가 가능하지만 참조타입일 때 문제가 발생한다. 이는 javascript기본 문법과 관련있다.

```jsx
const 원시타입예시1 = 3;
const 원시타입예시2 = 3;
console.log(원시타입예시1 === 원시타입예시2); // true

const 객체1 = { a: 1 };
const 객체2 = { a: 1 };
console.log(객체1 === 객체2); // false
console.log(객체1.a === 객체2.a); // true
```

이러한 문제 때문에 참조타입을 사용한 dependency를 비교할 땐 다음과 같은 방법들을 사용해야 한다.

1. `useRef`로 기억하기
2. `JSON.stringify()` : ( JSON Object의 경우, 지원하지 않는 타입(undefined, Functions, Symbol…)이 있으므로, 주의 )
3. `use-deep-compare-effect`: [https://www.npmjs.com/package/use-deep-compare-effect](https://www.npmjs.com/package/use-deep-compare-effect)

### 참고자료

- 검색키워드 : react useEffect dependecy object
- [https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect)
- [https://stackoverflow.com/questions/54095994/react-useeffect-comparing-objects](https://stackoverflow.com/questions/54095994/react-useeffect-comparing-objects)
- [https://sgwanlee.medium.com/useeffect](https://sgwanlee.medium.com/useeffect)의-dependency-array-ebd15f35403a
- [https://jooonho.com/react/2022-01-30-dependency\\\_array/](https://jooonho.com/react/2022-01-30-dependency%5C%5C_array/)
- [https://velog.io/@nomadhash/Java-Script-](https://velog.io/@nomadhash/Java-Script-)깊은-복사와-얕은-복사
