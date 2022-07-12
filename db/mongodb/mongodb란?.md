# 1. NoSQL이란?

> MongoDB를 사용하기 전에 간략하게 특징 및 장점을 학습하는 목적으로 정리했습니다.

MongoDB에 대해 알아보기 전 관계형 데이터베이스(Relational database)에 대해서 간단히 요약해보자. 관계형 데이터베이스는 이미 충분히 발전되고 잘 알려져 있는 기술이다. SQL에 친숙하다면 정규화가 잘된 데이터 모델의 유용함과 트랜잭션(transaction)의 필요성 그리고 안전한(견고한) 저장 엔진을 통해 빠르고 편리하게 사용할 수 있음을 알 수 있다.

그렇다면 MongoDB 정의에서 말하는 NoSQL 데이터베이스는 어떤 걸까?

## 1-1. NoSQL DB등장 배경

관계형 데이터베이스가 기존 데이터베이스의 문제점을 해결하려고 등장했듯이 관계형 데이터 베이스 역시 문제점이 있었다. 이에 관계형 데이터베이스 중심의 데이터 저장 기술 시장에 NoSQL이라는 새로운 데이터 저장 기술이 등장했다.

그렇다면 관계형 데이터베이스(Relational database)와 비교했을 때 도큐먼트 데이터베이스(NoSQL)의 특징및 장점은 무엇일까?

## 1-2. NoSQL DB의 특징

NoSQL 데이터베이스는 각 DBMS별로 차이가 있으나 일반적으로 다음과 같은 특징을 가지고 있다.

![nosql특징.png](./image/nosql%ED%8A%B9%EC%A7%95.png)

> 사진 출처: [https://meetup.toast.com/posts/274](https://meetup.toast.com/posts/274)

- `유연성` : 스키마 선언 없이 필드의 추가 및 삭제가 자유로운 Schema-less 구조
- `확장성` : 스케일 아웃에 의한 서버 확장이 용이
- `고성능` : 대용량 데이터를 처리하는 성능이 뛰어남
- `가용성` : 여러 대의 백업 서버 구성이 가능하여 장애 발생 시에도 무중단 서비스가 가능

## 2. MongoDB란?

MongoDB 는 웹 애플리케이션과 인터넷 기반을 위해 설계된 데이터베이스 관리 시스템이다.

## 2-1. MongoDB 특징

mongoDB는 데이터를 관리하는 방식에서 관계형 데이터베이스와 큰 차이가 있으며 그중 대표적인 특징은 다음과 같다.

### 2-1-1. 도큐먼트(document) 데이터 베이스

- 도큐먼트: HTML과 같은 특정 형식의 태그 구조
- mongoDB는 `JSON`(JavaScript Object Notation) 형식으로 데이터를 관리
- `도큐먼트`는 mongoDB가 데이터를 저장하는 최소 단위
- 도큐먼트는 `필드와 값의 쌍`으로 구성
- 관계를 갖는 데이터를 중첩 도큐먼트와 배열을 사용하여 1개의 도큐먼트로 표현 가능
- 데이터 입출력 시에는 JSON 형식의 도큐먼트를 사용하지만 데이터베이스 저장 시에는 이진 포맷으로 인코딩한 `BSON`(Binary JSON) 형식의 도큐먼트로 변환되어 저장

### 2-1-2. 유연한 스키마

- 스키마의 선언 없이 필드의 추가와 삭제가 자유로운 `Schema-less` 구조
- 관계형 데이터베이스는 테이블 내 모든 로우(Row)의 칼럼 집합이 동일하고 같은 칼럼은 동일한 데이터 타입을 갖는 정형 스키마이지만, `mongoDB는 컬렉션 내 모든 도큐먼트들의 필드 집합이 동일하지 않고 같은 필드라도 데이터 타입이 다를 수 있는 비정형 스키마`

### 2-1-3. 비 관계형 데이터베이스

- 관계형 데이터베이스의 관계(Relationship) 개념이 없는 비 관계형 데이터베이스
- `조인(Join)을 지원하지 않으며`, 대신 임베디드 방식의 도큐먼트 구조를 사용하거나 레퍼런스 방식의 도큐먼트 구조를 사용한 후 애플리케이션에서 조인해야 한다.

### 2-1-4. 비 트랜잭션

- `트랜잭션`: 데이터베이스의 상태를 변화시키기 해서 수행하는 작업의 단위 (질의어를 사용하여 데이터베이스에 접근하는 것을 의미한다.)
- 트랜잭션을 지원하지 않고 `각각의 도큐먼트 단위로 처리`
- 트랜잭션을 지원하지 않으므로 Commit 또는 Rollback 개념이 없으며 모두 Auto Commit으로 처리

## 2-2. **JSON 및 BSON**

2-1 특징에서 간단하게 언급했듯이 mongoDB는 데이터를 관리하기 위한 형식으로 데이터 입출력 시에는 JSON 형식을 사용하고 데이터 저장 시에는 BSON 형식을 사용한다.

내부적으로 MongoDB가 어떻게 JSON을 BSON으로 변환하는지 정확히 이해하기 어렵고, 당장 이해하지 못해도 큰 문제 없이 사용할 수 있다. 하지만 [mongoDB Story 2: mongoDB 특징과 구성요소- toast](https://meetup.toast.com/posts/275) 해당 글에서 자세한 설명과 함께 다음과 같이 이해하면 좋다고 권장하고 있다.

> 사실 BSON으로 인코딩(encoding)하거나 디코딩(decoding)하는 것은 mongoDB가 자동으로 처리하므로 사용자가 몰라도 문제가 없습니다. 다만 데이터베이스를 정확히 이해하고 사용하면 데이터 처리에 따른 성능 판단 및 문제 해결에 도움이 되므로 개념을 이해하시기를 권장합니다.

## 2-3. 관계형데이터베이스와 비교

![관계형데이터베이스와비교.png](./image/%EA%B4%80%EA%B3%84%ED%98%95%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4%EC%99%80%EB%B9%84%EA%B5%90.png)

> 사진출처: [https://meetup.toast.com/posts/275](https://meetup.toast.com/posts/275)

## 2-4. 데이터 조작어 (DML)

mongoDB의 데이터 조작어(DML - Data Manipulation Language)는 SQL 문법을 사용하지 않고 `자바스크립트 기반의 명령어`와 `JSON 도큐먼트`를 인자로 사용한다. 관계형 데이터베이스의 데이터 조작어와 형태만 다를 뿐 비슷한 역할을 수행한다.

## 2-5. 스키마(Schema)

앞서 MongoDB의 특징으로 고정적인 스키마를 갖지 않고 있다고 설명을 했다. 그런데 이번에 express에서 moongoose를 사용하다보면 스키마를 만들어서 사용하는 경우가 있다. 또한 몇몇 문서를 살펴보면 스키마를 미리 만들어야한다고 한다.

정리하자면 여기서 말하는 스키마는 `데이터베이스 서버측에서 만드는 스키마가 아니라, 우리의 웹서버가 데이터베이스에 들어있는 문서들을 객체화하여 사용 할 수 있도록 설정하는 것`을 의미한다. 이를 통해 데이터의 구조가 빈번히 변경되는 개발 프로젝트 초기 단계에서 개발 시간을 단축시켜 줄 수 있다.

또한, 스키마가 없는 데이터 모델을 통해 가변적인 속성을 갖는 데이터를 표현 할 수 있다.

데이터베이스의 실제 데이터와, 웹서버의 스키마가 일치하지 않아도, 정상적으로 작동할 수 있다. 하지만, 만약에 데이터베이스상에선 있는 정보가 서버측의 데이터 스키마에선 설정되어있지 않다면 해당 정보는 `undefined`
 로 보여지게 된다.

## 2-6. 데이터 모델

mongoDB에서의 데이터 모델링은 업무 성격에 맞는 도큐먼트 구조의 설계가 중요하다. 크게 `임베디드 방식`과 `레퍼런스 방식`으로 나뉘며 아래 표와 같다.

![모델.png](./image/%EB%AA%A8%EB%8D%B8.png)

> 사진출처: [https://meetup.toast.com/posts/275](https://meetup.toast.com/posts/275)

자세한 사항은 [mongoDB Story 3: mongoDB 데이터 모델링 - toast](https://meetup.toast.com/posts/276)을 참고하자.

[MongoDB란 - 역사, 설계 목표, 핵심 기능, 몽고DB를 사용하는 이유](https://hoing.io/archives/1379)

[mongoDB Story 1: mongoDB 정의와 NoSQL - toast](https://meetup.toast.com/posts/274)

[mongoDB Story 2: mongoDB 특징과 구성요소- toast](https://meetup.toast.com/posts/275)

[Mongodb Atlas - velog](https://velog.io/@zlor26/Mongodb-Atlas)

[mongodb - atlas](https://www.mongodb.com/atlas/database)

[https://backend-intro.vlpt.us/2/03.html](https://backend-intro.vlpt.us/2/03.html)
