# 20220315

# 코드스쿼드

> prototype, 상속,innerHTML ,insertAdjacentHTML

클라이언트에서 돔 템플릿을 렌더링하고 이벤트를 달아주는 로직을 prototype을 활용해 구현해보려고 했다.

돔 요소들은 아래와 같은 구조를 상속받아서 사용한다.

```js
function HtmlElement(htmlTag, $parent) {
  this.$parent = $parent;
  this.$element = document.createElement(htmlTag);
  this.setTemplate();
  this.render();
}

HtmlElement.prototype.setTemplate = function () {
  this.$element.innerHTML = ``;
};

HtmlElement.prototype.render = function () {
  this.$parent.appendChild(this.$element);
  this.setEvent();
};

HtmlElement.prototype.setEvent = function () {};

export default HtmlElement;

function Main(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
}

Main.prototype = Object.create(HtmlElement.prototype);
Main.prototype.constructor = Main;
// Object.setPrototypeOf(Main.prototype, HtmlElement.prototype);

Main.prototype.setTemplate = function () {
  this.$element.id = 'main';
  this.$element.innerHTML = `메인`;
};

export default Main;

```

### 🤔 문제

innerHTML과 insertAdjacentHTML을 적절히 활용하는 방법을 알아야겠다. innerHTML이 템플릿을 짜고, 데이터를 넣을 때는 편하지만 공식문서를 보면 `요소(element)의 내용을 변경하는 대신 HTML을 문서(document)에 삽입하려면, insertAdjacentHTML() 메서드를 사용`하라고 나와있다.
