> 공식문서에 설명에 따라, 다음의 핵심 개념으로 대략적인 개요를 이해하고, 개념별로 최적화된 사용 사례를 익혀보자.

- Entry(엔트리)
- Output(출력)
- Loaders(로더)
- Plugins(플러그인)
- Mode(모드)
- Browser Compatibility(브라우저 호환성)

# 1. 등장배경

### 1.1 파일 단위의 자바스크립트 모듈 관리의 필요성

- js에서 모듈을 구현하는 대표적인 방법으로 AMD와 CommonJS가 있다. es6이후 표준 모듈 시스템이 등장했는데 모든 브라우저에서 모듈 시스템을 지원하지 않는 문제가 있다.
- 웹팩은 모듈 번들러(module bundler)로서 웹 애플리케이션을 구성하는 모든 자원(html, css, js, image 등)을 모두 각각의 모듈로 보고 이를 조합해서 하나의 결과로 만든다.

### 1.2 웹 개발 작업 자동화 도구

- 개발 작업 및 배포 시 필수 작업 자동화

### 1.3 웹 애플리케이션의 빠른 로딩 속도와 높은 성능

- 모듈 번들링을 통해 웹 애플리케이션을 구성하는 수많은 파이들을 하나의 파일로 병합 및 압축 해주는 동작을 제공
- 클라이언트에서 서버에 HTTP 요청을 보내기 위해서는 먼저 TCP/IP가 연결되어야 하는데, HTTP요청숫자는 제약되어 있다. 웹팩을 이용해 여러 개의 파일을 하나로 합피면 브라우저별 HTTP 요청 숫자 제약을 피해 성능을 향상 시킬 수 있다.
- code splitting 기능을 이용해 lazy loading지원

# 2. 동작원리

1. entry file의 의존성을 분석한다.
2. 다음 파일의 의존성을 분석한다.
3. 모든 파일의 의존성을 분석할 때 까지 2번 과정을 반복한다.
4. 3번 까지의 과정을 토대로 종속성 그래프를 만들고 이 그래프를 사용하여 모든 모듈을 하나(또는 여러개)의 bundle 파일로 합친다.

# 3. Entry

> 웹팩에서 웹자원을 변환하기 위해 필요한 최초 진입점이자 js파일 경로

- entry 속성에 지정된 파일에는 웹앱의 전반적인 구조와 내용이 남겨 있어야한다. 웹팩이 해당 파일을 가지고 웹앱에 사용되는 모듈들의 연관 관계를 이해하고 분석하기 때문이다.
- 엔트리 포인트를 분리할 수 있는데, 이 때는 싱글 페이지가 아닌 멀티 페이지 어플래케이션에 적합하다.

# 4. Ouput

> 웹팩을 돌리고 난 결과물의 파일 경로

- 일반적으로 filename과 path 속성을 함께 사용하여 정의한다.

# 5. 로더

> 웹팩이 웹앱을 해석할 때 js과 json이 아닌 웹 자원(html, css, image, 폰트 등)들을 `변환`할 수 있도록 도와주는 속성

- 웹팩은 모든 파일을 모듈로 바라본다. js 파일 뿐만 아니라 스타일시트, 이미지, 폰트까지도 전부 모듈로 보기 때문에 import구문을 사용하면 자바스크립트 코드 안으로 가져올 수 있다.
- 웹팩은 기본적으로 JavaScript와 JSON 파일만 이해한다. . **로더를** 사용하면 webpack이 다른 유형의 파일을 처리하거나, 그들을 유효한 모듈로 변환 하여 애플리케이션에서 사용하거나 디펜던시 그래프에 추가
- babel-loader로 웹팩과 함께 사용하면 훨씬 단순하고 자동화된 프론트엔드 개발환경을 갖출 수 있다. js 확장자로 끝나는 파일은 babel-loader가 처리하도록 설정
- 특정 파일에 대해 여러 개의 로더를 사용하는 경우 로더가 적용되는 순서에 주의해야 한다. 로더는 기본적으로 **오른쪽에서 왼쪽 순으로 적용**
- 예시:
  - [Babel Loader](https://webpack.js.org/loaders/babel-loader/#root)
  - [Style Loader](https://webpack.js.org/loaders/style-loader/#root): 모듈로 변경된 스타일을 동적응로 돔에 추가하는 로더.
  - [Css Loader](https://webpack.js.org/loaders/css-loader/#root): 웹팩이 모든 파일을 모듈로 보기 때문에 js 뿐만 아니라 스타일시트로 import 구문으로 불러올 수 있음
  - [Sass Loader](https://webpack.js.org/loaders/sass-loader/#root):
  - [File Loader](https://webpack.js.org/loaders/file-loader/#root): CSS 뿐만 아니라 소스코드에서 사용하는 모든 파일을 모듈로 사용하게 해준다.
  - [TS Loader](https://webpack.js.org/guides/typescript/#loader)

# 6. 플러그인

> 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성

- 로더가 할 수 없는 **다른 작업을** 수행할 목적으로 제공
- 로더랑 비교하면 로더는 파일을 해석하고 변환하는 과정에 관여하는 반면, 플러그인은 해당 결과물의 형태를 바꾸는 역할
- 예시
  - [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) : 웹팩으로 빌드한 결과물로 HTML 파일을 생성해주는 플러그인
  - [ProgressPlugin](https://webpack.js.org/plugins/progress-plugin/#root) : 웹팩의 빌드 진행율을 표시해주는 플러그인
  - [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/#root): CSS를 별도의 파일로 추출, CSS가 포함된 JS 파일별로 CSS 파일을 생성, CSS 및 SourceMaps의 온디맨드 로딩을 지원하는 플러그인
  - [split-chunks-plugin](https://webpack.js.org/plugins/split-chunks-plugin/)
  - [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)
  - [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)
  - [webpack-bundle-analyzer-plugin](https://github.com/webpack-contrib/webpack-bundle-analyzer): 대화형 확대/축소 가능한 트리맵으로 웹팩 출력 파일의 크기를 시각화하는 플러그인

# 7. devServer

> 웹팩의 빌드 대상 파일이 변경 되었을 때 매번 웹팩 명령어를 실행하지 않아도 코드만 변경하고 저장하면 웹팩으로 빌드한 후 브라우저를 새로고침 해주는 기능.

주의사항:

- 웹팩 데브 서버를 실행하여 웹팩 빌드를 하는 경우에는 빌드한 결과물이 파일 탐색기나 프로젝트 폴더에서 보이지 않음.
- 웹팩 데브 서버로 빌드한 결과물은 `메모리에 저장`되고 파일로 생성하지 않기 때문.
- 따라서, `웹팩 데브 서버는 개발할 때만 사용하다가 개발이 완료되면 웹팩 명령어를 이용해 결과물 파일을 생성해야 한다.`

# 8. Hot Module Replacement

> 파일을 변경 후 브라우저를 새로고침하지 않아도 웹팩으로 빌드한 결과물이 브라우저에 실시간으로 반영될 수 있게 도와주는 기능

- 모든 종류의 모듈을 새로고침 할 필요 없이 런타임에 업데이트
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 설정을 업데이트하고 webpack의 내장 HMR 플러그인을 설정하면 사용가능

# 9. 최적화

### 9.1 production 모드

### 9.2 optimazation 속성

### 9.3 코드 스플리팅

> 코드를 압축하는 것 외에도 결과물을 여러 개로 쪼개 브라우저 다운로드 속도를 높일 수 있다.

- 엔트리를 여러 개로 분리
- 다이나믹 임포트

### 9.4 externals

- 서드파티 라이브러리를 빌드 프로세스에서 제외하기

### 🔍 참고자료

[https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html](https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html)

[https://webpack.kr/concepts/](https://webpack.kr/concepts/)

[https://github.com/doonguk/webpack-boilerplate](https://github.com/doonguk/webpack-boilerplate)

[https://joshua1988.github.io/webpack-guide/](https://joshua1988.github.io/webpack-guide/)
