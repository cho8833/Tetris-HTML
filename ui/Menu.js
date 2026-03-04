class Menu {
    constructor(popup, storage) {
        this.stage = document.getElementById('stage')
        this.game_ui = document.getElementById('game-ui')
        this.popup = popup
        this.storage = storage
    }
    showMenu(gameStartFn) {
        try {
            this.game_ui.removeChild(this.stage)
        } catch { }
        this.stage = document.createElement('div')
        this.stage.id = 'stage'
        this.game_ui.insertBefore(this.stage, this.game_ui.children[1])

        var preview = document.getElementById('preview')
        preview.getContext('2d').clearRect(0, 0, preview.offsetWidth, preview.offsetHeight)
        var score = document.getElementById('score')
        score.innerText = ''
        var line = document.getElementById('line')
        line.innerText = ''
        var buttonContainer = document.createElement('div')
        buttonContainer.classList.add('menuButtonContainer')
        var hold = document.createElement('canvas')
        hold.getContext('2d').clearRect(0, 0, hold.offsetWidth, hold.offsetHeight)
        var startGame = document.createElement('div')
        var config = document.createElement('div')
        var leaderBoard = document.createElement('div')
        var credit = document.createElement('div')

        startGame.classList.add('menuButton', 'startGameButton')
        config.classList.add('menuButton', 'configButton')
        leaderBoard.classList.add('menuButton', 'leaderBoardButton')
        credit.classList.add('menuButton', 'creditButton')

        startGame.innerText = 'GAME START'
        config.innerText = 'CONFIGURATION'
        leaderBoard.innerText = 'LEADERBOARD'
        credit.innerText = 'CREDIT'
        startGame.addEventListener('mouseup', () => {
            gameStartFn()
        })
        config.addEventListener('mouseup', () => {
            this.popup.makeConfigPopUp(this.storage)
        })
        leaderBoard.addEventListener('mouseup', () => {
            this.popup.makeLeaderBoardPopUp()
        })
        credit.addEventListener('mouseup', () => {
            this.popup.makeCreditPopUp()
        })
        buttonContainer.append(startGame, leaderBoard, config, credit)
        this.stage.append(buttonContainer)
    }
}
