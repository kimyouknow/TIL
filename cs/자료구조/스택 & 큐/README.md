๐ ๋ชฉ์ฐจ

1. [์คํ](#-์คํ)
2. [ํ](#ํ)

# ์คํ

- LIFO(ํ์์ ์ถ): ๊ฐ์ฅ ๋์ค์ ๋ค์ด์จ ๊ฒ์ด ๊ฐ์ฅ ๋จผ์  ๋์ด
- top์ผ๋ก ์ ํ ๊ณณ์ ํตํด์๋ง ์ ๊ทผ ๊ฐ๋ฅ
- top์ผ๋ก ๋ฃ๊ณ , ๊ฐ์ฅ ์ต๊ทผ ๊ฒ๋ง ๋บ ์ ์์
- stack underflow: ์คํ์ด ๋น์ด ์๋๋ฐ ์์๋ฅผ ์ถ์ถํ๋ ๊ฒฝ์ฐ
- stack overflow: ์คํ์ด ๋์น๋ ๊ฒฝ์ฐ

## ์ฌ์ฉ์์

- Ctrl+Z(๋๋๋ฆฌ๊ธฐ)
- ์น ๋ธ๋ผ์ฐ์  ๋ฐฉ๋ฌธ๊ธฐ๋ก
- ํ์ ํ๊ธฐ๋ฒ ๊ณ์ฐ
- ์ฐ์ฐ์ ์ฐ์ ์์ ๊ตฌํ

## ๊ตฌํ

- ๋ฐฐ์ด๋ก ๊ตฌํํ์ฌ pop, push๋ก ๊ตฌํ ๊ฐ๋ฅ
- ํน์ ๋ฐฐ์ด๋ก ๊ตฌํํ๋ sp(stack pointer)๋ฅผ ํ์ฉํ์ฌ stack์ size์ sp๋ฅผ ๋น๊ตํ์ฌ ๊ตฌํ ๊ฐ๋ฅ
- ๋ฐฐ์ด์ด๋ obj๋ก ํ๋ฉด popํ  ๋, null๊ฐ์ "๊ฐ"์ผ๋ก ์ฑ์์ผํด์ ์ฐ๊ฒฐ๋ฆฌ์คํธ๋ก ๊ฐ์์ ๊ณต๊ฐ์ ๋ง๋ค์ด ๊ตฌํ
- ๊ฐ node์ `prev`๋ฅผ ๋์ด ์ด์  ๊ฐ์ ๊ธฐ์ต
- `push`: stack์ ๋ฃ๊ธฐ
- `pop`: ์ ์ผ ์ต๊ทผ์ ๋ฃ์ ๊ฐ์ stack์์ ๋นผ๊ธฐ
- `clear`: stack ๋น์ฐ๊ธฐ

```js
class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
  }
}

class Stack {
  constructor(size) {
    this.size = size;
    this.sp = 0;
    this.top = null;
  }
  show() {
    const showArr = [];
    let current = this.top;
    while (current) {
      showArr.push(current.value);
      current = current.prev;
    }
    console.log(this.size, showArr);
  }
  push(value) {
    try {
      if (this.size > this.sp) {
        const newNode = new Node(value);
        if (this.sp === 0) {
          this.top = newNode;
        } else {
          const point = this.top;
          this.top = newNode;
          this.top.prev = point;
        }
        this.sp++;
        return newNode;
      } else {
        throw Error("Stack is full");
      }
    } catch (error) {
      return error.message;
    }
  }
  pop() {
    try {
      if (this.sp <= 0) throw Error("Stack is empty");
      const target = this.top; // ์ถ๋ ฅ์ฉ
      const point = this.top.prev;
      this.top = point;
      this.sp--;
      return target;
    } catch (error) {
      return error.message;
    }
  }
  clear() {
    this.sp = 0;
    this.top = null;
    return this.top;
  }
}
```

# ํ

- FIFO(์ ์์ ์ถ): ๊ฐ์ฅ ์ฒ์์ ๋ค์ด์จ ๊ฒ์ด ๊ฐ์ฅ ๋จผ์  ๋์ด
- heal: ์ญ์  ์ฐ์ฐ(`dnQueue`)
- tail: ์ถ๊ฐ ์ฐ์ฐ(`enQueue`)
- head์ tail๋ก๋ง ์ ๊ทผ ๊ฐ๋ฅ

## ์ฌ์ฉ์์

- ๋๊ธฐ ์(์ํ์๋ฌด, ๊ณ ๊ฐ ๋๊ธฐ์๊ฐ, ์๊ฐ์ ์ฒญ, ํ ์๋งค ๋ฑ๋ฑ)
- ์บ์ ๊ตฌํ
- BFS(๋๋น ์ฐ์  ํ์)
- ํ๋ก์ธ์ค ๊ด๋ฆฌ

## ๊ตฌํ

- ๋ฐฐ์ด๋ก push์ unshift๋ฅผ ์ฌ์ฉํ  ์ ์์ง๋ง, unshift ๋ฉ์๋๋ ๋ฐฐ์ด์ ์๋ถ๋ถ์ ๋์ํ์ฌ ๋ค๋ฅธ ์์๋ค์ index ๋ณํ๋ฅผ ์ ๋ฐํจ.
- ์์ํ ํ๋ฅผ ๊ตฌํํ๊ธฐ ์ํด `์ฐ๊ฒฐ๋ฆฌ์คํธ`๋ฅผ ํ์ฉํ์ฌ ๊ตฌํ
- `๋จ์ผ์ฐ๊ฒฐ๋ฆฌ์คํธ`๋ก ๊ตฌํํ๋ฉด pushํ  ๋ while(current)๋ฅผ ํ์ฉํด head๋ถํฐ์์ํด ๋๊ฐ์ ์ฐพ์์ผํจ -> `tail`์ ํ์ฉํ์ฌ `tail.next`์ ์๋ก์ด ๊ฐ ๋ฐ๋ก ์ถ๊ฐ

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  show() {
    const showArr = [];
    let current = this.head;
    while (current) {
      showArr.push(current.value);
      current = current.next;
    }
    console.log(this.size, showArr);
  }
  enQueue(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.size++;
    return this.tail;
  }
  dnQueue() {
    if (this.size === 0) {
      return "Queue is Empty";
    }
    const point = this.head;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.size--;
    return point;
  }
}
```
