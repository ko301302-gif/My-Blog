# setTimeout과 setInterval, 타이머 함수 다루기

일정 시간 뒤에 코드를 실행하거나, 일정 간격으로 반복 실행하고 싶을 때 자바스크립트에서는 setTimeout과 setInterval을 씁니다. 두 함수 모두 브라우저(또는 Node.js)가 제공하는 타이머 API로, 이름은 비슷하지만 쓰임새가 다릅니다.

## setTimeout: 한 번만, 나중에 실행하기

setTimeout은 지정한 시간(밀리초)이 지난 뒤 함수를 딱 한 번 실행합니다.

```js
setTimeout(() => {
  console.log("1초 후 실행됩니다");
}, 1000);
```

여기서 주의할 점은 1000ms가 지나면 "무조건" 실행되는 게 아니라, 그 시점에 콜 스택이 비어 있어야 실행된다는 것입니다. 자바스크립트는 싱글 스레드라 다른 작업이 먼저 끝나야 타이머 콜백이 실행될 수 있습니다.

## setInterval: 계속 반복 실행하기

setInterval은 지정한 간격마다 함수를 반복해서 실행합니다.

```js
const id = setInterval(() => {
  console.log("1초마다 반복");
}, 1000);
```

반복을 멈추려면 clearInterval에 아까 받은 id를 넘겨주면 됩니다.

```js
clearInterval(id);
```

setTimeout도 마찬가지로 clearTimeout으로 실행 전에 취소할 수 있습니다.

## 실전에서 주의할 점

setInterval은 콜백 실행 시간이 간격보다 길어지면 실행이 밀리거나 겹칠 수 있습니다. 그래서 반복 작업이 복잡하다면, setTimeout을 콜백 안에서 재귀적으로 호출해 "이전 실행이 끝난 뒤 다음 타이머를 거는" 방식을 쓰기도 합니다. 컴포넌트나 페이지를 벗어날 때 clearTimeout/clearInterval로 타이머를 정리하는 습관도 메모리 누수를 막는 데 중요합니다.
