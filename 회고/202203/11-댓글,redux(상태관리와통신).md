# 20220311

# 코넥트

> 댓글 crud, 똑같은 댓글 crud api인데 user와 team이 달라서 2번 반복함.

댓글 기능을 만들기 전 인스타, 디스코드, 페이스북, 슬랙 댓글을 살펴보았다.

현재 코넥트는 userPost의 댓글, teamPost의 댓글 기능이 있어, 각각 reducer에서 댓글 관련 post, patch, delete 작업을 수행하고 있다.

```bash
├─ 📁 _reducers
│      ├── team_reducer.js # targetTeam: {teamId, comments, ...args}
│      └── user_reducer.js # targetUser: {userId, comments, ...args}
└─ 📁 src
       ├── 📁 components
       │   ├── Comment.jsx
       │   └── CommentContainer.jsx
       └── 📁 pages
           ├── UserPost.jsx
           └── TeamPost.jsx
```

위와 같은 방식으로 하니 똑같은 댓글 관련 crud기능을 UserPost.js와 TeamPost.js에서 반복적으로 썼다. 공통적으로 쓰이는 레이아웃은 component로 분리했지만 crud기능은 각각 reducer안에 comments로 관리하고 있어 댓글 관련 api가 2번 반복되고 있다. 댓글도 reducer로 따로 분리하면 댓글만 get하는 api 따로 요청하게 할 수 있다. 하지만 \*\*\*Post.js를 렌더링할 때 댓글get, \*\*\*Post데이터 get 2 번이나 get 호출을 해야해서 비효율적이라고 생각했다.

위와 같은 문제는 redux를 쓰다보니 상태관리 뿐만 아니라 서버와 데이터 통신하는 역할까지 redux가 담당해서 생기는 문제같다. 아직 redux뿐만 아니라 상태관리와 효율적인 서버와 통신 방법(?)을 몰라서 생기는 문제일까? 일단 위의 문제 해결방안으로 댓글 reducer를 따로 만들되, \*\*\*Post.js를 렌더링할 때 get요청은 한 번만 보내고 받은 데이터에서 comments만 따로 분리해서 reducer로 관리하는게 좋을 것 같다.

댓글관련 기능은 예전부터 관심이 많았는데 바닐라 js로 만들어보고 공부해봐야겠다.
