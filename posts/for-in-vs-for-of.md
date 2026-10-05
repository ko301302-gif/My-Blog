# for...in과 for...of, 반복문 뭐가 다를까

자바스크립트에는 반복문이 여러 개 있어서 처음 배울 때 헷갈리기 쉽습니다. 그중 이름이 비슷한 `for...in`과 `for...of`는 생김새만 비슷하고 동작 방식은 완전히 다릅니다. 둘의 차이를 알아야 배열과 객체를 돌 때 엉뚱한 버그를 피할 수 있습니다.

## for...in은 키를 돈다

`for...in`은 객체의 "열거 가능한 속성 이름(키)"을 순회합니다. 배열에도 쓸 수는 있지만, 이때 키는 인덱스를 문자열로 돌려줍니다.

```js
const obj = { a: 1, b: 2 };
for (const key in obj) {
  console.log(key); // "a", "b"
}
```

배열에 `for...in`을 쓰면 상속된 속성까지 걸릴 수 있어서 의도치 않은 값이 나올 위험이 있습니다.

## for...of는 값을 돈다

`for...of`는 배열, 문자열, Map, Set처럼 "반복 가능한(iterable)" 객체의 값을 직접 순회합니다. 일반 객체에는 그대로 쓸 수 없습니다.

```js
const arr = [10, 20, 30];
for (const value of arr) {
  console.log(value); // 10, 20, 30
}
```

인덱스가 필요하면 `entries()`와 구조 분해를 함께 쓰면 됩니다.

```js
for (const [i, value] of arr.entries()) {
  console.log(i, value);
}
```

## 정리

배열이나 문자열처럼 값 자체가 중요하면 `for...of`를, 객체의 키 목록이 필요하면 `for...in`을 쓰는 것이 기본 원칙입니다. 배열을 돌 때는 되도록 `for...of`나 `map`, `forEach` 같은 배열 메서드를 쓰는 것이 더 안전합니다.
