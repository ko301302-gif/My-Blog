# Object.freeze로 객체 불변성 지키기

자바스크립트의 객체는 기본적으로 언제든 값을 바꿀 수 있습니다. 그런데 여러 곳에서 같은 객체를 참조하다 보면, 어딘가에서 모르게 값이 바뀌어 버그로 이어지는 경우가 생깁니다. `Object.freeze`는 객체를 더 이상 수정할 수 없게 "얼려서" 이런 실수를 막아주는 메서드입니다.

## Object.freeze는 무엇을 막아줄까

`Object.freeze(obj)`를 호출하면 그 객체의 프로퍼티 값 변경, 추가, 삭제가 모두 막힙니다. strict mode에서는 이런 시도를 하면 에러가 발생하고, 일반 모드에서는 조용히 무시됩니다.

```js
const user = Object.freeze({ name: "지민", age: 20 });

user.age = 30; // 무시됨 (strict mode면 에러)
user.email = "a@b.com"; // 추가도 안 됨
delete user.name; // 삭제도 안 됨

console.log(user); // { name: "지민", age: 20 }
```

객체가 실제로 얼어 있는지는 `Object.isFrozen(user)`로 확인할 수 있습니다.

## 얕은 동결이라는 함정

주의할 점은 `Object.freeze`가 **얕은(shallow) 동결**이라는 것입니다. 객체 바로 아래 프로퍼티만 고정될 뿐, 그 안에 중첩된 객체나 배열까지 얼리지는 않습니다.

```js
const user = Object.freeze({
  name: "지민",
  address: { city: "서울" },
});

user.address.city = "부산"; // 중첩 객체라서 바뀌어 버림!
console.log(user.address.city); // "부산"
```

중첩된 값까지 보호하려면 각 단계마다 `Object.freeze`를 따로 호출해야 합니다(깊은 동결, deep freeze).

## 언제 쓰면 좋을까

설정값(config)이나 상수처럼 한 번 정해지면 바뀌면 안 되는 데이터, 혹은 여러 모듈이 공유하는 객체를 실수로 변경되지 않게 보호하고 싶을 때 유용합니다. 다만 `Object.freeze`는 "실수로 바뀌는 것"을 막는 안전장치일 뿐, 함수형 프로그래밍에서 말하는 불변 데이터 구조를 완전히 대체하지는 않는다는 점을 기억해두면 좋습니다.
