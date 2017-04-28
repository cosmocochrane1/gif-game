
function createAsteroids() {
    const s = 80 / 2
    for (var y = 0; y < 4; y++){
        for (var x = 0; x < 8 * 2; x++){
            const enemy = new Enemy(game, x * s, y * s, 'asteroid')
            asteroids.add(enemy)
        }
    }
}


let dir = 1
function updateAsteroids() {
  const s = 48
  let changed = false
  asteroids.forEach(function(asteroid) {
    if (asteroid.x <= 0) {
      dir = 1
      changed = true
    }
    if (asteroid.x >= (game.world.width)) {
      dir = -1
      changed = true
    }
  })
  asteroids.forEach(function(asteroid) {
    asteroid.x += dir * 4
    if (changed) {
      asteroid.y += s
    }
  })
}

function update_score(){

    console.log(asteroids.countDead());
    console.log(asteroids.countLiving());

    if(asteroids.countLiving()){
        currentScore += 1;
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
    game.load.image('particle', 'img/particle.png')
    game.load.image('asteroid', 'giphy-2.gif')
    game.load.image('background', 'background.png')

    game.load.spritesheet('kaboom', 'sample.jpg', 64, 64);

    var explosions;
    game.load.image('bullet', 'img/bullet.png')
    game.load.image('asteroid', 'giphy-2.gif')
    game.load.audio('pew1', "pew1.wav");
    game.load.audio('pew2', "pew2.wav");
    game.load.audio('boom', "boom.wav");
  },
  create: function() {

    game.add.tileSprite(0, 0, game.width, game.height, 'background'); 

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(true)

    asteroids = game.add.group()
    // asteroids.enableBody = true
    // asteroids.physicsBodyType = Phaser.Physics.ARCADE
    
    bullets = game.add.group()

    // delay bullets
    cooldown = 0

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(100, 'kaboom');
    explosions.forEach(setupInvader, this);

    // create spaceship
    const x = this.world.centerX
    const y = this.world.height - 50
    const ship = game.add.sprite(x, y, 'ship')
    game.physics.arcade.enable([ship], Phaser.Physics.ARCADE)
    ship.anchor.setTo(0.5, 0.5)
    ship.scale.setTo(0.4, 0.4)

    //ship.body.scale.setTo(1,1)
    //ship.angle += 180
    
    game.ship = ship

    // define world boundaries
    game.world.setBounds(0, 0, this.world.width, this.world.height)

    // enable physics
    currentScore = 0;

    game.physics.arcade.collide(ship, asteroids);
    var text = game.add.text(130, 10, "0");
    var score = game.add.text(10, 10, "SCORE:");
    text.addColor("#ff0000", 0); //red
    score.addColor("#ff0000", 0); //red

    game.myText = text

    createAsteroids()

    // "body" only exists after you enable physics
    ship.body.collideWorldBounds = true

    //score text 

     },
  update: function() {
    const cursors = game.input.keyboard.createCursorKeys();
    const SPEED = 1200;

    // alert(asteroids.countLiving())


    //text
    game.myText.text = currentScore;

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
        const y = game.ship.y - 16
        const bullet = new Bullet(game, x, y, 'bullet')
        game.add.existing(bullet)
        // add to bullet group
        bullets.add(bullet)
        // schedule the next cooldown
        cooldown = game.time.now + 250
      }
    }
    // slow down gradually
    game.ship.body.velocity.x /= 2
    updateAsteroids()
  },
  render: function() {
    //bullets.forEach((b) => {
    // game.debug.body(b)
    //})
    //asteroids.forEach((b) => {
    // game.debug.body(b)
    //})
    //game.debug.body(asteroids)

  }
}

const game = new Phaser.Game(
  1200,
  800,
  Phaser.AUTO,
  'game',
  state
)
