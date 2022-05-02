# Web Client와 Server

> 서버 인스턴스에는 클라이언트의 요청을 처리해주는 서버 소프트웨어가 필요하다. 서버 소프트웨어는 크게 `웹 서버`와 `웹 애플리케이션 서버`로 구성된다. `웹 서버`는 클라이언트에서 HTTP 프로토콜로 요청을 받고 HTML, CSS, Javascript, 이미지와 같은 정적인 파일(즉, 데이터베이스에 쿼리문을 날려야 한다던지 로그인 기능이라던지 하는 동적인 응답이 필요한 경우가 아니라)을 응답으로 전달 할 수 있다.
> 반면 `웹 애플리케이션 서버`는 클라이언트 요청에 의해 서버의 배포된 코드를 실행시키고, 동적인 응답을 만들어준다.
> 웹 서버와 웹 애플리케이션 서버는 함께 사용되면서 웹 서버는 1. 정적인 파일을 처리하거나 2. 웹 애플리케이션 서버로 라우팅 하는 역할을 하고, 웹 애플리케이션 서버는 동적인 처리가 필요한 요청이 온 것을 처리해서 응답해주는 것들을 할 수 있다.

## Web Client(사용자 에이전트)

사용자를 대신하여 동작하는 모든 도구들. 주로 브라우저에 의해 수행.

브라우저는 항상 요청을 보내는 개체다. 결고 서버가 될 수 없다.

`웹 페이지`: 하이퍼텍스트 문서로, 표시된 텍스트 중 일부는 사용자가 사용자 에이전트를 제어하고 웹을 이동할 수 있도록 하게 하는 링크.

`브라우저`: HTTP 요청 내에서 이런 지시 사항들을 변환하고 HTTP 응답을 해석하여 사용자에게 명확한 응답을 표시

## Web Server 란?

> WEB 서버는 HTML 문서같은 정적 컨텐츠를 처리(HTTP 프로토콜을 통해 읽힐 수 있는 문서)

클라이언트에 의한 요청에 대한 문서를 제공하는 서버. 반드시 단일 머신일 필요는 없지만, 여러 개의 서버를 동일한 머신 위에서 호스팅 가능.

한 개 이상의 웹사이트를 호스팅하는 컴퓨터(웹사이트와 웹서버는 다르다. 웹사이트가 반응하지 않는다는 것은 웹 서버가 반응하지 않는다는 의미다. 웹 서버는 여러 웹사이트를 호스팅될 수 있다.)

`웹 브라우저(client)`로부터 `http 요청`을 받아 html 문서와 같은 `정적 컨텐츠`를 제공하는 프로그램

`webserver`는 하드웨어, 소프트웨어 혹은 두 개가 같이 동작하는 것을 의미.

- `하드웨어`: web server의 소프트웨어와 website의 컴포넌트 파일들(html, css, js)을 저장하는 컴퓨터. web server는 인터넷에 연결되어 웹이 연결된 다른 기기들이 웹 서버의 데이터를 주고받을 수 있도록 한다.
- `소프트웨어`: 웹 상자가 어떻게 호스트 파일들에게 접근하는지 관리. web server를 http server로 국한했을 때, http server는 url과 http의 소프트웨어 일부.

![image](https://user-images.githubusercontent.com/71386219/153344438-25781975-ca57-40a0-9698-470fdbf07089.png)

web server 기능

- `정적 컨텐츠` 요청시 정적 콘첸트를 제공
- `동적 컨텐츠` 요청시 `WAS(Web Application Server)`로 전달하여 WAS가 처리한 결과를 client에게 전달.

## WAS 란?

DB조회나 다양한 로직 처리를 요구하는 `동적인 컨텐츠`를 제공하기 위해 만들어진 프로그램. 요청 인자에 따라 `바뀔 수 있는 컨텐츠`

쉽게 설명하자면, 웹 프레이음 워크를 사용해 구축하는 백앤드. 주로 데이터베이스와 서버와 같이 관리된다.

WAS의 기능

- clientf로부터 http 요청 받을 수 있음(대부분의 was는 web server 내장)
- 요청에 맞는 정적 컨텐츠를 제공
- db 조회나 다양한 로직 처리를 통해 동적 컨텐츠 제공

처리하는 기능은 나누어져있지만 요새 WAS 서버에는 WEB서버 기능을 내장하고 있다. 현재는 WAS가 가지고 있는 웹 서버도 정적인 콘텐츠를 처리하는 데 있어서 성능상 큰 차이가 없다.

### 예시

웹서버: Apache

was: Tomcat

# Static sites

> A static site is one that returns the same hard coded content from the server whenever a particular resource is requested

정적 사이트는 특정 리소스가 요청될 때마다 서버에서 동일한 하드 코딩된 콘텐츠를 반환하는 사이트를 말한다.

### 동작 과정

1. 사용자가 페이지로 이동하려고 할 때 브라우저는 HTML 페이지의 URL을 지정하는 `HTTP GET 요청`을 보낸다.
2. 서버는 파일 시스템에서 요청된 문서를 검색하고 문서가 포함된 HTTP 응답과 "200 OK"(성공을 나타냄)의 `HTTP 응답 상태 코드`를 반환
   - `서버는 다른 상태 코드를 반환 가능`함. 예를 들어 파일이 서버에 없으면 "404 Not Found", 파일이 있지만 다른 위치로 리디렉션된 경우 "301 Moved Permanently"가 반환
   - 정적 사이트용 서버는 `수정 가능한 데이터를 저장하지 않기` 때문에 `GET 요청만 처리`하면 됩니다. 또한 HTTP 요청 데이터(예: URL 매개변수 또는 쿠키)를 기반으로 응답을 변경하지 않음.

### 단점

- 사이트에 다른 유사한 제품을 추가하는 경우 다른 페이지를 추가해야함.
- 각 페이지는 기본페이지 템플릿, 구조 등 많은 코드를 반복함.
- 만일 여러 페이지가 있을 때 한 섹션을 변경하려면 모든 페이지를 개별적으로 변경해야함.

### 그럼에도 공부하는 이유

그럼에도 불구하고 정적 사이트가 작동하는 방식을 이해하는 것은 서버 측 프로그래밍을 배울 때 유용하다. 동적 사이트는 정적 파일(CSS, JavaScript, 정적 이미지 등)에 대한 요청을 정확히 같은 방식으로 처리하기 때문

![basic_static_app_server](https://user-images.githubusercontent.com/71386219/155918027-574b8757-f9d8-4408-b851-e633d5fece98.png)

# Dynamic sites

> A dynamic site is one that can generate and return content based on the specific request URL and data (rather than always returning the same hard-coded file for a particular URL).

동적 사이트는 특정 요청 URL 및 데이터를 기반으로 콘텐츠를 생성하고 반환할 수 있는 사이트이다. (특정 URL에 대해 항상 동일한 하드 코딩된 파일을 반환하는 대신).

### 장점

- 데이터베이스를 사용하면 페이지 정보를 `쉽게 확장 가능하고 수정 가능하며 검색 가능한 방식`으로 효율적으로 저장 가능하다.
- `HTML 템플릿`을 사용하면 HTML 구조를 매우 쉽게 변경할 수 있습니다. 이 작업은 잠재적으로 수천 개의 정적 페이지가 아닌 한 곳, 단일 템플릿에서만 수행되어야 하기 때문입니다.

### 동적 요청 분석 (mdn페이지 복붙함)

![web_application_with_html_and_steps](https://user-images.githubusercontent.com/71386219/155918036-7a7ed177-b0d8-4f95-8395-5f044ebcab2e.png)

1.  웹 브라우저는 리소스의 기본 URL(/best)을 사용하고 URL 매개변수(예: /best?team=my_team_name&show=11) 또는 URL의 일부로 팀 및 선수 번호를 인코딩하여 서버에 대한 HTTP GET 요청을 생성합니다. 패턴(예: /best/my_team_name/11/). GET 요청은 요청이 데이터를 가져오기만 하기 때문에 사용됩니다(데이터 수정은 아님).
2.  웹 서버는 요청이 "동적"임을 감지하고 처리를 위해 웹 응용 프로그램에 전달합니다(웹 서버는 구성에 정의된 패턴 일치 규칙에 따라 다른 URL을 처리하는 방법을 결정합니다).
3.  웹 애플리케이션은 요청의 의도가 URL(/best/)을 기반으로 "최고의 팀 목록"을 가져오는 것임을 식별하고 URL에서 필요한 팀 이름과 플레이어 수를 찾습니다. 그런 다음 웹 응용 프로그램은 데이터베이스에서 필요한 정보를 가져옵니다(추가 "내부" 매개변수를 사용하여 "최고" 선수를 정의하고 클라이언트 측 쿠키에서 로그인한 코치의 ID를 가져올 수도 있습니다).
4.  웹 응용 프로그램은 데이터베이스의 데이터를 HTML 템플릿 내부의 자리 표시자에 넣어 동적으로 HTML 페이지를 만듭니다.
5.  웹 응용 프로그램은 HTTP 상태 코드 200("성공")과 함께 생성된 HTML을 웹 브라우저에 반환합니다(웹 서버를 통해). HTML 반환을 방해하는 요소가 있으면 웹 응용 프로그램은 다른 코드를 반환합니다. 예를 들어 팀이 존재하지 않음을 나타내는 "404"와 같은 코드가 반환됩니다.
6.  그런 다음 웹 브라우저는 반환된 HTML을 처리하기 시작하여 참조하는 다른 CSS 또는 JavaScript 파일을 가져오기 위해 별도의 요청을 보냅니다(7단계 참조).
7.  웹 서버는 파일 시스템에서 정적 파일을 로드하여 브라우저에 직접 반환합니다(다시 말하지만 올바른 파일 처리는 구성 규칙 및 URL 패턴 일치를 기반으로 함).

🔍 참고자료

- [Web Server & WAS](https://www.howdy-mj.me/network/web-server-and-was/)
- [What is a web server?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server)
- [Client-Server Overview](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview)
- [[용어정리] 웹서버, WAS 란?](https://hijjang2.tistory.com/323)
- [MDN - 웹의 동작 방식](https://developer.mozilla.org/ko/docs/Learn/Getting_started_with_the_web/How_the_Web_works)
- [MDN - 인터넷은 어떻게 동작하는가?](https://developer.mozilla.org/ko/docs/Learn/Common_questions/How_does_the_Internet_work)
- [브라우저의 사용자 에이전트는 왜 이렇게 복잡하게 생겼을까?](https://yozm.wishket.com/magazine/detail/1307/)
- [웹이란 무엇인가](https://www.betterweb.or.kr/blog/%EC%9B%B9%EA%B3%BC-%EC%9B%B9-%EA%B2%80%EC%83%89-%EC%9B%B9%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80/)
- [[10분 테코톡] 알리의 Web Server vs WAS](https://www.youtube.com/watch?v=mcnJcjbfjrs)
