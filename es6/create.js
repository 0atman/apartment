/* global define game Phaser */
//TODO:
define({
  create: function () {
    var text, player, monthNames, calendar, term, moveToTerm, termPopup
    var closeTerm, playerTween, monthText, getFixedDate, getFixedMonth
    game.input.keyboard.addCallbacks(this, null, null, function (char) {
      text.text = text.text + char
    })
    game.add.sprite(0, 0, 'apartment')
    player = game.add.sprite(1048, 368, 'player')
    game.physics.enable(player, Phaser.Physics.ARCADE)

    var termData = [
      '00000000',
      '00000000',
      '00000000',
      '20000000',
      '02000000',
      '00200000',
      '02000000',
      '20002222'
    ]
    game.create.texture('term', termData, 4, 4, 0)

    game.create.texture(
      'calendar',
      [
        '000000000000000',
        '09090909090E0E0',
        '000000000000000',
        '09090909090E0E0',
        '000000000000000',
        '09090909090E0E0',
        '000000000000000',
        '09090909090E0E0',
        '000000000000000',
        '0E0E09999999990',
        '000000000000000'
      ],
      32,
      32,
      0
    )
    monthNames = [
      'Zeus',
      'Hera',
      'Poseidon',
      'Demeter',
      'Athena',
      'Apollo',
      'Artemis',
      'Ares',
      'Aphrodite',
      'Hephaestus',
      'Hermes',
      'Hestia',
      'Dionysus'
    ]
    calendar = game.add.sprite(332, 232, 'calendar')
    calendar.alpha = 0.8
    term = game.add.button(1200, 200, 'term', moveToTerm, this, 2, 1, 0)
    term.alpha = 0.5
    term.anchor.set(0.5)
    term.inputEnabled = true
    term.input.useHandCursor = true

    termPopup = game.add.sprite(game.world.centerX, game.world.centerY, 'termPopup')
    termPopup.alpha = 1
    termPopup.anchor.set(0.5)
    termPopup.inputEnabled = true
    termPopup.scale.set(0)
    termPopup.events.onInputDown.add(closeTerm, this)

    playerTween = game.add.tween(player)

    text = game.add.bitmapText(650, 310, 'gem', 'DISCONNECTED', 32)
    text.visible = false

    monthText = game.add.bitmapText(
      160,
      288,
      'gem',
      getFixedDate() + ' ' +
      monthNames[getFixedMonth()] + ' ' +
      (new Date()).getFullYear(),
      32
    )

    calendar.addChild(monthText)

    function getX () {
      var x = getFixedDate() - (Math.ceil((getFixedDate() / 7) - 1) * 7)
      return x * 64 - 32
    }

    function getY () {
      var y = Math.ceil(getFixedDate() / 7)
      return y * 64 - 32
    }

    game.create.texture('calToday', ['3'], 32, 32, 0)

    calendar.addChild(
        game.add.sprite(
          getX(),
          getY(),
          'calToday'
        )
    )
    calendar.addChild(
        game.add.bitmapText(
          32,
          32,
          'gem',
          '01  02  03  04  05  06  07' + '\n\n' +
          '08  09  10  11  12  13  14' + '\n\n' +
          '15  16  17  18  19  20  21' + '\n\n' +
          '22  23  24  25  26  27  28' + '\n\n' +
          'NY  LD',
          32
        )
      )
  }
})
