var BLOCKWIDTH = 50
var SMALLWIDTH = 20
var INTERVAL = 3
var TOPCOLLIDED = 102
var LEFTSIDECOLLIDED = 103
var RIGHTSIDECOLLIDED = 104
var BOTTOMCOLLIDED = 105
var EXIST = 106
var MINIMUMDELAY = 200
var ROTATE = 201
var MOVEDOWN = 202
var MOVELEFT = 203
var MOVERIGHT = 204
var HARDDROP = 205
var XML = "http://www.w3.org/2000/svg"
var wallKickOffset = [
    {
        '0to1': [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -2 }, { x: -1, y: -2 }],
        '1to0': [{ x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
        '1to2': [{ x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
        '2to1': [{ x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -2 }, { x: -1, y: -2 }],
        '2to3': [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }],
        '3to2': [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }],
        '3to0': [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }],
        '0to3': [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }]
    },
    {
        '0to1': [{ x: -2, y: 0 }, { x: 1, y: 0 }, { x: -2, y: -1 }, { x: 1, y: 2 }],
        '1to0': [{ x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 1 }, { x: -1, y: -2 }],
        '1to2': [{ x: -1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }],
        '2to1': [{ x: 1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: -2 }, { x: -2, y: 1 }],
        '2to3': [{ x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 1 }, { x: -1, y: -2 }],
        '3to2': [{ x: -2, y: 0 }, { x: 1, y: 0 }, { x: -2, y: -1 }, { x: 1, y: 2 }],
        '3to0': [{ x: 1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: -2 }, { x: -2, y: 1 }],
        '0to3': [{ x: -1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }]
    }
]
var scoreOffset = {
    lineClear: [100, 300, 500, 800],
    Tspin: [800, 1200, 1600],
    B2BTspin: [120, 1800, 2400],
    B2BTetris: 1200,
    Perfect: [800, 1200, 1800, 2000],
    B2BPerfectTetris: 3200
}
var CLEAR = ['Single', 'Double', 'Triple', 'Tetris']
var TSPIN = 'T-Spin'
var B2B = 'Back to Back'
var PERFECT = 'Perfect'
var LEADERBOARD = []

function copySetting(setting) {
    var copy = []
    for (let i = 0; i < setting.length; i++) {
        copy.push(Object.assign({}, setting[i]))
    }
    return copy
}

var KEYSETTING = [
    {
        name: 'Move Right',
        key: 'ArrowRigjt',
        which: 39
    },
    {
        name: 'Move Left',
        key: "ArrowLeft",
        which: 37
    },
    {
        name: 'Move Down',
        key: 'ArrowDown',
        which: 40
    },
    {
        name: 'ClockWise Rotate',
        key: 'keyX',
        which: 88
    },
    {
        name: 'CounterClockWise Rotate',
        key: 'keyZ',
        which: 90
    },
    {
        name: 'Hard Drop',
        key: 'Space',
        which: 32
    },
    {
        name: 'Hold',
        key: 'keyC',
        which: 67
    },
    {
        name: 'Pause',
        key: 'keyP',
        which: 80
    }
]
var MINOOFFSET = [
    // mino 0
    {
        spawnX: 4,
        spawnY: 1,
        previewX: 2,
        shape: [
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ]
        ],
        minoNumber: 0,
        wallKick: wallKickOffset[1],
        blockCount: 4,
        color: '#cc99ff'
    },
    // mino 1
    {
        spawnX: 5,
        spawnY: 1,
        previewX: 3,
        shape: [
            [
                [1, 1],
                [1, 1],
            ],
            [
                [1, 1],
                [1, 1],
            ],
            [
                [1, 1],
                [1, 1],
            ],
            [
                [1, 1],
                [1, 1],
            ]
        ],
        minoNumber: 1,
        wallKick: wallKickOffset[0],
        blockCount: 4,
        color: '#ffcc99'
    },
    // mino 2
    {
        spawnX: 5,
        spawnY: 1,
        previewX: 2,
        shape: [
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0]
            ]
        ],
        minoNumber: 2,
        wallKick: wallKickOffset[0],
        blockCount: 4,
        color: '#99ccff'
    },
    // mino 3
    {
        spawnX: 5,
        spawnY: 1,
        previewX: 2,
        shape: [
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1]
            ],
            [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0]
            ],
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0]
            ]
        ],
        minoNumber: 3,
        wallKick: wallKickOffset[0],
        blockCount: 4,
        color: '#ff9999',
    },
    // mino 4
    {
        spawnX: 5,
        spawnY: 1,
        previewX: 2,
        shape: [
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0]
            ]
        ],
        minoNumber: 4,
        wallKick: wallKickOffset[0],
        blockCount: 4,
        color: '#ff99cc'
    },
    // mino 5
    {
        spawnX: 5,
        spawnY: 1,
        previewX: 2,
        shape: [
            [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0]
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1]
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0]
            ]
        ],
        minoNumber: 5,
        wallKick: wallKickOffset[0],
        blockCount: 4,
        color: '#a5ec64'
    },
    // mino 6
    {
        spawnX: 5,
        spawnY: 1,
        previewX: 2,
        shape: [
            [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
            ]
        ],
        minoNumber: 6,
        wallKick: wallKickOffset[0],
        blockCount: 4,
        color: '#ccccff'
    }
]
var MINOOFFSET_DEFAULT = copySetting(MINOOFFSET)
var KEYSETTING_DEFAULT = copySetting(KEYSETTING)
