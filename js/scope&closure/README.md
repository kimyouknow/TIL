# ๐ Scope

> `์ค์ฝํ ์ฒด์ด๋`์ ์ดํดํ๊ธฐ ์ํด์  ํด๋น ํด๋์ ์คํ์ปจํ์คํธ์ โญ๏ธ ํ์๋ฅผ ์ดํดํ  ํ์๊ฐ ์์

๋ชจ๋  ์๋ณ์(๋ณ์๋ช, ํจ์๋ช, ํด๋์ค๋ช ๋ฑ)๋ `์์ ์ด ์ ์ธ๋ ์์น`์์ ๋ค๋ฅธ ์ฝ๋๊ฐ ์๋ณ์ ์์ ์ ์ฐธ์กฐํ  ์ ์๋ ์ ํจ ๋ฒ์๊ฐ ๊ฒฐ์ ๋๋ค.

์ฆ, js๋ `๋ ์์ปฌ ์ค์ฝํ`๋ฅผ ๋ฐ๋ฅด๋ฏ๋ก ํจ์๋ฅผ ์ด๋์ ํธ์ถํ๋์ง๊ฐ ์๋๋ผ ํจ์๋ฅผ `์ด๋์ ์ ์ํ๋์ง`์ ๋ฐ๋ผ ์์ ์ค์ฝํ๋ฅผ ์ค์ ํ๋ค.

- ํจ์ ๋ ๋ฒจ ์ค์ฝํ(Function-level scope)
- ๋ธ๋ก ๋ ๋ฒจ ์ค์ฝํ(Block-level scope)

> ๋๋ถ๋ถ์ ํ๋ก๊ทธ๋๋ฐ ์ธ์ด๋ ๋ธ๋ก ๋ ๋ฒจ ์ค์ฝํ๋ฅผ ๋ฐ๋ฅด์ง๋ง ์๋ฐ์คํฌ๋ฆฝํธ๋ ํจ์ ๋ ๋ฒจ ์ค์ฝํ๋ฅผ ๋ฐ๋ฅธ๋ค. (ES6๋ ๋ธ๋ก ๋ ๋ฒจ ์ค์ฝํ๋ฅผ ๋ฐ๋ฅด๋ ๋ณ์๋ฅผ ์ ์ธํ๊ธฐ ์ํด let, constํค์๋๋ฅผ ์ ๊ณต)

# ์๋ณ์ ๊ฒฐ์ 

์ฝ๋์์ ๋ณ์๋ ํจ์์ ๊ฐ์ ๊ฒฐ์ ํ๋ ๊ฒ

์ฝ ์คํ์ ์์ ๋์ผํ ์๋ณ์๊ฐ ์ฌ๋ฟ์ผ ๋ js์์ง์ด ์ด๋ป๊ฒ outer๋ฅผ ํ์ฉํด์ ์์ฌ๊ฒฐ์ ์ ํ๋์ง

> ํ์ฌ ํ์ฑํ๋ ์คํ ์ปจํ์คํธ๋ ํ๋์ด์ง๋ง ์ด์  ๋ ์์ปฌ ํ๊ฒฝ์ ๊ฐ๋ฆฌํค๋ Outer Lexical Environment Reference๋ฅผ ํ๊ณ  ์ด๋ํ  ์ ์๊ธฐ ๋๋ฌธ์ ํ์ฌ ํ์ฑํ๋ ์คํ ์ปจํ์คํธ์ ํด๋น ์๋ณ์๊ฐ ์๋ค๋ฉด ์ ์ผ ์์ ์คํ ์ปจํ์คํธ๊น์ง ์๋ณ์๋ฅผ ์ฐพ์๊ฐ (์ค์ฝํ ์ฒด์ด๋)

```js
let light = false;
function go2first() {
  let light = true;
  function go2second() {
    let pet = 'puppy';
    console.log(pet); // puppy
    console.log(people); // reference error
    console.log(light); // true: go2first์ light
  }
  go2second();
}
go2first();
```

![แแณแแณแแตแซแแฃแบ 2022-03-04 แแฉแแฎ 3 35 30](https://user-images.githubusercontent.com/71386219/156712218-1f0f6196-5572-4e4f-b685-4e6f4145b1b6.png)

### ๋ณ์ ์๋์

๋์ผํ ์๋ณ์๋ก ์ธํด ์์ ์ค์ฝํ์์ ์ ์ธ๋ ์๋ณ์์ ๊ฐ์ด ๊ฐ๋ ค์ง๋ ํ์

### ์ค์ฝํ ์ฒด์ธ

์๋ณ์๋ฅผ ๊ฒฐ์ ํ  ๋ ํ์ฉํ๋ ์ค์ฝํ๋ค์ ์ฐ๊ฒฐ๋ฆฌ์คํธ

# ๐ closure

## ์ฌ์  ์ง์

ํจ์ ๊ฐ์ฒด์ ๋ด๋ถ ์ฌ๋กฏ[[Environment]]

- ํจ์๋ ์์ ์ ๋ด๋ถ ์ฌ๋กฏ์ ์์ ์ด ์ ์๋ ํ๊ฒฝ(์์ ์ค์ฝํ์ ์ฐธ์กฐ)๋ฅผ ์ ์ฅํ๋ค.

## closure๋

> ํด๋ก์ ๋ ๋ด๋ถํจ์์์ ์ธ๋ถํจ์์ ์ง์ญ๋ณ์๋ฅผ ์ฌ์ฉํ  ๋ ์ธ๋ถํจ์์ lexcial environment์ ํจ๊ป bundled ๋๋ ๊ฒ. ๊ฐ๋จํ ์ ๋ฆฌํ์๋ฉด, ์์ ์ด ์ ์ธ๋ ๋น์์ ํ๊ฒฝ์ ๊ธฐ์ตํ๋ ํจ์

์์๋ฅผ ํตํด์ ์ดํดํด๋ณด์

```js
  const x = 1;
  function outer(){
    const x = 10;
    const inner = function (){
      conosle.log(x);
    }
    return inner;
    // return {
    //   inner(){
    //     console.log(x)
    //   }
    // }
  }
  const dori = outer();
  dori()l //10
```

![แแณแแณแแตแซแแฃแบ 2022-03-04 แแฉแแฎ 3 50 42](https://user-images.githubusercontent.com/71386219/156713918-86d8ae0e-624e-4eb9-abc7-0de2e3dfb831.png)

โญ๏ธ outer ํจ์์ ์คํ ์ปจํ์คํธ๋ ์คํ ์ปจํ์คํธ ์คํ์์ ์ ๊ฑฐ๋์ง๋ง outerํจ์์ ๋ ์์ปฌ ํ๊ฒฝ๊น์ง ์๋ฉธํ๋ ๊ฒ์ ์๋๋ค.

๋ฐ๋ผ์, 1) dori๋ผ๋ ์ ์ญ ๋ ์์ปฌ ํ๊ฒฝ์ ๋ณ์๋ innerํจ์ ๊ฐ์ฒด๋ฅผ ๊ฐ๋ฆฌํค๊ณ  ์๊ณ , 2) innerํจ์๊ฐ์ฒด์ ๋ด๋ถ ์ฌ๋กฏ์ outerํจ์์ ๋ ์์ปฌ ํ๊ฒฝ์ ์ฐธ์กฐํ๊ณ  ์์ด์, 3) outerํจ์์ ๋ ์์ปฌ ํ๊ฒฝ์ด gc์ ๋์์ด ๋์ง ์๋๋ค.

์ ๋ฆฌ

์ค์ฒฉํจ์ ์ค ์์ ์ค์ฝํ์ ์๋ณ์๋ฅผ ์ฐธ์กฐํ๊ณ  ์๊ณ , ๋ณธ์ธ์ ์ธ๋ถํจ์๋ณด๋ค ๋ ์ค๋ ์ด์์๋ฐ๋ฉด ํด๋ก์ ธ๋ก ํ์ฉํ  ์ ์๋ค.

## closure์ ํ์ฉ

์ํ(state)๋ฅผ ์์ ํ๊ฒ ๋ณ๊ฒฝํ๊ณ  ์ ์งํ๊ธฐ ์ํด ์ฌ์ฉ

์ํ๋ฅผ ์์ ํ๊ฒ ์๋ํ๊ณ  ํน์  ํจ์์๊ฒ๋ง ์ํ ๋ณ๊ฒฝ์ ํ์ฉํ๊ธฐ ์ํด ์ฌ์ฉ

์๋ ์์์ฒ๋ผ makeCoutner ํจ์๋ฅผ ํธ์ถํด ํจ์๋ฅผ ๋ฐํํ  ๋๋ง๋ค ํจ์๋ ์์ ๋ง์ ๋๋ฆฝ๋ ๋ ์์ปฌ ํ๊ฒฝ์ ๊ฐ๋๋ค.

์์๋ฅผ ํตํด์ ์ดํดํด๋ณด์ (๋ชจ๋ ๋ฅ๋ค์ด๋ธ ์์ )

```js
// ํจ์๋ฅผ ์ธ์๋ก ์ ๋ฌ๋ฐ๊ณ  ํจ์๋ฅผ ๋ฐํํ๋ ๊ณ ์ฐจ ํจ์
// ์ด ํจ์๊ฐ ๋ฐํํ๋ ํจ์๋ ํด๋ก์ ๋ก์ ์นด์ดํธ ์ํ๋ฅผ ์ ์งํ๊ธฐ ์ํ ์์  ๋ณ์ counter์ ๊ธฐ์ตํ๋ค.
function makeCounter(predicate) {
  // ์นด์ดํธ ์ํ๋ฅผ ์ ์งํ๊ธฐ ์ํ ์์  ๋ณ์
  var counter = 0;
  // ํด๋ก์ ๋ฅผ ๋ฐํ
  return function () {
    counter = predicate(counter);
    return counter;
  };
}

// ๋ณด์กฐ ํจ์
function increase(n) {
  return ++n;
}

// ๋ณด์กฐ ํจ์
function decrease(n) {
  return --n;
}

// ํจ์๋ก ํจ์๋ฅผ ์์ฑํ๋ค.
// makeCounter ํจ์๋ ๋ณด์กฐ ํจ์๋ฅผ ์ธ์๋ก ์ ๋ฌ๋ฐ์ ํจ์๋ฅผ ๋ฐํํ๋ค
const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser ํจ์์๋ ๋ณ๊ฐ์ ๋๋ฆฝ๋ ๋ ์์ปฌ ํ๊ฒฝ์ ๊ฐ๊ธฐ ๋๋ฌธ์ ์นด์ดํฐ ์ํ๊ฐ ์ฐ๋ํ์ง ์๋๋ค.
const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

๐ ์ฐธ๊ณ ์๋ฃ

- [[10๋ถ ํ์ฝํก] ๐ ํ๋ฃจ์ ์คํ ์ปจํ์คํธ](https://www.youtube.com/watch?v=EWfujNzSUmw)
- [[10๋ถ ํ์ฝํก] ๐ง ์๋ผ์ Scope & Closure](https://www.youtube.com/watch?v=PVYjfrgZhtU)
- ๋ชจ๋ ์๋ฐ์คํฌ๋ฆฝํธ ๋ฅ ๋ค์ด๋ธ
