class HoldPainter {
    constructor() {
        this.hold = document.getElementById('hold')
        this.initialize()
    }
    initialize() {
        this.hold.width = document.querySelector('.hold-view').offsetWidth
        this.hold.height = document.querySelector('.hold-view').offsetHeight
    }
    drawHold(number) {
        var ctx = this.hold.getContext('2d')
        ctx.clearRect(0, 0, this.hold.offsetWidth, this.hold.offsetHeight)
        var mino = MINOOFFSET[number]
        ctx.fillStyle = mino.color
        mino.shape[0].forEach((e, i) => {
            e.forEach((f, k) => {
                if (f) {
                    ctx.fillRect((mino.previewX + k) * (SMALLWIDTH + 1), (mino.spawnY + i) * (SMALLWIDTH + 1) + 30, SMALLWIDTH, SMALLWIDTH)
                }
            })
        })
    }
}
