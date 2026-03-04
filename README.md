## 프로젝트 구조

### index.html
게임의 진입점 파일입니다.
- 전체 CSS 스타일 (레이아웃, 애니메이션, 팝업, 메뉴 등)을 포함합니다.
- Hold, Score, Line, Next Preview 등의 게임 UI HTML 구조를 정의합니다.

---

### constants.js
게임 전반에서 사용되는 전역 상수와 데이터를 정의합니다.
- `BLOCKWIDTH`, `SMALLWIDTH`, `INTERVAL` 등 크기 관련 상수
- `TOPCOLLIDED`, `LEFTSIDECOLLIDED` 등 충돌 결과 코드 상수
- `ROTATE`, `MOVEDOWN`, `HARDDROP` 등 입력 액션 상수
- `wallKickOffset` : SRS(Super Rotation System) 기반 벽 킥 오프셋 데이터
- `scoreOffset` : 라인 클리어, T-Spin, Back-to-Back, Perfect Clear 점수 테이블
- `MINOOFFSET` : 7종 미노의 스폰 위치, 회전 형태, 색상 등 정의
- `KEYSETTING` : 기본 키 바인딩 설정
- `LEADERBOARD` : 리더보드 데이터를 담는 배열
- `copySetting()` : 설정 객체 배열을 깊은 복사하는 유틸 함수

---

### Main.js
게임 전체의 흐름을 관리하는 최상위 클래스입니다. 파일 맨 끝에서 `var main = new Main()`으로 인스턴스를 생성하여 게임을 시작합니다.
- `initialize()` : Storage에서 키 설정, 색상 설정, 리더보드 데이터를 불러와 초기화합니다.
- `gameStart()` : `MinoController`를 생성하고 키 이벤트를 바인딩하여 게임을 시작합니다.
- `gamePause()` / `gameResume()` : 게임 일시정지 및 재개를 처리합니다.
- `gameOver()` : 게임 종료 후 점수를 계산하고, 신기록이면 이름 입력 팝업을 띄웁니다.
- `keyEvent()` : 키 입력을 받아 `KEYSETTING`과 대조 후 해당 액션 함수를 호출합니다.

---

### MinoController.js
현재 조작 중인 미노의 움직임과 생성을 담당하는 클래스입니다.
- `spawnMino()` : 새 미노를 생성하고 보드에 배치합니다. 충돌 시 게임 오버를 호출합니다.
- `moveDown()` / `moveLeft()` / `moveRight()` : 미노를 각 방향으로 이동시킵니다.
- `hardDrop()` : 미노를 그림자 위치로 즉시 낙하시킵니다.
- `clockWiseRotate()` / `counterClockWiseRotate()` : SRS 벽 킥을 적용하여 회전합니다.
- `holdMino()` : 현재 미노를 홀드하고, 홀드된 미노가 있으면 교체합니다.
- `moveShadow()` : 현재 미노의 낙하 예측 위치(그림자)를 계산하고 갱신합니다.
- `startAutoDown()` / `cancelAutoDown()` : `setInterval`로 자동 낙하를 시작/중지합니다.

---

### Board.js
게임 보드(격자 매트릭스)와 미노 DOM 요소 관리를 담당하는 클래스입니다.
- `initialize()` : 22행 12열의 매트릭스를 생성하고 벽/바닥 경계 값을 채웁니다.
- `createMino()` / `removeMino()` : 미노를 구성하는 `div` DOM 요소를 생성/제거합니다.
- `createShadow()` / `removeShadow()` : 그림자 DOM 요소를 생성/제거합니다.
- `checkCollision()` : 주어진 매트릭스 좌표에 충돌이 있는지 확인하고, 충돌 타입 코드를 반환합니다.
- `stackMino()` : 미노를 보드에 고정시키고 스택 애니메이션을 실행한 뒤 라인 체크를 호출합니다.
- `checkLine()` : 완성된 줄을 찾아 제거 애니메이션과 줄 이동 애니메이션을 처리합니다.
- `checkTspin()` : T-Spin 조건을 판정합니다.
- `checkPerfectClear()` : Perfect Clear 조건을 판정합니다.

---

### ScoreIndicator.js
점수, 라인 수를 계산하고 화면에 표시하는 클래스입니다.
- `calScore()` : T-Spin, Perfect Clear, Back-to-Back, 콤보, Hard Drop 여부를 조합하여 점수를 계산하고, 클리어 메시지 DOM을 생성하여 스테이지에 표시합니다.
- `setScore()` / `setLine()` : 점수와 라인 수를 갱신하고 화면 DOM에 반영합니다.
- `setCombo()` : 콤보 카운터를 초기화합니다.
- 내부적으로 `LevelSystem` 인스턴스를 생성하여 레벨업을 관리합니다.

---

### LevelSystem.js
게임 레벨과 자동 낙하 속도를 관리하는 클래스입니다.
- `checkLevelUp()` : 클리어한 라인 수가 다음 레벨 기준을 넘는지 확인합니다.
- `levelUp()` : 레벨을 1 올리고, 낙하 딜레이를 50ms 감소시킵니다. 최소값은 `MINIMUMDELAY`입니다.
- `getDelay()` : 현재 자동 낙하 딜레이(ms)를 반환합니다.
- `getLevel()` : 현재 레벨을 반환합니다.

---

### MinoPreview.js
다음에 등장할 미노 4개를 관리하는 클래스입니다.
- `fillPool()` : 7종 미노 번호를 풀(pool)에 채웁니다.
- `getNumberFromPool()` : 풀에서 미노 번호를 무작위로 꺼냅니다 (7-bag 랜덤).
- `fillStack()` : 스택이 4개 미만이면 풀에서 꺼내 채우고, `PreviewPainter`로 미리보기를 다시 그립니다.
- `getMinoNumber()` : 스택 맨 앞의 미노 번호를 꺼내 반환합니다.

---

### PreviewPainter.js
Next 미리보기 캔버스에 다음 미노들을 그리는 클래스입니다.
- `initialize()` : 캔버스 크기를 `.preview-view` 컨테이너 크기에 맞춥니다.
- `drawPreview()` : 스택에 담긴 미노 4개를 순서대로 캔버스에 그립니다.

---

### MinoHolder.js
Hold 기능을 관리하는 클래스입니다.
- `changeHold()` : 현재 홀드된 미노 번호와 새 미노 번호를 교체하고, 이전 홀드 번호를 반환합니다.
- 내부적으로 `HoldPainter`를 사용하여 홀드 캔버스를 갱신합니다.

---

### HoldPainter.js
Hold 캔버스에 홀드된 미노를 그리는 클래스입니다.
- `initialize()` : 캔버스 크기를 `.hold-view` 컨테이너 크기에 맞춥니다.
- `drawHold()` : 홀드된 미노 번호에 해당하는 미노 형태와 색상을 캔버스에 그립니다.

---

### ShadowPainter.js
미노 낙하 예측 위치(그림자) 블록의 이미지를 생성하는 클래스입니다.
- `initialize()` : 회색 테두리 형태의 그림자 이미지를 오프스크린 캔버스에 미리 그려둡니다.
- `drawShadow()` : 오프스크린 캔버스를 새 캔버스에 복사하여 반환합니다.

---

### PopUp.js
게임 내 모든 팝업 UI를 생성하는 클래스입니다.
- `getPopUpBase()` : 제목이 있는 팝업 기본 구조(배경 + 컨테이너)를 생성하는 공통 메서드입니다.
- `makeConfigPopUp()` : 키 설정과 블록 색상 설정을 변경할 수 있는 Configuration 팝업을 생성합니다.
- `makeLeaderBoardPopUp()` : 상위 10개의 점수를 표시하는 리더보드 팝업을 생성합니다.
- `makeCreditPopUp()` : 개발자 정보를 표시하는 Credit 팝업을 생성합니다.
- `makeNewRecordPopup()` : 신기록 달성 시 이름을 입력받는 팝업을 생성합니다.
- `makeMessagePopUp()` : Pause / Game Over 메시지 팝업의 공통 기반을 생성합니다.
- `makePausePopUp()` : 일시정지 안내 메시지 팝업을 생성합니다.
- `makeGameOverPopUp()` : 게임 오버 안내 메시지 팝업을 생성합니다.

---

### Menu.js
메인 메뉴 화면을 생성하고 표시하는 클래스입니다.
- `showMenu()` : 기존 스테이지를 제거하고 GAME START, LEADERBOARD, CONFIGURATION, CREDIT 버튼이 있는 메뉴 화면을 새로 그립니다.
- 각 버튼 클릭 시 `PopUp`의 해당 메서드 또는 `gameStartFn` 콜백을 호출합니다.

---

### Storage.js
Web SQL Database를 사용하여 키 설정, 블록 색상, 리더보드 데이터를 영구 저장하는 클래스입니다.
- `openKeySettingTable()` / `openColorSettingTable()` / `openLeaderBoardTable()` : 각 테이블이 없으면 생성합니다.
- `insertKeyData()` / `getKeyData()` / `updateKeyData()` : 키 설정 CRUD를 처리합니다.
- `insertColorData()` / `getColorData()` / `updateColorData()` : 블록 색상 CRUD를 처리합니다.
- `getRankData()` / `insertRankData()` / `deleteAllRankData()` : 리더보드 CRUD를 처리합니다.
- 모든 메서드는 `Promise`를 반환합니다.

---

### LeaderBoardPainter.js
리더보드 팝업에서 순위 메달 이미지를 캔버스로 그리는 클래스입니다.
- `drawMedal()` : 지정한 색상(gold, silver, brown)으로 메달 모양의 캔버스를 생성하여 반환합니다.

---

### ConfigurationPainter.js
Configuration 팝업에서 미노 미리보기 이미지를 캔버스로 그리는 클래스입니다.
- `drawMino()` : 미노 번호와 색상을 받아 해당 미노의 첫 번째 회전 상태를 작은 캔버스에 그려 반환합니다. 색상 변경 시 미리보기를 실시간으로 업데이트하는 데 사용됩니다.

---

## 🔗 의존성 구조

```
constants.js
    ├── ShadowPainter.js
    ├── PreviewPainter.js
    ├── HoldPainter.js
    ├── LeaderBoardPainter.js
    ├── ConfigurationPainter.js
    ├── LevelSystem.js
    │       └── ScoreIndicator.js
    │               └── Board.js (← ShadowPainter)
    ├── Storage.js
    ├── MinoPreview.js (← PreviewPainter)
    ├── MinoHolder.js (← HoldPainter)
    ├── MinoController.js (← MinoPreview, MinoHolder, Board, PopUp)
    ├── PopUp.js (← LeaderBoardPainter, ConfigurationPainter)
    ├── Menu.js (← PopUp)
    └── Main.js (← Storage, PopUp, Menu, MinoController)
```
