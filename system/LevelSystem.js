class LevelSystem {
    constructor() {
        this.level = 1
        this.nextCount = 5
        this.clearCount = 0
        this.delay = 1000
        this.stage = document.getElementById('stage')
    }
    levelUp(count) {
        this.clearCount += count
        var temp = this.clearCount - this.nextCount
        this.clearCount = temp
        this.delay -= 50
        if (this.delay < MINIMUMDELAY) {
            this.delay = MINIMUMDELAY
        }
        this.nextCount += 5
        this.level += 1
    }
    checkLevelUp(count) {
        var temp = this.clearCount + count
        if (temp < this.nextCount) {
            this.clearCount = temp
            return false
        }
        else {
            return true
        }
    }
    getDelay() {
        return this.delay
    }
    getLevel() {
        return this.level
    }
}
