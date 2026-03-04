class MinoPreview {
    constructor() {
        this.pool = new Array()
        this.stack = new Array()
        this.painter = new PreviewPainter()
        this.fillStack()
    }
    fillPool() {
        for (let i = 0; i < MINOOFFSET.length; i++) {
            this.pool.push(i)
        }
    }
    getNumberFromPool() {
        if (!this.pool.length) {
            this.fillPool()
        }
        var index = parseInt(Math.random() * this.pool.length)
        var n = this.pool[index]
        this.pool.splice(index, 1)
        return n
    }
    fillStack() {
        if (this.stack.length < 4) {
            this.stack.push(this.getNumberFromPool())
            this.fillStack()
        }
        else {
            this.painter.drawPreview(this.stack)
        }
    }
    getMinoNumber() {
        var n = this.stack.shift()
        this.fillStack()
        return n
        //return 0
    }
}
