# parseInt와 parseFloat, 문자열을 숫자로 바꾸기

사용자 입력이나 API 응답은 대부분 문자열로 들어옵니다. "42"라는 문자열을 실제 숫자 42로 바꿔야 할 때 자주 쓰는 함수가 `parseInt`와 `parseFloat`입니다. 두 함수의 차이와 자주 실수하는 부분을 정리해봅니다.

## parseInt: 정수로 변환하기

`parseInt`는 문자열을 정수로 해석합니다. 문자열 앞부분부터 숫자로 읽을 수 있는 부분까지만 읽고, 더 이상 숫자가 아닌 문자가 나오면 거기서 멈춥니다.

```js
parseInt("42px");   // 42
parseInt("3.14");    // 3 (소수점 이하는 버림)
parseInt("hello");   // NaN
```

두 번째 인자로 진법을 지정할 수도 있습니다. 예를 들어 `parseInt("ff", 16)`은 16진수로 해석해 255를 반환합니다. 진법을 명시하지 않으면 예상치 못한 결과가 나올 수 있으므로, 항상 `parseInt(str, 10)`처럼 10진수를 명시하는 습관을 들이는 것이 안전합니다.

## parseFloat: 소수까지 변환하기

`parseFloat`는 소수점까지 포함해 실수로 해석합니다.

```js
parseFloat("3.14");    // 3.14
parseFloat("3.14abc"); // 3.14
```

정수만 필요하면 `parseInt`, 소수점이 중요하면 `parseFloat`를 쓰면 됩니다.

## Number()와의 차이

`Number("42px")`는 중간에 숫자가 아닌 문자가 섞여 있으면 바로 `NaN`을 반환합니다. 반면 `parseInt`와 `parseFloat`는 앞부분만 읽어서 변환을 시도합니다. 단위가 붙은 값("100px", "20%")을 다룰 때는 `parseInt`/`parseFloat`가, 값 전체가 깨끗한 숫자인지 검증할 때는 `Number()`가 더 적합합니다.
