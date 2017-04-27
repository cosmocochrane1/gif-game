const state = {
  init: function() {

  },
  preload: function() {
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT
    game.load.image('ship', 'img/ship.gif')
  },
  create: function() {

    // create spaceship
    const x = this.world.centerX
    const y = this.world.height - 100
    const ship = game.add.sprite(x, y, 'ship')

    ship.anchor.setTo(0.5, 0.5)
    //ship.angle += 180
    
    game.ship = ship

    // define world boundaries
    game.world.setBounds(0, 0, this.world.width, this.world.height)

    // enable physics
    game.physics.arcade.enable([ship], Phaser.Physics.ARCADE)

    // "body" only exists after you enable physics
    ship.body.collideWorldBounds = true

  },
  update: function() {
    const cursors = game.input.keyboard.createCursorKeys()
    const SPEED = 800

    // controls
    if (cursors.left.isDown) {
      game.ship.body.velocity.x = -SPEED
    }
    if (cursors.right.isDown) {
      game.ship.body.velocity.x = SPEED
    }

    // slow down gradually
    game.ship.body.velocity.x /= 1.1
  }
}

// hacky version of fullscreen
const game = new Phaser.Game(
  800,
  640,
  Phaser.AUTO,
  'game',
  state
)

