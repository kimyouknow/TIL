### 문제이해

> 10:31 - 10:38

자카도 유사도: J(A, B) : (교집합 원소의 수) / (합집합 원소의 수)

A, B 모두 공집합일 때는 = 1

다중집합에도 확장가능

다중집합의 교집합: 같은 원소 개수 중 적은 쪽으로

다중집합의 합집합: 같은 원소 개수 중 큰 쪽으로 (더하는 거 아님)

str1, str2를 두 글자씩 끊어서 다중집합의 원소를 만들기

두 글자씩 끊는데 특수문자는 포함되면 버리기

### 아쉬운점 ()

정규식활용: 2개씩 검사하는 기능

String.prototype.substr(idx, 2)

new Set() 활용

### 문제풀이

1트

> 10:38 - 11:29

순서: 1) str을 두 글자씩 각각 끊기 (끊을 때 특수문자 주의) → 2) 자카도 유사도 구하기(다중집합의 교집합, 합집합)

1.  str을 두 글자씩 각각 끊기 (끊을 때 특수문자 주의)

2.  자카도 유사도 구하기(다중집합의 교집합, 합집합)

- obj1.entries로 key, value 뽑아서 obj2[key]로 접근
- obj2[key]가 없으면 합집합.push(obj2[key], value),
- value > obj2[key] ? 합집합.push(key) value만큼 + 교집합.push(key) obj2[key]만큼

```jsx
function makeStringToMultipleSet(str) {
  const regex = /^[a-z|A-Z]+$/;
  return str.split('').reduce((acc, cur, idx) => {
    if (idx === str.length - 1) {
      return acc;
    }
    const target = cur + str[idx + 1];
    if (!regex.test(target)) {
      return acc;
    }
    const lowerTarget = target.toLowerCase();
    if (acc[lowerTarget]) {
      acc[lowerTarget] += 1;
    } else {
      acc[lowerTarget] = 1;
    }
    return acc;
  }, {});
}

function isEmptyObj(obj) {
  return Object.keys(obj).length === 0;
}

function solution(str1, str2) {
  const obj1 = makeStringToMultipleSet(str1);
  const obj2 = makeStringToMultipleSet(str2);
  let intersectionLength = 0;
  let unionLength = 0;
  if (isEmptyObj(obj1) && isEmptyObj(obj2)) {
    return 65536;
  }
  // Set 활용해서 다시 풀어보기
  for (const [key, value] of Object.entries(obj1)) {
    if (!obj2[key]) {
      unionLength += value;
      obj1[key] = 0;
    } else {
      if (value > obj2[key]) {
        unionLength += value;
        intersectionLength += obj2[key];
      } else {
        unionLength += obj2[key];
        intersectionLength += value;
      }
      obj1[key] = 0;
      obj2[key] = 0;
    }
  }
  Object.values(obj2).map((value) => (unionLength += value));
  const answer = Math.floor((intersectionLength / unionLength) * 65536);
  return answer;
}
```
