# call, apply, bind로 this 직접 지정하기

함수 안의 `this`는 함수를 어떻게 호출하느냐에 따라 달라집니다. 그런데 가끔은 호출 방식과 상관없이 `this`를 우리가 원하는 값으로 직접 고정하고 싶을 때가 있습니다. 이럴 때 쓰는 도구가 `call`, `apply`, `bind`입니다.

## call과 apply: 그 자리에서 바로 실행

`call`과 `apply`는 함수를 호출하면서 동시에 `this`를 지정합니다. 둘의 차이는 인자를 넘기는 방식뿐입니다.

```js
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const user = { name: '민지' };

greet.call(user, '안녕');       // 인자를 하나씩 나열
greet.apply(user, ['안녕']);    // 인자를 배열로 묶어서 전달
```

두 방법 모두 `greet` 함수 안의 `this`를 `user` 객체로 바꿔서 실행합니다.

## bind: 나중에 실행할 함수 만들기

`bind`는 즉시 실행하지 않고, `this`가 고정된 새로운 함수를 반환합니다. 버튼 클릭 같은 이벤트 핸들러에 함수를 전달할 때 특히 유용합니다.

```js
const boundGreet = greet.bind(user);
button.addEventListener('click', boundGreet); // 나중에 실행돼도 this는 항상 user
```

## 언제 골라 쓸까

지금 바로 실행하면서 인자를 하나씩 넘기고 싶다면 `call`, 배열로 이미 묶여 있다면 `apply`를 씁니다. 반대로 나중에 호출될 함수를 미리 만들어 두고 싶다면 `bind`가 정답입니다. 세 메서드 모두 결국 "이 함수의 this는 내가 정한다"는 같은 목적을 가지고 있다는 점만 기억하면 충분합니다.
