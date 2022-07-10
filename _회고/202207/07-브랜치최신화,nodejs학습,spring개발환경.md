# 20220707

<details>
<summary>시간대별 정리</summary>

### 아침

회고 작성

### 오전

jest 간단한 메서드 학습

코넥트

- fork 새로 떠오기

### 오후

코넥트

- api uri 설정
- redux 로직 제거

nodejs학습

- learnyounode

</details>
<br>

# 코넥트

### 브랜치 리뉴얼

호은씨와 내 origin에 fork 떠온 브랜치 사이가 다른 문제가 생겼다. 아마도 호은씨와 내 origin에 있는 레포 최신화를 제대로 안해서 생긴 문제같다. (둘다) origin의 front에는 최신화를 적절히 했지만 develop과 main에는 제대로 최신화를 하지 않았기 때문에 문제가 발생하지 않았을까 추측하고 있다.

### redux로직 덜어내기

리뉴얼하면서 가장 먼저 해야할 일은 redux 로직을 덜어내는 일이었다. 전역적으로 관리할 상태가 많지 않음에도 redux를 상태관리로직을 많이 쓰기 때문에 무지성으로 사용했었기 때문이다. 댓글, 유저, 팀, auth 관련 redux를 모두 제거하고 임시로 로직 변경은 useState를 사용하고 props drilling은 컴포넌트간 props로 전달하도록 했다.

### api url 정리 및 spring 개발환경 실행

개발환경과 빌드환경에서 사용할 api를 다음과 같이 변경했다. 이전 코드스쿼드 프로젝트를 진행하면서 백엔드분들이 mock api를 배포해주셔서 spring을 실행할 일이 없었는데 코넥트 프로젝트에서는 개발환경에서 직접 spring을 돌려야하기 때문에 환경설정, gitinore에 있는 파일 등 따로 설정해야하는 부분이 많이 번거롭게 느껴진다.

# nodejs 학습

[Do you want a better understanding of Buffer in Node.js? Check this out.](https://www.freecodecamp.org/news/do-you-want-a-better-understanding-of-buffer-in-node-js-check-this-out-2e29de2968e8) 해당 글을 보면 많은 사람들이 Node.js에서 Buffer, Stream 및 바이너리 데이터와 같은 단어를 접하면 어려워한다고 한다. 실제로 많은 튜토리얼과 강의들은 Node.js의 핵심 기능과 존재 이유를 이해하지 못한 채 Node.js 패키지로 웹 애플리케이션을 개발하는 방법으로 넘어가는 경우가 많다.

나 또한 nodejs로 어플리케이션을 만드는게 급하고 당장에 buffer나 stream, 바이너리 데이터를 사용할 상황이 아니어서 “저런 개념이 있구나~ 나중에 필요할 때 공부해야지!” 정도로 간단하게 보고 넘어가야겠다.

nodejs school 사이트에서 제공하는 https://github.com/workshopper/learnyounode 튜토리얼로 학습을 했다.

```

```
