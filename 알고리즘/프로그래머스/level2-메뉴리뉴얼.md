# 프로그래머스 - 메뉴리뉴얼

[#알고리즘](upnote://x-callback-url/tag/view?tag=%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98 '#알고리즘') [#프로그래머스](upnote://x-callback-url/tag/view?tag=%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4 '#프로그래머스') [#조합](upnote://x-callback-url/tag/view?tag=%EC%A1%B0%ED%95%A9 '#조합')

> [https://programmers.co.kr/learn/courses/30/lessons/72411](https://programmers.co.kr/learn/courses/30/lessons/72411)

1번 도전에서 못하고 2번째 다시 도전했는데 조합 구현에서 실패

조합구현하기

---

[https://pul8219.github.io/algorithm/algorithm-permutation-and-combination/](https://pul8219.github.io/algorithm/algorithm-permutation-and-combination/)

### 문제 이해 및 입출력

###

---

> 8:52 - 8:56

기존에는 단품으로만 제공하던 메뉴를 조합해서 코스스 형태로 재구성

코스메뉴 구성 조건

- 각 손님들이 주문할 때 가장 많이 함께 주문한 단품 메뉴
- 각 코스메뉴는 최소 2가지 이상의 단품 메뉴
- 최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합

orders: 각 손님들이 주문한 단품메뉴

course: 추가하고 싶어하는 코스 요리를 구성하는 단품 메뉴 갯수

return: 새로 추가하게 될 코스요리의 메뉴 구성, 오름차순

### 문제풀이

---

> 8:57- 9:22, 9:30 - 10:05

1.  orders를 크기 순으로 정렬  → orders를 하나씩 돌면서 course를 하나씩 적용

2.  모든 조합을 키밸류로 저장 → 조합을 어떻게 구현하지/
