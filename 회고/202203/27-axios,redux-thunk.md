# 20220327 - axios, redux-thunk 에러처리

## Ⓜ️ 코넥트

에러 처리를 어떻게 해야할까

> axios와 redux(-thunk) 조합

### 이전코드 

global_reducer에서 에러처리

서버와 통신과정에서 에러가 발생하거나, 서버에서 에러 메세지를 전달했다면 global modal창으로 global_reducer에 isOpen이 true이면 error메세지를 보여줌 .

서버와 통신하는 모든 요청마다 axios.post(), axios.get() 등으로 사용함.

### 🎯 목표

axios.instance 및 intercepter 이해하고 활용

intercepter에서 에러처리 로직을 만들어서 action마다 있는 에러 처리 로직을 통합관리

### 🤔 문제점

store의 외부인 utils에서 dispatch를 사용할 수 없음. axios instance와 intercepter는 만들었지만 dispatch를 사용할 수 없다.
