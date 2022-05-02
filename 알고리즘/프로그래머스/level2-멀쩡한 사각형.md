- https://programmers.co.kr/learn/courses/30/lessons/62048

### 문제 이해 및 입출력

> 09:03 - 09: 05

직사각형 종이를 대각으로 잘라 직각삼각형 2개가 나옴.

멀쩡한 사각형의 개수 구하기

w, h는 1억 이하의 자연수

### 문제풀이

> 09:05 -  09:56, 14:10 - 14:45

1.  w,h 둘다 홀 수일 때, w,h 둘 중 하나만 홀 수 일 때, w.h둘다 홀수가 아닐 때

2.  `w + h - 적절한 숫자`

- 최대공약수 구하기:
  - 2부터 시작해서 둘다 나눴을 때 나머지가 0인 숫자
  - 작은 숫자까지 갔는데도 나머지가 0이 아니면 1 반환
- w,h가 같으면?

```jsx
function solution(w, h) {
  let biggerNumber = 0;
  let smallerNumber = 0;
  if (w < h) {
    biggerNumber = h;
    smallerNumber = w;
  } else {
    biggerNumber = w;
    smallerNumber = h;
  }
  let greastestCommonFactor = 1;
  for (let i = Math.floor(smallerNumber / 2); i > 1; i--) {
    if (biggerNumber % i === 0) {
      greastestCommonFactor = i;
      break;
    }
  }
  if (biggerNumber % smallerNumber === 0) {
    greastestCommonFactor = smallerNumber;
  }
  const subtractNumber = biggerNumber + smallerNumber - greastestCommonFactor;
  const answer = w * h - subtractNumber;
  return answer;
}
```

최대공약수를 구할 때 꼭 다 돌아야하나? 작은 수의 절반만 돌고 확인 안되나 →

`조건문이 잘못되었음. 작은 수를 기준으로 도는 건 맞는데 작은수도 같이 확인해야함`

```jsx
function solution(w, h) {
  let biggerNumber = 0;
  let smallerNumber = 0;
  if (w < h) {
    biggerNumber = h;
    smallerNumber = w;
  } else {
    biggerNumber = w;
    smallerNumber = h;
  }
  let greastestCommonFactor = 1;
  for (let i = Math.floor(smallerNumber / 2); i > 1; i--) {
    if (biggerNumber % i === 0 && smallerNumber % i === 0) {
      greastestCommonFactor = i;
      break;
    }
  }
  if (biggerNumber % smallerNumber === 0) {
    greastestCommonFactor = smallerNumber;
  }
  const subtractNumber = biggerNumber + smallerNumber - greastestCommonFactor;
  const answer = w * h - subtractNumber;
  return answer;
}
```

1. 최대공약수 구하기 2 번째

→ 3,5,6,13,17 번째 테스트 케이스 실패

- a,b 두 수의 최대공약수 구하기
- 최대공약수 = 1 이상, a와 b 중 작은 숫자 이하

- 기본방법, o(n)
  ```jsx
  let getGCD = (num1, num2) => {
    let gcd = 1;

    for (let i = 2; i <= Math.min(num1, num2); i++) {
      if (num1 % i === 0 && num2 % i === 0) {
        gcd = i;
      }
    }
    return gcd;
  };
  ```
- 유클리드 호제법
  ```jsx
  // 유클리드 호제법을 이용한 최대 공약수 구하기
  function gcd(w, h) {
    // 처음 W와 H를 받습니다.

    // W와 H의 나머지를 구합니다.
    const mod = w % h;

    // 만약 나머지가 0일 경우 H를 반환합니다.
    if (mod === 0) {
      return h;
    }

    // 만약 0이 아닐경우 W에 H를 넣고 H에 나머지인 mod를 넣어 해당 함수를 다시 호출해 줍니다.
    return gcd(h, mod);
  }
  ```
