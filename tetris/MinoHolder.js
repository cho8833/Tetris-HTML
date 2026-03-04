class MinoHolder {
    constructor() {
        this.minoNumber = undefined
        this.painter = new HoldPainter()
    }
    changeHold(number) {
        var returnValue = this.minoNumber
        this.minoNumber = number
        this.painter.drawHold(number)
        return returnValue
    }
}
