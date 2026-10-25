# Object.assign으로 객체 병합하기

여러 객체를 하나로 합쳐야 할 때가 있습니다. `Object.assign()`은 하나 이상의 소스 객체가 가진 속성을 타겟 객체로 복사해주는 메서드입니다.

## 기본 사용법

첫 번째 인자가 타겟, 그 뒤가 소스 객체입니다. 소스 객체들을 순서대로 타겟에 복사하며, 반환값은 타겟 객체 자신입니다.

```js
const target = { a: 1 };
const result = Object.assign(target, { b: 2 }, { c: 3 });

console.log(result); // { a: 1, b: 2, c: 3 }
console.log(target === result); // true
```

여기서 중요한 점은 `target`이 복사 대상이자 결과 그 자체라는 것입니다. 즉 원본 객체가 그대로 변형됩니다.

## 원본을 건드리지 않으려면

기존 객체를 그대로 두고 새 객체를 만들고 싶다면 빈 객체를 타겟으로 넘기면 됩니다.

```js
const user = { name: "민수" };
const merged = Object.assign({}, user, { age: 20 });
```

이렇게 쓰면 `user`는 바뀌지 않고, 합쳐진 결과만 새 객체로 생성됩니다. 스프레드 문법(`{ ...user, age: 20 }`)도 똑같은 결과를 내므로 둘 중 더 익숙한 쪽을 쓰면 됩니다.

## 같은 키가 있다면

소스 객체에 같은 키가 여러 번 나오면 나중에 전달된 값이 앞의 값을 덮어씁니다. 설정값에 기본값을 깔고 사용자 입력으로 덮어쓰는 패턴에 자주 쓰입니다.

```js
const defaults = { theme: "light", lang: "ko" };
const userOptions = { theme: "dark" };

const options = Object.assign({}, defaults, userOptions);
// { theme: "dark", lang: "ko" }
```

단, `Object.assign`은 얕은 복사만 수행하므로 중첩된 객체나 배열은 참조가 그대로 공유된다는 점을 기억해두어야 합니다.
