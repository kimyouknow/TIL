# 20220411

[#코드스쿼드](upnote://x-callback-url/tag/view?tag=%EC%BD%94%EB%93%9C%EC%8A%A4%EC%BF%BC%EB%93%9C '#코드스쿼드')

# 코드스쿼드

> custom event, htmlElement렌더 로직, 협업

## Custom event

---

custome event를 활용하면 nodejs의 event emitter와 같이 emit,on 을 만들어서 사용할 수 있다는 사실을 알았다.

## html 렌더링 로직 고민

---

htmlElement를 어떻게 렌더링해야할까. 탬플릿을 엔진을 쓰면 간단해질까? 우선 js로 화면 구성에 필요한 모든 html을 만들 때, 여러 가지 방법을 고민해 봤다.

1.  부모에서 템플릿 코드 + 자식요소는 innerHtml
2.  본인이 직접 렌더링
3.  react처럼 함수형으로 만들기

### 1\. 부모에서 템플릿 코드 + 자식요소는 innerHtml

```javascript
// Parent
class Parent {
  constructor($element) {
    this.$element = $element;
  }
  setTemplate() {
    return '<div id="child"></div>';
  }
  renderChild() {
    const $childWrapper = document.querySelector('#child');
    const $child = new Child($childWrapper);
  }
  render() {
    this.$element.innerHtml = this.setTemplate();
  }
}
// Child
class Child {
  constructor($element) {
    this.$element = $element;
  }
  setTemplate() {
    return '<div></div>';
  }
  render() {
    this.$element.innerHtml = this.setTemplate();
  }
}
```

단점

- innerHTml을 써서 Js로직과 dom text로직이 섞여있다.
- 템플릿을 만들고 자식을 렌더링할 때 dom탐색을 다시 실시해야한다.

장점

- 템플릿이 깔끔하게보인다. 본인이 어떤 자식요소를 가지고 있는지 한 눈에 볼 수 있다.

###

### 2.  본인이 직접 렌더링

```javascript
// Parent
class Parent {
  constructor() {
    this.$element = document.createElement('div');
  }
  setTemplate() {
    const $child = new Child();
    this.$element.append($child.render());
  }
  render() {
    return this.$element;
  }
}
// Child
class Child {
  constructor() {
    this.$element = document.createElement('div');
  }
  setTemplate() {}
  render() {
    return this.$element;
  }
}
```

단점

- 템플릿을 어떻게 처리해야할지 모르겠음.
- innerHtml을 안쓰고 할려면 상태가 필요 없는 마크업은 어떻게 처리해야할까?

장점

- view가 wrapper와 innerHtml 분리하지 않아 통일됬음

### 3\. react처럼 함수형으로 만들기

```
function parent(){
 let state = {}
 return `
  ${child()}
 `
}
function child(){
 return `<div></div>`
}
```

아직 구현해보지 않아서 장단점을 모르겠다. 그런데 react의 함수혀 컴포넌트를 그대로 따라한 느낌이라 나만의 로직으로 변경할 필요가 있다.
