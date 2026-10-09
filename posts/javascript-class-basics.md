# 클래스(class)로 객체 만들기

자바스크립트에는 `class`라는 문법이 있어서 비슷한 모양의 객체를 여러 개 만들 때 편리합니다. 사실 class는 기존의 프로토타입 방식을 조금 더 읽기 쉽게 포장한 문법일 뿐이지만, 처음 보면 다른 언어의 클래스와 비슷하게 느껴집니다.

## constructor로 초기값 정하기

class 안의 `constructor`는 객체가 만들어질 때 한 번 실행되는 함수입니다. `new`로 인스턴스를 만들면서 넘긴 값이 그대로 속성으로 저장됩니다.

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`안녕하세요, ${this.name}입니다.`);
  }
}

const u = new User('철수', 20);
u.greet(); // 안녕하세요, 철수입니다.
```

## extends로 기능 물려받기

`extends`를 쓰면 기존 클래스를 기반으로 새 클래스를 만들 수 있습니다. 자식 클래스의 constructor에서는 `super()`를 먼저 호출해서 부모의 constructor를 실행해줘야 합니다.

```js
class Admin extends User {
  constructor(name, age, level) {
    super(name, age);
    this.level = level;
  }
}

const a = new Admin('영희', 25, 3);
a.greet(); // 안녕하세요, 영희입니다.
```

## 메서드는 인스턴스마다 복사되지 않는다

class 안에 정의한 메서드는 인스턴스마다 따로 저장되는 게 아니라 프로토타입에 한 번만 저장되고 모든 인스턴스가 공유합니다. 그래서 인스턴스를 아무리 많이 만들어도 메서드 때문에 메모리가 늘어나지 않습니다. 반면 constructor 안에서 `this.greet = () => {}` 처럼 속성으로 함수를 정의하면 인스턴스마다 따로 만들어지니, 이런 차이를 알아두면 class를 쓸 때 도움이 됩니다.
