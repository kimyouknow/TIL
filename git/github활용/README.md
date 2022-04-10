# Github 활용

# Issue

> 개발자간 idea, work, bug(problem)을 다루기 위해 사용

- 아이디어 구현에 관한 논의
- 작업 진행상황 추적
- 기능 제안 수락, 질문, 요청 지원 또는 버그 보고
- 정교한 코드 구현

제목 옆의 이슈번호로 pr과 같이 고유번호로 사용하여 프로젝트 어디서든지 언급 가능

이슈에서 중요한 점은 **기능 브랜치를 이슈 단위로 생성한다는 것 →**  가장 추천되는 작업방식은 브랜치 하나에 이슈 하나씩 처리하는 식으로 진행하는 것

### 등록

- 이슈 탭을 눌러 엽니다(open).
- 해당 문제, 상황을 재현할 수 있는 최대한 많은 정보(context)를 제공합니다.
- 해당 환경 정보(버전, os 등) 관련이 있다고 생각하는 모든 정보를 제공합니다.

### 등록 후 과정

- 프로젝트 팀(혹은 매니저)이 라벨(label)과 담당자(assign)를 지정합니다.
- 담당자가 최대한 빨리 답변하기 위해 노력합니다.
- 해결이 되거나 오랜 기간 답변이 없다면, 이슈는 닫힙니다(closed).

### issue기반 branch 생성

branch 네이밍을 통해서 작업의 의도를 갖게 하는 것은 한계가 있습니다.  
Github Issue는 각각의 유니크한 값인 Issue Number를 갖습니다.   
이 숫자를 기반으로 branch를 이름을 갖게 하여 해당 branch의 명확한 작업 의도

github만 사용할 때에는 issue를 생성한 후 직접 develop 브랜치 내에 feature/#issue 브랜치 생성

닫을 땐 오른쪽 사이드바의 Development 세션을 활용해서 이슈를 태그하면 됨.

[https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)

[https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-a-branch-for-an-issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-a-branch-for-an-issue)

자동화 툴

- github action 활용: [https://earth-95.tistory.com/100](https://earth-95.tistory.com/100)

# project

[https://velog.io/@junh0328/](https://velog.io/@junh0328/)협업을-위한-깃허브-이슈-작성하기

[https://jwher.github.io/github-issue](https://jwher.github.io/github-issue)

[https://kyounghwan01.github.io/blog/etc/git/git-issue/#](https://kyounghwan01.github.io/blog/etc/git/git-issue/#)목차
