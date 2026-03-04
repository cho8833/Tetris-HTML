class PopUp {
    constructor() { }
    getPopUpBase(title) {
        var background = document.createElement('div')
        background.classList.add('popup-background')
        document.body.appendChild(background)
        var popup_container = document.createElement('div')
        popup_container.classList.add('popup-container')
        background.appendChild(popup_container)
        var popup_title = document.createElement('h2')
        var popup_top = document.createElement('div')
        popup_title.innerText = title
        popup_title.classList.add('popup-title')
        popup_top.classList.add('popup-top')
        popup_top.appendChild(popup_title)
        popup_container.appendChild(popup_top)
        return background
    }
    makeConfigPopUp(storage) {
        var background = this.getPopUpBase('CONFIGURATION')
        var popup_container = background.children[0]
        var popup_content = undefined
        var keySetting_temp = copySetting(KEYSETTING)
        var minoSetting_temp = copySetting(MINOOFFSET)

        //popup head
        var change_button_container = document.createElement('div')
        change_button_container.style.display = 'flex'
        change_button_container.style.justifyContent = 'center'
        var button1 = document.createElement('button')
        button1.classList.add('config-chagne-button')
        var svg1 = document.createElementNS(XML, 'svg')
        var path1 = document.createElementNS(XML, 'path')
        path1.setAttributeNS(null, 'd', "M 2870 8230 c -370 -79 -762 -394 -1157 -930 c -776 -1054 -1451 -2859 -1653 -4415 c -44 -340 -54 -500 -54 -860 c 0 -366 10 -507 54 -755 c 135 -749 488 -1174 1043 -1256 c 264 -39 525 12 787 153 c 249 134 457 300 750 599 c 257 262 426 464 860 1029 c 139 182 295 381 347 442 l 94 113 l 2459 0 l 2459 0 l 94 -113 c 52 -61 220 -276 375 -477 c 456 -594 628 -795 918 -1080 c 246 -240 416 -374 629 -494 c 278 -156 547 -213 822 -172 c 129 19 235 52 344 107 c 679 340 915 1448 654 3064 c -210 1300 -740 2753 -1371 3764 c -204 326 -395 571 -619 797 c -265 266 -479 405 -731 476 c -79 23 -84 23 -934 26 c -830 3 -856 2 -920 -17 c -85 -26 -209 -105 -410 -261 c -181 -140 -280 -204 -357 -232 c -49 -17 -104 -18 -953 -18 c -849 0 -904 1 -953 18 c -77 28 -176 92 -357 232 c -200 155 -324 234 -408 260 c -62 19 -93 20 -896 19 c -764 0 -838 -2 -916 -19 Z m 6713 -1244 c 105 -25 197 -106 233 -208 c 20 -55 20 -161 0 -216 c -83 -232 -381 -295 -546 -116 c -65 70 -85 123 -85 224 c 0 65 5 96 21 131 c 42 90 125 159 223 185 c 60 16 84 16 154 0 Z m -6223 -491 l 0 -355 l 355 0 l 355 0 l -2 -236 l -3 -235 l -352 1 l -353 0 l -2 -357 l -3 -358 l -237 -3 l -238 -2 l 0 360 l 0 360 l -355 0 l -355 0 l 0 235 l 0 235 l 355 0 l 355 0 l 0 355 l 0 355 l 240 0 l 240 0 l 0 -355 Z m 5423 -309 c 108 -25 207 -118 237 -222 c 18 -62 9 -180 -18 -236 c -31 -63 -96 -126 -162 -157 c -80 -37 -192 -36 -271 2 c -66 32 -132 99 -162 165 c -31 66 -31 198 -1 263 c 43 92 132 165 231 188 c 55 13 81 12 146 -3 Z m 1684 -26 c 113 -56 178 -161 178 -290 c 0 -65 -5 -85 -33 -142 c -58 -119 -161 -183 -292 -183 c -132 1 -234 65 -292 183 c -28 57 -33 76 -33 142 c 1 60 6 87 27 131 c 80 174 273 243 445 159 Z m -805 -808 c 64 -31 126 -96 157 -162 c 34 -73 36 -191 4 -262 c -30 -66 -95 -133 -162 -165 c -48 -24 -68 -28 -141 -28 c -73 0 -93 4 -142 28 c -167 82 -234 293 -142 453 c 31 55 114 129 167 148 c 64 24 199 17 259 -12 Z m -4507 -1287 c 241 -51 446 -255 501 -501 c 34 -154 4 -333 -78 -472 c -52 -89 -160 -191 -253 -239 c -107 -55 -189 -76 -305 -76 c -256 -1 -480 139 -590 368 c -50 105 -64 169 -63 285 c 1 257 138 473 370 586 c 127 62 275 79 418 49 Z m 2768 0 c 137 -29 284 -121 371 -231 c 96 -122 139 -252 139 -414 c -1 -185 -66 -333 -204 -465 c -127 -121 -273 -179 -449 -178 c -177 1 -333 65 -455 188 c -123 124 -183 257 -192 425 c -7 123 13 220 69 333 c 82 164 260 303 438 341 c 85 19 199 19 283 1 Z")
        svg1.setAttributeNS(null, 'viewBox', '0 0 2048 2048')
        svg1.style.width = '35px'
        svg1.style.hegiht = '35px'
        svg1.appendChild(path1)
        button1.appendChild(svg1)
        change_button_container.appendChild(button1)
        var button2 = document.createElement('button')
        button2.classList.add('config-change-button')
        var buttonImage = document.createElement('div')
        buttonImage.style.width = '25px'
        buttonImage.style.height = '25px'
        buttonImage.style.border = '3px solid black'
        buttonImage.style.borderRadius = '5px'
        button2.appendChild(buttonImage)
        change_button_container.appendChild(button2)
        popup_container.appendChild(change_button_container)

        // popup body
        //     key Configuration
        var keySetting = () => {
            popup_content = document.createElement('div')
            popup_content.classList.add('popup-content')
            popup_container.insertBefore(popup_content, popup_container.children[2])
            var makeKeySetting = (name, key, which) => {
                var content = document.createElement('div')
                content.classList.add('popup-content-element')
                var label = document.createElement('div')
                label.innerText = name
                var buttonContainer = document.createElement('div')
                buttonContainer.classList.add('config-buttonSetting-container')
                var button = document.createElement('div')
                button.id = 'button ' + name
                button.classList.add('config-buttonSetting')
                button.innerText = key
                button.addEventListener('mouseup', () => {
                    var temp = this.makeMessagePopUp('Chnage Key')
                    var popup = temp[0]
                    var content = temp[1]
                    content.classList.add('messagePopup-content')
                    content.innerText = 'Press Key to Change ' + name + ' Button'
                    var onKeyDown = (e) => {
                        var setting = keySetting_temp.find(k => k.name == name)
                        setting.which = e.which
                        setting.key = e.code
                        button.innerText = e.code
                        document.removeEventListener('keydown', onKeyDown)
                        document.body.removeChild(popup)
                    }
                    document.addEventListener('keydown', onKeyDown)
                })
                buttonContainer.appendChild(button)
                content.append(label, buttonContainer)
                return content
            }
            var defaultButtonContainer = document.createElement('div')
            defaultButtonContainer.classList.add('popup-content-element', 'config-default-button-container')
            var defaultButton = document.createElement('button')
            defaultButton.classList.add('popup-button', 'popup-button-accept')
            defaultButton.innerText = 'Default'
            defaultButton.addEventListener('mouseup', () => {
                KEYSETTING_DEFAULT.forEach(k => {
                    keySetting_temp = KEYSETTING_DEFAULT.slice()
                    document.getElementById('button ' + k.name).innerText = k.key
                })
            })
            defaultButtonContainer.appendChild(defaultButton)
            popup_content.appendChild(defaultButtonContainer)
            keySetting_temp.forEach(k => {
                var content = makeKeySetting(k.name, k.key, k.which)
                popup_content.appendChild(content)
            })
        }

        //       Block Configuration
        var blockSetting = () => {
            var painter = new ConfigurationPainter()
            popup_content = document.createElement('div')
            popup_content.classList.add('popup-content')
            popup_container.insertBefore(popup_content, popup_container.children[2])
            var defaultButtonContainer = document.createElement('div')
            defaultButtonContainer.classList.add('popup-content-element', 'config-default-button-container')
            var defaultButton = document.createElement('button')
            defaultButton.classList.add('popup-button', 'popup-button-accept')
            defaultButton.innerText = 'Default'
            defaultButton.addEventListener('mouseup', () => {
                minoSetting_temp = copySetting(MINOOFFSET_DEFAULT)
                MINOOFFSET_DEFAULT.forEach(k => {
                    var minoBox = document.getElementById('minoBox' + k.minoNumber)
                    minoBox.removeChild(minoBox.children[0])
                    minoBox.appendChild(painter.drawMino(k.minoNumber, k.color))
                    var colorPicker = document.getElementById('colorPicker' + k.minoNumber)
                    colorPicker.value = k.color
                })
            })
            defaultButtonContainer.appendChild(defaultButton)
            popup_content.appendChild(defaultButtonContainer)
            minoSetting_temp.forEach(setting => {
                var element = document.createElement('div')
                element.classList.add('popup-content-element')
                var minoBox = document.createElement('div')
                minoBox.id = 'minoBox' + setting.minoNumber
                minoBox.appendChild(painter.drawMino(setting.minoNumber, setting.color))
                var colorPicker = document.createElement('input')
                colorPicker.id = 'colorPicker' + setting.minoNumber
                colorPicker.type = 'color'
                colorPicker.value = setting.color
                colorPicker.onchange = function () {
                    minoSetting_temp[setting.minoNumber].color = this.value
                    minoBox.removeChild(minoBox.children[0])
                    minoBox.appendChild(painter.drawMino(setting.minoNumber, this.value))
                }
                element.append(minoBox, colorPicker)
                popup_content.appendChild(element)
            })
        }

        // popup footer
        var buttonContainer = document.createElement('div')
        buttonContainer.classList.add('popup-button-container')
        var accept = document.createElement('button')
        accept.classList.add('popup-button', 'popup-button-accept')
        accept.innerText = 'CONFIRM'
        accept.addEventListener('mouseup', function () {
            document.body.removeChild(background)
            KEYSETTING = copySetting(keySetting_temp)
            KEYSETTING.forEach((setting) => {
                storage.updateKeyData(setting)
            })
            MINOOFFSET = copySetting(minoSetting_temp)
            MINOOFFSET.forEach(setting => {
                storage.updateColorData({ number: setting.minoNumber, color: setting.color })
            })
        })
        var reject = document.createElement('button')
        reject.classList.add('popup-button', 'ppopup-button-reject')
        reject.innerText = 'CANCEL'
        reject.addEventListener('mouseup', function () {
            document.body.removeChild(background)
        })
        buttonContainer.append(reject, accept)
        popup_container.appendChild(buttonContainer)
        button1.addEventListener('mouseup', () => {
            popup_container.removeChild(popup_content)
            keySetting()
        })
        button2.addEventListener('mouseup', () => {
            popup_container.removeChild(popup_content)
            blockSetting()
        })
        keySetting()
    }
    makeLeaderBoardPopUp() {
        var background = this.getPopUpBase("LEADERBOARD")
        var popup_container = background.children[0]
        var painter = new LeaderBoardPainter()
        popup_container.classList.add('popup-container-leaderBoard')

        // popup body
        for (let i = 0; i < 10; i++) {
            var rank = LEADERBOARD[i]
            var container = document.createElement('div')
            container.classList.add('leaderBoard-rank-container')
            var medal = document.createElement('div')
            medal.classList.add('leaderBoard-rank-medal')
            var score_name_box = document.createElement('div')

            var score = document.createElement('div')
            score.classList.add('leaderBoard-rank-text')
            score.style.width = '20%'
            try {
                score.innerText = rank.score
            } catch {
                score.innerText = ""
            }
            var lines = document.createElement('div')
            lines.classList.add('leaderBoard-rank-text')
            lines.style.width = '20%'
            try {
                lines.innerText = rank.lines + 'Lines'
            } catch {
                lines.innerText = ''
            }
            var name = document.createElement('div')
            name.classList.add('leaderBoard-rank-text')
            try {
                name.innerText = rank.name
            } catch {
                name.innerText = ""
            }
            switch (i) {
                case 0:
                    medal.appendChild(painter.drawMedal('gold'))
                    break
                case 1:
                    medal.appendChild(painter.drawMedal('silver'))
                    break
                case 2:
                    medal.appendChild(painter.drawMedal('brown'))
                    break
            }
            var devider = document.createElement('hr')
            devider.classList.add('devider-line')
            score_name_box.append(name, lines, score)
            score_name_box.classList.add('leaderBoard-rank-box')
            container.append(medal, score_name_box)
            if (i == 9) {
                popup_container.append(container)
                break
            }
            popup_container.append(container, devider)
        }
        // popup footer
        var buttonContainer = document.createElement('div')
        buttonContainer.classList.add('popup-button-container')
        var accept = document.createElement('button')
        accept.classList.add('popup-button', 'popup-button-accept')
        accept.innerText = 'CLOSE'
        accept.addEventListener('mouseup', function () {
            document.body.removeChild(background)
        })
        buttonContainer.appendChild(accept)
        popup_container.appendChild(buttonContainer)
    }

    makeCreditPopUp() {
        var background = this.getPopUpBase('CREDIT')
        var popup_container = background.children[0]

        // popup body
        popup_container.style.display = 'flex'
        popup_container.style.flexDirection = 'column'

        var chapter = document.createElement('label')
        chapter.classList.add('popup-chapter')
        chapter.innerText = 'Developer'
        var content = document.createElement('label')
        content.classList.add('popup-content')

        content.innerText = '\u00A0 \u00A0\u00A0' + '668th 조현빈'
        popup_container.append(chapter, content)

        // popup fotter
        var buttonContainer = document.createElement('div')
        buttonContainer.classList.add('popup-button-container')
        var accept = document.createElement('button')

        accept.classList.add('popup-button', 'popup-button-accept', 'jelly')
        accept.innerText = 'CLOSE'
        accept.addEventListener('mouseup', function () {
            document.body.removeChild(background)
        })
        buttonContainer.appendChild(accept)
        popup_container.appendChild(buttonContainer)
    }

    makeNewRecordPopup(callback, keyEvent) {
        var background = this.getPopUpBase('NEW RECORD')
        var popup_container = background.children[0]
        background.classList.add('popup-newRecord')

        // popup body
        popup_container.style.display = 'flex'
        popup_container.style.flexDirection = 'column'
        var chapter = document.createElement('label')
        chapter.classList.add('popup-chapter')
        chapter.innerText = 'Input Your Name'
        var inputBox = document.createElement('input')
        inputBox.maxLength = 20
        inputBox.classList.add('input-custom')
        popup_container.append(chapter, inputBox)
        var buttonContainer = document.createElement('div')
        buttonContainer.classList.add('popup-button-container')

        var accept = document.createElement('div')
        accept.classList.add('popup-button', 'popup-button-accept', 'jelly')
        accept.innerText = 'ACCEPT'
        accept.addEventListener('mouseup', function () {
            document.body.removeChild(background)
            document.addEventListener('keydown', keyEvent)
            callback(inputBox.value)
        })
        buttonContainer.appendChild(accept)
        popup_container.appendChild(buttonContainer)
    }
    makeMessagePopUp(messageTitle) {
        var background = document.createElement('div')
        background.classList.add('popup-background')
        document.body.appendChild(background)
        var container = document.createElement('div')
        container.classList.add('messagePopup-container')
        background.appendChild(container)
        var title = document.createElement('h1')
        title.classList.add('messagePopup-title')
        title.innerText = messageTitle
        container.appendChild(title)
        return [background, container]
    }
    makePausePopUp() {
        var temp = this.makeMessagePopUp('Pause')
        var background = temp[0]
        var container = temp[1]

        var content1 = document.createElement('div')
        content1.style.display = 'flex'
        content1.classList.add('messagePopup-content')
        container.appendChild(content1)

        var keyBox1 = document.createElement('div')
        keyBox1.classList.add('messagePopup-keyBox')
        keyBox1.innerText = 'Space'
        var action1 = document.createElement('label')
        action1.style.fontSize = '30px'
        action1.innerText = 'to Resume'
        content1.append(keyBox1, action1)

        var content2 = document.createElement('div')
        content2.style.display = 'flex'
        content2.classList.add('messagePopup-content')
        container.appendChild(content2)
        var keyBox2 = document.createElement('div')
        keyBox2.classList.add('messagePopup-keyBox')
        keyBox2.innerText = 'Esc'
        var action2 = document.createElement('label')
        action2.style.fontSize = '30px'
        action2.innerText = 'to Menu'
        content2.append(keyBox2, action2)
        container.append(content1, content2)
        return background
    }
    makeGameOverPopUp() {
        var temp = this.makeMessagePopUp('Game Over')
        var background = temp[0]
        var container = temp[1]

        var content1 = document.createElement('div')
        content1.style.display = 'flex'

        content1.classList.add('messagePopup-content')
        container.appendChild(content1)

        var keyBox1 = document.createElement('div')
        keyBox1.classList.add('messagePopup-keyBox')
        keyBox1.innerText = 'Esc'
        var action1 = document.createElement('label')
        action1.style.fontSize = '30px'
        action1.innerText = 'to Menu'
        content1.append(keyBox1, action1)
        return background
    }
}
