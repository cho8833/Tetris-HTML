class Storage {
    constructor() {
        // this.db = window.openDatabase('Tetris', '1.0','', 200 * 1024 * 1024)
        this.openKeySettingTable()
        this.openColorSettingTable()
        this.openLeaderBoardTable()
    }
    openKeySettingTable = () => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS KEYSETTING (name, key, which)')
            }, [], () => {
                resolve()
            }, () => {
                reject()
            })
        })
    }
    openColorSettingTable = () => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS COLOR (number, color)')
            }, [], () => {
                resolve()
            }, () => {
                reject()
            })
        })
    }
    openLeaderBoardTable = () => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS LEADERBOARD (name, rank, lines, score)')
            }, [], () => {
                resolve()
            }, () => {
                reject()
            })
        })
    }
    insertKeyData = (setting) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('INSERT INTO KEYSETTING (name, key, which) VALUES(?, ?, ?)', [setting.name, setting.key, setting.which], (tx, result) => {
                    console.log(tx, result)
                }, (tx, result) => {
                    console.error(tx, result)
                })
            }, [], () => {
                resolve()
            }, () => {
                reject()
            })
        })
    }
    getKeyData = (name) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('SELECT * FROM KEYSETTING WHERE name=?', [name], (tx, result) => {
                    resolve(result.rows)
                }, (tx, result) => {
                    reject(tx, result)
                })
            }, [], () => {
                resolve()
            }, () => {
                reject()
            })
        })
    }
    updateKeyData = (setting) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('UPDATE KEYSETTING SET key=?, which=? WHERE name=?', [setting.key, setting.which, setting.name], (tx, result) => {
                    console.log(result)
                }, (tx, result) => {
                    console.log(result)
                })
            }, [], () => {
                resolve()
            }, () => {
                reject()
            })
        })
    }
    insertColorData = (setting) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('INSERT INTO COLOR (number, color) VALUES(?, ?)', [setting.number, setting.color], (tx, result) => {
                    console.log(result)
                }, (tx, result) => {
                    console.log(result)
                })
            }, [], () => {
                resolve()
            }, () => {
                reject()
            })
        })
    }
    updateColorData = (setting) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('UPDATE COLOR SET color=? WHERE number=?', [setting.color, setting.number], (tx, result) => {

                }, (tx, result) => {

                })
            }, [], () => {
                resolve()
            }, () => {
                reject()
            })
        })
    }
    getColorData = (number) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('SELECT * FROM COLOR WHERE number=?', [number], (tx, result) => {
                    resolve(result.rows)
                }, (tx, result) => {
                    reject(tx, result)
                })
            })
        })
    }
    getRankData = (rank) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('SELECT * FROM LEADERBOARD WHERE rank=?', [rank])
            }, [], () => {
                resolve()
            }, () => {
                reject()
            })
        })
    }
    insertRankData = (data) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('INSERT INTO LEADERBOARD (name, rank, lines, score) VALUES(?, ?, ?, ?)', [data.name, data.rank, data.lines, data.score])
            }, [], () => {
                resolve()
            }, () => {
                reject()
            })
        })
    }
    deleteAllRankData = () => {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('DELETE FROM LEADERBOARD', [])
            }, [], () => {
                resolve()
            }, () => {
                reject()
            })
        })
    }
}
