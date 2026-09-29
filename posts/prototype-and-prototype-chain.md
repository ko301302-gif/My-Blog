# 프로토타입(Prototype)과 프로토타입 체인

자바스크립트에는 클래스 없이도 객체가 서로 기능을 물려받는 구조가 있습니다. 바로 프로토타입입니다. 모든 객체는 자신의 프로토타입을 가지고, 그 프로토타입에도 또 프로토타입이 있어 사슬처럼 이어지는데, 이것을 프로토타입 체인이라고 부릅니다.

## 프로토타입은 어디서 오나

배열을 만들면 `[].push`처럼 바로 쓸 수 있는 메서드가 따라옵니다. 배열 자체에 `push`가 들어있는 게 아니라, `Array.prototype`에 정의된 메서드를 프로토타입 체인을 통해 찾아서 쓰는 것입니다.

```js
const arr = [1, 2, 3];
console.log(arr.hasOwnProperty('push')); // false
console.log(Array.prototype.hasOwnProperty('push')); // true
```

## 프로퍼티를 찾는 순서

객체에서 속성을 읽으면 자바스크립트는 먼저 객체 자신에게 있는지 보고, 없으면 프로토타입, 그 프로토타입의 프로토타입 순으로 계속 올라가며 찾습니다. 끝까지 못 찾으면 `undefined`를 반환합니다.

```js
const animal = { sound() { return '...'; } };
const dog = Object.create(animal);
dog.sound = () => '멍멍';

console.log(dog.sound()); // 멍멍 (자신의 프로퍼티 우선)
delete dog.sound;
console.log(dog.sound()); // ... (프로토타입에서 찾음)
```

## 정리

`class` 문법도 결국 프로토타입 체인을 사람이 읽기 편하게 감싼 것뿐입니다. 메서드가 어디서 오는지 헷갈릴 때는 "이 객체 자신에게 없으면 프로토타입 체인을 타고 올라간다"는 규칙만 기억하면 충분합니다.
