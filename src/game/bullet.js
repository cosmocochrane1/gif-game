class Bullet extends Phaser.Sprite {
  constructor (game, x, y, key) {
    super(game, x, y, key)

    // enable physics for this bullet
    game.physics.arcade.enable([this], Phaser.Physics.ARCADE)

    // make bullets smaller
    this.scale.setTo(0.1, 0.1)
    // bullets are always moving up
    this.body.velocity.y = -500
    this.body.collideWorldBounds = true
  }
  onHitAsteroid(bullet, asteroid) {

    var explosion = explosions.getFirstExists(false);
    explosion.reset(asteroid.body.x, asteroid.body.y);
    explosion.play('kaboom', 10, false, true);

    asteroids.remove(asteroid)
    asteroid.kill()

    bullets.remove(bullet)
    bullet.kill()

    return true
  }
  onHitWorld(bullet, world) {
    console.log("test")
  }
  update() {

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
