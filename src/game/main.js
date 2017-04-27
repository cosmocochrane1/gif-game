
function createAsteroids () {
    for (var y = 0; y < 2; y++){
        for (var x = 0; x < 4; x++){
            var asteroid = asteroids.create(x * 200, y * 200, 'asteroid');
            asteroid.anchor.setTo(0.5, 0.5);
            asteroid.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            asteroid.play('fly');
            game.physics.arcade.enable([asteroid], Phaser.Physics.ARCADE)
            asteroid.body.moves = false;
        }
    }
    asteroids.x = 100;
    asteroids.y = 100;
//to(properties, duration, ease, autoStart, delay, repeat, yoyo)
    var tween = game.add.tween(asteroids).to( { x: 170 }, 1000, Phaser.Easing.Circular.easeInOut, true, 0, 5000, true);
    tween.onLoop.add(move_down, this);
}
function move_down() {
    asteroids.y += 1;
}
function update_score(){
    if(asteroids.countLiving() <= currentCountLiving){
        currentScore += 1;
        currentCountLiving -= 1;
        console.log(currentScore);
        console.log(currentCountLiving);
    }
}

function setupInvader (invader) {
    invader.anchor.x = 0;
    invader.anchor.y = 0;
    invader.animations.add('kaboom');
}

function move_down() {
    asteroids.y += 32;
}

const state = {
  init: function() {
  },
  preload: function() {
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT
    game.load.image('ship', 'img/ship.gif')
    game.load.image('asteroid', 'giphy-2.gif')

    game.load.spritesheet('kaboom', 'sample.jpg', 500, 400);

    var explosions;
    game.load.image('bullet', 'img/bullet.png')
    game.load.image('asteroid', 'giphy-2.gif')
  },
  create: function() {

    asteroids = game.add.group();
    asteroids.enableBody = true;
    asteroids.physicsBodyType = Phaser.Physics.ARCADE;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(true)

    asteroids = game.add.group()
    asteroids.enableBody = true
    asteroids.physicsBodyType = Phaser.Physics.ARCADE
    
    bullets = game.add.group()

    // delay bullets
    cooldown = 0

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(300, 'kaboom');
    explosions.forEach(setupInvader, this);

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

    game.physics.arcade.collide(ship, asteroids)

    createAsteroids()

    // "body" only exists after you enable physics
    ship.body.collideWorldBounds = true
  },
  update: function() {
    const cursors = game.input.keyboard.createCursorKeys()
    const SPEED = 1200

    // alert(asteroids.countLiving())


    var explosion = explosions.getFirstExists(false);
    explosion.reset(50, 50);
    explosion.play('kaboom', 100, false, true);



    // controls
    if (cursors.left.isDown) {
      game.ship.body.velocity.x = -SPEED
    }
    if (cursors.right.isDown) {
      game.ship.body.velocity.x = SPEED
    }
    if (cursors.up.isDown) {

      if (game.time.now > cooldown) {
        // create a new bullet
        const x = game.ship.x
        const y = game.ship.y
        const bullet = new Bullet(game, x, y, 'bullet')
        game.add.existing(bullet)
        // add to bullet group
        bullets.add(bullet)
        // schedule the next cooldown
        cooldown = game.time.now + 150
      }
    }
    // slow down gradually
    game.ship.body.velocity.x /= 2
  },
  render: function() {
    bullets.forEach((b) => {
     game.debug.body(b)
    })
    asteroids.forEach((b) => {
     game.debug.body(b)
    })
  }
}

const game = new Phaser.Game(
  1200,
  800,
  Phaser.AUTO,
  'game',
  state
)
