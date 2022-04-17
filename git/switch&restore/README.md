# Git checkout 대신 switch와 restore 

이전가지 `git checkout`만 사용했는데 얼마 전 페어 프로그래밍을 하다가 git checkout 명령어를 대신해 switch와 restore를 하는 방법을 알게 되었다.

### 요약 정리

`checkout` : switch branch or restore working tree files

`switch`: switch branch

`restore`: restore working tree files

### git switch

```bash
git switch -c new-branch
# new-branch를 새로 만들고 전환

git switch -c new-branch <특정 커밋>
# 브랜치의 특정 커밋에서 새로운 브랜치를 만들기
```

### git restore

```bash
git restore [file name]
# 특정 파일 HEAD commit으로 복구

git restore --souce [commit hash] [file name]
# 특정 파일 특정 commit으로 복구

git restore --staged [file name]
# stage area에 올라간 파일 다시 unstaging
```

git add를 통해서 수정 내용을 stage에 넣었을 때, 다시 빼기 위해

`git reset HEAD`를 사용했는데 이제 restore 명령어를 통해 가능.

🔍 참고자료

- [https://blog.outsider.ne.kr/1505](https://blog.outsider.ne.kr/1505)   

- [https://kotlinworld.com/281](https://kotlinworld.com/281)
