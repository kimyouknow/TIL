# 20220714

<details>
<summary>시간대별 정리</summary>

### 아침

회고 작성

### 오전

supertest express 세팅

### 오후

단위 테스트 및 통합테스트 게시글 CRUD 연습

[[OKKYCON: 2018] 박재성 - 의식적인 연습으로 TDD, 리팩토링 연습하기](https://youtu.be/cVxqrGHxutU)

- 많은 연습 → 역량/발전 ❌  : `의식적`으로 ㄱㄱ

TDD ≠ 단위테스트

- 단위 테스트 먼저 연습 (알고리즘 ) → i/o가 명확한 함수
- 요구사항 분석 잘해라

계획짜기

### 저녁

코넥트

- 브랜치 conflict 해결…
- 스타일컨벤션 설정
- 댓글 crud 변경

</details>
<br>

# 개인공부

## 단위 테스트 및 통합테스트 게시글 CRUD 연습

### supertest 주의사항

- **app.listen을 분리하기**

app.js 파일에서 app 객체를 모듈로 만든 후, server.js에서 불러와 listen한다. 따라서, server.js는 app의 포트 리스닝만 담당하게 된다.

만약 app.listen()된 app모듈을 가져와서 supertest를 진행할 경우 api 테스트를 하는 동안 실제 서버가 동작해버린다.

- **db연결 분리하기 → 테스트용 db따로만들기**

통합테스트에서는 단위 테스트처럼 디비코드를 모킹하지 않기 때문에 디비에 테스트용 데이터가 저장된다. 실제 서비스 중인 디비에 테스트용 데이터가 저장되면 안되므로 테스트용 디비를 따로 만들어야 한다.

## TDD란?

[[OKKYCON: 2018] 박재성 - 의식적인 연습으로 TDD, 리팩토링 연습하기](https://youtu.be/cVxqrGHxutU)

- 많은 연습 → 역량/발전 ❌  : `의식적`으로 ㄱㄱ

TDD ≠ 단위테스트

- 단위 테스트 먼저 연습 (알고리즘 ) → i/o가 명확한 함수
- 요구사항 분석 잘해라

## aws ec2 ssh접속하기

[https://velog.io/@jinho_pca/AWS-EC2-ssh접속-방법](https://velog.io/@jinho_pca/AWS-EC2-ssh%EC%A0%91%EC%86%8D-%EB%B0%A9%EB%B2%95)

# 코넥트

## 브랜치 conflict 해결

현재 `main → develop → front / back / release → FE[BE]/feature/#—` 형식으로 브랜치를 관리하고 있다.

이번에 front에서 develop로 브랜치를 합치는 과정에서 conflict이 무려 42개 파일에서 발생했다…

front의 경우 feature브랜치에서 front로 합져지는 부분은 rebase와 squash로 잘 관리하고 있다. 하지만 front와 back에서 develop로 적절히 브랜치를 최신화하지 못하고 있다.

기능 구현과 같은 적절한 기준으로 develop브랜치도 자주 최신화해야겠다.

거기에 gui를 사용해 conflict을 빠르게 해결하는 방법도 익혀야겠다.

## react forceupdate

댓글 수정/삭제/추가 로직이후 GET 요청으로 전체 댓글 목록을 다시 받아오는 로직을 구현했다. 현재 컴포넌트 자체를 강제로 업데이트하고 있다. 그런데 수정/삭제/추가 로직이후 GET 요청을 하는 함수를 다시 실행시키는게 더 좋을까?
