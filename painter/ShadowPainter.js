class ShadowPainter {
    constructor() {
        this.shadowOffset = document.createElement('canvas')
        this.shadowOffset.width = BLOCKWIDTH
        this.shadowOffset.height = BLOCKWIDTH
        this.initialize()
    }
    initialize() {
        var ctx = this.shadowOffset.getContext('2d')
        ctx.fillStyle = '#C0C0C0'
        ctx.fillRect(0, 0, BLOCKWIDTH, BLOCKWIDTH)
        ctx.clearRect(5, 5, BLOCKWIDTH - 10, BLOCKWIDTH - 10)
    }
    drawShadow() {
        var canvas = document.createElement('canvas')
        canvas.style.border = 0
        canvas.width = BLOCKWIDTH
        canvas.height = BLOCKWIDTH
        var ctx = canvas.getContext('2d')
        ctx.drawImage(this.shadowOffset, 0, 0, BLOCKWIDTH, BLOCKWIDTH)
        return canvas
    }
}
