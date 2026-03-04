class Board {
    constructor() {
        this.stage = document.getElementById('stage')
        this.scoreIndicator = new ScoreIndicator()
        this.shadowPainter = new ShadowPainter()
        this.matrix = undefined
        this.initialize()
    }
    initialize() {
        this.matrix = new Array()
        var top = new Array()
        for (let i = 0; i < 10; i++) {
            top.push({ value: 1 })
        }
        this.matrix.push(top)
        for (let i = 0; i < 20; i++) {
            var temp = new Array()
            temp.push({ value: 5 })
            for (let k = 0; k < 10; k++) {
                temp.push(undefined)
            }
            temp.push({ value: 4 })
            this.matrix.push(temp)
        }
        var base = new Array()
        for (let i = 0; i < 12; i++) {
            base.push({ value: 3 })
        }
        this.matrix.push(base)
    }
    createMino(blockCount, color) {
        var blockDiv = []
        for (let i = 0; i < blockCount; i++) {
            var div = document.createElement('div')
            div.classList.add('mino')
            div.style.background = color
            this.stage.appendChild(div)
            blockDiv.push(div)
        }
        return blockDiv
    }
    removeMino(blockDiv) {
        blockDiv.forEach((div) => {
            this.stage.removeChild(div)
        })
    }
    createShadow(blockCount) {
        var shadowDiv = []
        for (let i = 0; i < blockCount; i++) {
            var div = document.createElement('div')
            div.classList.add('mino', 'shadow')
            div.appendChild(this.shadowPainter.drawShadow())
            this.stage.appendChild(div)
            shadowDiv.push(div)
        }
        return shadowDiv
    }
    removeShadow(shadowDiv) {
        shadowDiv.forEach((div) => {
            this.stage.removeChild(div)
        })
    }
    checkCollision(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            var x = matrix[i].x
            var y = matrix[i].y
            try {
                var cell = this.matrix[y][x]
                if (cell != undefined) {
                    switch (cell.value) {
                        case 5:
                            return LEFTSIDECOLLIDED
                        case 4:
                            return RIGHTSIDECOLLIDED
                        case 3:
                            return BOTTOMCOLLIDED
                        case 2:
                            return EXIST
                        case 1:
                            return TOPCOLLIDED
                    }
                }
            } catch { }
        }
        return false
    }
    checkTspin(mino) {
        if (!(mino.lastMove == ROTATE && mino.minoNumber == 2)) {
            return false
        }
        var x = mino.x
        var y = mino.y
        var wallCount = 0
        this.matrix[y][x] ? wallCount += 1 : wallCount += 0
        this.matrix[y][x + 2] ? wallCount += 1 : wallCount += 0
        this.matrix[y + 2][x] ? wallCount += 1 : wallCount += 0
        this.matrix[y + 2][x + 2] ? wallCount += 1 : wallCout += 0

        if (wallCount > 2) { return true }
        else { return false }
    }
    checkPerfectClear() {
        for (let i = 1; i < this.matrix[20].length - 1; i++) {
            if (this.matrix[20][i] != undefined) {
                return false
            }
        }
        return true
    }
    stackMino(mino, spawnMino) {
        var blockDiv = mino.blockDiv
        var matrix = mino.matrix
        var minoNumber = mino.minoNumber
        var shadowDiv = mino.shadowDiv

        var changedCol = []
        matrix.forEach((m, i) => {
            var block = blockDiv[i]
            var x = m.x
            var y = m.y
            changedCol.push(y)
            block.value = 2
            this.matrix[y][x] = block
        })
        this.removeShadow(shadowDiv)
        main.removeGameKeyEvent()
        if (this.checkLine(new Set(changedCol), spawnMino, mino)) {
            if (this.scoreIndicator.combo) {
                this.scoreIndicator.setCombo(0)
            }
            var maxY = undefined
            for (let i = 1; i < matrix.length; i++) {
                maxY = Math.max(matrix[i].y, matrix[i - 1].y)
            }
            matrix.forEach((m, i) => {
                var block = blockDiv[i]
                var background_temp = block.style.background
                var removeLightEndFn = () => {
                    spawnMino()
                    main.bindGameKeyEvent()
                    block.removeEventListener('transitionend', removeLightEndFn)
                }
                var lightUpCellEndFn = () => {
                    block.style.transform = 'scale(1,1)'
                    block.style.top = (BLOCKWIDTH + INTERVAL) * (m.y - 1) + 'px'
                    block.style.borderRadius = '6px'

                    block.removeEventListener('transitionend', lightUpCellEndFn)
                    if (i == matrix.length - 1) {
                        block.addEventListener('transitionend', removeLightEndFn)
                    }
                }
                block.addEventListener('transitionend', lightUpCellEndFn)

                block.style.transition = 'all .1s ease'
                block.style.top = ((BLOCKWIDTH + INTERVAL) * (m.y - 1) + (maxY - m.y) * 10) + 'px'
                block.style.borderRadius = '12px'
                block.style.transform = 'scale(1.3, 0.9)'
            })
        }
    }

    checkLine(changedCol, spawnMino, mino) {
        var filledCol = []
        changedCol.forEach((y) => {
            for (let i = 1; i < 11; i++) {
                var cell = this.matrix[y][i]
                if (cell == undefined) {
                    return
                }
            }
            filledCol.push(y)
        })
        var onDownLinesEnd = function () {
            main.bindGameKeyEvent()
            spawnMino()
            this.removeEventListener('transitionend', onDownLinesEnd)
        }
        var onHideCellEnd = () => {
            filledCol.forEach((y) => {
                for (let x = 1; x < 11; x++) {
                    try {
                        this.stage.removeChild(this.matrix[y][x])
                        this.matrix[y][x] = undefined
                    } catch { }
                }
            })
            var temp = true
            for (let y = 1; y < this.matrix.length - 1; y++) {
                var downCount = 0
                filledCol.forEach((i) => {
                    i > y ? downCount += 1 : downCount += 0
                })
                if (downCount) {
                    for (let x = 1; x < this.matrix[y].length - 1; x++) {
                        try {
                            var block = this.matrix[y][x]
                            block.style.transition = 'top 0.3s cubic-bezier(0.63, 0.07, 0, 1.39) 0s'
                            block.style.top = (BLOCKWIDTH + INTERVAL) * (y + downCount - 1) + 'px'
                            if (temp) {
                                block.addEventListener('transitionend', onDownLinesEnd)
                                temp = false
                            }
                        } catch { }
                    }
                }
            }
            if (temp) {
                main.bindGameKeyEvent()
                spawnMino()
            }
            filledCol.forEach((y) => {
                for (let i = y; i > 2; i--) {
                    this.matrix[i] = this.matrix[i - 1].slice()
                }
            })
        }
        if (filledCol.length) {
            var isTspin = this.checkTspin(mino)
            var isPerfectClear = this.checkPerfectClear()
            var isHardDrop = false
            if (mino.lastMove == HARDDROP) {
                isHardDrop = true
            }
            this.scoreIndicator.calScore(isTspin, isPerfectClear, filledCol.length, isHardDrop)
            var delay = 0
            for (let y = 0; y < filledCol.length; y++) {
                for (let x = 1; x < 11; x++) {
                    var block = this.matrix[filledCol[y]][x]
                    var transitionString = 'transform .35s ease ' + delay + 's'
                    block.style.transition = 'transform .35s ease ' + delay + 's'
                    block.style.transform = 'scale(0)'
                    if (x == 10 && y == filledCol.length - 1) {
                        block.addEventListener('transitionend', onHideCellEnd)
                    }
                    delay += 0.01
                }
            }
            return false
        }
        return true
    }
}
