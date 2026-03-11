class PreviewPainter {
    constructor() {
        this.preview = document.getElementById('preview')
        this.initialize
    }
    initialize() {
        this.preview.width = document.querySelector('.preview-view').offsetWidth
        this.preview.height = document.querySelector('.preview-view').offsetHeight
    }
    drawPreview(stack) {
        var ctx = this.preview.getContext('2d')
        ctx.clearRect(0, 0, this.preview.offsetWidth, this.preview.offsetHeight)
        stack.forEach((number, floor) => {
            var mino = MINOOFFSET[number]
            ctx.fillStyle = mino.color
            mino.shape[0].forEach((e, i) => {
                e.forEach((f, k) => {
                    if (f) {
                        ctx.fillRect((mino.previewX + k) * (SMALLWIDTH + 1), (mino.spawnY + i) * (SMALLWIDTH + 1) + floor * 100, SMALLWIDTH, SMALLWIDTH)
                    }
                })
            })
        })
    }
}
