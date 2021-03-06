# 관심사분리 (Seperate of Concerns)

[#아키텍처](upnote://x-callback-url/tag/view?tag=%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98 '#아키텍처')

- 절대적인 디자인 패턴은 없다! 관심사를 분리해보자.
- 다만 지금까지 쓰고 있는 패턴이나 아키텍처는 그만큼 좋다는 뜻
- 패턴을 맹신하지말아라. 디자인 패턴이 분명 도움이 되지만, 맹목적으로 따라갈 필요 없이 나만의 디자인 패턴을 고민하는 과정이 더 중요하다.

## 아키텍처의 핵심

관심사항을 분리하는 것이 좋다. `Separation of concerns` = SOC software

어떤 그룹을 지을지, 어떻게 묶을지

코드는 testable해야하는데 모델과 뷰를 구분해야 테스트하기가 용이함.

## 어떻게 그룹을 지어야할까? 어떻게 나눠야할까?

핵심키워드: **응집도와 결합도**

`응집도`

> 비슷한 코드끼리 얼마나 잘 모아져 있나?⁠

- 비슷한 일을 하는 코드는 모아두기

`결합도`

> 코드가 얼마나 독립적인가? 구분된 코드 사이가 얼마나 섞여있는지

- 한 일을 처리하는 코드는 다른 일을 하는 코드에 영향을 덜 받는게 좋다.
- 하지만 결합이 없을 수 없다. 이 부분이 가장 어려웠다. 예를 들어, 데이터를 관리하는 store에서 데이터가 바뀌면 ui를 담당하는 뷰에게 알려줘야하는데 이 과정에서 결합이 생길 수 밖에 없다.
- 이러한 결합도를 낮추기 위한 고민과 노하우가 대부분의 설계 원리와 디자인 패턴에 녹아 있다.

## 이에 따른 몇 가지 규칙들

### 1\. 함수는 작게

### 2\. 캡술화: 공과 사를 구분

**공(인터페이스)**

- 다른 객체와 협력할 때 서로 맞춰야하는 부분
- 다시 말해, 다른 객체와 의존성이 있는 부분
- 다른 객체들이 해당 객체에 메세지를 보내서 요청할 수 있는 작업들

**사(구현)**

- 내가 어떻게 상태를 저장하고 있는지, 어떤 식으로 일을 하는지

캡슐화가 잘 해 놓으면 객체는 다른 객체에 영향을 주지 않고 독립적으로 구현을 바꿀 수 있다. 해당 객체를 바꾸는데 다른 객체까지 변경한다면 작업량이 늘 뿐이다.

### 3\. 단일 책임 원칙

변경 기준으로 나눠라. 특정 기능이 변경 상황 A에서도 바꿔야하고, 변경 상황 B에서도 바꿔야한다면 그 기능이 너무 많은 일을 하고 있는 것이다.

### 4\. 인터페이스 분리 원칙

인터페이스를 별도의 추상 클래스나, 혹은 프로토콜로 정의

이러한 인터페이스를 사용하면 연결된 객체끼리 구체적인 정보를 교환하지 않고 해당 인터페이스를 거쳐 코드의 결합도가 낮아질 수 있다.

인터페이스 또한 관심사끼리 분리

클라이언트 기준으로 인터페이스를 나누기

- 인터페이스에서 관심사를 분리할 때 클라이언트가 필요한 인터페이스만 쓸 수 있도록 분리하기
-

### 5\. ui와 비즈니스 로직을 나눠라 

- M: 비즈니스 로직
- V: UI로직

### 6\. 레포지토리 패턴

모델도 2가지로 분리가능: 비즈니스 로직과 데이터 접근

**비즈니스 로직**

- 프로세스 내부 로직

**데이터 접근**

- 프로세스 외부에서 데이터를 가져오는 코드

###

### 7\. 레이어 간 의존성 규칙

여러 층으로 레이어가 나눠질 때, 안쪽 레이어는 바깥쪽 레이어에 대해서 몰라야한다.

🔍 참고자료

- [MVC 창시자가 말하는, MVC의 본질 - tistory](https://velog.io/@eddy_song/mvc)
- [소프트웨어 설계의 근본 원칙, 관심사의 분리 - tistory](https://velog.io/@eddy_song/separation-of-concerns)
