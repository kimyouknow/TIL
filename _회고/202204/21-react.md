# 20220421

<details>
<summary>시간대별 정리</summary>

아침

- aws s3 이미지 업로드

오전

- useEfffect 공부
- react srtict mode 에러

오후

- 컴포넌트 단위 분리
- useEffect, useState 내부로직 정리

저녁

- useEffect return 부분 고민
- git sqaush vs merge vs rebase

</details>
<br/>

# 코드스쿼드

> strictmode, useEffect, useState, squash vs rebase

이전까지 그냥 넘겼던 useEffect와 useState의 구체적인 동작과정을 학습했다. 학습하는 과정에서 react strict mode에 대해서 알 수 있었다. 확실히 동작 과정을 자세히 공부하고나니 코드에 대한 이해가 높아졌다.

rebase와 sqaush의 차이가 뭘까? pr을 합칠 때 sqaush만하고 rebase를 안하면 어떻게 될까?

# 코넥트

> 이미지 업로드를 어떻게 할까.

1번: 프론트에서 이미지 서버로 이미지를 올리고 주소값을 받음, 게시글 생성 요청할 때 해당 이미지 주소를 같이 was로 보냄

2번: 프론트에서 was로 이미지를 보내고 주소값을 받음, 게시글 생성 요청할 때 주소값을 다시 was로 전달

1번의 단점:

만약 유저가 이미지서버에 이미지만 올리고 브라우저를 닫으면 이미지 서버 공간만 낭비됨.

→ 이미지 서버에서 중복을 제거하는 로직을 만들어야함.

2번 단점:

was로 두 번 요청해야함.

→ 한 번에 form 데이터와 json 데이터를 요청하는 방법은 없을까?
