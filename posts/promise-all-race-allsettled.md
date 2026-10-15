# Promise.all, race, allSettled 비교하기

여러 개의 비동기 작업을 동시에 실행하고 싶을 때, `await`를 하나씩 순서대로 쓰면 작업들이 끝날 때까지 기다렸다가 다음 작업을 시작하게 되어 시간이 낭비됩니다. 이럴 때 여러 Promise를 한꺼번에 다루는 세 가지 메서드, `Promise.all`, `Promise.race`, `Promise.allSettled`를 알아두면 상황에 맞게 골라 쓸 수 있습니다.

## Promise.all: 전부 성공해야 끝난다

`Promise.all`은 배열로 넘긴 모든 Promise가 성공해야 결과를 반환합니다. 하나라도 실패(reject)하면 즉시 그 에러로 전체가 실패합니다.

```js
const [user, posts] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
]);
```

사용자 정보와 게시글 목록처럼, 둘 다 있어야 화면을 그릴 수 있는 경우에 적합합니다.

## Promise.race: 가장 빠른 것 하나만

`Promise.race`는 여러 Promise 중 가장 먼저 끝난 것(성공이든 실패든)의 결과만 가져옵니다. 타임아웃을 구현할 때 자주 씁니다.

```js
const result = await Promise.race([
  fetchData(),
  new Promise((_, reject) => setTimeout(() => reject("timeout"), 3000)),
]);
```

## Promise.allSettled: 실패해도 끝까지 기다린다

`Promise.allSettled`는 일부가 실패해도 신경 쓰지 않고, 모든 Promise가 끝날 때까지 기다린 뒤 각각의 성공/실패 결과를 객체 배열로 돌려줍니다. 여러 요청 중 일부만 실패해도 전체 작업을 중단하지 않아야 할 때 유용합니다.

```js
const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);
results.forEach((r) => {
  if (r.status === "fulfilled") console.log(r.value);
  else console.log("실패:", r.reason);
});
```

상황에 맞는 메서드를 고르면 비동기 코드를 훨씬 안전하고 명확하게 작성할 수 있습니다.
