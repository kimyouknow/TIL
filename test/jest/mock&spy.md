# jest mock & spy

> 코드 예시들은 [https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c](https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c) 를 복사했습니다.

# 1. mocking이란?

> mocking은 단위 테스트를 작성할 때, 해당 코드가 의존하는 부분을 가짜(mock)로 대체하는 기법

단위테스트는 `독립적`이어야하며, 어떤 테스트도 다른 테스트에 `의존하지 않아야 한다`. 독립적이기 위해선 `외부 모듈과 로직에서 분리`되어야 한다. Ajax, Fetch, DB 등 테스트 대상이 의존하는 것을 다른 것으로 대체해야한다.

구체적인 예를 들어보자. 데이터 베이스에 데이터를 저장하는 부분을 테스트 할 때 다음과 같은 부분을 신경써야한다.

- 데이터 전송: network, I/O작업, 트랜잭션 생성, 쿼리 전송 등등
- 테스트 종료 후 데이터 복원 혹은 트랜잭션 롤백 요청
- 테스트 도둥 데이터 베이스가 죽어있다면? (인프라의 영향)

언급한 모든 부분으로 테스트를 작성하게 되면 특정 기능만 분리해서 테스트하겠다는 단위 테스트의 목적에 부합하지 않게 된다.

우리는 이러한 상황에서 실제 객체인 척하는 가짜 객체를 생성해 테스트가 실행되는 동안 대신 사용할 수 있다. 이를 통해, 실제 객체를 사용하는 것보다 훨씬 빠르고 가볍게 실행되면서, 항상 동일한 결과를 내는 테스트를 작성할 수 있게 된다.

# 2. **모듈과 함수를 Mocking하기**

Jest에서 모듈과 함수를 Mocking 하는 3가지 방법이 있다.

- `jest.fn`: Mock a function
- `jest.mock`: Mock a module
- `jest.spyOn`: Spy or mock a function

## 2-1. jest.fn()

간단한 메서드 예제

```tsx
// mock 함수 생성
const mockFn = jest.fn();

// 인자를 넘겨서 호출하는 예제
const mockFn = jest.fn(1, 2);

// mock 함수의 return 값 설정
mockFn.mockReturnValue("mock's return value");
console.log(mockFn()); // "mock's return value"

// 비동기함수를 return 하는 예제
mockFn.mockResolvedValue("mock's return value");
mockFn().then((result) => {
  console.log(result); // mock's return value
});
```

### 2-1-1. jest.fn으로 Mocking 예제

math.js를 복잡하고 무거운 I/O 작업이라고 생각해보자

```tsx
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => b - a;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => b / a;

// app.js
import * as math from './math.js';

export const doAdd = (a, b) => math.add(a, b);
export const doSubtract = (a, b) => math.subtract(a, b);
export const doMultiply = (a, b) => math.multiply(a, b);
export const doDivide = (a, b) => math.divide(a, b);
```

Mock함수로 재할당하기 위해 다음과 같이 작성하면 된다.

```tsx
import * as app from './app';
import * as math from './math';

// 재할당
math.add = jest.fn();
math.subtract = jest.fn();

test('calls math.add', () => {
  app.doAdd(1, 2);
  expect(math.add).toHaveBeenCalledWith(1, 2);
});

test('calls math.subtract', () => {
  app.doSubtract(1, 2);
  expect(math.subtract).toHaveBeenCalledWith(1, 2);
});
```

이 방법도 좋지만 jest.mock이 자동적으로 모듈의 모든 함수를 mocking해주기 때문에 비선호한다.

## 2-1. jest.mock(): 모듈 모킹

```tsx
import * as app from './app';
import * as math from './math';

// Set all module functions to jest.fn
jest.mock('./math.js');

test('calls math.add', () => {
  app.doAdd(1, 2);
  expect(math.add).toHaveBeenCalledWith(1, 2);
});

test('calls math.subtract', () => {
  app.doSubtract(1, 2);
  expect(math.subtract).toHaveBeenCalledWith(1, 2);
});
```

위와 같이 jest.mock을 사용한다면 math.js의 함수를 다음과 같이 사용하는 것과 같다

```tsx
export const add = jest.fn();
export const subtract = jest.fn();
export const multiply = jest.fn();
export const divide = jest.fn();
```

하지만 이러한 방법은 `모듈의 원래 구현에 접근하기 어려운 단점`이 있다. 이 경우 jest.spyOn()을 사용하면 해결 문제를 해결할 수 있다.

## 2-3. **jest.spyOn()**

`jest.spyOn(object, methodName)`의 형태로 사용한다. jest.spyOn()은 jest.fn()과 유사한 모의 함수를 생성하지만 object[methodName]에 대한 호출도 추적하고, Jest 모의 함수[(mock.Fn)](https://jestjs.io/docs/mock-function-api)를 반환한다.

테스트를 작성할 때, 어떤 객체에 속한 함수의 구현을 가짜로 대체하지 않고, 해당 함수의 호출 여부와 어떻게 호출되었는지만을 알아내야 할 때 사용한다.

### 2-3-1. spy하기

```tsx
// depency
const video = {
  play() {
    return true;
  },
};

module.exports = video;

// tester
const video = require('./video');

test('plays video', () => {
  const spy = jest.spyOn(video, 'play');
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockRestore();
});
```

### 2-3-2. mocking하기

메소드가 실행되는 것을 지켜보길 원할뿐만 아니라, 기존의 구현은 보존바랄 때, 구현을 Mocking하고 차후에 테스트구문에서 원본을 복원할 수 있다. 이 때 `jest.spyOn` 을 쓸 수 있다. 단순히 math 함수에 “Spy”를 호출하고 원본 구현은 그대로 둘 수 있다.

```tsx
import * as app from './app';
import * as math from './math';

test('calls math.add', () => {
  const addMock = jest.spyOn(math, 'add');

  // calls the original implementation
  expect(app.doAdd(1, 2)).toEqual(3);

  // and the spy stores the calls to add
  expect(addMock).toHaveBeenCalledWith(1, 2);
});
```

이러한 방법은 `실제로 함수를 대체하지 않고, 특정한 사이드 이팩트가 발생하는지 테스트`해야할 때 유용하게 사용할 수 있다.

### 2-3-3. 함수를 Mocking하고 다시 원래 구현을 복원하기

```tsx
import * as app from './app';
import * as math from './math';

test('calls math.add', () => {
  const addMock = jest.spyOn(math, 'add');

  // override the implementation
  addMock.mockImplementation(() => 'mock');
  expect(app.doAdd(1, 2)).toEqual('mock');

  // restore the original implementation
  addMock.mockRestore();
  expect(app.doAdd(1, 2)).toEqual(3);
});
```

# 3. 응용

원래 함수의 기능을 덮어 쓰고 싶다면, 다음과 같이 사용하면 된다.

```tsx
// 1번
jest.spyOn(object, methodName).mockImplementation(() => customImplementation

//2번
object[methodName] = jest.fn(() => customImplementation)

```

### 참고자료

[https://www.daleseo.com/jest-fn-spy-on/](https://www.daleseo.com/jest-fn-spy-on/)

[https://www.daleseo.com/jest-mock-modules/](https://www.daleseo.com/jest-mock-modules/)

[https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c](https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c)
