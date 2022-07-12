# 20220302

# 데일리 스크럼

서버와 통신
cors 공부하면서 header세팅방법 공부
closure
event loop, callback Queue 자세한 구분(우선 순위가 있었음(then -> animation -> 일반))
nodejs 환경에서 event loop

# 코드 스쿼드

> sync, async, block, non-block, js엔진, callback Queue 세분화(micro task, macro task, Animation Frames)

미션을 진행하기에 앞서 비동기 동작 과정에 대해 공부했다. 비동기를 이해하려고 우선 sync, async, block, non-block 키워드로 구분해서 찾아봤다. 아직 조합에 따른 4가지 경우를 모두 이해하지는 못했지만 js는 non-block, async에 하는 것을 알았다.

js의 동작 과정을 어느 정도 이해했다고 생각했는데, promise와 then 혹은 중첩된 callback함수를 이해가 가지 않았다. 다행히 여러 공식문서들과 블로그에 정리가 잘되어 있어 개념을 이해하는데 어려움은 없었다. 또, [실제 동작을 볼 수 있는 외국 사이트](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) 이 사이트에서 동작 과정을 하나씩 분해해서 설명해줘서 더욱 이해하기 편했다.

# 코넥트

> hooks, mock data, 역할 분담 세분화

`hooks 반복 가능하게 만들어서 활용`

- TeamBoard에서 사용한 IntersectionObserver을 활용한 useInfiniteScroll를 반복가능해가 만들어 놓은 게 큰 도움이 되었다. UserBoard에도 같은 기능이 있어 어렵지 않게 구현할 수 있었다.

`mock데이터 관리 방법`

- 아직 api서버가 완료되지 않은 상태여서 mock데이터로 구현하는데 어려움을 겪고 있다. 현재 mock.js같은 파일들로 Js파일들을 불러와 작업하고 있는데, 추후 서버와 연동할 때를 대비해 json포맷으로 데이터를 받아와 주소만 바꾸면 똑같이 작동하도록 만들어야겠다.

`역할 분담을 더욱 세부적으로 하기`

남은 기간동안 개발을 하면서 역할 분담을 세부적으로 할 필요성을 느꼈다. 'userboard만들게요' 보다는 'userBoard에서 어떠 어떠한 부분을 구현하겠습니다.' 이런식으로 말해야 작업을 진행하면서 수정할 사항이 줄어들어 효율이 늘어날 것 같다.
