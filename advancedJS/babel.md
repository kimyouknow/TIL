# Babel

프로젝트를 시작하기 전 초기 설정 과정에서 바벨을 주로 사용한다. es6 문법이 익숙해서, 혹은 필요하다고 해서 사용하지만 어떤 역할을 하고 어떻게 동작하는지 관심을 가진 적이 없다. 바벨에 대해서 알아보자.

# 바벨(Babel)이란?

Babel은 ES6+ 버전 이상의 자바스크립트나 JSX, 타입스크립트 코드를 하위 버전의 자바스크립트 코드로 변환 시켜 IE나 다른 브라우저에서 동작할 수 있도록 하는 역할을 한다.

### Babel is a JavaScript compiler하지만 엄밀히 말하면 transfiler라고 할 수 있다.

- `compiler`: 사람이 작성한 코드를 컴퓨터가 이해할 수 있도록 바꿔주는 프로그램
- `tarnsfiler`: 같은 언어를 다른 실행환경에서도 돌아갈 수 있도록 형태만 바꾸는 작업

# 1. 등장배경

## 1-1. 크로스 브라우징

크로스 브라우징이란 각 브라우저 마다 지닌 JavaScript 엔진의 차이로 발생하는 것을 통일하는 작업을 의미한다. 최신의 모던 브라우저에서는 최신 JavaScript 문법이 동작하지만 이를 지원하지 않는 브라우저에서는 앱이 제대로 동작하지 않는 문제가 발생한다.

바벨은 크로스 브라우징 문제를 트랜스파일을 통해 해결한다.

## 1-2. 트랜스파일

바벨은 최신 버전의 자바스크립트 문법(보통 ES6+)을 이전 버전의 자바스크립트 문법으로 변환시켜준다.

# 2. 동작원리(기본동작)

바벨은 세 단계로 빌드를 진행한다.

### 2-1. 파싱(Parsing

- 코드를 읽고 추상 구문 트리(AST)로 변환하는 단계

### 2-2. 변환(Transforming)

- 1단계에서 작성한 추상구문트리를 가져와서 각 브라우저에 맞게 변환하는 단계
- 여기서 바벨 설정에 추가한 plugin들이 적용된다.

### 2-3. 출력(Printing)

- 변경된 결과물을 출력한다.

# 3. plugin

바벨은 파싱과 출력만 담당하고 `변환 작업`은 다른 부분이 처리하데 이것을 **"플러그인"** 이라고 부른다.

주로 plugin을 통해 규칙을 하나하나 정한다.

# 3. preset

es6으로 코딩할 때 플러그인을 하나하나 설정하기 어려울 수 있다. 이때, 목적에 맞게 여러가지 plugin을 모아둔 preset으로 간편하게 사용가능하다. 즉, `목적에 맞게 여러가지 플러그인을 세트로 모아놓은 것`을 preset이라고 한다.

**예시:** preset-env(ECMAScript2015+를 변환할 때 사용한다.)

바벨 7 이전 버전에는 연도별로 각 프리셋을 제공했지만(babel-reset-es2015, babel-reset-es2016, babel-reset-es2017, babel-reset-latest) 지금은 `env` 하나로 합쳐졌다.

# 4. 폴리필(**polyfill)**

폴리필은 구형 브라우저에서 지원하지 않는 기능을 제공하는 코드를 의미한다. 즉, 최신 자바스크립트의 기능을 구식 자바스크립트 코드로 똑같이 구현한 코드를 의미한다.

예를 들어, 우리가 Promise라는 es6문법을 사용할 때 플러그인이 Promise를 이전 버전으로 변환할 것을 기대할 수 있다. 하지만 바벨은 ES6 => ES5로 변환할 수 있는 것들만 변환하기 때문에 기대한 결과가 나오지 않을 것이다. 이 때, 폴리필(Polyfill)을 사용해 최신 ECMAScript 환경을 만들어 주면된다.

**예시:** core-js(다양한 폴리필을 제공), polyfill.io(브라우저에 따라 폴리필 스크립트를 제공

# 5. 설정 파일

바벨 규칙을 미리 정리해둔 파일이라고 생각하면 된다.

### 5-1. .babelrc

주로 하위 디렉토리나 파일에서 특정 플러그인이나 변환을 실행할 때 사용

### 5-2. .babel.config.json

- 보편적으로 가장 많이 사용
- 프로젝트 전체 구성

### 5-3. .babel.config.js

- 공식문서에 따르면 .js로 사용하면 구성 api가 노출되어, 캐싱과 관련한 복잡성을 증가시킨다고 한다.

# 6. 웹팩으로 연결

로더형태로 제공되는 `babel-loader`를 사용해서 웹팩으로 통합해서 사용한다.

# 기타

@babel/core

- 바벨의 핵심기능이 담겨있는 기본 라이브러리 (파싱과 출력만 담당)

@babel/cli

- 커맨드 라인에서 바벨을 실행할 수있는 라이브러리

@babel/preset-env

- 대상 환경에 필요한 구문 변환(및 선택적으로 브라우저 폴리필)을 세부적으로 관리할 필요 없이 최신 JavaScript를 사용할 수 있다.

@babel/node

- Node.js 코드의 transpile과 실행을 한 번에 해준다.

@babel/preset-react

- jsx문법을 사용가능하게 하는 등 리액트를 동작하게하는 여러 플러그인 포함

@babel/preset-typescript

- 타입스크립트를 사용할 때 필요한 플러그인

### 참고자료

[https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html](https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html)

[https://tecoble.techcourse.co.kr/post/2021-07-07-babel/](https://tecoble.techcourse.co.kr/post/2021-07-07-babel/)

[https://www.daleseo.com/js-babel/](https://www.daleseo.com/js-babel/)

[https://babeljs.io/docs/en/presets](https://babeljs.io/docs/en/presets)

[https://babeljs.io/docs/en/config-files](https://babeljs.io/docs/en/config-files)

[https://babeljs.io/docs/en/babel-polyfill](https://babeljs.io/docs/en/babel-polyfill)
