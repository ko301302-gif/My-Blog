# Promise와 async/await로 비동기 코드 다루기

자바스크립트에서 서버 요청처럼 시간이 걸리는 작업을 다룰 때는 결과가 나중에 도착하는 비동기 처리가 필요합니다. 예전에는 콜백 함수를 겹겹이 쌓아서 처리했지만, 코드가 금방 복잡해지는 문제가 있었습니다. 이를 해결하기 위해 등장한 것이 `Promise`이고, 이를 더 읽기 쉽게 만든 문법이 `async/await`입니다.

## Promise, 나중에 완료될 작업을 표현하기

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('완료!'), 1000);
});

promise.then((result) => console.log(result));
```

`Promise`는 비동기 작업의 성공(`resolve`) 또는 실패(`reject`)를 나타내는 객체입니다. `.then()`으로 성공 시 실행할 코드를, `.catch()`로 실패 시 실행할 코드를 연결할 수 있어 콜백을 중첩하지 않고도 순서대로 작업을 이어갈 수 있습니다.

## async/await, Promise를 동기 코드처럼 쓰기

```js
async function getData() {
  try {
    const result = await promise;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

함수 앞에 `async`를 붙이면 그 함수는 항상 Promise를 반환하며, 내부에서 `await`를 사용해 Promise가 끝날 때까지 기다릴 수 있습니다. `.then()` 체인을 쓰지 않고 위에서 아래로 읽히는 코드를 작성할 수 있어 가독성이 크게 좋아지고, 에러 처리도 `try/catch`로 익숙하게 다룰 수 있습니다.

## 정리

`Promise`는 비동기 작업의 결과를 다루는 기본 도구이고, `async/await`는 그 위에서 코드를 더 자연스럽게 쓸 수 있게 해주는 문법입니다. 두 개념은 대립하는 것이 아니라 함께 쓰이므로, `Promise`의 동작 원리를 먼저 이해하면 `async/await` 코드도 훨씬 쉽게 읽힙니다.
