# 20220301

# 코드스쿼드

> api, RESTful api, csr, ssr, 배포 이후 통신, cors

배포 이후 클라이언트와 서버 간 통신 과정을 자세히 알아보았다. 평소엔 로컬에서 프론트와 서버 폴더를 구분해서 개발하는 정도로 생각했는데, api와 restapi에 대해 알아보면서 궁금증이 생겨서 통신과정을 자세히 알아보기로 했다. 우선 spa를 바닐라js로 구현하려면 node.js에서 `app.get("/*", (req, res) => res.sendFile(index.html))`이런 식으로 어떤 url path로 가든 index.html을 반환하게 하고 브라우저에서 보이는 url을 history api를 사용해 관리했다. 프론트에서 필요한 데이터는 `/api`로 시작하는 uri로 `/api/user/:id`이런식으로 요청했다. 그런데 만약 이렇게 정적 리소스(html,css,js)와 동적 데이터를 같은 서버폴더에서 요청하면 데이터 uri와 브라우저에서 보여지는 uri가 겹치지 않나? 겹치면 안되나? 실제 배포할 땐 구분해서 배포하지 않고 한 번에 배포하면 어떻게 되는껄까?

일단 나는 헷갈려서 프론트와 백을 구분해서 생각했다. 분리 배포할 경우 정적인 리소스를 프로튼 서버에서 받고, 이후 동적인 데이터들을 백앤드 서버로 요청한다.

uri와 rest api를 어떻게 활용하나 더 찾아봐야겠다.

# 코넥트

pr과정이 아직도 어렵다. 문제가 생겼다면 원인을 찾고 해결과정을 생각해야하는데 문제가 발생했다는 알림을 지우기 위해 끼워맞추기 식으로 문제를 해결하려고 했다. 지금은 공부하는 기간이니까 개념이 명확하지 않으면 먼저 개념을 다시 살펴보고 시간이 걸리더라도 확실히 해결할 수 있는 방법을 찾아야겠다.
