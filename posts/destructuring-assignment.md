# 구조 분해 할당으로 코드 간결하게 쓰기

자바스크립트 코드를 보다 보면 `const { name, age } = user;` 같은 문법을 자주 만나게 됩니다. 이걸 구조 분해 할당(Destructuring Assignment)이라고 부르는데, 배열이나 객체 안의 값을 꺼내서 변수에 바로 담아주는 문법입니다. 처음 보면 낯설지만 익숙해지면 코드가 훨씬 짧고 읽기 쉬워집니다.

## 배열 구조 분해

배열은 순서대로 값을 꺼냅니다.

```js
const coords = [37.5, 127.0];
const [lat, lng] = coords;
// lat: 37.5, lng: 127.0
```

인덱스로 하나씩 접근하는 대신, 변수 이름만으로 값을 바로 받을 수 있습니다.

## 객체 구조 분해

객체는 순서가 아니라 속성 이름으로 값을 꺼냅니다.

```js
const user = { name: "지민", age: 25 };
const { name, age } = user;
// name: "지민", age: 25
```

속성 이름과 다른 이름으로 받고 싶다면 `{ name: userName }`처럼 콜론으로 새 이름을 지정하면 됩니다.

## 함수 매개변수에서 활용하기

함수가 객체 하나를 인자로 받을 때, 매개변수 자리에서 바로 구조 분해를 하면 함수 본문이 간결해집니다.

```js
function printUser({ name, age }) {
  console.log(`${name} (${age})`);
}
```

## 기본값 지정하기

값이 없을 경우를 대비해 기본값도 함께 지정할 수 있습니다.

```js
const { theme = "light" } = settings;
```

`settings`에 `theme`이 없으면 자동으로 `"light"`가 들어갑니다. 옵션 객체를 다룰 때 특히 유용한 패턴입니다.
