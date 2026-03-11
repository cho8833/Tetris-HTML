class ConfigurationPainter {
    constructor() { }
    drawMino(number, color) {
        var canvas = document.createElement('canvas')
        canvas.width = 100
        canvas.height = 50
        var ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, 100, 100)
        var mino = MINOOFFSET[number]
        ctx.fillStyle = color
        mino.shape[0].forEach((e, i) => {
            e.forEach((f, k) => {
                if (f) {
                    ctx.fillRect((1 + k) * (SMALLWIDTH + 1), i * (SMALLWIDTH + 1), SMALLWIDTH, SMALLWIDTH)
                }
            })
        })
        return canvas
    }
}
