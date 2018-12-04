import { Scene } from 'phaser'

class Game extends Scene {
    constructor() {
        super({ 
            key: 'game',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true
                }
            }
        })
    }

    create() {
        // this.jumpSound = this.add.audio('jump'); 

        const sky = this.add.image(0, 0, 'sky')
        sky.setOrigin(0, 0)

        this.bird = this.physics.add.sprite(100, 245, 'bird')
        this.bird.setOrigin(-0.2, 0.5)
        this.bird.body.gravity.y = 1000;
        
		this.pipes = this.physics.add.group();

        // this.timer = this.time.events.loop(1500, this.addRowOfPipes, this);
        this.timer = this.time.addEvent({
            delay: 1500, 
            callback: this.addRowOfPipes,
            callbackScope: this,
            loop: true
        })

		this.score = 0;
		this.labelScore = this.add.text(20, 20, "0", {
			font: "30px Arial",
			fill: "#ffffff"
        })
        
        this.input.on('pointerdown', () => {
            this.jump()
        })
    }

    addOnePipe(x, y) {
        const pipe = this.add.sprite(x, y, 'pipe');
		this.pipes.add(pipe);
		this.physics.world.enable(pipe);
		pipe.body.velocity.x = -200;
		pipe.checkWorldBounds = true;
		pipe.outOfBoundsKill = true;
    }

    addRowOfPipes() {
        console.log('Add row of pipes')
        this.score += 1;
		this.labelScore.text = this.score;
		const hole = Math.floor(Math.random() * 5) + 1;
		for (let i = 0; i < 8; i++) {
			if (i != hole && i != hole + 1) {
                this.addOnePipe(400, i * 60 + 10);
            }
        }
    }

    update() {
        if (this.bird.angle < 20) {
            this.bird.angle += 1;
        }

		if (this.bird.y < 0 || this.bird.y > 490) {
            this.restartGame();
        }
        // FIXME: Not working!
		this.physics.overlap(this.bird, this.pipes, this.hitPipe, null, this);
    }

    jump() {
        if (this.bird.alive == false) {
            return
        }
		
        this.bird.body.velocity.y = -350;
        this.tweens.add({
            targets: this.bird,
            angle: -20,
            duration: 100
        })
		
		// this.jumpSound.play(); 
    }

    restartGame() {
        // Start the 'main' state, which restarts the game
        this.scene.start('preload');
        // TODO: Add list of random snarky game over messages
    }

    hitPipe() {
        console.log('Hit Pipe')
        if (this.bird.alive == false) {
			return
        }
		this.bird.alive = false
        this.timer.remove()
        this.pipes.setVelocityX(0)
    }

}

export default Game




// // Create our 'main' state that will contain the game
// var mainState = {
// 	preload: function () {
// 		// This function will be executed at the beginning     
// 		game.load.image('bird', 'assets/bird.png');
// 		game.load.image('pipe', 'assets/pipe.png');
// 		game.load.audio('jump', 'assets/jump.wav');
// 	},

// 	create: function () {
// 		// This function is called after the preload function     
// 		game.stage.backgroundColor = '#71c5cf';
// 		game.physics.startSystem(Phaser.Physics.ARCADE);
// 		this.bird = game.add.sprite(100, 245, 'bird');
// 		this.bird.anchor.setTo(-0.2, 0.5);
// 		game.physics.arcade.enable(this.bird);
// 		this.bird.body.gravity.y = 1000;
// 		this.pipes = game.add.group();
// 		this.jumpSound = game.add.audio('jump'); 

// 		this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

// 		this.score = 0;
// 		this.labelScore = game.add.text(20, 20, "0", {
// 			font: "30px Arial",
// 			fill: "#ffffff"
// 		});

// 		var spaceKey = game.input.keyboard.addKey(
// 			Phaser.Keyboard.SPACEBAR);
// 		spaceKey.onDown.add(this.jump, this);
// 	},

// 	addOnePipe: function (x, y) {
// 		var pipe = game.add.sprite(x, y, 'pipe');
// 		this.pipes.add(pipe);
// 		game.physics.arcade.enable(pipe);
// 		pipe.body.velocity.x = -200;
// 		pipe.checkWorldBounds = true;
// 		pipe.outOfBoundsKill = true;
// 	},

// 	addRowOfPipes: function () {
// 		this.score += 1;
// 		this.labelScore.text = this.score;
// 		var hole = Math.floor(Math.random() * 5) + 1;
// 		for (var i = 0; i < 8; i++)
// 			if (i != hole && i != hole + 1)
// 				this.addOnePipe(400, i * 60 + 10);
// 	},

// 	update: function () {
// 		if (this.bird.angle < 20)
// 			this.bird.angle += 1;

// 		if (this.bird.y < 0 || this.bird.y > 490)
// 			this.restartGame();

// 		game.physics.arcade.overlap(
// 			this.bird, this.pipes, this.hitPipe, null, this);
// 	},

// 	jump: function () {
// 		if (this.bird.alive == false)
// 			return;
		
// 		this.bird.body.velocity.y = -350;
// 		var animation = game.add.tween(this.bird);
// 		animation.to({
// 			angle: -20
// 		}, 100);
// 		animation.start();
// 		this.jumpSound.play(); 
// 	},

// 	restartGame: function () {
// 		// Start the 'main' state, which restarts the game
// 		game.state.start('main');
// 	},

// 	hitPipe: function () {
// 		if (this.bird.alive == false)
// 			return;

// 		this.bird.alive = false;
// 		game.time.events.remove(this.timer);
// 		this.pipes.forEach(function (p) {
// 			p.body.velocity.x = 0;
// 		}, this);
// 	},
// };

// var game = new Phaser.Game(400, 490);
// game.state.add('main', mainState);
// game.state.start('main');

/*

http://www.lessmilk.com/tutorial/flappy-bird-phaser-1

TODO: Refactor for better code quality
TODO: Refactor to classes that extend Phaser Classes
TODO: Add a feature 

*/
