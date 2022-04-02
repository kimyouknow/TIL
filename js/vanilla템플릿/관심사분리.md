# 관심사 분리, Vanilla JS로 구현하기

[템플릿 코드가 있는 레포지토리](https://github.com/kimyouknow/soc-template)

## 소개하기 전에

---

나만의 패턴을 만들면서 구조 고민하기

어차피 프레임워크 쓸건데 왜하지?

왜 나눠야하지....

## 유지보수를 위해서

유지보수가 뭘까? 유지보수는 `변경사항이 있을 때 어떻게 대처할 수 있을까?`에 대한 문제라고 생각한다.

검색창을 예로 들어 보자.

검색창의 `핵심기능`은 input 값을 submit하면 해당 검색어와 연관되어 있는 페이지로 이동하는 것이다.

```
function handleSearchForm(){
 const $form = document.getElementById("jsForm");
 const $input = document.getElementById("jsInput");
 function handleSubmit (event){
   event.preventDefault()
   console.log($input.value);
   // 페이지 이동하기!
 }
 $form.addEventLister("submit", handleSubmit);
}
handleSearchForm();
```

![image](https://user-images.githubusercontent.com/71386219/161064462-2fb7d15f-bace-4cda-a9c9-29f3dda928a2.png)

검색창이 이렇게 간단하게 만들어서 동작한다면 좋겠지만 우리가 만드는 웹 서비스는 간단하지 않다.

검색창을 화면에 보여줄 때, 세부적인 `스타일`을 정해야하고, 일반 웹 뿐만 아니라 모바일 웹에서도 보여지는 스타일도 고려해야한다.  기능과 관련해서 최근검색어 목록, 검색 범위 옵션, 예상검색어 목록, 음성인식 등등 `다양한 부가 기능(서브 옵션)` 을 추가해야 좋은 ux를 가진 검색창을 만들 수 있다.

여러 서브 옵션들이 추가되면서 위의 예시처럼 input.value만으로 검색어 서비스를 유지하기 어려워졌다. 최근검색어 목록을 어디에 저장하지? 예상 검색어 목록을 어디에 저장하고 어떻게 받아와야할까?  서버에서 받아야 와야하는 데이터가 따로 있을까?

![image](https://user-images.githubusercontent.com/71386219/161064501-94e68852-2c5e-4c0b-ab29-59ffb8167565.png)

> 위의 질문을 해결해서 최종 검색창을 만들었다고 해보자!. 👏 👏 👏 👏 👏 👏

그런데 누군가 “검색 범위 옵션은 없어도 될 것 같은데?” 라는 의견을 제시했다. 이 때, 한 뭉텅이로 된 덩어리 코드라면 수정하는데 시간이 많이 필요할 수 있다. 어쩌면

수정하는 것보다 새로 만드는게 더 나을 수도 있다. 하지만 `핵심기능과 서브 옵션으로 구분해서 관심사를 분리한 코드`를 수정한다 검색 범위 옵션 기능만 `간단하게` 덜어낼 수 있지 않을까?

## 직접 만들어 본 이유

---

[만들면서 학습하는 리액트: 준비편](https://jeonghwan-kim.github.io/series/2021/04/05/lecture-react-ready.html 'https://jeonghwan-kim.github.io/series/2021/04/05/lecture-react-ready.html')

[Vanilla Javascript로 웹 컴포넌트 만들기 - 황준일](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/#_1-%25EC%25BB%25B4%25ED%258F%25AC%25EB%2584%258C%25ED%258A%25B8%25EC%2599%2580-%25EC%2583%2581%25ED%2583%259C%25EA%25B4%2580%25EB%25A6%25AC 'https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/#_1-%25EC%25BB%25B4%25ED%258F%25AC%25EB%2584%258C%25ED%258A%25B8%25EC%2599%2580-%25EC%2583%2581%25ED%2583%259C%25EA%25B4%2580%25EB%25A6%25AC')

> vanilla js webcomponent, vanilla js spa, js mvc pattern, vanilla js design pattern....

위의 검색어로 구글링을 하다보면 누군가 만들어 놓은 다양한 템플릿 코드들을 찾을 수 있다.

간단한 예시(todo list) 정도를 구현해 놓은 코드여서 개념을 이해하기 편했지만 계층적인 컴포넌트, 전역 상태, 클라이언트 데이터 관리, 서버 데이터 관리 등 빠진 부분이 많고 간소화 되었다는 느낌을 받다.

무엇보다 남들이 이미 생각해 놓은 코드보다는 내가 고민하는 과정이 더욱 의미있다고 생각했다. 따라할거면 그냥 프레임위크 쓰면 되니까?

## 용어 정리

---

### 응집도

- 비슷한 코드가 얼마나 뭉쳐져 있니?

### 결합도

- 서로 얼마나 관련있니?
- 특정 일을 처리하는 코드는 다른 일을 하는 코드에 영향을 덜 받는게 좋다.
- 하지만 결합이 없을 수 없다. 이 부분이 가장 어려웠다. 예를 들어, 데이터를 관리하는 store에서 데이터가 바뀌면 ui를 담당하는 뷰에게 알려줘야하는데 이 과정에서 결합이 생길 수 밖에 없다.
- 이러한 결합도를 낮추기 위한 고민과 노하우가 대부분의 설계 원리와 디자인 패턴에 녹아 있다.

### 인터페이스

- **공(인터페이스)**
- 다른 객체와 협력할 때 서로 맞춰야하는 부분
- 다시 말해, 다른 객체와 의존성이 있는 부분

- 다른 객체들이 해당 객체에 메세지를 보내서 요청할 수 있는 작업들

### 내부로직

- **사적인 부분(구현)**

- 내가 어떻게 상태를 저장하고 있는지, 어떤 식으로 일을 하는지

### Publish-Subscribe 패턴

- 완전히 새로운 개념이 아닌 생각보다 많이 쓰는 패턴
- element.addEventListner(type, listener)  구조에서 addEventListner는 subscriber가 되고, listener는 publicher라고 할 수 있나? 특정 이벤트에 어떤 함수를 구독하도록 만들고, DOM요소에 의해 액션이 발행되면 그 함수가 호출 되는 형태.
- promise도 설명가능. 우리가 미뤄둔 특정 액션이 완료되면 구독할 수 있게 하고, 데이터가 준비되면 발행하기
- fetch api는 특정한 네트워크 액션을 구독
- 리덕스? 스토어의 변화를 구독,

## 진행하면서 아쉬웠던 부분

---

### shallow copy vs deep copy

- js에서
  spread나 object.assing은 1 단계까지 밖에 복사가 안된다. 이중 배열이면 어렵다
  Json.stringify나 json.parse를 사용하면 몇 단계이더라도 깊은 복사가 가능하다.
- spread문법을 쓰면 원본을 건드리지 않고 새로운 값을 사용할 수 있다고 생각했는데 아니었다.
- redux에서도 관련 내용을 담았다.  [https://redux.js.org/usage/structuring-reducers/immutable-update-patterns/](https://redux.js.org/usage/structuring-reducers/immutable-update-patterns/)

### 설계에 대한 고민

- 내가 짠 코드가 목표한 대로 의존도를 제대로 낮춘 것일까?
- 수정해도 나아지지 않는다면 애초에 설계를 잘못한 게 아닐까?

## 진행하면서 얻은 부분

---

### 응집도와 결합도

### 유지보수를 왜 생각해야하는지

### 핵심기능과 서브 옵션을 분리해서 설계하기

### prototype class로 private하게 변수 관리하기

## 추가할 사항

---

### es6 class로 전환

### 서버에서 데이터 가져오기

### 전역상태관리

###

## 아래 코드에서 쓰이는 내가 생각한 용어

---

### Store

- 데이터를 가지고 있다.
- 데이터에 접근 및 수정기능

### View

- 템플릿 작성
- 화면에 렌더링
- 이벤트 등록

### Interface

- interface란? 외적인 부분을 연결해야하는 로직
- view와 store를 연결
- view와 store가 서로를 모르게 하는 중간자 역할
- 여러 개의 view를 하나의 store와 연결

### EventHandler

- view에서 발생한 이벤트를 처리하는 로직들

## 구현 목차

##

---

1. 뷰를 기준으로  컴포넌트를 나누기

- 계층적인 구조를 어떻게 표현할까?

3. 이벤트 리스너를 분리하기

- 단순히 파일만 나누는게 의미가 있을까?

5. 상태 관리 (store분리)

- store와 view 분리
- store의 state를 view에서 접근하지 못하도록 private하게 관리
- state가 바뀌면 view를 리렌더링

1. store와 view를 독립적으로 만들기(결합도를 낮추기)

- connectInterface 객체 만들기
- 하나의 store에 여러 element들을 묶을 수 있게 만들기

3. 서버 데이터와 클라이언트 데이터 상태 구분하기

- 서버에서 데이터 받는 로직 추가

5. 전역 상태 관리

## 구체적인 흐름

---

## 1\. 뷰를 기준으로 컴포넌트 나누기

### 1-1. 부모 엘리먼트를 타켓 엘리먼트가 알고 있기 

> [https://github.dev/kimyouknow/fe-shopping/tree/ebd968ec0c41e316f705229625185f5c4641a3d2](https://github.dev/kimyouknow/fe-shopping/tree/ebd968ec0c41e316f705229625185f5c4641a3d2)

```
export default function SearchBox(htmlTag, $parent) {
  this.$parent = $parent;
  this.$element = document.createElement(htmlTag);
  this.setTemplate();
  this.render();
  this.setEvent();
}

SearchBox.prototype.setTemplate = function () {
 this.$element.classList.add('search');
 new SeaerchOption('div', this.$element);
 new HistoryList('div', this.$element);
};
SearchBox.prototype.render = function () {};
SearchBox.prototype.setEvent = function () {
 this.$input.addEventListener('input', handleInput.bind(this));
};

function handleInput(event) {}

```

### 1-2.  부모엘리먼트에서 타겟 엘리먼트를 불러오기 

> https://github.dev/kimyouknow/fe-shopping/tree/bbcf98734358d1e545c3331a59327006797cd2f4

###

```javascript
export default function SearchBox($element) {
  this.$element = $element;
  this.setTemplate();
  this.render();
  this.renderChild();
  this.setEvent();
}
SearchBox.prototype.setTemplate = function () {
  return `
 <form>
  <div id="searchOtion"></div>
  <input />
  <div id="historyList"></div>
 </form>
`;
};
SearchBox.prototype.render = function () {};
SearchBox.prototype.renderChild = function () {
  const $searchOptionWrapper = this.$element.querySelector('#searchOption');
  const $historyWrapper = this.$element.querySelector('#historyList');
  new SeaerchOption($searchOptionWrapper);
  new HistoryList($historyWrapper);
};

SearchBox.prototype.setEvent = function () {
  this.$input.addEventListener('input', handleInput.bind(this));
};

function handleInput(event) {}
```

###

## 2\. 이벤트 리스너 분리하기

> [https://github.dev/kimyouknow/fe-shopping/tree/53f219e9c7fd250cf1dd47488d6f530caea46fbd](https://github.dev/kimyouknow/fe-shopping/tree/53f219e9c7fd250cf1dd47488d6f530caea46fbd)

- 단순히 파일만 분리해서 로직은 여전히 복잡함
- 상태 자체를 하나에서 관리해서 그런가

  - 아래와 같은 폴더구조에서 자동완성, 히스토리, 검색 옵션에 쓰는 상태 및 이벤트 핸들러를 모두 index.js에서 관리함.

```bash
SearchBox
├── AutoComplete
├── History
├── ScopeSelector
└── index.js

```

```javascript
// page/SearchBox/index.js
export default function SearchBox($element) {
  this.$element = $element;
  this.setTemplate();
  this.render();
  this.setEvent();
}

SearchBox.prototype.init = function () {
  this.state = {
    activeHistory: INPUT_DEFAULT,
    activeAutoTerm: INPUT_DEFAULT,
    showHistroy: true,
    option: '전체',
    inputValue: '',
    histroyList: myLocalStorage.get(HISTORY_LOCAL_STORAGE_KEY) || [],
    autoSearchList: [],
  };
};

SearchBox.prototype.setTemplate = function () {};
SearchBox.prototype.render = function () {};
SearchBox.prototype.setEvent = function () {
  this.$form = findTargetIdElement(this.$element, 'searhForm');
  this.$input = findTargetIdElement(this.$form, 'searchInput');
  this.$form.addEventListener('submit', handleSubmit.bind(this));
  this.$input.addEventListener('click', handleInputClick.bind(this));
  this.$input.addEventListener('keydown', handleInputKeyDown.bind(this));
  this.$input.addEventListener('input', handleInput.bind(this));
};

// page/SearchBox/eventHandler.js
function handleSubmit(event) {}
function handleInputClick(event) {}
function handleInputKeyDown(event) {}
function handleInput(event) {}
```

## 3\. 상태 관리

> 상태가 변경되었을 때 리렌더링하는 로직 및 뷰마다 상태를 분리해보기

### 3-1. 컴포넌트마다 store를 둬서 컴포넌트마다 쓰는 상태를 분리

- 컴포넌트마다 store를 둬서 관리하기, \`store와 view는 서로를 모르게 만들기\`

- connectStore(): store와 element를 연결
- reRenderHtmlElement(): store.newState가 일어나면 변경된 state를 가지고 있는 htmlElement를 리렌더링

### 🤔 문제점

- view에서는 store의 state에 직접 접근할 수 없게 하기 (private으로 관리하기)

  - 현재 view에서 this.store.state로 직접 접근 가능함

- 여러 자식이 있을 때, 자식에서 쓰는 state가 바뀔 때만 해당 자식 리렌더링하기(전체를 다시 렌더링하지 않기)

```javascript
// core/HtmlElement.js
export default function HtmlElement($element) {
  this.$element = $element;
  this.store;
  this.state;
}

HtmlElement.prototype.init = function (store) {
  this.store = store;
  this.render();
  this.setEvent();
};

HtmlElement.prototype.setTemplate = function () {
  return ``;
};

HtmlElement.prototype.renderChild = function () {};

HtmlElement.prototype.render = function () {
  const args = this.store.getState();
  this.state = {
    ...args,
  };
  this.$element.innerHTML = this.setTemplate();
  this.renderChild();
};

HtmlElement.prototype.setEvent = function () {};

// core/Store.js
export function Store($element) {
  this.$element = $element;
  this.state = {};
  this.init();
}

Store.prototype.getState = function (keys) {
  if (!keys) return this.state;
  // this.state에 있는 요소 중 key에 해당하는 요소들
  return {...요청한 keys에 따른 state들};
};

Store.prototype.setState = function (newState) {
  this.state = { ...this.state, ...newState };
  // 디버그용
  console.log(newState);
  this.$element.render();
};

//utils.js
export function setInheritance({ parent, child }) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

```

### 3-2. View에서 \`this.store.state\`로 접근 못하게 만들기 - private 

- 현재 view.store.state로 state를 받아오지는 않지만 접근은 가능한 상태

- \- \`getState()\`: store의 전체 state나 요청받은 state만 전달
- \- \`setState()\`: 상태가 바뀌면 state를 변경하고 연결되어 있는 $element.render()실행

```js
//core/store.js
export default function Store(props) {
  let state = props;
  this.getState = function (keys) {
    if (!keys) return state;
    // 생략
  };
  this.setState = function (newState) {
    state = { ...state, ...newState };
  };
}
```

## 4\. Store와 View를 독립적으로 만들기

> [https://github.dev/kimyouknow/fe-shopping/tree/eda5ec9482415834db5b5c6ddcebb57dfea0fab3](https://github.dev/kimyouknow/fe-shopping/tree/eda5ec9482415834db5b5c6ddcebb57dfea0fab3)

3번에서 store와 view를 분리했지만 서로의 `의존성`이 있는 상태다. 상태에 따라 뷰가 변할 수 있기 때문에 의존성을 없애는 건 불가능하다. 그렇다면 의존성을 어떻게 낮춰야할까?

단순히, store와 view를 다른 파일에 작성했다고 결합도(의존성)가 낮아지지 않는다.

둘 사이를 잇는 로직을 store나 view내부에 선언하지 않고 별도의 공간에서 로직을 선언해야 결합도가 낮아진다고 생각했다.

별도의 공간, 즉 `서로를 이어주는 객체`를 만들면 store와 view가 독립적으로 작동할 수 있을 것 같았다.  connectInterface라는 클래스를 만들어 store와 view가 서로는 모르지만, connectInterface를 통해 연결될 수 있도록 만들었다.

## Store

```
const searchBoxState = {
  activeHistory: INPUT_DEFAULT,
  activeAutoTerm: INPUT_DEFAULT,
  showHistroy: false,
  option: '전체',
  inputValue: '',
  histroyList: myLocalStorage.get(HISTORY_LOCAL_STORAGE_KEY) || [],
  autoSearchList: [],
};
const searchBoxStore = new Store(searchBoxState);
await searchBoxStore.init();
export default searchBoxStore;
```

## 인터페이스

```js
export default function ConnectInterface({ elements, store }) {
  // 하나의 view가 아니라 여러 개의 view가 하나의 store에 연결될 수 있음.
  this.elements = elements;
  this.store = store;
}

ConnectInterface.prototype.init = function () {
  this.store && this.connectStore();
  Object.values(this.elements).map((element) => element.init());
};

ConnectInterface.prototype.addElement = function ({ newElements }) {
  // 부모 view에 store를 연결했다가, 부모 아래 자식들도 store에 선언해야 할 때 사용
  this.elements = { ...this.elements, ...newElements };
  this.connectStore();
  Object.values(newElements).map((element) => element.init());
};

ConnectInterface.prototype.connectStore = function () {
  Object.values(this.elements).map((element) => {
    element.interface = this;
  });
};

ConnectInterface.prototype.getStatefromStore = function (keysObj) {
  return this.store.getState(keysObj);
};

ConnectInterface.prototype.setStateToStore = function ({ newState }) {
  const updatedState = this.store.setState(newState);
  this.reRenderHtmlElement({
    newState: updatedState,
  });
};

// 인터페이스에 등록된 view들을 모두 탐색하면서 새로 받은 상태(newState) 중 하나라도 포함한 view라면 해당 view를 다시 렌더링
ConnectInterface.prototype.reRenderHtmlElement = function ({ newState }) {
  Object.values(this.elements).map((element) => {
    Object.keys(newState).map((key) => {
      if (element.state.hasOwnProperty(key)) {
        element.render();
      }
    });
  });
};
```

위의 인터페이스를 객체를 인스턴스로 만들어서 사용하는 예제

### 초기 실행

```js
// util.js
export function initInferface({ elements, store }) {
  const connectInterface = new ConnectInterface({ elements, store });
  connectInterface.init();
}

//Main/index.js
Main.prototype.renderChild = function () {
  const $searchBoxWrapper = this.$element.querySelector('.search');
  const $searchBox = new SearchBox({ $element: $searchBoxWrapper });
  initInferface({ elements: { $searchBox }, store: searchBoxStore });
};
```

### 자식요소를 인터페이스에 추가

```js
// SearchBox/index.js 예시
SearchBox.prototype.renderChild = function () {
  const $scopeSelector = new ScopeSelector({ $element: $scopeSelectorWrapper });
  const $historyList = new HistoryList({ $element: $historyWrapper });
  const $autoComplete = new AutoComplete({ $element: $autoWrapper });
  this.interface.addElement({
    newElements: { $scopeSelector, $historyList, $autoComplete },
  });
};
```

### 상태 가져오기 및 상태 변경하기

```javascript
// SearchBox/eventHandler.js - 이벤트에 의해 변경될 상태를 가져오고 변경하기
export function handleSubmit(event) {
  event.preventDefault();
  const { inputValue, option, histroyList } = this.interface.getStatefromStore({
    inputValue: null,
    histroyList: null,
  });
  const updatedHistroyList = handlehistroyList(histroyList, inputValue);
  this.interface.setStateToStore({
    newState: { inputValue: '', histroyList: updatedHistroyList },
  });
}

// SearchBox/HistoryList/index.js - 엘리먼트에서 쓸 상태 등록(리렌더링을 위해)
HistoryList.prototype.beforeRender = function () {
  this.state = {
    ...this.interface.getStatefromStore({
      histroyList: null,
      activeHistory: null,
      showHistroy: null,
    }),
  };
};
```

## 🔍 참고자료

---

\[번역\] 초보 프론트엔드 개발자들을 위한 Pub-Sub(Publish-Subscribe) 패턴을 알아보기 - [rinae's devlog](https://www.rinae.dev/)  
[Observer패턴과 Publisher/Subscriber 패턴의 차이점 - jistol.github.io](https://jistol.github.io/software%20engineering/2018/04/11/observer-pubsub-pattern/)

[MVC 창시자가 말하는, MVC의 본질 - tistory](https://velog.io/@eddy_song/mvc)  
[소프트웨어 설계의 근본 원칙, 관심사의 분리 - tistory](https://velog.io/@eddy_song/separation-of-concerns)
