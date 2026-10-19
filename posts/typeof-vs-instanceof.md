# typeof와 instanceof, 데이터 타입 제대로 확인하기

자바스크립트에서 값의 타입을 확인할 때 가장 먼저 떠오르는 건 `typeof`입니다. 하지만 `typeof`만으로는 배열인지 객체인지, 혹은 어떤 클래스의 인스턴스인지 구분할 수 없습니다. 이때 `instanceof`가 필요합니다.

## typeof로 기본 타입 확인하기

`typeof`는 `"string"`, `"number"`, `"boolean"`, `"undefined"`, `"function"` 같은 기본 타입을 문자열로 알려줍니다.

```js
typeof "hi";        // "string"
typeof 42;           // "number"
typeof undefined;    // "undefined"
typeof function(){}; // "function"
```

문제는 배열과 객체입니다.

```js
typeof [];  // "object"
typeof {};  // "object"
typeof null; // "object" (유명한 버그)
```

배열, 객체, null이 모두 `"object"`로 나오기 때문에 `typeof`만으로는 서로 구분할 수 없습니다.

## instanceof로 더 정확히 구분하기

`instanceof`는 어떤 값이 특정 클래스(생성자 함수)의 인스턴스인지 확인합니다. 프로토타입 체인을 따라가며 검사하기 때문에 배열과 일반 객체를 구분할 수 있습니다.

```js
[] instanceof Array;   // true
{} instanceof Array;   // false
[] instanceof Object;  // true (배열도 결국 객체)
```

배열인지 확실히 알고 싶다면 `Array.isArray()`를 쓰는 편이 더 안전합니다. `instanceof`는 다른 iframe이나 실행 환경에서 만들어진 배열은 제대로 판별하지 못할 수 있기 때문입니다.

## 정리하면

원시 타입(문자열, 숫자, 불리언 등)을 구분할 때는 `typeof`를, 객체가 어떤 클래스의 인스턴스인지 확인할 때는 `instanceof`를 쓰면 됩니다. 두 연산자의 역할을 구분해서 쓰는 것만으로도 타입 관련 버그를 꽤 줄일 수 있습니다.
