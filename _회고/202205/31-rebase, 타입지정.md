# 20220531

<details>
<summary>시간대별 정리</summary>
### 아침

rebase 공부

merge 공부,, 아직 잘 모르겟음

### 오전

계획 세우기

### 오후

pr제출

### 저녁

pr피드백 및 canvas 차트 그리기

</details>
<br>

# 코드스쿼드

> rebase, merge 공부, 적절한 타입지정하기

### 브랜치 최신화

브랜치를 어떻게 나누고, pr을 언제보내야 하는지 지난 두 달간 토이 프로젝트를 하면서 익혔었다. 하지만 브랜치 deps가 깊어질 때 어떻게 최신화해야하는지 아직도 헷갈린다. 예를 들어, origin/develop, origin/develop-FE를 upstream/develop로 최신화할 때, rebase와 merge를 썼을 때 대략적인 차이는 알아도 git flow가 어떻게 그려지는지 정확히 설명하지 못하겠다.

### ts 타입 지정하기

함수를 잘게 쪼개다보니 함수의 params으로 비슷한 구조의 데이터를 넘겨줄 때, interface나 type을 어떻게 처리해야하나 고민이다.

모든 인자를 interface로 지정해야할까? 조금씩 다른 인자 값 때문에 함수마다 사용하는 params별로 interface를 만들어야할까..?
