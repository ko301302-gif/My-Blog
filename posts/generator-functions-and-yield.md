# 제너레이터 함수, function*와 yield로 실행을 잠깐 멈추기

보통 함수는 호출하면 끝까지 한 번에 실행되고 결과값 하나를 반환합니다. 그런데 값을 하나씩 순서대로, 필요할 때마다 꺼내 쓰고 싶다면 어떻게 해야 할까요? 이럴 때 쓰는 것이 바로 제너레이터(Generator) 함수입니다.

## function*와 yield

제너레이터 함수는 `function` 뒤에 `*`를 붙여서 선언하고, 내부에서 `yield`로 값을 하나씩 내보냅니다. 일반 함수처럼 호출해도 바로 실행되지 않고, 대신 이터레이터 객체를 반환합니다.

```js
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

`next()`를 호출할 때마다 함수는 다음 `yield`까지 실행되고 그 자리에서 멈춥니다. 함수 전체를 한 번에 실행하는 게 아니라, 필요한 만큼만 조금씩 실행하는 셈입니다.

## for...of와 함께 쓰기

제너레이터가 반환하는 객체는 이터러블(iterable)이기 때문에 `for...of`로 간단히 값을 순회할 수 있습니다.

```js
for (const num of numberGenerator()) {
  console.log(num); // 1, 2, 3
}
```

`next()`를 직접 호출하지 않아도 되니 훨씬 편하게 값을 꺼내 쓸 수 있습니다.

## 언제 쓰면 좋을까

제너레이터는 무한히 이어지는 값을 필요한 만큼만 만들어내거나, 큰 데이터를 한 번에 메모리에 올리지 않고 하나씩 처리할 때 유용합니다. 처음에는 낯설 수 있지만, "함수 실행을 잠깐 멈췄다가 나중에 이어서 계속한다"는 개념만 기억하면 이해하기 훨씬 쉬워집니다.
