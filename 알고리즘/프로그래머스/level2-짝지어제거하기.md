### 문제이해

> 09:27 - 09:30

s: 알파벳 소문자로 이루어진 문자열

같은 알파벳이 2개 붙어 있는 짝 찾기 → 둘 제거 → 앞뒤로 문자열 이어붙이기

위의 과정 반복

s가 성공적으로 수행할 수 있는지 ; 가능하면 1, 불가능하면 0

1 ≤ s.length ≤ 1,000,000

진짜 하나씩 찾다가 없으면 false를 반환해야하는지

규칙을 찾아야 하는지

### 문제풀이

- 1트: 규칙 찾기
  > 09:31 - 09:51, 10:10 - 10:25, 10:25 - 10:30
  두 문자 사이에 같은 문자가 홀 수개 있으면 false
  한자리씩 확인 → 현재 인덱스의 문자를 prev에 저장 → 다음 인덱스의 문자 = cur로 하기 → prev와 cur을 비교 → 같으면 인덱스 증가 → 다르면 cur과 prev를 비교, 홀수면 false 짝수면 prev에 cur에 넣기
  ```jsx
  let prev = 0;
  let acc = 0; // 같은게 있으면 누적하기
  for(let i = 0; i < s의 길이; i++){
  	if(s[prev] === s[i]{
  		// 이전 값과 현재 값이 같으면 acc 누적
  		// for 문 그대로 돌기
  	} else {
  		// 이전 값과 현재 값이 다르면
  		if(누적값 === 홀수){
  			answer = false;
  		} else {
  			prev = i;
  			acc = 1;
  		}
  	}
  }
  ```
- 2트: 스택
  > 10:30 - 10:40, 10:40 - 10:45
  수도코드
  ```jsx
  const stack = [];
  stack에 넣기 전에 stack의 마지막 요소와 cur비교
  같으면 stack.pop();
  다르면 stack.push();
  while문을 돌면서 달라질 때까지 stack.pop();
  ```
  제출코드
  ```jsx
  function solution(s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
      const stackLength = stack.length;
      const lastElement = stack[stackLength - 1];
      if (lastElement === s[i]) {
        stack.pop();
      } else {
        stack.push(s[i]);
      }
    }
    return stack.length === 0 ? 1 : 0;
  }
  ```
  - 효율성 테스트2에서 **시간초과**
  문제: s[i]로 두 번 접근해서 문제가 됨. target이라는 변수로 빼놓고 사용하기
  ```jsx
  function solution(s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
      const stackLength = stack.length;
      const lastElement = stack[stackLength - 1];
      const target = s[i];
      if (lastElement === target) {
        stack.pop();
      } else {
        stack.push(target);
      }
    }
    return stack.length === 0 ? 1 : 0;
  }
  ```
