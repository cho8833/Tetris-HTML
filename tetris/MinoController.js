class MinoController {
    constructor() {
        this.mino = undefined
        this.downId = undefined
        this.preview = new MinoPreview()
        this.holder = new MinoHolder()
        this.board = new Board()
        this.levelSystem = this.board.scoreIndicator.levelSystem
        this.scoreIndicator = this.board.scoreIndicator
        this.popup = new PopUp()
    }
    spawnMino(number) {
        var minoOffset = MINOOFFSET[number] ? MINOOFFSET[number] : MINOOFFSET[this.preview.getMinoNumber()]
        this.mino = {
            x: minoOffset.spawnX,
            y: minoOffset.spawnY,
            state: 0,
            shape: minoOffset.shape,
            matrix: undefined,
            shadowDiv: undefined,
            blockDiv: undefined,
            wallKick: minoOffset.wallKick,
            minoNumber: minoOffset.minoNumber,
            isHolded: false,
            shadowMatrix: undefined,
            lastMove: undefined
        }
        this.mino.matrix = this.getMatrix(this.mino.x, this.mino.y, this.mino.state)
        if (this.board.checkCollision(this.mino.matrix)) {
            var score = this.scoreIndicator.score
            var lines = this.scoreIndicator.totalLine
            main.gameOver(score, lines)
            return
        }
        this.mino.blockDiv = this.board.createMino(minoOffset.blockCount, minoOffset.color)
        this.mino.shadowDiv = this.board.createShadow(minoOffset.blockCount)
        this.moveShadow()
        this.moveMino(this.mino.matrix)
        if (this.delay > MINIMUMDELAY) {
            this.delay -= 2
        }
        this.startAutoDown()
    }
    getMatrix(x, y, state) {
        var matrix = []
        this.mino.shape[state].forEach((e, i) => {
            e.forEach((f, k) => {
                if (f == 1) {
                    matrix.push({ x: x + k, y: y + i })
                }
            })
        })
        return matrix
    }
    moveShadow() {
        var x = this.mino.x
        var y = this.mino.y

        while (true) {
            var matrix = this.getMatrix(x, y + 1, this.mino.state)
            if (this.board.checkCollision(matrix)) {
                break
            }
            y += 1
        }
        this.mino.shadowMatrix = this.getMatrix(x, y, this.mino.state)
        this.mino.shadowMatrix.forEach((e, i) => {
            var shadow = this.mino.shadowDiv[i]
            var x = e.x
            var y = e.y
            shadow.style.left = (BLOCKWIDTH + INTERVAL) * (x - 1) + 'px'
            shadow.style.top = (BLOCKWIDTH + INTERVAL) * (y - 1) + 'px'
        })
    }
    moveMino(matrix) {
        matrix.forEach((e, i) => {
            var block = this.mino.blockDiv[i]
            var x = e.x
            var y = e.y
            block.style.left = (BLOCKWIDTH + INTERVAL) * (x - 1) + 'px'
            block.style.top = (BLOCKWIDTH + INTERVAL) * (y - 1) + 'px'
        })
    }
    moveDown() {
        var y = this.mino.y + 1
        var matrix = this.getMatrix(this.mino.x, y, this.mino.state)

        if (!this.board.checkCollision(matrix)) {
            this.mino.y += 1
            this.mino.matrix = this.getMatrix(this.mino.x, this.mino.y, this.mino.state)
            this.moveMino(this.mino.matrix)
            this.mino.lastMove = MOVEDOWN
            return true
        }
        else {
            this.cancelAutoDown()
            this.board.stackMino(this.mino, this.spawnMino.bind(this))
            return false
        }
    }
    hardDrop() {
        this.cancelAutoDown()
        this.moveMino(this.mino.shadowMatrix)
        this.mino.matrix = this.mino.shadowMatrix
        this.mino.lastMove = HARDDROP
        this.board.stackMino(this.mino, this.spawnMino.bind(this))
    }
    moveLeft() {
        var x = this.mino.x - 1
        var matrix = this.getMatrix(x, this.mino.y, this.mino.state)
        if (!this.board.checkCollision(matrix)) {
            this.mino.x -= 1
            this.mino.matrix = matrix
            this.moveMino(this.mino.matrix)
            this.moveShadow()
            this.mino.lastMove = MOVELEFT
        }
    }
    moveRight() {
        var x = this.mino.x + 1
        var matrix = this.getMatrix(x, this.mino.y, this.mino.state)
        if (!this.board.checkCollision(matrix)) {
            this.mino.x += 1
            this.mino.matrix = matrix
            this.moveMino(this.mino.matrix)
            this.moveShadow()
            this.mino.lastMove = MOVERIGHT
        }
    }
    clockWiseRotate() {
        var state = this.mino.state < this.mino.shape.length - 1 ? this.mino.state + 1 : 0
        var wallKick = this.mino.wallKick[this.mino.state + 'to' + state]
        for (let i = -1; i < wallKick.length; i++) {
            try {
                var x = wallKick[i].x + this.mino.x
                var y = wallKick[i].y + this.mino.y
            } catch {
                var x = this.mino.x
                var y = this.mino.y
            }
            var matrix = this.getMatrix(x, y, state)
            if (!this.board.checkCollision(matrix)) {
                this.mino.x = x
                this.mino.y = y
                this.mino.state = state
                this.mino.matrix = matrix
                this.moveMino(this.mino.matrix)
                this.moveShadow()
                this.mino.lastMove = ROTATE
                return
            }
        }
    }
    counterClockWiseRotate() {
        var state = this.mino.state > 0 ? this.mino.state - 1 : this.mino.shape.length - 1
        var wallKick = this.mino.wallKick[this.mino.state + 'to' + state]
        for (let i = -1; i < wallKick.length; i++) {
            try {
                var x = wallKick[i].x + this.mino.x
                var y = wallKick[i].y + this.mino.y
            } catch {
                var x = this.mino.x
                var y = this.mino.y
            }
            var matrix = this.getMatrix(x, y, state)
            if (!this.board.checkCollision(matrix)) {
                this.mino.x = x
                this.mino.y = y
                this.mino.state = state
                this.mino.matrix = matrix
                this.moveMino(this.mino.matrix)
                this.moveShadow()
                this.mino.lastMove = ROTATE
                return
            }
        }
    }
    holdMino() {
        if (this.mino.isHolded) {
            return
        }
        var holdedMinoNumber = this.holder.changeHold(this.mino.minoNumber)
        this.board.removeMino(this.mino.blockDiv)
        this.board.removeShadow(this.mino.shadowDiv)
        this.cancelAutoDown()
        if (holdedMinoNumber != undefined) {
            this.spawnMino(holdedMinoNumber)
        }
        else {
            this.spawnMino()
        }
        this.mino.isHolded = true
    }
    startAutoDown() {
        this.downId = setInterval(this.moveDown.bind(this), this.levelSystem.getDelay())
    }
    cancelAutoDown() {
        clearInterval(this.downId)
    }
}
