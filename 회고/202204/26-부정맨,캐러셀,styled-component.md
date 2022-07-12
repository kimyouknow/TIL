# 20220426

<details>
<summary>시간대별 정리</summary>

코드스쿼드 오프라인

- stlyed-component:

  - mixin
  - theme 접근 depth

- 레이아웃 스타일  고려
- 캐러셀

  - 재사용성을 고려해서 만들어보기

저녁

- 코드스쿼드 오프라인 학습 정리
- 알고리즘

  - 조합 구현

</details>
<br/>

# 알고리즘

구글링해서 찾은 조합 코드를 이해하려고 했는데, 쉽지 않다. 디버거를 활용해서 값을 하나씩 찍어보기전에 예상 흐름을 적어보려고 했는데 흐름이 잘 이해가지 않는다.

# 코드스쿼드

> 협업(부정맨), styled-component(mixin, theme), 캐러셀

오프라인으로 팀원과 같이 코딩하면서 나눈 얘기와 결정 사항들을 아래 정리해봤다. 정리하다보니 팀원이 좋은 의견을 많이 내주셨는데 내가 너무 내 의견만 고집한게 아닌가 싶다. 늘 열린 마음으로 의견을 받아드려야한다고 의식적으로 생각했지만, 막상 내 생각과 다른 의견을 들으면 부정맨처럼 일단 부정한게 아닐까 후회된다. 그렇다고 무조건 다른 사람 의견을 듣긴 어려우니, 상대방의 의견이 내 생각과 다를 땐 `장단점을 고려`해보고 결정해야겠다. 장단점을 파악하기 어려울 땐 `직접 코드로 짜보거나` 하는 등 `실천`해보고 결정을 해야겠다.

# styled-component (mixin)

scss에서 mixin을 사용하는 과정에서 다음과 같은 불편함을 발견했다.

1. theme.js 에서 mixin을 선언하기

- 로직 수정하기 힘듦
- 코드 길이는 비슷함

```javascript
// theme.js
const mixin = {
  flexBox: ({ direction = 'row', align = 'center', justify = 'center' }) => `
  display:flex;
  flex-direction:${direction};
  align-items:${align};
  justify-content:${justify};
  `,
};

export const theme = { fontSize, fontWeight, color, mixin };

// 특정component/style.js
export const Container = styled.div`
  // 1번
  ${({ theme: { mixin } }) => mixin.flexBox({ direction: 'column' })};
  // 2번
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-self: center;
`;
```

1. theme에서 선언하지 않고 별도의 js파일에서 함수로 export하기

- 1번과 크게 다르지 않음.

```js
// styles/mixin.js
export const FlexBox = ({ direction = "row", align = "center", justify = "center" }) => `
  display:flex;
  flex-direction:${direction};
  align-items:${align};
  justify-content:${justify};
  `,

// 특정component/style.js
export const Container = styled.(FlexBox)`
	// 1번
  ${({ theme: { mixin } }) => mixin.flexBox({ direction: "column" })};
	// 2번
		${flexBox( {direction: "column"})}
`;
```

### 결론

mixin을 사용하지 않고 그대로 쓰기로함. ( + 혹시 좋은 mixin 방법을 찾으면 써보기)

# theme에서 구조 분해 할당 깔끔하게 하기

props.theme.color.grey1 같이 특정 프로퍼티에 접근하기 위한 depth가 깊다. 이를 해결하기 위해 구조 분해할당을 사용해도 괄호가 많아져서 보기 좋지 못하다. 어떤 방법을 써도 depth가 깊기 때문에 복잡도는 그대로인데 해결할 수 있는 방법이 있을까?

```javascript
// 특정컴포넌트/style.js
const Container = styled.div`
  color: ${(props) => props.theme.color.grey1};
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
`;
```

1. 별도의 함수를 만들어서 복잡함을 숨기자

```javascript
//utils
import theme from "styles/theme";

function getDetailStyle(type, detail){
	return theme[type][detail]
};

// 특정컴포넌트/style.js
const Container = styled.div`
	color: ${getDetailStyle("color", "grey1")};
  font-size: ${getDetailStyle("fontSize", "medium")};
  font-weight: ${getDetailStyle("fontWeight", "bold")};
`};
```

- 복잡함은 줄어들지만 자동완성이 되지 않아서 불편함.(오타 발생에 취약)
- 하나의 속성이 아닌 여러 속성을 가져올 때를 고려하지 않았음. (예시: theme: {color, fontSize})

### 결론

- `${({ theme }) => theme.fontSize.medium};` 방식으로 결정

# 레이아웃

1. app 전체를 styled-component로 감싸고 스타일을 주기

- app 전체에 고정 너비와 마진이 적용되어 있어 divider 위치 주기 어려움. → 해결책이 있을까요?

```javascript
function App() {
  return (
    <div style={{ width: '1280px', margin: '0 auto' }}>
      <Header>네비게이션바</Header>
      <Divider style={{ width: '100vw', height: '2px', backGround: '#000' }} />
      <Main />
      <div className="Modal"></div>
    </div>
  );
}
```

1. app구성요소에 각각 styled-component를 주기

- 반복해서 속성을 줘야함.
- theme에서 공통으로 변수를 관리해야함.

```javascript
const HeaderContainer = styled.header`
  width: 100vw;
  height: 300px;

`;

const Header = styled.header`
  width: 1280px;
  height: 100%;
  margin: 0 auto;
`;

function App() {
  return (
    <>
      <HeaderContainer  style={{width: "100vw", height: "300px",
			 border-bottom: "1px solid black", margin-bottom: "30px"}}>
        <Header style={{width: "1280px", height: "100%",margin: "0 auto"}}>네비게이션</Header>
      </HeaderContainer>
      <Main  style={{width: "1280px", margin: "0 auto"}}/>
      <div className="Modal"></div>
    </>
  );
}
```

# 캐러셀

### 어려웠던 점

재사용성을 고려해서 캐러셀을 컴포넌트로 구현하려고 했다. `캐서셀 전체크기`, `이미지 한 개 크기`, `이미지를 몇 개 표시할지`, `이미지 사이의 갭(gap)` 등 고려해야할 변수가 많아서 어려웠다. 해당 변수를 `매직넘버`(이미지 한 개 크기: 300px, 캐러샐 전체크기: 1280px)로 구현한다면 기획서에 있는 UI대로 간단히 할 수 있지만 “추후에 변경사항이 생겼을 때 어떻게 하면 코드 수정을 최소화할 수 있을까?”를 생각하며 구현하려고 했다.

### 수도 코드로 본 캐러셀 컴포넌트

```js
<캐러셀 width={캐러셀 전체크기}>
	<캐러셀 헤더></ 캐러셀 헤더>
	<카드들 gap={이미지 사이 갭}>
		{카드배열.map(카드정보 => <카드 size={이미지 한개 크기} cardInfo={카드 정보} />)}
	</카드들>
</캐러셀>
```

1. `이미지 한 개 크기`, `이미지를 몇 개 표시할지`, `갭`를 기준으로 `캐러셀 전체 크기 정하기`

- 캐러셀 전체 크기는 부모 레이아웃에 의해서 결정되는 경우가 많아서 이미지 크기로 캐러셀 전체 크기를 결정하기 어려움.
- 캐러셀 전체크기 = 이미지 한 개 크기 \* 이미지 몇 개 표시할지 + (갭 \* (이미지 몇 개 표시할지 - 1))

1. `정해진 캐러셀 전체크기`, `이미지 개수`, `이미지 크기`로 `갭`만 구하기

캐러셀 전체크기 = theme의 변수로 관리(main의 width와 동일)

이미지 개수 = 3 (변경가능)

이미지 크기 = 캐러셀 전체크기 / 이미지 개수

갭 = ( 캐러셀 전체크기 - 이미지 크기 \* 3 ) / (이미지 개수 - 1)

- 갭을 계산할 때 생기는 문제들

  ```js
  function getCarouselDesign(width, imageCount, imageSize) {
    const size = imageSize;
    let count = imageCount;

    while (width < count * size) {
      if (count < 2) break;
      count -= 1;
    }
    const gap = Math.floor((1280 - imageSize * count) / (count - 1));
    // BUG: gap값 구할 때 count가 1이면 Infinity가 출력 됨
    return { gap, size };
  }
  ```
