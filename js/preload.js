/* global define game */

define({
  preload: function () {
    // attribution: http://630leosa.deviantart.com/art/Marvin-the-depressed-robot-141140966
    game.load.image('player', 'marvin.gif')

    // attribution: shadowrun apartment bg
    game.load.image('apartment', 'apartment.png')

    game.load.image('termPopup', 'term.png')

    game.load.bitmapFont(
      'gem',
      'assets/fonts/gem.png',
      'assets/fonts/gem.xml'
    )
  }
})
