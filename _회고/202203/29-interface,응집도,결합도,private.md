# 29 - interface,응집도,결합도,private,네이밍

## 코드스쿼드

---

> store와 view를 잇는 interface 클래스 생성, soc, private하게 변수 관리하기

### 1\. store 객체에 private한 state 만들기

`수정 전`

아래와 같이 store 객체를 만들어 view에서 state에 직접 접근하지 않고 getState 메서드를 통해 접근했다.

하지만 여전히 View에서 store.state에 접근할 수 있는 문제가 생겼다.

```javascript
function Store(state) {
  this.state = state;
}
Store.prototype.getState = function () {};
Store.prototype.setState = function () {};

function View() {
  this.store = new Store();
}
View.prototype.setTemplate = function () {
  const { something } = store.getState();
};
```

`수정 후`

state를 this가 아닌 변수로 선언해 외부에서 접근하지 못하도록 만들었다.

```
function Store(state){
 let state = state;
}
Store.prototype.getState = function(){};
Store.prototype.setState = function(){};

function View(){
 this.store = new Store();
}
View.prototype.setTemplate = function(){
 const {something} = store.getState()
}

```

`수정하면서 고민한 내용들`

- prototype으로 만든 클래스에서 private 키워드 사용, 혹은 private하게 변수 관리하기
- private변수는 상속으로 못쓰나 → You can't inherit private in any language, only protected or public can be inherited
- You're trying to take classical concepts and apply them to *JavaScript*, and they just don't apply here. `There is no such thing as "public" or "private" in JavaScript, just closure`
- 그렇다면 class안쓰고 scope만으로 private하게 어떻게 만드니.... → 위의 방법처럼 변수로 할당

### 2\. store와 view를 이어줄 interface 만들기

위의 수정 후 코드는 store와 view를 분리했지만 서로의 의존성이 있는 상태다. 상태에 따라 뷰가 변할 수 있기 때문에 의존성을 없애는 건 불가능하다. 그렇다면 의존성을 어떻게 낮춰야할까?

단순히, store와 view를 다른 파일에 작성했다고 결합도(의존성)가 낮아지지 않는다. 둘 사이를 잇는 로직을 store나 view내부에 선언하지 않고 별도의 공간에서 로직을 선언해야 결합도가 낮아진다고 생각했다.

별도의 공간, 즉 서로를 이어주는 객체를 만들면 store와 view가 독립적으로 작동할 수 있을 것 같았다.  connectInterface라는 클래스를 만들어 store와 view가 서로는 모르지만, connectInterface를 통해 연결될 수 있도록 만들었다.

```javascript
export function ConnectInterface({ elements, store }) {
  this.elements = { ...elements };
  this.store = store;
}

ConnectInterface.prototype.connectStore = function () {
  Object.values(this.elements).map((element) => {
    element.getState = this.getStatefromStore.bind(this);
    element.setState = this.setStateToStore.bind(this);
  });
};

ConnectInterface.prototype.getStatefromStore = function (keysObj) {
  return this.store.getState(keysObj);
};

ConnectInterface.prototype.setStateToStore = function ({
  elementID,
  newState,
}) {
  const updatedState = this.store.setState(newState);
};
```

## 기타

---

### 1\. 관심사 분리

> 응집도, 결합도, 공(인터페이스)와 사(내부로직)을 분리

### 2\. 폴더와 파일 구조란?

유지보수가 용이하게 만드는 일이라고 생각한다. 한 파일 혹은 한 폴더에 모든 코드를 다 넣을 수도 있지만, 그렇지 않은 이유가 뭘까?

유지보수와 협업을 위해 필요하다고 생각한다.

당장 나 혼자 코드를 작성하면서 수정할 일 생길 때 기능별로 잘 분리해 놓으면 수정하기 용이할 것이다. 내가 다른 사람코드를 보거나 다른 사람이 내 코드를 볼 때도 네이밍이 잘 되어 있는 코드를 본다면 코드를 읽는게 훨씬 수월할 것이다.
