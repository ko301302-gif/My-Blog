# Object.keys, values, entries로 객체 순회하기

객체는 배열과 달리 `for...of`로 바로 순회할 수 없습니다. 그래서 자바스크립트는 객체의 키, 값, 혹은 [키, 값] 쌍을 배열로 뽑아주는 세 가지 메서드를 제공합니다. 이 메서드들을 알아두면 객체도 배열처럼 다루기가 훨씬 쉬워집니다.

## Object.keys와 Object.values

`Object.keys(obj)`는 객체의 키들을 배열로, `Object.values(obj)`는 값들을 배열로 반환합니다.

```js
const user = { name: "지민", age: 20 };

console.log(Object.keys(user)); // ["name", "age"]
console.log(Object.values(user)); // ["지민", 20]
```

둘 다 결과가 배열이기 때문에, `map`, `filter` 같은 배열 메서드를 그대로 이어서 쓸 수 있습니다.

## Object.entries와 구조 분해

`Object.entries(obj)`는 `[키, 값]` 쌍으로 이루어진 배열을 반환합니다. `for...of`와 구조 분해를 함께 쓰면 키와 값을 동시에 꺼내며 순회할 수 있습니다.

```js
const user = { name: "지민", age: 20 };

for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}
// name: 지민
// age: 20
```

## 순서는 보장될까

세 메서드 모두 문자열 키는 보통 작성한 순서대로, 숫자처럼 보이는 키는 오름차순으로 먼저 정렬되어 나옵니다. 다만 `Symbol` 키는 포함되지 않으므로, 모든 키가 필요하다면 `Reflect.ownKeys`를 따로 알아두면 좋습니다.
