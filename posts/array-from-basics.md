# Array.from으로 유사 배열과 이터러블을 배열로 바꾸기

`document.querySelectorAll`의 결과나 함수의 `arguments`처럼 배열처럼 보이지만 배열 메서드를 쓸 수 없는 값들이 있습니다. `Array.from`을 쓰면 이런 값들을 진짜 배열로 쉽게 바꿀 수 있습니다.

## 유사 배열을 배열로 바꾸기

`NodeList`나 `arguments`는 `length`와 인덱스는 있지만 `map`, `filter` 같은 배열 메서드가 없는 "유사 배열"입니다. `Array.from`에 넘기면 바로 배열이 됩니다.

```js
const nodes = document.querySelectorAll("li");
const arr = Array.from(nodes);
arr.map((el) => el.textContent);
```

## 이터러블을 배열로 바꾸기

`Set`, `Map`, 문자열처럼 `for...of`로 순회할 수 있는 이터러블도 `Array.from`으로 배열화할 수 있습니다. 전개 연산자(`...`)와 결과는 같지만, 두 번째 매핑 인자를 쓸 수 있다는 차이가 있습니다.

```js
const set = new Set([1, 2, 2, 3]);
Array.from(set); // [1, 2, 3]

Array.from("abc"); // ["a", "b", "c"]
```

## 두 번째 인자로 매핑까지 한 번에

`Array.from(대상, 매핑함수)` 형태로 쓰면 배열로 바꾸면서 동시에 `map`까지 처리할 수 있습니다. 또한 `Array.from({ length: n })`처럼 길이만 있는 객체로 원하는 크기의 배열을 만들 때도 자주 쓰입니다.

```js
Array.from({ length: 5 }, (_, i) => i * 2); // [0, 2, 4, 6, 8]
```

유사 배열이나 이터러블을 다룰 일이 있다면, 일일이 반복문을 돌리기보다 `Array.from`으로 배열로 바꾼 뒤 익숙한 배열 메서드를 이어서 쓰는 쪽이 훨씬 간결합니다.
