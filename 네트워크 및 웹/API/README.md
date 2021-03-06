# api란?

> Application Programing Interface로 응용 프로그램에서 사용할 수 있도록 운영체제나 다른 프로그램이 제공하는 기능을 제어할 수 있게 만든 인터페이스

IBM사이트에서 설명하는 api 문서에 따르면

> 가장 기본 레벨에서, API는 하나의 애플리케이션이나 서비스가 다른 애플리케이션이나 서비스 내의 리소스에 액세스할 수 있도록 해주는 메커니즘입니다. 액세스를 수행하는 애플리케이션이나 서비스를 클라이언트라고 하며, 리소스가 포함된 애플리케이션이나 서비스를 서버라고 합니다.

클라이언트는 엑세를 수행하며, 서버는 리소스가 포함된 애플리케이션이나 서비스를 말한다.

## 역할

1. api는 서버와 데이터베이스에 대한 출입구 역할

- 서버와 데이터베이스 사이에서 허용된 사람들에게만 접근성을 부여할 수 있다.

2. api는 애플리케이션과 기기가 원활하게 통신할 수 있도록 한다.

3. api는 모든 접속을 표준화한다.

- interface를 뜻에 알 수 있듯이, 모든 접속을 표준화하여 기계/운영체제 등과 상관없이 누구나 동일한 엑세스를 얻을 수 있다.

## 특징

1. 다른 프로그램과 연결 해주는 다리 역할

2. 구현이 아닌 제어를 담당

3. api를 조합해 원하는 프로그램을 만들 수 있음.

# REST API란?

SOAP 또는 XML-RPC 등의 일부 API는 개발자에 대한 엄격한 프레임워크를 부과한다. 그러나 REST API는 거의 모든 프로그래밍 언어를 사용하여 개발이 가능하다.

> REST는 REprensetataional State Tansfter의 약자로, 해석하자면 (대표적인) 표현된 상태라고 할 수 있다. 여기서 상태는 리소스의 상태를 말한다. 즉, REST는 통신을 위해 자원의 표현된 상태를 주고받는 것에 대한 아키텍처 가이드 라인이라고 할 수 있다.

## 리소스

`우리는 통신을 하면서 리소스를 직접 주고 받지 않는다.` api를 사용해 주고 받는 리소는 문서, 이미지 또는 json 데이터일 수 있다. 하지만 우리는 직접 리소스를 주고 받지 않는다.

예를 들어, 클라이언트에서 서버로 id=2인 유저 정보를 요청한다고 할 때, 서버가 주는 정보는 리소스의 원본이 아닌 데이터 베이스에 저장된 id가 2인 유저의 리소스를 표현한 Json이다.

### 리소스를 표현한 상태라는 것의 의미

그렇다면 리소스의 적당한 상태가 무엇을 의미할까? 적당한 상태에 대한 힌트는 HTTP 요청 헤더나 응답 헤더에 담겨있다.

```http
<!-- https://evan-moon.github.io/2020/04/07/about-restful-api/ -->
GET https://iamserver.com/api/users/2
Host: iamserver.com
Accept: application/json
```

위의 예시를 보면 클라이언트는 요청 해더에 Aceept라는 키에 application/json을 담아 보냈다. 클라이언트가 서버에게 id가 2인 유저의 정보를 json으로 표현해 달라고 요청한 것이다.

## RESTful API

REST 아키텍처를 통해 표현된 리소스와 더불어 어떠한 행위를 명시할 수 있는 HTTP 메서드와 url까지 활용하여 다음과 같은 요소를 활용해 표현한다.

1. REST: 리소스가 어떻게 표현되는지?
2. URI: 어떤 리소스 인지
3. HTTP 메소드: 어떤 행위인지

## 디자인 원칙

1. 균일한 인터페이스.

- 요청이 어디에서 오는지와 무관하게, `동일한 리소스에 대한 모든 API 요청은 동일하게 보여야 한다.`
- REST API는 사용자의 이름이나 이메일 주소 등의 동일한 데이터 조각이 오직 하나의 URI(Uniform Resource Identifier)에 속함을 보장해야 한다.
- 리소스가 너무 클 필요는 없지만, 이는 클라이언트가 필요로 하는 모든 정보를 포함해야 한다.

2. 클라이언트-서버 디커플링.

- REST API 디자인에서, `클라이언트`와 `서버 애플리케이션`은 서로 간에 완전히 `독립적`이어야 한다.
- 클라이언트 애플리케이션이 알아야 하는 유일한 정보는 요청된 리소스의 URI이며, 이는 다른 방법으로 서버 애플리케이션과 상호작용할 수 없다.
- 이와 유사하게, 서버 애플리케이션은 HTTP를 통해 요청된 데이터에 전달하는 것 말고는 클라이언트 애플리케이션을 수정하지 않아야 합니다.

3. Stateless.

- REST API는 `stateless`
- 작업을 위한 상태정보를 따로 저장하고 관리하지 않는다.
- 세션 정보나 쿠키 정보를 별도로 저장하고 관리하지 않기 때문에 api는 들어오는 요청만 단순히 처리하면 된다.

4. 캐싱 가능성.

- 가급적이면, 리소스를 클라이언트 또는 서버측에서 `캐싱`할 수 있어야 한다..
- 서버 응답에는 전달된 리소스에 대해 캐싱이 허용되는지 여부에 대한 정보도 포함되어야 한다.
- 이의 목적은 서버측의 확장성 증가와 함께 클라이언트측의 성능 향상을 동시에 얻는 것

5. 계층 구조 아키텍처.

- REST API에서는 `호출과 응답이 서로 다른 계층을 통과`합니다.
- 클라이언트와 서버 애플리케이션이 서로 간에 `직접 연결된다고 가정하면 안 된다`.
- 통신 루프에는 다수의 서로 다른 중개자가 있을 수 있습니다. REST API는 엔드 애플리케이션 또는 중개자와 통신하는지 여부를 클라이언트나 서버가 알 수 없도록 설계되어야 한다.

6. 코드 온디맨드(옵션).

- REST API는 일반적으로 정적 리소스를 전송하지만, 특정한 경우에는 응답에 실행 코드(예: Java 애플릿)를 포함할 수도 있다. 이러한 경우에, 코드는 요청 시에만 실행되어야 한다.

🔍 참고자료

- [[10분 테코톡] 📢 욘의 프레임워크 vs 라이브러리 vs API](https://www.youtube.com/watch?v=_j4u4ftWwhQ)
- [API란?](https://www.redhat.com/ko/topics/api/what-are-application-programming-interfaces)
- [REST API(RESTful API, 레스트풀 API)란? 구현 및 사용법 - redhat](https://www.redhat.com/ko/topics/api/what-is-a-rest-api)
- [REST API - ibm](https://www.ibm.com/kr-ko/cloud/learn/rest-apis)
- [프론트엔드와 백엔드가 소통하는 엔드포인트, RESTful API](https://evan-moon.github.io/2020/04/07/about-restful-api/)
