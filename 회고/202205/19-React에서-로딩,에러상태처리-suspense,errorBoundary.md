# 20020519

<details>
<summary>시간대별 정리</summary>

### 아침

pr 반영

useSetTimout분리

### 오전

suspense 이해,,,,

### 오후

error boundary

비동기요청

### 저녁

context로 타이머를 두면 (reducer 에서 관리하면) 전체가 state를 쓰는 전체상태가 다시 리렌더링되지 않나

toast notification

</details>
<br>

# 코드스쿼드

> error처리, error boundary, suspense

[클라이언트의 사용자 중심 예외 처리](https://jbee.io/react/error-declarative-handling-2/)라는 글을 읽고 클라이언트에서 에러처리에 대한 고민을 했다. 마침 수요일 pr 리뷰에서 리뷰어님이 [“단순히 콘솔에 에러 메세지를 출력하는 형태가 아닌, 비동기 통신시 발생한 에러 케이스에 맞게 좀 더 구체적으로 에러를 핸들링 해보면 어떨까요??”](https://github.com/codesquad-members-2022/fe-vm/pull/68#discussion_r875999419)라는 리뷰를 남겨주셔서 에러 처리를 해보았다.

`데이터 요청과정에서 생긴 에러`와 `클라이언트에서 나타나는 로컬 에러`(입력에러 등등)을 구분해서 사용자에게 보여주기로 했다.

### error boundary

데이터 요청과정에서 생긴 에러

refresh버튼으로 `다시 데이터를 요청`할 수 있게 만들기

### Toast Notification

팝업 알림으로, 경고, 에러, 성공 등 사용자에게 요청에 대한 결과를 시작으로 `보여주기`

### Suspense

react에서 제공하는 suspense기능으로 loading상태를 표현해보고자 했다. 아직정확한 이해를 하지 못해 공부중이다. 내일 적용해봐야지
