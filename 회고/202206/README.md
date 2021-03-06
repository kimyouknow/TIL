# 6월 월간 회고

# 코드스쿼드

> OAuth, 로그인 유지, 서버상태관리,

## OAuth 이해

OAuth를 구현할 때면 늘 서버 분들이 하라는 대로 구현했다. 혹은 강의에서 하라는대로 따라쳤다. 적어도 두 세번은 OAuth를 구현했지만 늘 이해하지 못하고 넘어갔다. 수동적인 자세로 구현하다보니 새로운 문제를 마주하게 되면 다른 사람이 해결해주길 기다리고, 비슷한 상황을 겪은 블로그 글들을 찾기 바빴다.

어렵다고 그냥 넘어가면 앞으로도 이해하지 못할 것 같아서 이번 기회에 express를 활용해 local 서버를 만들어 oauth를 직접 구현해봤다. 확실히 직접 구현해보니 내가 어느 부분에서 헷갈려했는지 정리할 수 있었다. 또한, 내가 이해한 부분과 백앤드분들이 이해한 부분을 맞추면서 구현하다보니 시간은 좀 걸렸지만 예상치 못한 버그나 수정사항이 생겼을 때 더욱 빠르게 해결할 수 있었다.

## 서버상태관리필요성 - 서버상태 최신화

우리가 만들려는 서비스는 정적사이트가 아닌 was를 이용한 동적으로 데이터가 변하는 사이트다. 이 때, 프론트는 UI 표현 뿐만 아니라 서버 상태를 적절하게 반영해야한다. 어떤 서버 상태의 추가/수정/삭제 작업 후 서버의 최신화된 상태를 다시 받아야와야 하는데 이를 어떻게 우하하게(?) 해결할 수 있을가 고민했다.

react-query나 swr를 활용해 조금 쉽게 접근해볼까했지만 그 전에 fetch만으로 서버상태를 적절히 반영하는 걸 시도해보고 싶었다. (어쨋든 위의 새로운 기술들도 어떤 문제를 해결하기 위해 등장했으니, 그 문제를 겪어봐야 더 와닿을 것 같았다.)

백앤드 분들과 GET/POST/DELETE/PATCH/PUT 등의 다양한 api를 설계하면서 여러 방식을 함께 고민했다.

상태관리라고 하면 로컬 상태만 떠올렸는데, 서버 상태도 중요하다는 걸 이번에 공부하면서 느꼈다. (오히려 이번 프로젝트 같은 경우 로컬 상태는 거의 없었다.)

### 여러 목록에 대해 추가/수정/삭제 요청(서버 상태 update) 이후 최신화를 어떻게 할지

이번 프로젝트 요구사항을 확인하면서 어떠한 서버상태의 추가/수정/삭제 작업 후 서버의 최신화된 상태를 다시 받아와야하는 경우가 많을 것 같다고 생각했습니다.

위 작업에 대해서 아래와 같이 3가지 방법을 생각해봤는데 백엔드 팀원과 함께 각각의 장단점을 비교해본 후 1`번 방식을 사용하기로 결정`했습니다. 프론트에서 위와같은 상황이 자주 있을 것 같은데 혹시 리뷰어분께서는 아래 방식들에 대해 어떻게 생각하시는지 궁금합니다.

1번을 선택한 이유는 단점인 두번의 네트워크 요청이 큰 단점은 아니라고 생각했고 react-query를 공부해본건 아니지만 이번 미션에서 사용할 상태관리 라이브러리를 선택하기 위해 여러 정보를 찾아보던 중

react-query의 장점으로 `get을 한 데이터에 대해 update를 하면 자동으로 get을 다시 수행한다. (예를 들면 게시판의 글을 가져왔을 때 게시판의 글을 생성하면 게시판 글을 get하는 api를 자동으로 실행 )` 라는 [글](https://kyounghwan01.github.io/blog/React/react-query/basic/#react-query-장점)을 보게되어

프론트에서 서버 데이터를 update 후 다시 get하는 작업이 자주 발생하는 상황이어서 해당 작업을 편하게 해주는 위와같은 라이브러리가 만들어진것이 아닐까? 라고 생각해 1번 방식을 사용하기로 결정했습니다.

1. **추가/수정/삭제 요청 → 서버에서 성공 메세지 받기 (별도의 데이터는 받지 않음) → 다시 get 요청해서 목록 전체 받기**

장점

- 프론트에서 로컬 데이터를 최신화 로직을 줄일 수 있다.
- 서버상태를 확실하게 반영할 수 있다.
  단점
- 하나의 액션에 네트워크 요청이 두 번 필요하게 됨.

1. **추가/수정/삭제 요청 → 해당요청의 응답으로 최신화된 목록 전체 받기**

   장점:

   - 프론트 로직이 줄어들고
   - 서버상태를 확실하게 반영할 수 있다.

   단점:

   - 상태를 다 바꿔서 모두 렌더링

**3. 추가/수정/삭제 요청 → 서버에서 바뀐 데이터 값만 전달 → 프론트에서 바뀐 데이터를 골라서 반영**

장점

- 한번의 요청으로 해결 가능
- 모든 UI를 리렌더링할 필요 없이 바뀐 부분만 리렌더링하면 된다.

단점

- 프론트에서 별도의 업데이트 로직을 구현해야함
- 여러 클라이언트에서 동시에 추가/수정/삭제 요청이 일어날 때 특정 클라이언트에서 적절하게 반영하기 어렵다.

## 로그인 유지

로그인 기능이 없는 서비스를 찾아보기 힘들다. 마지막 프로젝트에서는 기능 구현보다는 로그인 및 유지 기능을 확실히 이해하고 싶었다.

token으로 로그인을 유지하는 기능을 구현했는데 다음과 같은 부분에서 어려움을 겪었다.

1. 로그인 유저 정보를 어디서 들고 있을까?

프로필 이미지, 아이디, 닉네임과 같은 탈취되어도 큰 문제가 안 일어날 것 같은 정보들을 어디서 들고 있을까?

처음에는 localstorage에 넣어 둘까했지만 token을 localstorage(혹은 쿠키)에서 들고 있기 때문에 해당 정보는 브라우저에서 기억할 필요 없이 token을 활용해 필요할 때마다 api로 요청하면 되지 않을까 싶었다.

1. 로그인 여부 판단

private route를 구현할 때 로그인 여부를 판단하는 기준을 무엇을 할까 고민했다. 특정 유저 정보를 기준으로 해야할지, refresh token의 만료시간을 기준으로 할지, GET: user/info의 올바른 응답 값을 기준으로할지 판단하기 어려웠다.

GET: user/info를 기준으로한다면 (react에서 컴포넌트 렌더링 → useEffect 내부의 effect로 사용자 정보 요청 → 로그인 여부 업데이트 후 컴포넌트 리렌더링) 흐름처럼 api 요청으로 인해 페이지 전체가 리렌더링이 일어나는 문제가 있었다.

대안으로 브라우저에서 기억하고 있는 refersh token의 만료시간을 기준으로 로그인 여부를 확인했다. 하지만 이 방법 또한 다음과 같은 문제가 있었다.

- local storage에 있는 refresh token을 탈취되기 쉬움
- cookie httpOnly옵션으로 들어있다면 프론트에서 만료시간을 확인할 수 없다.
