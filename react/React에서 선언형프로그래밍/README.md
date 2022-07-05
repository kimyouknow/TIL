# React에서 선언형프로그래밍

> (react에서)선언형이 무엇인가에 대한 내용은 [Imperative and Declarative Programming](https://medium.com/@Ancyr/imperative-and-declarative-programming-e04b48887ab6)을 참고(거의 그대로 번역)했습니다.

# React의 장점

기본 성능(underlying performance)이 좋다( feat. virtual DOM)

all-in-one-file 컴포넌트 프로그래밍

jsx문법

가장 좋은 점은 js로 선언형 프로그래밍이 가능하다! (**declarative way of writing JS**)

## 선언적 UI

> _View = Render(Props)_

코드를 간단히 살펴보는 것으로 컴포넌트가 어떻게 동작할지 예상할 수 있다.

**선언적 UI의 장점**

- 실제 렌더링 구현에 신경 쓸 필요가 없습니다.
- 코드가 더 예측가능하다.
- 프로그램의 복잡도를 줄인다.

이러한 장점은 효과적으로 사용하기 위해 선언적 프로그래밍과 명령형 프로그래밍의 차이점, 그리고 어떻게 선언적 프로그래밍을 짜야하는지 알아보자!

## 명령형 프로그래밍 vs 선언형 프로그래밍

```jsx
const numbers = [1, 2, 3, 4, 5, 6];

// Imperative(명령형)
let result = 0;
for (let i = 0; i < numbers.length; i++) {
  if (number[i] % 2 === 0) {
    result += numbers[i] * 2;
  }
}

// Declarative(선언형)
const result = numbers
  .filter((i) => i % 2 === 0)
  .map((i) => i * 2)
  .reduce((acc, cur) => acc + cur);

// Even more declarative
const isPair = (i) => i % 2 == 0;
const double = (i) => i * 2;
const sum = (a, b) => a + b;
const result = numbers.filter(isPair).map(double).reduce(sum);
```

1. 명령형 프로그래밍

흔히 우리가 짜는 코드라고 할 수 있다. 코드를 읽으면 코드가 어떤 동작을 하는지 충분히 파악할 수 있다. 하지만 의도를 한 눈에 파악하기 어렵다. 이보다 더 길고 복잡한 코드가 있다면 파악하는데 더 오래걸릴 수 있다.

1. 선언형 프로그래밍

코드란 기본적으로 영어(혹은 다른 언어)로 표현된다. `i % 2 === 0`라는 코드는 짝수인 경우에만 true를 반환한다고 추론해야한다. 하지만 우리는 코드가 아닌 `언어의 관점에서 이해`하기 때문에 의미가 조금 더 명확하게 의미를 매핑하는 과정이 필요하다. 다시 말해, `변수와 함수명으로 미리 우리가 아는 언어로 표현한다면, 코드를 읽을 때 코드를 생각으로 번역하는 과정이 줄어든다.`

## [Imperative and Declarative Programming](https://medium.com/@Ancyr/imperative-and-declarative-programming-e04b48887ab6)에서 제시하는 의문점

> 하지만 선언형 프로그래밍은 여전히 보이지 않는 곳에서 명령형 프로그래밍을 사용하므로, 순수한 선언적 코드를 작성하는 것은 불가능해!

글을 정리하면서 나도 비슷한 생각을 했다. 어쨌든 컴퓨터가 내부적으로 코드를 이해하려면 명령형 프로그래밍을 사용하지 않나? 이에 대한 답변으로 원본의 글쓴이는 다음과 같은 대답을 했다.

`틀린 말은 아닙니다. **컴퓨터는 선언적 코드를 이해하지 못하며,**자신이 해야 할 의무와 그 방법을 단계별로 알려줘야만 하는 기계입니다. 그러나 핵심은 순수한 선언적 코드를 작성하는 게 아닙니다. 명령적 코드를 한계까지 밀어붙여 구현 세부 사항이 나타도록하는 것입니다.`(But the main point is not to write pure declarative code, it’s to push imperative code to its limits : **the implementation detail**)

## 그렇다면 React에서 내부적인 동작은 어디서 처리하지?

React에서 제공하는 함수형 프로그래밍을 사용한다면 우리는 React를 UI 라이브러리로써 JSX를 반환하는 함수로 생각할 수 있다. 모든 복잡한 일은 렌더러에서 처리한다. 생명주기, 언제 리렌더링이 될 것인지, 어떻게 리렌더링이 될 것인지 등등.. 우리는 컴포넌트와 관련 작업에만 집중할 수 있게된다.

# 추가학습 내용

## 1. 함수형 프로그래밍

> 순수 함수를 합성하고, 부작용을 피하며, 불변 데이터를 사용하여 소프트웨어를 구축하는 프로그래밍

함수형 프로그래밍은 본질적으로 선언형 프로그래밍 스타일입니다. 둘은 서로에 대해 언급하지 않고는 제대로 설명하기 어렵습니다. 함수형 테크닉을 사용하지 않고도 선언형 프로그래밍을 할 수 있지만, 두 가지를 결합하면 **훨씬 더 강력해집니다.**

함수형 프로그래밍의 장단점은 별도의 추가학습을 해야합니다.

## 2. React 생명주기

우리가 컴포넌트를 선언적으로 사용하기 위해선 React가 내부적으로 어떻게 동작하는지 알아야한다.

```jsx
// Even more declarative
const isPair = (i) => i % 2 == 0;
const double = (i) => i * 2;
const sum = (a, b) => a + b;
const result = numbers.filter(isPair).map(double).reduce(sum);
```

isPair는 우리가 선언한 함수일 뿐 내부적인 동작은 해당 함수의 내부를 살펴보야아 한다. React도 마찬가지라고 생각한다. Suspense, Error-boundary 등의 React에서 제공하는 선언형 프로그래밍 툴을 사용하기 위해선 React가 내부적으로 해당함수를 어떻게 처리해야하는지 알아야한다. 그 바탕은 [생명주기](https://ko.reactjs.org/docs/state-and-lifecycle.html)라고 할 수 있다. 내부로직을 다른 곳으로 위임하기 위해선 동작원리를 이해한다.

## 3. 추상화

선언적 프로그래밍은 추상화와 관련있다고 생각했다.

\***\*[토스ㅣSLASH 21 - 실무에서 바로 쓰는 Frontend Clean Code](https://www.youtube.com/watch?v=edWbHp_k_9Y&t=987s) 해당 영상에서 강조한**

- 함수의 복잡한 로직을 단순히 숨기지 말 것
- 짧은 코드가 아니라 원하는 로직을 빠르게 찾을 수 있는 코드
- 함수의 이름과 전달하는 파리미터로 ‘무엇'을 하는 함수인지 빠르게 이해 가능

등의 원칙은 `어떻게 해야 선언적 프로그래밍을 적절하게 사용할 수 있을까?`에 대한 답이 될 수 있다고 생각한다.
