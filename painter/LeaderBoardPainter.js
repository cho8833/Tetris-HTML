class LeaderBoardPainter {
    constructor() {

    }
    drawMedal(color) {
        var canvas = document.createElement('canvas')
        canvas.width = 30
        canvas.height = 30
        var ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.strokeStyle = 'blue'
        ctx.lineWidth = 8
        ctx.moveTo(15, 15)
        ctx.lineTo(30, 0)
        ctx.stroke()
        ctx.moveTo(15, 15)
        ctx.lineTo(0, 0)
        ctx.stroke()
        ctx.moveTo(15, 15)
        ctx.fillStyle = color
        ctx.arc(15, 15, 8, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
        return canvas
    }
}
