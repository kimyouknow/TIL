# access token과 refresh token

> 아래 참고자료 링크의 okky와 stackoverflow를 참고한 개념 정리 위주의 글입니다.

## jwt란?

JWT는 JSON Web Token의 약어로, JSON 형식의 데이터를 저장하는 토큰이며 다음과 같이 세 부분으로 구성된다.

- 헤더(header): 토큰 종류와 해시 알고리즘 정보
- 페이로드(payload): 토큰의 내용물이 인코딩된 부분
- 시그니처(signature): 일련의 문자열, 시그니처를 통해 토큰이 변조되었는지 여부를 확인

## Access token, Refresh token을 활용한 인증 흐름 요약

클라이언트가 로그인 요청을 보내면 서버는 `Access Token` 및 그보다 `긴 만료 기간을 가진 Refresh Token`을 발급할 수 있다. `클라이언트는 Access Token이 만료되었을 때 Refresh Token을 사용하여 Access Token의 재발급을 요청한다.` 서버는 DB에 저장된 Refresh Token과 비교하여 유효한 경우 새로운 Access Token을 발급하고, 만료된 경우 사용자에게 로그인을 요구한다.

## 왜 Access token과 Refresh token을 사용할까?

> 위와 같은 설명(만료 시간이 짧은 access token이 만료될 경우, 새로운 access token을 발급받기 위해 refresh token을 사용한다)라면 refresh token이 탈취당하면 어떻게해야할까? refresh token을 따로 발급하는 이유가 있을까?

**만료 기한이 짧은** access token**만 사용할 때의 단점**

- 사용자가 매번 재로그인 해야하는 번거로움이 있다.

**만료 기한이 긴** access token**만 사용할 때의 단점**

- access token이 탈취되었을 때 서버에서 방어적인 행동을 취할 수 없고, 탈취 여부조차 파악하기 어렵다.
- access token을 포함하는 모든 요청마다 access token 검증을 하고, access token이 무효화 되었는지 검증하는 과정도 추가되어 부하가 커질 수 있다.

위와 같은 단점으로 access token은 무효화 기능을 제공 하지 않는 대신 짧은 만료기한으로 발급하고, refresh token은 무효화 기능 제공과 긴 만료 기간으로 발급한다.

이와 같이 refresh token을 사용하면, 사용자 재로그인 번거로움을 없애고, 토큰 무효화 기능 관련 부하 문제를 막을 수 있다.

즉, refresh token을 사용한다면 access token 단독 사용보다는 보안이 강화되며, 사용자 편의, 성능, 보안 등을 적절하게 타협한 방법이라고 할 수 있다.

access token은 결국 요청 header auth에 실어야하기에 프론트 단에서의 접근이 필수가 된다. refresh token의 경우 그럴 이유가 없어서 http only 쿠키로 넘겨줄 경우 js를 통한 접근이 불가능한 측면이 있다. (access token은 localstorage, cookie, 클로저로 감싸진 지역변수 등의 메모리에 저장, refresh token은 쿠키에 http only로 저장)

### 참고자료

[http://www.opennaru.com/opennaru-blog/jwt-json-web-token/](http://www.opennaru.com/opennaru-blog/jwt-json-web-token/)

[[인증] Access Token, Refresh Token](https://steadily-worked.tistory.com/469)

[[Node.js] JWT: Access Token & Refresh Token 인증 구현](https://cotak.tistory.com/102)

[리프레쉬 토큰이 필요한 이유는 무엇인가요? - okky](https://okky.kr/article/1007579)

[https://stackoverflow.com/questions/3487991/why-does-oauth-v2-have-both-access-and-refresh-tokens/12885823#12885823](https://stackoverflow.com/questions/3487991/why-does-oauth-v2-have-both-access-and-refresh-tokens/12885823#12885823)

[프론트에서-안전하게-로그인-처리하기#-react에-적용하기](https://velog.io/@yaytomato/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0#-react%EC%97%90-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
