# 커밋 왜하냐

유지보수를 위해서
근데 지금은 그냥 혼자해서 뭔가 와닿지 않음.

# 좋은 git 커밋 메세지를 작성하기 위한 7가지 약속

영어로 작성하는 경우에 최적화되어 있으며, 한글의 경우 조금 더 유연하게 적용해도 됨.

```
제목과 본문을 한 줄 띄워 분리하기
제목은 영문 기준 50자 이내로
제목 첫글자를 대문자로
제목 끝에 . 금지
제목은 명령조로
본문은 영문 기준 72자마다 줄 바꾸기
본문은 어떻게보다 무엇을, 왜에 맞춰 작성하기
```

- 제목과 본문을 한 줄 띄워 분리하기

- 커밋메시지는 `50자 이내의 요약문장`과 `빈 줄 하나`, 그리고 `설명문`으로 구성하면 좋음.
- 필수사항은 아니며 모든 커밋 메세지를 제목과 본문으로 구성할 필요는 없다.

제목은 영문 기준 50자 이내로
제목 첫글자를 대문자로
제목 끝에 . 금지
제목은 명령조로
본문은 영문 기준 72자마다 줄 바꾸기
본문은 어떻게보다 무엇을, 왜에 맞춰 작성하기

## 커밋 메세지 구조

```bash
$ <type>(<scope>): <subject> -- 헤더 <BLANK LINE> -- 빈 줄 <body> -- 본문 <BLANK LINE> -- 빈 줄 <footer> -- 바닥 글

출처: https://xtring-dev.tistory.com/entry/Git-규칙적인-Commit-메세지로-개발팀-협업하기-👾 [xtring.dev]
```

`<type>`은 아래해당 commit의 성격을 나타냄.

```bash
Feat : 새로운 기능 추가
Fix : 버그를 고친 경우
Design: css 등 사용자 ui 디자인 변경
Build : 빌드 관련 파일 수정
Ci : CI 관련 설정 수정
Comment: 필요한 주석 추가 및 변경
Rename: 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
Remove: 파일을 삭제하는 작업만 수행하는 경우
Docs : 문서 수정
Style : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없는 경우
Refactor : 코드 리팩토링
Test : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없는 경우)
Chore : 기타 변경사항(빌드 스크립트 수정 등등)
```

![terminal example](https://user-images.githubusercontent.com/71386219/153839972-6eb2598e-ebb8-40ad-9ff5-4951310464d3.png)

🔍 참고자료

- [누구나 쉽게 이해할 수 있는 Git 입문](https://backlog.com/git-tutorial/kr/intro/intro1_2.html)
- [git-간편 안내서](https://rogerdudler.github.io/git-guide/index.ko.html)
- [좋은 git 커밋 메시지를 작성하기 위한 7가지 약속](https://meetup.toast.com/posts/106)
- [Github commit 메세지 규칙](https://junhyunny.github.io/information/github/git-commit-message-rule/)
