# 게터(getter)와 세터(setter), 프로퍼티에 함수 숨기기

객체의 속성 값을 가져오거나 바꿀 때, 그냥 `obj.value`처럼 접근하는 게 보통입니다. 그런데 값을 가져오거나 바꾸는 순간에 검증이나 가공 로직을 끼워 넣고 싶을 때가 있습니다. 이럴 때 쓰는 것이 게터(get)와 세터(set)입니다. 겉보기엔 평범한 속성처럼 보이지만, 실제로는 함수가 숨어서 동작합니다.

## 게터: 값을 읽을 때 실행되는 함수

`get` 키워드를 쓰면 속성을 읽는 순간 함수가 실행되어 결과를 돌려줍니다.

```js
const user = {
  firstName: "민수",
  lastName: "김",
  get fullName() {
    return `${this.lastName}${this.firstName}`;
  },
};

console.log(user.fullName); // "김민수"
```

`fullName`은 저장된 값이 아니라, 호출될 때마다 계산되는 값입니다. 괄호 없이 `user.fullName`처럼 쓰는 게 핵심입니다.

## 세터: 값을 쓸 때 실행되는 함수

`set` 키워드는 속성에 값을 대입하는 순간 함수를 실행합니다. 대입하려는 값을 검증하거나 다른 속성에 반영할 때 유용합니다.

```js
const account = {
  _balance: 0,
  set balance(amount) {
    if (amount < 0) {
      console.log("잔액은 음수가 될 수 없습니다.");
      return;
    }
    this._balance = amount;
  },
  get balance() {
    return this._balance;
  },
};

account.balance = -100; // 잔액은 음수가 될 수 없습니다.
account.balance = 5000;
console.log(account.balance); // 5000
```

## 왜 밑줄(_)이 붙은 이름을 쓸까

게터와 세터가 자기 자신과 같은 이름의 변수를 참조하면 무한 재귀가 발생합니다. 그래서 실제 값을 저장하는 내부 변수에는 `_balance`처럼 밑줄을 붙여 구분하는 관례를 씁니다. 이렇게 하면 겉으로는 평범한 속성처럼 쓰면서도, 내부적으로는 안전하게 검증된 값만 저장할 수 있습니다.
