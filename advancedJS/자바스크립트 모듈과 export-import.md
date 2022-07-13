# 자바스크립트 모듈과 export-import

nodejs를 공부하다보니 require문을 자주 보게되었다. 나는 브라우저에서 동작하는 코드를 많이 작성하던 편이어서 es6를 주로 사용했다. (es모듈은 자바스크립트 표준화된 모듈 시스템으로 브라우저에서 지원한다.) nodejs도 버전 13.2부터 es모듈 시스템에 대한 정식 지원을 시작했지만, 파일 확장자를 `mjs`로 바꾸거나 packge.json의 최상위 `type을 module`로 설정해야한다. 하지만 `es6 이상의 최신 자바스크립트 문법`으로 작성된 코드가 nodejs에서 실행되지 않은 경우가 종종 있어 `babel`을 활용하여 개발을 주로 하고 있다.

모듈 시스템이 익숙해서 사용하고 있지만 es모듈이 어떻게 동작하는지 이해해본적은 없다.

특히 이번에 jest를 공부하게 되면서 import /export 관한 에러가 났는데, 구글링 통해 문제는 해결했는지만 원인과 해결방법을 이해하지 못했다. module과 reuqire, import문 사용에 따라 차이가 있어 관련 주제를 학습해보려고 한다.

[자바스크립트 모듈(깊게 이해하기)](https://kimyouknow.gitbook.io/til/js/undefined/module)는 여기를 참고해주세요.

# export default를 사용하지 말아야하는 이유?

export / import에 관한 내용을 학습하다가 export default를 사용하지 말아야하는 이유에 대한 글을 많이 볼 수 있었다. 내가 몇몇 블로그를 읽고 공감하는 부분은 다음과 같다.

**Named Export 특징**

- 한 파일 내에서 여러개의 변수/클래스/함수를 Export 할 수 있다
- Import할 때 `as` 키워드를 사용해서 다른 이름을 지정할 수 있다.

**Default Export 특징**

- 한 파일 내에서 단 한개의 변수/클래스/함수만을 Export 할 수 있다.
- from 뒤에 명시한 파일에서 단 한개의 모듈만 가져오기 때문에 `as` 키워드 없이 원하는대로 이름을 바꿀 수 있다.

### 리팩토링이 어렵다.

**`default export`**는 가져다 쓰는 곳에서 네이밍을 바꿔서 쓸 수 있다.

```jsx
import ourexport from './myexport';
import myexport from './myexport';
import youexport from './myexport';
```

### 클래스나 함수가 아니면 한줄이 더 필요하다.

```jsx
/ 이건 안된다
export default const hello = 'hello'

// 이건 가능
export const hi = "hi";

// 이렇게 해야한다.
const hello = 'hello'

export default hello
```

### 트리쉐이킹

`named exports`를 하는게 번들 사이즈를 더 줄이는데 도움을 준다.

`default export`는 여러 개의 변수(함수)를 하나의 object로 모아서 내보기 때문에 import하는 곳에서 사용하지 않은 코드까지 번들링된다.

[예제](https://rollupjs.org/repl/?version=2.33.1&shareable=JTdCJTIybW9kdWxlcyUyMiUzQSU1QiU3QiUyMm5hbWUlMjIlM0ElMjJtYWluLmpzJTIyJTJDJTIyY29kZSUyMiUzQSUyMmltcG9ydCUyMEZvbyUyMGZyb20lMjAnLiUyRmZvbyclNUNuaW1wb3J0JTIwJTdCJTIwZm9vMiUyMCU3RCUyMGZyb20lMjAnLiUyRmJhciclNUNuJTVDbmNvbnNvbGUubG9nKEZvby5mb28xKSU1Q25jb25zb2xlLmxvZyhmb28yKSUyMiUyQyUyMmlzRW50cnklMjIlM0F0cnVlJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMmJhci5qcyUyMiUyQyUyMmNvZGUlMjIlM0ElMjJleHBvcnQlMjBjb25zdCUyMGJhcjIlMjAlM0QlMjAnYmFyMiclNUNuZXhwb3J0JTIwY29uc3QlMjBmb28yJTIwJTNEJTIwJ2ZvbzInJTIyJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMmZvby5qcyUyMiUyQyUyMmNvZGUlMjIlM0ElMjJleHBvcnQlMjBkZWZhdWx0JTIwJTdCJTVDbiUyMCUyMGZvbzElM0ElMjAnZm9vMSclMkMlNUNuJTIwJTIwYmFyMSUzQSUyMCdiYXIxJyUyQyU1Q24lN0QlMjIlN0QlNUQlMkMlMjJvcHRpb25zJTIyJTNBJTdCJTIyZm9ybWF0JTIyJTNBJTIyZXMlMjIlMkMlMjJuYW1lJTIyJTNBJTIybXlCdW5kbGUlMjIlMkMlMjJhbWQlMjIlM0ElN0IlMjJpZCUyMiUzQSUyMiUyMiU3RCUyQyUyMmdsb2JhbHMlMjIlM0ElN0IlN0QlN0QlMkMlMjJleGFtcGxlJTIyJTNBbnVsbCU3RA==)를 확인 (예제 출처: [https://yceffort.kr/2020/11/avoid-default-export](https://yceffort.kr/2020/11/avoid-default-export) )

하지만 airbnb 컨벤션을 살펴보면 `prefer-default-export`과 같은 내보내는 코드가 하나라면 export default를 권장하는 규칙이 있는 것을 알 수 있다.

아래 이슈를 확인하면 `What is the benefit of prefer-default-export?` 이라는 질문에 대한 많은 논의가 있었음을 알 수 있다.

우선 차이만 인지하고 적절하게 사용해보자.

[https://github.com/airbnb/javascript/issues/1365](https://github.com/airbnb/javascript/issues/1365)

# CommonJS 모듈 export/import

CommonJS 방식으로 모듈을 내보낼 때는 ES6처럼 명시적으로 선언하는 것이 아니라 특정 변수나 그 변수의 속성으로 내보낼 객체를 세팅해야 한다.

- 여러 개의 객체를 내보낼 경우, `exports` 변수의 속성으로 할당한다.

```jsx
// export.js
const one = 1;
const two = 2;
function add(a, b) {
  return a + b;
}

exports.one = one;
exports.two = two;
exports.add = add;
// 이름을 변경해서 내보낼 수 있다.
// exports.변경된one = one;
// exports.변경된two = two;
// exports.변경된add = add;

// import/js
const exportObj = require('./export');

console.log(exportObj.add(exportObj.one, exportObj.two)); // 3
// console.log(exportObj.변경된add(exportObj.변경된one, exportObj.변경된two)); // 3
```

- 딱 하나의 객체를 내보낼 경우, `module.exports` 변수 자체에 할당한다.

```jsx
// export.js
const one = 1;
const two = 2;
function add(a, b) {
  return a + b;
}

module.exports = {
  one,
  two,
  add,
};

// export.js
const one = 1;
const two = 2;
function add(a, b) {
  return a + b;
}

module.exports = {
  one,
  two,
  add,
};
```

# 브라우저에서 ES6 모듈 export/import

```jsx
// export.js
// 1번
export const one = 1;
export const two = 2;
export function add(a, b) {
  return a + b;
}

// 2번
export { one, two, add };

// 3번
export default { one, two, add };

// import.js
// 단일 객체
import { add, one, two } from './export';
// * as 활용
import * as exportObj from './export';
// export default를 받기
import 내마음대로정한exportObj from './export';
```

# Node에서 ES6 모듈 export/import

.mjs 확장자를 사용

```jsx
// export.mjs
export const one = 1;
export const two = 2;
export function add(a, b) {
  return a + b;
}

// import.mjs
import { add, one, two } from './export.mjs';

console.log(add(one, two));
```

.js 확장자로 package.json의 type=module지정

```jsx
// package.json
{
.. 생략
  "type": "module"
}

// export.ms
export const one = 1;
export const two = 2;
export function add(a, b) {
  return a + b;
}

// import.ms
import { add, one, two } from './export.mjs';

console.log(add(one, two));
```

# Node에서 babel을 활용한 ES6 모듈 export/import

babel을 활용하여 컴파일

```jsx
npm i -D @babel/core @babel/cli @babel/preset-env @babel/node
```

- @babel/core: 바벨의 핵심기능이 담겨있는 기본 라이브러리 (파싱과 출력만 담당)
- @babel/cli: 커맨드 라인에서 바벨을 실행할 수있는 라이브러리
- @babel/preset-env: 대상 환경에 필요한 구문 변환(및 선택적으로 브라우저 폴리필)을 세부적으로 관리할 필요 없이 최신 JavaScript를 사용할 수 있다.
- @babel/node: Node.js 코드의 transpile과 실행을 한 번에 해준다.

babel관련 자세한 설정은 [여기](https://kimyouknow.gitbook.io/til/js/undefined/babel)를 참고하기

es6 타입으로 작성한 파일을 다음과 같은 명령어로 실행해서 변환 여부 확인

```bash
npx babel --presets @babel/env import.js

"use strict";

var _export = require("./export.js");

console.log((0, _export.add)(_export.one, _export.two));
```

### babel로 트랜스파일된 코드를 노드 런타임에 실행하기

다음과 같이 설정하고 `npx babel-node import.js` 명령어를 커맨드라인에 입력해서 실행

```json
// babel.config.json
{
  "presets": ["@babel/env"]
}
```

### 참고자료

[https://ko.javascript.info/import-export](https://ko.javascript.info/import-export)

[https://www.daleseo.com/js-module-require/](https://www.daleseo.com/js-module-require/)

[https://www.daleseo.com/js-module-import/](https://www.daleseo.com/js-module-import/)

[https://www.daleseo.com/js-node-es-modules/](https://www.daleseo.com/js-node-es-modules/)

[https://www.daleseo.com/js-babel-node/](https://www.daleseo.com/js-babel-node/)

[https://yceffort.kr/2020/11/avoid-default-export](https://yceffort.kr/2020/11/avoid-default-export)

[https://medium.com/@\_diana_lee/default-export와-named-export-차이점-38fa5d7f57d4](https://medium.com/@_diana_lee/default-export%EC%99%80-named-export-%EC%B0%A8%EC%9D%B4%EC%A0%90-38fa5d7f57d4)
