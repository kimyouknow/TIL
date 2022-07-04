# Intersection Observer API

> `타겟 요소(target)`와 상위 요소 또는 최상위 document 의 `viewport` 사이의 intersection 내의 변화를 비동기적으로 관찰하는 방법

## 동작 원리

Intersection Observer API를 사용하면 감시하고자 하는 요소가 다른 요소(viewport)에 들어가거나 나갈때 또는 요청한 부분만큼 두 요소의 교차부분이 변경될 때 마다 실행될 콜백 함수를 등록할 수 있음. 즉, 사이트는 요소의 교차를 지켜보기 위해 메인 스레드를 사용할 필요가 없어지고 브라우저는 원하는 대로 교차 영역 관리를 최적화 할 수 있어진다.

비동기적으로 실행되기 때문에 scroll 같은 이벤트 기반의 요소 관찰에서 발생하는 렌더링 선능 이나 이벤트 연속 호출 같은 문제 없이 사용 가능하다.

## 활용예시

- 페이지가 스크롤 되는 도중에 발생하는 이미지나 다른 컨텐츠의 지연 로딩.
- 스크롤 시에, 더 많은 컨텐츠가 로드 및 렌더링되어 사용자가 페이지를 이동하지 않아도 되게 하는 infinite-scroll 을 구현.
- 광고 수익을 계산하기 위한 용도로 광고의 가시성 보고.
- 사용자에게 결과가 표시되는 여부에 따라 작업이나 애니메이션을 수행할 지 여부를 결정.

## 컨셉과 사용

new IntersectionObserver()를 통해 생성한 인스턴스(io)로 관찰자를 초기화하고 관찰할 대상(Element)을 지정한다. 생성자는 2개의 인수(callback, options)를 가진다.

### options

`root`

- 타겟의 가시성을 검사하기 위해 뷰포트 대신 사용할 요소 객체(root)를 지정
- 타켓의 조상요소이어야 하고, 지정하지 않거나 null일 경우 브라우저의 뷰포트가 기본

`rootMargin`

- margin을 활용해 root 범위를 확장하거나 축소할 수 있다.
- css의 margin처럼 4단계로 설정 가능하며 px, % 단위를 꼭 입력해야 한다.
- 예를 들어, -100px이면 root범위가 안쪽으로 줄어들고, +100px이면 root 범위가 바깥쪽으로 늘어난다.

`threshold`

- observer가 실행되기 위해 타켓의 가시성이 얼마나 필요한지 백분율로 표시.
- 0부터 1까지의 값으로 설정 가능
- 예를 들어, 0이면 타겟이 root의 끝에 걸쳐있을 때바로 실행, 0.5보면 타겟이 root의 끝 기준으로 절반넘어왔을 때, 1이면 타켓이 root의 끝을 완전히 넘어갔을 때 실행.

### callback

타켓(관찰할 대상)이 등록되거나 가시성에 변화가 생기면 관찰자는 콜백을 실행. 콜백은 2개의 인수(entries, observer)를 가진다.

`entries`

IntersectionOberverEntry 인스턴스의 배열, 읽기 전용임.

- boundingClientRect: 관찰 대상의 사각형 정보(DOMRectReadOnly)
- intersectionRect: 관찰 대상의 교차한 영역 정보(DOMRectReadOnly)
- intersectionRatio: 관찰 대상의 교차한 영역 백분율(intersectionRect 영역에서 boundingClientRect 영역까지 비율, Number)
- isIntersecting: 관찰 대상의 교차 상태(Boolean)
- rootBounds: 지정한 루트 요소의 사각형 정보(DOMRectReadOnly)
- target: 관찰 대상 요소(Element)
- time: 변경이 발생한 시간 정보(DOMHighResTimeStamp)

`observer(targert Element)`

콜백이 실행되는 해당 인스턴스를 참조한다.

### Methods

`observe(target Element)`

- 대상 요소의 관찰을 시작

`unobserve()`

- 대상 요소의 관찰을 중지
- 관찰을 중지할 하나의 대상 요소를 인수로 지정
- 단, intersecionObserver 인스턴스가 관찰하고 있지 않은 대상 요소가 인수로 지정된 경우 아무런 동작도 하지 않는다.
- observer가 해당 인스턴스를 참조

`disconnect()`

- IntersectionObserver 인스턴스가 관찰하는 모든 요소의 관찰을 중지

## 예시

```js
import { useCallback, useEffect, useRef, useState } from 'react';

function useInfiniteScroll({ fetchData }) {
  const [page, setPage] = useState(1);
  const target = useRef(null);
  const [loading, setLoading] = useState(false);
  const fetchMore = useCallback(async () => {
    setLoading(true);
    setPage((prev) => prev + 1);
    await fetchData();
    setLoading(false);
  }, [page]);

  const handleObsever = useCallback(
    async ([entry], observer) => {
      if (!entry.isIntersecting || !target) {
        console.log('화면에서 제외됨');
        return;
      }
      console.log('화면에서 노출됨', page);
      observer.unobserve(entry.target);
      await fetchMore();
      observer.observe(target.current);
    },
    [loading],
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    let observer;
    if (!loading && target) {
      observer = new IntersectionObserver(handleObsever, option);
      observer.observe(target.current);
    }
    return () => observer.current && observer.disconnect();
  }, [target]);
  return [page, target, loading];
}

export default useInfiniteScroll;


function Wrapper(){
  const dispatch = useDispatch
  const [teamList, setTeamList] = useState(teamArray);
  const fetchData = async () => {
    const { payload } = await dispatch(getTeamArr(page));
    setTeamList((prev) => [...prev, ...payload]);
  };
  const [page, target, loading] = useInfiniteScroll({ fetchData });
  return (
    <>
    <BoardWrapper>
      {teamList.length !== 0 &&
          teamList.map((teamElement, idx) => (
            <TeamCard key={uuid()} teamInfo={{ ...teamElement, idx }} />
          ))}
    </BoardWrapper>
    <div ref={target}>{loading && <Loader />}</div>
    </>
})
```

🔍 참고자료

- [Intersection Observer API - mdn](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)
- [Intersection Observer - 요소의 가시성 관찰](https://heropy.blog/2019/10/27/intersection-observer/)
- [react-Intersection-Observer를-사용하여-인피니트-스크롤-구현하기](https://godsenal.com/posts/React-Intersection-Observer를-사용하여-인피니트-스크롤-구현하기/)
