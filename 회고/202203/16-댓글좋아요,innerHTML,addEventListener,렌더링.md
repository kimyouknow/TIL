# 20220316

# 코드스쿼드

> innerHTML, addEventListener, 렌더링과 이벤트리스너

innerHTML은 htmlString이다. mdn공식문서에도 `요소(element)의 내용을 변경하는 대신 HTML을 문서(document)에 삽입하려면, insertAdjacentHTML() 메서드를 사용하십시오.`라고 나와있다. 요소(element)의 자손의 HTML 직렬화를 포함하는 DOMString 이므로 Setting the value of innerHTML 의 값을 설정(대입)하면 요소의 모든 자손이 제거되고, 문자열 htmlString에 지정된 HTML을 파싱하고, 생성된 노드로 대체.

innerHTML은 DOMString이고 엘리먼트가 아니라서 이벤트 리스너가 달리지 않는다고 생각했는데, 내가 상속을 구현하면서 `$parent.innerHTML = $child.innerHTML`이런식으로 짜고 $child에 이벤트리스너를 달아서 문제가 된거였다. 위와 같은 코드는 잘 생각해보면 $parent의 innerHTML의 내용을 $child.InnerHTML로 교체한 것이지, $parent에 $child를 넣은 것이 아니다.

```html
<head>
  <style>
    .inner {
      width: 500px;
      height: 500px;
      background-color: tomato;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    document.querySelector(
      '#root'
    ).innerHTML = `<div class="inner">inner</div>`;
    document.querySelector('.inner').addEventListener('click', (e) => {
      alert(e.target);
    });
  </script>
</body>
```

위의 코드로 확인해본 결과 `innerHTML은 DOMString이고 엘리먼트가 아니라서 이벤트 리스너가 달리지 않는 것이 아니라는 것을 알 수 있다.` DOMString이어도 이벤트리스너가 달린다.

# 코넥트

> 좋아요 기능: `자신이 좋아요 누른 게시글(댓글)에는 하트가 색칠되어 있게 표시하기`

댓글과 게시글에 좋아요 기능을 어떻게 추가해야할지 고민해봤다.

### 🤔 문제

게시글의 경우, 게시글 전체를 나열하는 페이지(Board)에서는 자신이 좋아요 누른 게시글을 별도로 표시하지 않고 `좋아요 개수`만 표시한다. (유저가 특정 게시글을 클랙해서 접근하는) 상세 내용을 보여주는 페이지(Post)에서는 좋아요 버튼이 본인이 좋아요 누른지 여부에 따라 색칠이 되어야 한다.

상세페이지(Post)의 경우 db에 유저마다 `좋아요 누른 목록`이 있기 때문에 해당 Post의 id값이 좋아요 누른 목록에 있는지 확인하면 된다.

댓글의 경우, 상세댓글이 없고, Board와 같이 전체를 나열하기 때문에 Post와 같은 로직을 사용한다면 유저마다 `좋아요 누른 댓글 목록`을 생성하고, 해당 배열과 `현재 Post가 가진 댓글 배열`을 비교해야 좋아요 버튼을 색칠할 수 있을 것이다. 하지만 댓글이라는 서비스 특성 상 게시글 수보다 훨씬 많을 수 있기 때문에 해당 로직을 그대로 사용하면 탐색하고 비교하는데 비효율적이라고 생각했다.

```json
"user1의 Post": {
  "id": 123,
  "작성자id" : 11,
  "comments": [
    {
    "comment_id": 0,
    "like_cnt": 0
  },{
    "comment_id": 1,
    "like_cnt": 0
  } ,{
    "comment_id": 2,
    "like_cnt": 0
  }
  ]
}
"user1": {
  // ...
  "좋아요한 게시글 목록" : ["게시글1", "게시글2"],
  "좋아요한 댓글 목록" : ["댓글1", "댓글2"],
}
```

### 💡 해결방법

댓글마다 `like_users`라는 배열을 추가하기로 했다. 이 배열에는 해당 댓글에 좋아요를 클릭한 유저의 id값이 담겨 있다. 유저가 특정 게시글에 접근했을 때 보여지는 댓글들 중 like_users에 유저 id 포함하는 댓글의 좋아요 버튼을 색칠할 생각이다.

```json
"user1의 Post": {
  "id": 123,
  "작성자id" : 11,
  "comments": [
    {
    "comment_id": 0,
    "like_users": ["유저1", "유저2", "유저3"]
  },{
    "comment_id": 1,
    "like_users": ["유저1", "유저2", "유저3"]
  } ,{
    "comment_id": 2,
    "like_users": ["유저1", "유저2", "유저3"]
  }
  ]
}
"user1": {
  // ...
  "좋아요한 게시글 목록" : ["게시글1", "게시글2"],
}
```
