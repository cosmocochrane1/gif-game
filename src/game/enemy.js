class Enemy extends Phaser.Sprite {

	constructor (game, x, y, key) {
	    super(game, x, y, key)

	    game.physics.arcade.enable([this], Phaser.Physics.ARCADE)

        this.anchor.setTo(0.5, 0.5);

        this.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);

        this.play('fly');

        this.body.moves = false;

	}

}