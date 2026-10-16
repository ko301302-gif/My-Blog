# 배열 flat과 flatMap, 중첩 배열 펼치기

배열 안에 배열이 들어있는 중첩 배열을 다루다 보면 한 단계씩 평평하게 펼쳐야 할 때가 많습니다. 예전에는 `reduce`나 재귀를 직접 써서 처리했지만, 이제는 `flat`과 `flatMap`으로 간단히 끝낼 수 있습니다.

## flat: 중첩 배열 펼치기

`flat(depth)`은 배열 안의 배열을 지정한 깊이만큼 펼쳐서 새 배열을 만듭니다. depth를 생략하면 기본값은 1입니다.

```js
const nested = [1, [2, 3], [4, [5, 6]]];
nested.flat(); // [1, 2, 3, 4, [5, 6]]
nested.flat(2); // [1, 2, 3, 4, 5, 6]
nested.flat(Infinity); // 깊이와 상관없이 전부 펼치기
```

## flatMap: map하고 바로 펼치기

`flatMap`은 `map`을 실행한 뒤 결과를 한 단계 `flat`한 것과 같습니다. 콜백이 배열을 반환하는 상황에서 map과 flat(1)을 한 번에 처리해주기 때문에 코드가 더 깔끔해집니다.

```js
const sentences = ["hello world", "foo bar"];
sentences.map((s) => s.split(" "));
// [["hello","world"],["foo","bar"]]

sentences.flatMap((s) => s.split(" "));
// ["hello","world","foo","bar"]
```

## 언제 쓰면 좋을까

여러 배열을 하나로 합치거나, map 콜백이 배열을 반환해서 결과가 중첩 배열이 되는 상황이라면 `flat`이나 `flatMap`을 먼저 떠올려보세요. 두 메서드 모두 원본 배열을 바꾸지 않고 새 배열을 반환하므로 안전하게 쓸 수 있습니다.
