/* global Phaser */

import {
  getFixedDate, getFixedMonth, getX, getY
} from './ifc.js'

let player, term, termPopup, playerTween, text, calendar, monthNames, monthText

const game = new Phaser.Game(1880, 1050, Phaser.AUTO, 'phaser-example',
  { preload: preload, create: create, update: update })

function preload () {
  game.load.image('player', 'assets/marvin.gif')
  game.load.image('apartment', 'assets/apartment.png')
  game.load.image('termPopup', 'assets/term.png')
  game.load.bitmapFont('gem', 'assets/fonts/gem.png', 'assets/fonts/gem.xml')
}

function create () {
  game.input.keyboard.addCallbacks(this, null, null, keyPress)
  game.add.sprite(0, 0, 'apartment')
  player = game.add.sprite(1048, 368, 'player')
  game.physics.enable(player, Phaser.Physics.ARCADE)

  game.create.texture(
    'term', [
      '00000000',
      '00000000',
      '00000000',
      '20000000',
      '02000000',
      '00200000',
      '02000000',
      '20002222'
    ], 4, 4, 0
  )

  game.create.texture(
    'calendar', [
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
    ], 32, 32, 0
  )
  monthNames = [
    'Zeus', 'Hera', 'Poseidon', 'Demeter', 'Athena', 'Apollo',
    'Artemis', 'Ares', 'Aphrodite', 'Hephaestus', 'Hermes', 'Hestia',
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

function update () {
  if (term.input.pointerOver()) {
    term.alpha = 1
  } else {
    term.alpha = 0.5
  }

  //  only move when you click
  if (game.input.mousePointer.isDown) {
    //  400 is the speed it will move towards the mouse
    game.physics.arcade.moveToPointer(player, 400)
    //  if it's overlapping the mouse, don't move any more
    if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)) {
      player.body.velocity.setTo(0, 0)
    }
  } else {
    player.body.velocity.setTo(0, 0)
  }
}

function moveToTerm () {
  playerTween.to({x: 1175, y: 300}, 600, Phaser.Easing.Linear.None)
  playerTween.onComplete.add(openTerm, this)
  playerTween.start()
}

function openTerm () {
  game.add.tween(termPopup.scale).to(
    { x: 1, y: 1 }, 200, Phaser.Easing.Exponential.Out, true
  ).onComplete.add(function () {
    text.visible = true
  })
}

function closeTerm () {
  game.add.tween(termPopup.scale).to(
    { x: 0, y: 0 }, 200, Phaser.Easing.Exponential.In, true
  )
  text.visible = false
}

function keyPress (char) {
  text.text = text.text + char
}
