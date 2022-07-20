# 20220719

<details>
<summary>시간대별 정리</summary>

### 오후

react webpack ts boiler template수정

- svg 컴포넌트 수정
- font 수정
- assets module

react에서 jest 사용하기

### 저녁

코넥트

- 디자이너와 협업 정리
- hoc
  - withLoading
- useAxios

</details>
<br>

# 개인공부

### 보일러 템플릿 webpack5 assets 업데이트

이전에 적용하지 못했던 font 문제를 해결하고 svg 컴포넌트를 어떻게 사용할지 결정했다. 이전에는 아래의 로더를 사용해서 각각의 문제를 해결했다.

- [raw-loader](https://v4.webpack.js.org/loaders/raw-loader/) 파일을 문자열로 가져올 때
- [url-loader](https://v4.webpack.js.org/loaders/url-loader/) 파일을 data URI 형식으로 번들에 인라인 추가 할 때
- [file-loader](https://v4.webpack.js.org/loaders/file-loader/) 파일을 출력 디렉터리로 내보낼 때

font적용에 어려움을 겪어서 webpack공식문서를 찾아보던 중 [Assets Module](https://webpack.kr/guides/asset-modules/)에 관한 내용을 발견해 적용해봤다.

- `asset/resource`는 별도의 파일을 내보내고 URL을 추출한다. 이전에는 `file-loader`를 사용하여 처리할 수 있었다.
- `asset/inline`은 애셋의 data URI를 내보낸다. 이전에는 `url-loader`를 사용하여 처리할 수 있었다.
- `asset/source`는 애셋의 소스 코드를 내보낸다. 이전에는`raw-loader`를 사용하여 처리할 수 있었다.
- `asset`은 data URI와 별도의 파일 내보내기 중에서 자동으로 선택한다. 이전에는 애셋 크기 제한이 있는 `url-loader`를 사용했다.

개발모드와 빌드모드에서 브라우저 화면에 적용되는 것을 확인했다. 아직 번들링된 파일과 번들링되기 전 파일을 비교하지도 않았고, 정확한 동작과정을 이해하지 못했다.

### 보일러 템플릿 jest 업데이트

보일러 템플릿에 jest와 react test library 적용했다. [https://www.daleseo.com/react-testing-library/](https://www.daleseo.com/react-testing-library/) , [https://learn-react-test.vlpt.us/#/](https://learn-react-test.vlpt.us/#/) 에 나와있는 간단한 튜토리얼을 따라 했지만 아직 정리한 키워드는 없다.

쿼리문과 핵심 메서드의 사용방법을 익혀야겠다.

# 코넥트

### 디자이너와 협업 준비

새로 합류하는 디자이너 분을 위해 프로젝트 상황과 용어, 페이지에 대한 설명을 정리했다. 프로젝트 상황은 호은씨가 깔끔하게 정리해주셔서 나는 페이지에 대한 설명을 ppt로 구성했다. [구글 ppt](https://docs.google.com/presentation/d/11_iCzXTan4Qe6eyzvMCjF-MiH7x7TLK9j0wWJ8Mf_r0/edit#slide=id.g13d87c8bfca_2_108)

### UI 용어정리

협업과정에서 생기는 `소통의 틈`을 매꾸기 위해 UI관련된 용어를 정리했다. 우선 우리 프로젝트에서 사용할 용어를 정리했다. 프론트끼리 뿐만 아니라 디자이너분과도 원활한 소통을 위해 기술이나 태그보다는 UI관점에서 정리했다. 대부분의 용어정리는 [https://blog.stibee.com/헷갈리는-ui-스티비는-이렇게-씁니다-fa2d52f36a6c](https://blog.stibee.com/%ED%97%B7%EA%B0%88%EB%A6%AC%EB%8A%94-ui-%EC%8A%A4%ED%8B%B0%EB%B9%84%EB%8A%94-%EC%9D%B4%EB%A0%87%EA%B2%8C-%EC%94%81%EB%8B%88%EB%8B%A4-fa2d52f36a6c) 해당글을 참고했다.

**버튼:** 마우스를 올리면 색이 변하는 것, 사용자가 클릭했을 때 특정 동작을 야기하는 것 (페이지 이동, form 제출, 실행, 취소 등등) ⇒ 세부적인 동작은 FE로 역할로 위임

**input : 사**용자에게 텍스트 형식으로 어떤 내용을 입력받기 위한 UI, 한 줄 입력 요소, form 입력 요소

**textarea:** 텍스트 형식으로 어떤 내용을 입력받기 위한 UI, 마크다운 형식의 입력 요소, 한 줄 이상의 입력 요소

**팝업(popup)** : 새로운 윈도우가 띄워짐

**모달(modal) (window) :** 현재화면에 종속되었지만 보기엔 또 다른 레이어가 올라온 것 같은 느낌

**얼럿(alert)** : 사용자가 무언가 잘못된 길로 갔을 때, “띵”하고 뜨는 그 알림, 확인(닫기) 버튼만 있는 알림창, 자동사라지는 알림창

**드롭다운(dropdown) :** 어느 한 요소에 종속된 요소, 하위 메뉴가 숨겨져 있다가 사용자의 마우스 오버나 클릭에 숨겨진 메뉴를 보여주는 UI .

**셀렉트(select)** : 어느 한 요소에 종속된 요소, `<select>`태그로 구현되며 사용자에게 내재된 옵션값 중 하나(또는 여러 개)를 받기 위한 양식 UI

### 회원가입, 로그인 흐름 정리

유저정보를 받기 위한 로직을 정리했다. 이전에는 `POST /api/signup`에 이메일, 비빌번호, 유저정보(닉네임, 프로필, 슬로건, 기술정보 등등)을 한 번에 넘겨줬었다. 이렇게 하기 될 때, 일반 로그인일때는 문제가 없지만 소셜 로그인일 때 유저 정보를 입력받게하는 트리거가 없어 다음과 같이 수정했다.

`일반 회원가입` → 이메일, 비빌번호만 입력 → 성공 시 유저정보입력페이지로 이동

`일반 로그인` → 메인화면

`소셜 로그인` → 필수 유저정보가 없다면 유저정보입력페이지로 이동

### hoc: WithLoading 컴포넌트 + useAxios hooks

반복되는 데이터 fetch요청을 한 곳에서 관리할 목적으로 useAxios hooks과 WithLoading hoc컴포넌트를 만들었다. suspense와 erorr boundary를 활용해서 선언적으로 처리할 수도 있지만 현재 프로젝트에서 react 17버전을 쓰기도하고 위의 기능을 사용하기 위해서 별도의 라이브러리를 사용해야할 것 같아 앞선 기능들은 사용하지 않았다.
