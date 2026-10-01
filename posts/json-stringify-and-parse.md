# JSON.stringify와 JSON.parse, 객체와 문자열 사이 변환하기

자바스크립트 객체를 서버에 보내거나 localStorage에 저장하려면 문자열 형태여야 합니다. 객체를 그대로 넘기면 "[object Object]"처럼 깨져버리죠. 이럴 때 쓰는 게 JSON.stringify와 JSON.parse입니다.

## JSON.stringify: 객체를 문자열로

JSON.stringify는 객체나 배열을 JSON 형식의 문자열로 바꿔줍니다.

```js
const user = { name: "민준", age: 20 };
const str = JSON.stringify(user);
console.log(str); // '{"name":"민준","age":20}'
```

fetch로 서버에 데이터를 보낼 때 body에 넣는 값이 바로 이 문자열입니다. 함수나 undefined, Symbol 같은 값은 변환 과정에서 그냥 사라지니 주의해야 합니다.

## JSON.parse: 문자열을 다시 객체로

반대로 서버 응답이나 localStorage에서 꺼낸 문자열은 그대로 객체처럼 쓸 수 없습니다. JSON.parse로 다시 객체로 되돌려야 합니다.

```js
const data = JSON.parse(str);
console.log(data.name); // "민준"
```

문자열이 올바른 JSON 형식이 아니면 에러가 나므로, 외부에서 받은 값이라면 try/catch로 감싸는 게 안전합니다.

## 실전에서 자주 쓰는 패턴

localStorage는 문자열만 저장할 수 있어서, 객체를 저장할 땐 stringify로 변환하고 꺼낼 땐 parse로 복원합니다.

```js
localStorage.setItem("user", JSON.stringify(user));
const saved = JSON.parse(localStorage.getItem("user"));
```

두 함수를 짝으로 기억해두면 데이터를 주고받는 코드가 훨씬 자연스러워집니다.
