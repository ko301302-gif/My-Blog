# localStorage와 sessionStorage, 브라우저에 데이터 저장하기

새로고침해도 입력했던 값이 남아있거나, 다크모드 설정이 계속 유지되는 걸 본 적 있으신가요? 이런 기능은 대부분 브라우저가 제공하는 `localStorage`와 `sessionStorage` 덕분입니다. 둘 다 키-값 형태로 문자열 데이터를 브라우저에 저장하는 Web Storage API이고, 사용법은 거의 똑같지만 데이터가 "언제까지" 남아있는지가 다릅니다.

## 기본 사용법

두 객체 모두 `setItem`, `getItem`, `removeItem`, `clear` 메서드를 제공합니다.

```js
localStorage.setItem("username", "jiwoo");
localStorage.getItem("username"); // "jiwoo"
localStorage.removeItem("username");
localStorage.clear(); // 전부 삭제
```

## localStorage vs sessionStorage

`localStorage`는 브라우저를 껐다 켜도, 심지어 컴퓨터를 재부팅해도 데이터가 그대로 남아있습니다. 사용자가 직접 지우거나 코드로 삭제하기 전까지는 계속 유지됩니다.

반면 `sessionStorage`는 **탭(또는 창) 단위**로 유지됩니다. 같은 탭에서 새로고침해도 데이터는 남지만, 탭을 닫으면 사라집니다. 로그인 폼 임시 저장처럼 "이번 방문 동안만" 필요한 데이터에 적합합니다.

## 객체도 저장하려면

Web Storage는 문자열만 저장할 수 있어서, 객체나 배열을 넣으려면 `JSON.stringify`로 문자열로 바꾼 뒤 저장하고, 꺼낼 때는 `JSON.parse`로 되돌려야 합니다.

```js
const settings = { theme: "dark", fontSize: 16 };
localStorage.setItem("settings", JSON.stringify(settings));

const saved = JSON.parse(localStorage.getItem("settings"));
console.log(saved.theme); // "dark"
```

## 주의할 점

Web Storage는 동기적으로 동작하기 때문에 너무 큰 데이터를 자주 읽고 쓰면 성능에 영향을 줄 수 있습니다. 또한 민감한 정보(비밀번호, 토큰 등)를 그대로 저장하면 보안에 취약하므로 적합하지 않습니다. 가벼운 설정값이나 UI 상태처럼 민감하지 않은 데이터를 다룰 때 활용하는 것이 좋습니다.
