https://programmers.co.kr/learn/courses/30/lessons/64065

### 문제이해

> 10:11 - 10: 21

튜플 ()

중복가능

원소에 정해진 순서 있음(순서가 다르면 서로 다른 튜플로 간주)

원소의 개수는 유한]

집합 {}

튜플의 원소로 만들 수 있는 조합( 단, 튜플의 앞자리부터 순서대로)

순서 없음

- 집합이 주어지면 해당하는 튜플을 찾아서 반환하기
- 5 ≤ s.length ≥ 1,000,000
- s: string, {, }, 숫자로 이뤄짐
- 1≤ 각 숫자 ≤ 100,000

### 아쉬운 점

정규식 표현식 활용 ( replace로 교체만 했는데, match를 써서 필요한 요소만 뽑을 수 있음)

고차함수활용 (reduce는 많이 써보려고 했지만, sort나 filter로 해결할 수 있는 로직이 있었음)

배열 중복제거

### 문제풀이

1트

> 10:21 - 11:10, 11:20 - 11:40

1. 파싱

- 배열의 인덱스 = 집합의 사이즈
- 정규식 활용하기

2. 길이 순서대로 정렬

- 그냥 sort써도 됨.

3. 두 배열간 중복을 제거

- 여기서 오래 걸림

```jsx
function solution(s) {
  const removedBrackets = s
    .substring(2, s.length - 2)
    .replace(/},{/g, '|')
    .split('|');
  const arr = removedBrackets.reduce((acc, cur) => {
    const targetSet = cur.split(',').reduce((acc, cur) => {
      acc.push(Number(cur));
      return acc;
    }, []);
    acc[targetSet.length - 1] = targetSet;
    return acc;
  }, []);

  const answer = arr.reduce((acc, cur, idx) => {
    if (acc.length === 0) {
      acc.push(Number(cur.join(',')));
    } else {
      const removeDuplicated = cur.filter((element) => !acc.includes(element));
      acc.push(Number(removeDuplicated));
    }
    return acc;
  }, []);
  return answer;
}
```

2트

> 11: 42 - 11:53

```jsx
function solution(s) {
  const answer = s
    .match(/{[\d,]+}/g)
    .map((braceElement) =>
      braceElement.match(/[\d]+,?/g).map((v) => parseInt(v))
    )
    .sort((a, b) => a.length - b.length)
    .reduce(
      (acc, cur) => [
        ...acc,
        ...cur.filter((element) => !acc.includes(element)),
      ],
      []
    );
  return answer;
}
```
