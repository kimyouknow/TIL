# 20220323

# 코드스쿼드

> apply, call, bind, 효과적인 이벤트 핸들링, debounce, throttle

### debounce, throttle 구현

[효과적인 이벤트 핸들링 - gist 정리](https://gist.github.com/kimyouknow/004adaca72af78c883523f335d197efe)

- arguments 객체: 실제 배열이 아닌 유사배열객체
- 함수를 매개변수로 전달하는 방법들
- 이벤트 리스너의 수신기 종류: 콜백함수 or EventListener 인터페이스를 구현하는 객체
  > `콜백 함수 자체`는 handleEvent() 메서드와 같은 매개변수, 같은 반환 값을 가집니다. 즉, 콜백 함수는 발생한 이벤트를 설명하는 `Event 기반 객체를 유일한 매개변수로 받고, 아무것도 반환하지 않는다.
- event 객체 전달
  > event는 자동으로 함수에 전달됨. addEventListener에 전달하는 함수의 첫 번째 인수로 지정하기만 하면 됨. 또한 `false`는 capture parameter의 기본값

# 코넥트

> pr관리, 에러 핸들링

# 공동 레포지토리 관리하기

# 구글시트용

debounce, throttle에 대해서 알아봤다. <함수를 매개변수로 전달하는 방법>, <이벤트 리스너의 핸들러(콜백함수)>, <Event객체> 등에 대해서 자세히 공부할 수 있었다.

지금 미션에서 특정 파일에 기능이 너무 몰려 있는데, 어떻게 하면 모델과 뷰들을 더 분리할 수 있을까 고민해봐야겠다.
