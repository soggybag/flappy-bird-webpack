import Phaser from 'phaser'
import Preload from './preload'
import Game from './game'

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 270,
    height: 480,
    scene: [
        Preload,
        Game
    ]
};

var game = new Phaser.Game(config);
