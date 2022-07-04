# 구현 방식

protected라우팅을 구현할 때 hoc를 사용해봤다.

## 1. 컴포넌트를 전달 받아서 렌더링

```tsx
interface PrivateRouteProps {
  Component: ComponentType;
  isLogin: boolean;
}

export default function PrivateRoute({
  Component,
  isLogin,
}: PrivateRouteProps) {
  return isLogin ? (
    <Component />
  ) : (
    <NotAllow warnMessage="로그인하지 않은 유저는 접근할 수 없다." />
  );
}

function App() {
  const isLogin = 로그인여부를판단하는함수();
  return (
    <div>
      <Route
        path="/issue:id"
        element={<PublicRoute Component={Login} isLogin />}
      />
    </div>
  );
}
vsc;
```

# 어려웠던 점

## 1. react component의 type 지정 종류가 많다.

우선 function components와 class component를 구분해서 생각했다. 이후 react의 소스코드를 보며 타입들을 정리해봤다. 나중에 필요할 때마다 검색해서 사용하면 될 듯하다.

> **Functional components** return `ReactElement | null`, so it cannot return a bare string or an array of ReactElements.
> **Class components'** render function return `ReactNode`, so there shouldn't be any problem.

### FC(FunctionComponent)

[[Typescript] FunctionComponent (FC) 사용 줄이기](https://woobiblog.com/Javascript/Typescript_FunctionComponent_FC_사용_줄이기)

[React.FC를 사용하지 않는 이유](https://yceffort.kr/2022/03/dont-use-react-fc)

```tsx
type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
  (props: P, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}
```

### ReactNode

```tsx
type ReactText = string | number;
/**
 * @deprecated - This type is not relevant when using React. Inline the type instead to make the intent clear.
 */
type ReactChild = ReactElement | string | number;

/**
 * @deprecated Use either `ReactNode[]` if you need an array or `Iterable<ReactNode>` if its passed to a host component.
 */
interface ReactNodeArray extends ReadonlyArray<ReactNode> {}
type ReactFragment = Iterable<ReactNode>;
type ReactNode =
  | ReactElement
  | string
  | number
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;
```

### **ReactElement**

JSX 문법은 React.createElement(component, props, ...children)을 사용하도록 코드가 변환된다.

```tsx
type JSXElementConstructor<P> =
  | ((props: P) => ReactElement<any, any> | null)
  | (new (props: P) => Component<any, any>);

interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
> {
  type: T;
  props: P;
  key: Key | null;
}
```

### JSX.Element

props와 type의 타입이 any인 generic인 ReactElement

```tsx
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    // 생략
  }
}
```

### React.ComponentType

```tsx
type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
```

### React.ElementType

```tsx
type ElementType<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K]
        ? K
        : never;
    }[keyof JSX.IntrinsicElements]
  | ComponentType<P>;
```

## 2. ⚠️ JSX element type does not have any construct or call signatures

> 선언된 컴포넌트를 생성하지 않고 그대로 전달해야 JSX가 컴파일 되면서 자동으로 인스턴스화 된다. 이미 인스턴스화 된 컴포넌트를 JSX에서 사용했기 때문에 타입스크립트가 "해당 컴포넌트**는 생성자가 없습니다**
> " 라고 불평하는것이다. `인스턴스를 전달하지 않고 클래스형 혹은 함수형 컴포넌트 자체를 전달해야한다.`

아래와 같이 hoc 컴포넌트 `props interface로 JSX.element`를 지정했더니 에러가 발생했다.

```tsx
interface PrivateRouteProps {
  Component: JSX.Element;
}

export default function PrivateRoute({ Component }: PrivateRouteProps) {
  return isLogin ? (
    <Component />
  ) : (
    <NotAllow warnMessage="로그인하지 않은 유저는 접근할 수 없다." />
  );
}

// App.tsx
export default App () {
 return <Route path="/issues" element={<PrivateRoute Component={Issues} />} />
}
```

우리가 집중해야할 부분은 Copnent로 넘기는 props가 `실제 JSX.element` 인지( `<div />, <h2 />`) 아니면 `컴포넌트`인지 구분하는 일이다. `우리는 Component라는 props로 실제 컴포넌트를 넘기는지 아니면, JSX.element 넘기는지 비교해야한다.`

다음의 예시를 비교해보자

1번: `Component={<Heading />}`

2번: `Component={(props) => <h2>Hello world</h2>}` === `Component={Heading}`

**1번은 react 컴포넌트를 전달하지만, 2번은 JSX element를 반환하는 함수를 전달한다.**

하지만 아래처럼 타입을 잘 지정해도 에러가 발생한다.

```tsx
interface PrivateRouteProps {
  Component: JSX.Element;
}

export default function PrivateRoute({ Component }: PrivateRouteProps) {
  return isLogin ? (
    <Component /> // ⚠️ JSX element type does not have any construct or call signatures
  ) : (
    <NotAllow warnMessage="로그인하지 않은 유저는 접근할 수 없다." />
  );
}

// App.tsx
export default App () {
 return <Route path="/issues" element={<PrivateRoute Component={<Issues />} />} />
}
```

아직도 에러가 발생하는 이유는 Component가 JSX.Element가 아닌 `JSX.Element를 반환`하는 함수이기 때문이다.

```tsx
interface PrivateRouteProps {
  Component: () => JSX.Element;
}

//생략
```

정리하자면, `JSX.Element는 <div />` 이런 애들이고, `React.ComponentType은` 소스코드를 보면 함수형 컴포넌트를 반환하는 것을 알 수 있고, `React.ElementType`는 JSX 내장 함수 (문자열)도 포함한다는 점을 제외하고 `[React.ComponentType](https://runebook.dev/ko/docs/flow/react/types#toc-react-componenttype)와 유사하다.`

`JSX.Element → 내부적으로 컴파일 할 때, react.createElement로 만들어진 element를 반환!`

**출처**

- [https://runebook.dev/ko/docs/flow/react/types](https://runebook.dev/ko/docs/flow/react/types)
- [JSX element type does not have any construct or call signatures](https://bobbyhadz.com/blog/react-jsx-element-type-does-not-have-any-construct)
- [https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb](https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb)
- [https://bakery-it.tistory.com/59](https://bakery-it.tistory.com/59)
