# 20220720

<details>
<summary>시간대별 정리</summary>

### 아침

회고 작성

다른 분들 회고 구경

### 오전

typescript

- class

연결리스트

- 이론공부

### 오후

무엇을 테스트할까?

react test환경 이해 및 예제 실습

### 저녁

코넥트

- 디자이너와 협업 준비
- 기획자 필요성
- WithUseInfiniteScroll, abortController

</details>
<br>

# 개인공부

## 1. Typescript es6 class

> 연결리스트를 구현하기 전에 typescript에서 es6 class를 사용하는 방법에 대해서 학습했다.

[typescript es6 class](https://www.notion.so/typescript-es6-class-ef499b34fff746c6b76ce49112d3c1f2)

- Typescript 클래스는 클래스 몸체에 클래스 프로퍼티를 사전 선언하여야 한다.
- Typescript 클래스는 클래스 기반 객체 지향 언어가 지원하는 접근 제한자(Access modifier) public, private, protected 를 지원하며 의미 또한 기본적으로 동일하다.
- Typescript의 경우, 접근 제한자를 생략한 클래스 프로퍼티와 메소드는 암묵적으로 public이 선언된다. 따라서 public으로 지정하고자 하는 멤버 변수와 메소드는 접근 제한자를 생략한다.
- **`readonly` vs `const`:** `readonly`와 `const` 중에 어떤 것을 사용할 지 기억하기 가장 쉬운 방법은 변수와 프로퍼티중 어디에 사용할지 질문해 보는 것이다. 변수는 `const`를 사용하고 프로퍼티는 `readonly`를 사용한다.

## 2. 프론트에서 테스트 코드

> 토이 프로젝트를 시작하기 전 `프론트엔드 환경에서 무엇을 테스트해야할까?` 에 대한 궁금증을 해소하기 위해 테스트 관련 내용을 학습했다.

[프론트에서 테스트코드](https://www.notion.so/755d8201e9684d44bca1987051ab05d8)

### 구분

`비즈니스로직, 유틸` → jest + react-test-library

`UI` → storybook

### 관점

한 번에 TDD를 적용하면서 코드를 짜기 어려울 수 있다. 테스트를 일종의 스펙의 관점에서 바라본다는 [[OKKYCON: 2018] 이혜승 - 테알못 신입은 어떻게 테스트를 시작했을까?](https://youtu.be/1bTIMHsUeIk) 유튜브 영상을 참고했다. 내가 짠 코드의 스펙을 하나씩 추가하는 방식으로 완성된 코드는 남겨두고, 테스트 케이스를 하나씩 작성해보려고한다.

### 어떤 코드를 테스트 할까?

- 사용자 관점에서 비즈니스와 관련된 로직
- 사용자 액션(event)에 따른 부수효과(sideEffect)
- 마크업이 제대로 렌더링되었는지

### 주의사항

좋은 테스트의 조건 중 하나는 "`내부 구현 변경 시 깨지지 않아야 한다`"이다. 즉 테스트를 할 때는 결괏값을 "어떻게" 만들어내는지가 아니라 결과물이 "무엇"인지를 검증해야 한다. 아래 요소들은 같은 결과라도 내부 구현은 리팩토링과정에서 충분히 변경될 수 있기 때문에 테스트 코드를 유지보수하는데 이익보다 비용이 더 클 수 있다.

- 세부적인 DOM요소에 특정 데이터가 있는 테스트할 필요 없다.
- 컴포넌트의 세부 구현 사항 (상태관리)는 테스트할 필요 없다.

## 3. React에서 테스트 코드

> [React 테스트 코드 짜기](https://www.notion.so/React-6ae2c3abfb4b40debb12cf70221e80e5) 에 학습내용을 정리하고 간단한 예제들을 따라해봤다.

**React Testing Library(RTL):** _React 컴포넌트를 테스트 하기 위해 만들어진 도구,_ \*\*\*\*세부적인 구현사항보다는 실제 사용자 경험과 유사한 방식의 테스트를 작성을 권고하는 패키지

**Jest:** RTL 권장 프레임워크. (RTL은 테스트 러너 또는 프레임워크가 아니기 때문에 테스트 프레임워크가 따로 필요하다.)

### render 메서드

`const result = render(<Component />`

컴포넌트를 렌더링 할 때에는 `render()` 라는 함수를 사용. 이 함수가 호출되면 그 [결과물](https://testing-library.com/docs/react-testing-library/api#render-result) 에는 DOM 을 선택 할 수 있는 [다양한 쿼리](https://testing-library.com/docs/dom-testing-library/api-queries)들과 `container` 가 포함. `container`는 최상위 DOM을 가르킨다.

### 쿼리

[쿼리 함수](https://testing-library.com/docs/queries/about/)들은 react-testing-library 의 기반인 [dom-testing-library](https://testing-library.com/docs/dom-testing-library/intro) 에서 지원하는 함수

다양한 쿼리함수들이 있는데 메뉴얼에는 다음과 같은 순서로 [우선순위](https://testing-library.com/docs/queries/about/#priority)를 두고 있다.

- **getBy\*** 쿼리 (ex. `getByTestId`, `getByText`, `getByRole`): 이 함수들은 **동기적**(synchronous)이며 그 요소가 현재 DOM 안에 있는지 확인한다. 그렇지 않으면 에러를 발생시킨다.
- **findBy\*** 쿼리 (ex. `findByText`): 이 함수들은 **비동기적**(asynchronous)이다. 그 요소를 찾을 때까지 일정 시간(기본 5초)을 기다린다. 만약 그 시간이 지난 후에도 요소를 찾을 수 없으면 에러를 발생시킨다.
- **queryBy\*** 쿼리: 이 함수들은 getBy\* 처럼 **동기적**이다. 하지만 요소를 찾을 수 없어도 에러를 발생시키지 않는다. 단지 `null` 값을 리턴한다.

### Action

사용자가 브라우저에서 이벤트를 발생시키는 것처럼, RTL은 얻어온 타겟을 이용해 이벤트를 발동시킬 수 있다.

fireEvent와 userEvent 두 개가 있지만 `[userEvent`를 사용할 것을 권장](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-testing-libraryuser-event)한다. 이 api는 내부적으로 `fireEvent`를 사용하며 실제 유저의 행동과 흡사한 기능을 추가로 제공하기 때문이다.

### Assertion

jest의 `expect` 메서드에 타겟을 인자로 넘겨 사용할 수 있으며 [유효성을 검증하는 방법](https://jestjs.io/docs/expect)들을 통해 확인할 수 있다.

# 코넥트

## 1. 디자이너와 협업

새로운 디자이너분께 기존에 작업하던 내용을 설명했드렸다. UI 용어정리 및 페이지별 핵심 기능을 설명해드렸는데, 이전까지 진행한 내용들이 정리되어 있지 않아 내용을 전달하는데 어려움을 겪었다.

## 2. 기획자 필요성, 전체 히스토리 및 백로그 관리 수정

디자이너분께 이전까지한 내용을 전달해드리면서 기획자에 대한 필요성을 느꼈다. 기획자가 없다보니 비즈니스 로직에 대한 정리가 일관적이지 못했다. 프론트를 리뉴얼하며서 `유저 스토리`를 정리하긴 했지만 아직 정돈된 느낌이 없다. 수정사항이 생각나면 프론트끼리 “어? 좋은데! 다음에 다른 파트랑 이야기하면서 적용해보자!” 이런식으로 넘어가는 경우가 많았다.

수정사항이 생기면 공통으로 정리할 백로그 칸반보드 같은게 없어서 생기는 문제라고 생각했다. 그래서 노션에 백로그 관리와 전달사항을 위한 회의록을 다시 만들었다.

## 3. WithUseInfiniteScroll

어제 WithLoading이라는 hoc를 만들었다. 그런데 단순한 fetch 요청이 아닌 무한스크롤 fetch요청이 들어간 컴포넌트에는 적용하기 어려웠다. WithLoading컴포넌트에 합쳐서 만들까하다가 적용하기 어려워 WithUseInfiniteScroll이라는 hoc를 따로 만들었다.

## 4. abortController

WithUseInfiniteScroll를 성공적으로 만든 후 데이터 fetch요청이 진행되는 도중 라우터 이동으로 인해 컴포넌트를 벗어나면 memory leak문제가 발생했다. setInterval같은 api는 clearInterval을 useEffect의 return부분으로 해결하면 되지만 fetch요청을 취소할 수 있는 방법이 생각나지 않았다.

구글링 통해 abortController가 있다는 것을 찾아 적용해서 문제를 해결했다. 우선 빠르게 적용하느라 mdn과 몇몇 블로그만 간단하게 보고 적용해서 이론적인 부분에 대한 추가학습이 필요하다.

[https://developer.mozilla.org/ko/docs/Web/API/AbortController](https://developer.mozilla.org/ko/docs/Web/API/AbortController)
