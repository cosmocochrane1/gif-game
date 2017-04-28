class Bullet extends Phaser.Sprite {
  constructor (game, x, y, key) {
    super(game, x, y, key)

    // enable physics for this bullet
    game.physics.arcade.enable([this], Phaser.Physics.ARCADE)

    // make bullets smaller
    this.scale.setTo(0.05, 0.05)
		this.body.velocity.y = -1000

    const pew1 = game.add.audio('pew1');
    const pew2 = game.add.audio('pew2');

    if (Math.random() < 0.5) {
      pew1.play()
    } else {
      pew2.play()
    }

    const emitter = game.add.emitter(0, 0, 10);
    emitter.makeParticles('particle');
		// setup options for the emitter
		emitter.lifespan = 1000;
		emitter.maxParticleSpeed = new Phaser.Point(-300, 4500*2);
		emitter.minParticleSpeed = new Phaser.Point(300, 4000*2);
		emitter.scale.setTo(2, 2)
    emitter.x = 0
    emitter.y = 0
    this.emitter = emitter
    this.addChild(emitter)
  }
  onHitAsteroid(bullet, asteroid) {

    var explosion = explosions.getFirstExists(false);
    //explosion.anchor.setTo(0.5, 0.5)
    explosion.scale.setTo(1.25, 1.25)
    explosion.play('kaboom', 10, false, true);
    explosion.reset(asteroid.body.x, asteroid.body.y);

    asteroids.remove(asteroid)
    asteroid.kill();
    update_score();
    const boom = game.add.audio('boom');
    boom.play()

		bullets.remove(bullet)
		bullet.kill()

    return true
  }
  onHitWorld(bullet, world) {
    console.log("test")
  }
  update() {
    this.emitter.emitParticle()

    if (this.body.y <= 5) {
			bullets.remove(this)
			this.kill()
      return
    }

    // collide with asteroid
    asteroids.forEach((asteroid, i) => {
      game.physics.arcade.overlap(this, asteroid, this.onHitAsteroid)
    })
  }
}
