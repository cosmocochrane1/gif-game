
function createAsteroids () {
    for (var y = 0; y < 4; y++){
        for (var x = 0; x < 10; x++){
            var asteroid = asteroids.create(x * 48, y * 50, 'asteroid')
            asteroid.anchor.setTo(0.5, 0.5)
            asteroid.animations.add('fly', [ 0, 1, 2, 3 ], 20, true)
            asteroid.play('fly')
            game.physics.arcade.enable([asteroid], Phaser.Physics.ARCADE)
            asteroid.body.moves = false
        }
    }
    asteroids.x = 100
    asteroids.y = 50
}

const state = {
  init: function() { 
  },
  preload: function() {
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT
    game.load.image('ship', 'img/ship.gif')
    game.load.image('asteroid', 'asteroid-icon.png')
    game.load.image('bullet', 'img/ship.gif')
  },
  create: function() {

    asteroids = game.add.group()
    asteroids.enableBody = true
    asteroids.physicsBodyType = Phaser.Physics.ARCADE


    // create spaceship
    const x = this.world.centerX
    const y = this.world.height - 100
    const ship = game.add.sprite(x, y, 'ship')
    const b = new Bullet(game, 0, 0, 'bullet')
    const bullet = game.add.existing(b)


    ship.anchor.setTo(0.5, 0.5)
    //ship.angle += 180
    
    game.ship = ship

    // define world boundaries
    game.world.setBounds(0, 0, this.world.width, this.world.height)

    // enable physics
    game.physics.arcade.enable([ship], Phaser.Physics.ARCADE)

    game.physics.arcade.collide(ship, asteroids)

    // asteroid = game.add.sprite(0,0, 'asteroid')
    createAsteroids()

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

const game = new Phaser.Game(
  800,
  640,
  Phaser.AUTO,
  'game',
  state
)
