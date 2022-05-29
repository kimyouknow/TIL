# 20220528

<details>
<summary>시간대별 정리</summary>
### 오전

react컴포넌트 npm 배포
tsc 옵션 공부

</details>
<br>

# 코드스쿼드

## npm 배포 개발과 배포 폴더 구분

`지정한 폴더(src/lib)`내의 js 코드를 babel이나 tsc로 js로 `변환`해주고 dist에 복사하여 올려서 `dist를 배포`하게 됩니다.

**개발환경**: webpack으로 빌드해서 컴포넌트 개발

**npm배포**: 컴파일 script명령어(babel, tsc)로 `/lib 폴더 내의 코드`만 dist폴더에 컴파일해서 `dist폴더 내의 코드만 배포`

### type을 지정해서 컴파일하는 방법

index.d.ts파일에 declare로 type을 지정해주려고 하였으나 어려워서 다음 키, 밸류 값을 tsconfig.json에서 자동으로 type을 생성을 했습니다.

```json
"declaration": true, // 컴파일 할 때, type을 자동으로 생성해줌
"outDir": "./dist", // 컴파일 결과를 내보낼 폴더
```

생성을 했는데 스크립트 명령어를 tsc로 이용하면 /src/lib폴더내에서 d.ts파일이 생성되고 이를 dist에 옮겨주는 동작이 안되어있습니다. 이를 해결하기 위하여 tsconfig base url을 `./lib`로 바꾸어 주어야하나 고민하였지만 그렇게 하면 개발환경에서 인식을 못합니다. 명령어를 다른것으로 주어야할 것 같습니다.

lib폴더에만 적용할 tsconfig.json파일을 만들어 npm script명령어 삽입하기

1. lib만 적용할 tsconfig-lib.json만들기 (자세한 옵션은 [https://geonlee.tistory.com/214](https://geonlee.tistory.com/214) 참고)

```json
// tsconfig-lib.
{
  "extends": "./tsconfig.json",
  "include": ["src/lib"],
  "compilerOptions": {
    "declaration": true
  }
}
```

1. tsc cli 옵션 중 `—project`을 사용해 tsc를 적용할 tsconfig-lib.json을 적용

```json
"publish:npm with tsc": "rm -rf ./dist && mkdir dist && tsc --project tsconfig-lib.json"
```

[예시 레포](https://github.com/kimyouknow/react-modal-component/tree/feature/modal)
