# try/catch로 예외 다루기

코드를 짜다 보면 예상치 못한 상황에서 에러가 발생합니다. JSON 파싱에 실패하거나, 네트워크 요청이 끊기거나, 존재하지 않는 값에 접근하는 식입니다. 이런 에러가 처리되지 않으면 프로그램이 그대로 멈춰버립니다. `try/catch`는 이런 상황에서 프로그램이 죽지 않고 대응할 수 있게 해주는 문법입니다.

## 기본 구조

`try` 블록 안의 코드를 실행하다가 에러가 발생하면, 그 즉시 실행을 멈추고 `catch` 블록으로 넘어갑니다.

```js
try {
  const data = JSON.parse("이상한 문자열");
  console.log(data);
} catch (error) {
  console.log("파싱 실패:", error.message);
}
```

에러가 나도 프로그램 전체가 멈추지 않고, `catch` 안에서 로그를 남기거나 기본값을 대신 쓰는 등 원하는 대응을 할 수 있습니다.

## finally로 마무리 처리하기

`finally` 블록은 에러 발생 여부와 상관없이 항상 실행됩니다. 로딩 스피너를 끄거나 자원을 정리하는 코드를 여기에 두면 좋습니다.

```js
try {
  fetchData();
} catch (error) {
  showError(error);
} finally {
  hideLoadingSpinner();
}
```

## async 함수에서 쓰기

`async/await`와 함께 쓰면 비동기 코드의 에러도 동기 코드처럼 자연스럽게 잡을 수 있습니다.

```js
async function loadUser() {
  try {
    const res = await fetch("/api/user");
    return await res.json();
  } catch (error) {
    console.log("사용자 정보를 불러오지 못했습니다.");
  }
}
```

무조건 모든 코드를 `try/catch`로 감쌀 필요는 없습니다. 실패할 가능성이 있고, 실패했을 때 대응이 필요한 부분에만 선택적으로 사용하는 것이 좋습니다.
