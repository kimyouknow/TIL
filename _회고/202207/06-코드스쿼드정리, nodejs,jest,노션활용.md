# 20220706

<details>
<summary>시간대별 정리</summary>

### 아침

코드스쿼드 자료 정리 (gitbook에 업데이트)

- 생각보다 정리할 내용이 많지 않아서 놀람
- 내 머릿속에 있는 협업 관련 내용들을 어떻게 표현할 수 있을까

### 오전

nodejs 학습

- 특징 및 장단점 정리

### 오후

nodejs 학습

jest + typescript 환경 설정

### 저녁

jest 실습

코넥트

</details>
<br>

# 코드스쿼드

팀 프로젝트 기간동안 공부한 내용을 개인 노션이 아닌 팀 노션에 기록했었다. 해당 부분을 코드스쿼드 정리할 목적으로 개인 노션에 하나씩 옮겼다.

정리하고나니 스스로 문제를 해결한 내용보다 공부 정리 위주의 내용이어서 개인 블로그보다는 gitbook에 TIL에 올릴 생각이다.

# nodejs

나는 javascript를 공부하기 전 react를 먼저 학습했다. 클론 코딩으로 react로 기능 구현에 초점을 맞춰 학습하다보니 깊이 있는 공부를 하지 못했다. 새로운 문제가 발생하면 구글링하기 바빴고 스스로 문제를 해결하려고 하지 않았다. 이후 javascript를 공부하면서 react에 대한 이해도 높아졌고, 스스로 문제를 해결할 수 있는 부분이 많아졌다.

react를 하면서 javascript를 학습하지 않은 경험과 같은 실수를 하지 않기 위해 express를 공부하기 전 nodejs에 대한 공부를 시작해보려고 한다.

# jest

[코딩앙마 - jest 재생목록](https://www.youtube.com/watch?v=g4MdUjxA-S4&list=PLZKTXPmaJk8L1xCg_1cRjL5huINlP2JKt)을 보면서 간단한 jest matcher에 대해서 학습했다.

### 유용한 mathcers

expect, toBe(), toEqual() ,toStrictEqual(), toBeNull(), toBeUndefined(), toBeDeinfed(), toBeTruthy(), toBeFalsy()

### 비동기 코드 테스트

done()

promise를 사용하면 done을 안써도 되지만 return해야함

resolve, rejects matcher가 따로 있음

### 테스트 전후에 필요한 처리들

> 각각의 실행순서를 주의해야함.

beforEach(), afterEach(), beforeAll(), afterAll()

# 코넥트

다시 프로젝트를 시작하기 전에 코드스쿼드에서 배운 협업 방법을 호은씨와 공유했다. github issue, milestone 등은 원래도 활용하고 있었지만 조금 더 체계적인 방법을 고민했다. 마일스톤의 경우 1주일 단위로 세우기로 했고, 그에 따라 세부 이슈를 발행하기로 했다.

그 외 노션 관리와 애자일 프로세스에 대한 이야기를 했다. 기존에는 일정 달력 데이터베이스를 따로 운영하고 특정 단위 별로 page를 만들었었다면 하나의 데이터베이스에서 filter와 group by를 활용해서 정리하기로 했다. (기존에는 회의록을 달력에 날마다 적었고, 로그인 기능, 댓글 기능 등등 굵직한 내용마다 정리했었다.)
