# 논리 할당 연산자(??=, ||=, &&=)로 조건부 할당 짧게 쓰기

변수에 값이 없을 때만 기본값을 채우고 싶을 때, `if`문을 쓰지 않고도 한 줄로 처리할 수 있는 논리 할당 연산자 세 가지를 소개합니다. 이름은 비슷해 보이지만 각각 동작 기준이 다릅니다.

## ??= : null이나 undefined일 때만 채우기

`a ??= b`는 `a`가 `null` 또는 `undefined`일 때만 `b`를 대입합니다. 0이나 빈 문자열처럼 falsy지만 유효한 값은 그대로 유지됩니다.

```js
let count = 0;
count ??= 10;
console.log(count); // 0 (그대로 유지)

let name;
name ??= "손님";
console.log(name); // "손님"
```

## ||= : falsy한 값이면 채우기

`a ||= b`는 `a`가 falsy(0, "", null, undefined, NaN, false)이면 `b`를 대입합니다. `??=`보다 범위가 넓어서, 0이나 빈 문자열도 기본값으로 덮어씌워집니다.

```js
let title = "";
title ||= "제목 없음";
console.log(title); // "제목 없음"
```

## &&= : 값이 있을 때만 갱신하기

`a &&= b`는 `a`가 truthy할 때만 `b`를 대입합니다. 객체가 존재할 때만 속성을 갱신하는 식으로 활용할 수 있습니다.

```js
let user = { name: "지민" };
user &&= { ...user, age: 20 };
console.log(user); // { name: "지민", age: 20 }

let empty = null;
empty &&= { age: 20 };
console.log(empty); // null (대입되지 않음)
```

세 연산자의 차이를 기준으로 정리하면, "값이 없을 때만"이면 `??=`, "falsy이면 무조건"이면 `||=`, "값이 있을 때만 갱신"이면 `&&=`를 선택하면 됩니다.
