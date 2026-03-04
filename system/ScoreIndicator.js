class ScoreIndicator {
    constructor() {
        this.scoreView = document.getElementById('score')
        this.lineView = document.getElementById('line')
        this.stage = document.getElementById('stage')
        this.messageContainer = undefined
        this.levelSystem = new LevelSystem()
        this.score = 0
        this.totalLine = 0
        this.combo = 0
        this.isB2B = false
        this.setScore(0)
        this.setLine(0)
    }
    calScore(isTspin, isPerfectClear, clearCount, isHardDrop) {
        try {
            this.stage.removeChild(this.messageContainer)
        } catch { }
        this.messageContainer = document.createElement('div')
        this.messageContainer.classList.add('clearMessageContainer')
        var totalScore = 0
        var comboMessageDiv = undefined
        var b2bMessageDiv = undefined
        var clearMessageDiv = document.createElement('div')
        var levelUpMessageDiv = undefined
        clearMessageDiv.classList.add('clearMessage')
        var comboMessage = ''
        var b2bMessage = ''
        var clearMessage = ''
        // Tspin
        if (this.isB2B && (isTspin || (clearCount == 4))) {
            b2bMessageDiv = document.createElement('div')
            b2bMessageDiv.innerText = B2B
            b2bMessageDiv.classList.add('clearMessage')
            if (isTspin) {
                totalScore += scoreOffset.B2BTspin[clearCount - 1]
                clearMessage += TSPIN
            }
            else if (clearCount == 4) {
                totalScore += scoreOffset.B2BTetris
            }
        }
        // Perfect
        if (isPerfectClear) {
            clearMessage += '' + PERFECT
            totalScore += scoreOffset.Perfect[clearCount - 1]
        }
        // clearCount
        if (this.combo) {
            comboMessageDiv = document.createElement('div')
            comboMessage += this.combo + 'Combo'
            comboMessageDiv.innerText = comboMessage
            comboMessageDiv.classList.add('clearMessage')
            totalScore += 50 * this.combo * this.levelSystem.getLevel()
            this.combo += 1
        }
        else {
            this.combo = 1
        }
        // Hard & Soft
        if (isHardDrop) {
            totalScore += clearCount * 20
        }
        else {
            totalScore += clearCount * 10
        }
        // check Levelup
        if (this.levelSystem.checkLevelUp(clearCount)) {
            levelUpMessageDiv = document.createElement('div')
            levelUpMessageDiv.classList.add('clearMessage')
            levelUpMessageDiv.innerText = 'Level Up'
            this.levelSystem.levelUp(clearCount)
        }
        clearMessageDiv.innerText = clearMessage
        b2bMessageDiv ? this.messageContainer.appendChild(b2bMessageDiv) : false
        clearMessageDiv ? this.messageContainer.appendChild(clearMessageDiv) : false
        comboMessageDiv ? this.messageContainer.appendChild(comboMessageDiv) : false
        this.messageContainer.addEventListener('animationend', () => {
            try {
                this.stage.removeChild(this.messageContainer)
            } catch { }
            if (levelUpMessageDiv != undefined) {
                this.messageContainer = document.createElement('div')
                this.messageContainer.classList.add('clearMessageContainer')
                this.stage.appendChild(this.messageContainer)
                this.messageContainer.appendChild(levelUpMessageDiv)
                this.messageContainer.addEventListener('animationend', () => {
                    try {
                        this.stage.removeChild(this.messageContainer)
                    } catch { }
                })
            }
        })
        this.stage.appendChild(this.messageContainer)
        this.setLine(clearCount + this.totalLine)
        this.setScore(this.score + totalScore)
    }
    setCombo(combo) {
        this.combo = combo
    }
    setLine(clearCount) {
        this.totalLine = clearCount
        this.lineView.innerText = this.totalLine
    }
    setScore(score) {
        this.score = score
        this.scoreView.innerText = this.score
    }
}
