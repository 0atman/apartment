var Phaser
var player
var term
var termPopup
var playerTween

var game = new Phaser.Game(1880, 1050, Phaser.AUTO, 'phaser-example',
  { preload: preload, create: create, update: update })

function preload () {
  // attribution: http://630leosa.deviantart.com/art/Marvin-the-depressed-robot-141140966
  game.load.image('player', 'marvin.gif')

  // attribution: shadowrun apartment bg
  game.load.image('apartment', 'apartment.png')

  game.load.image('termPopup', 'term.png')
}

function create () {
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
  )
}

function closeTerm () {
  game.add.tween(termPopup.scale).to(
    { x: 0, y: 0 }, 200, Phaser.Easing.Exponential.In, true
  )
}