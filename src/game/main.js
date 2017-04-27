/**
 *
 * This is a simple state template to use for getting a Phaser game up
 * and running quickly. Simply add your own game logic to the default
 * state object or delete it and make your own.
 *
 */

var state = {
    init: function() {
        // Delete this init block or replace with your own logic.

        // Create simple text display for current Phaser version
        var text = "Phaser Version "+Phaser.VERSION + " works!";
        var style = { font: "24px Arial", fill: "#fff", align: "center" };
        var asteroid;
        var t = game.add.text(this.world.centerX, this.world.centerY, text, style);
        t.anchor.setTo(0.5, 0.5);

    },
    preload: function() {
        // STate preload logic goes here
        game.load.image('asteroid', 'asteroid-icon.png');
       


    },

    create: function(){
      // State create logic goes here
        game.physics.startSystem(Phaser.Physics.ARCADE);

        asteroids = game.add.group();
        asteroids.enableBody = true;
        asteroids.physicsBodyType = Phaser.Physics.ARCADE;

        // asteroid = game.add.sprite(0,0, 'asteroid');
        createAsteroids();

    },

    update: function() {
        // State Update Logic goes here.
    }
};

var game = new Phaser.Game(
    800,
    480,
    Phaser.AUTO,
    'game',
    state
);


function createAsteroids () {
    for (var y = 0; y < 4; y++){
        for (var x = 0; x < 10; x++){
            var asteroid = asteroids.create(x * 48, y * 50, 'asteroid');
            asteroid.anchor.setTo(0.5, 0.5);
            asteroid.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            asteroid.play('fly');
            asteroid.body.moves = false;
        }
    }

    asteroids.x = 100;
    asteroids.y = 50;
    
}

