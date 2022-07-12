# 20220711

<details>
<summary>시간대별 정리</summary>

### 아침

개발자의 글쓰기

1주차 주간회고 작성

### 오전

mongodb 학습

nosql 학습

jest

- fn
- node-mocks-http

### 오후

jest

- mock

module

- export
- import

### 저녁

코넥트

- https://github.com/yulpumta-clone-team/Co-nect/pull/77

</details>
<br>

# 개인공부

## mongodb

> node로 서버를 만들기 전에 DB에 대한 학습이 필요했다. 관계형 데이터베이스를 공부할까하다가 그나마 칙순한 NoSQL형태의 mongodb를 사용하기로 했다. 이전에 강의를 보면서 코드를 따라친 경험이 전부여서 이번기회에 어떤 특징이 있고, 어떻게 해야 잘 활용할 수 있는지 이론적인 내용을 먼저 학습해봤다.

### NoSql 특징

- 유연성, 확장성, 고성능?, 가용성
- 도큐먼트 데이터베이스

### MongoDB 특징

- 도큐먼트
- json형식으로 데이터를 관리하고 bson형식으로 저장
- 유연한 스키마: 데이터베이스 서버 측에서 만드는 스키마가 아닌, 우리의 웹서버가 데이터베이스에 있는 문서들을 객체화하여 사용할 수 있도록 설정 (mongoose를 활용해서 설정할 수 있다)
- 데이터베이스 → 컬렉션 → 도큐먼트 → 필드 → 인덱스
- cf> 관계형DB: 데이터베이스 → 테이블 → 로우 → 칼럼 → 인덱스

## jestMock

> express를 활용한 TDD를 학습하고 있다. 단위테스트를 구현하던 도중 독립적인 단위테스트를 작성하기 위해 mocking 작업이 필요했다. jest에서는 어떤 mocking툴이 있는지 학습했다.

jest.fn, jest.mock, jest.spyOn에 대해서 학습했다.

여러 가지 에러를 겪고 블로그글을 보면서 간단한 사용 방법을 학습했다.

### Mocking이란

단위테스트는 `독립적`이어야하며, 어떤 테스트도 `다른 테스트에 의존하지 않아야 한다`. 독립적이기 위해선 `외부 모듈과 로직에서 분리`되어야 한다. Ajax, Fetch, DB 등 테스트 대상이 의존하는 것을 다른 것으로 대체

### **모듈과 함수를 Mocking하기**

Jest에서 모듈과 함수를 Mocking 하는 3가지 방법이 있다.

- `jest.fn`: Mock a function
- `jest.mock`: Mock a module
- `jest.spyOn`: Spy or mock a function

### 추가 공부 방향

- es6 모듈과 commonjs 모듈에 대한 이해가 필요할 것 같다.
- export , export default에 대한 자세한 이해가 필요할 것 같다.

# 코넥트

### 로그인 관련 정보 정리

코드스쿼드에서 학습한 로그인 유지 및 OAuth흐름을 정리해서 호은씨와 공유했다.

### 기타 mock 데이터 수정

> mock데이터 및 api가 제대로 되어 있지 않은 부분이 있어 정리했다.

[PR링크](https://github.com/yulpumta-clone-team/Co-nect/pull/77)

- 로그인 mock 데이터 추가
- [x] 입력받은 로그인 정보
- [x] 로그인 이후 localstorage에 유저 프로필, 닉네임, 아이디를 저장하게 하기
- [x] 로그아웃하면 localstorage에 유저 프로필, 닉네임, 아이디를 삭제한다.
- EditTeamPost 접근
- [x] TeamDetail에서 접근할 수 있는 버튼 제거
- [x] 내 작성글 페이지에서만 접근할 수 있도록 변경
- 내 작성글 관련 mock 데이터 추가
- [x] ‘내 관심글’ 부분과 형식 비슷하게 Board 형식으로 먼저 보여지게 하기
- [x] 눌렀을 때 따로 edit버튼이 보여지는 postDetail페이지가 아니라 바로 EditPost페이지로 접근 가능하게하기
- UserBoard, TeamBoard, 내 관심글, 읽은 목록, 내가 작성한 글 → 5가지 목록에서 특정 카드를 누를 때 `목록의 종류별로 이동해야하는 페이지가 달라` 아래 코드 예시처럼 `선언적`으로 처리했다.

수정 전

```jsx
// components/CardsGrid
export default Cards({isUserList, cards}){
  const Card = isUserList ? UserCard : TeamCard;
  return (
   cards.map(({ id, ...cardInfo }) => (
     {/* 카드 컴포넌트 내부에 링크테그가 있었다. */}
     <Card key={id}  cardInfo={{ ...cardInfo, id }}  />
 )
}

// pages/UserBoards
export default UserBoards(){
  return (
     <Cards cards={userList} isUserList={true} />
 )
}
```

수정 후

```jsx
// components/CardsGrid
export default Cards({CardComponent, cards, clickLink}){
  const handleClickCardComponent = (cardId) => {
    clickLink && navaigate(clickLink + cardId);
  };
 return (
   cards.map(({ id, ...cardInfo }) => (
     <CardComponent   key={id}  cardInfo={{ ...cardInfo, id }} onClick={() => handleClickCardComponent(id)}  />
 )
}

// pages/UserBoards
export default UserBoards(){
  return (
     <Cards cards={userList} CardComponent={UserCard} clickLink={`${USER}/`} />
 )
}
```
