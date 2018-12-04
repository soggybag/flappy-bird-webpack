import { Scene } from 'phaser'

class Preload extends Scene {
    constructor() {
        super({ key: 'preload'})
    }

    preload() {
        this.load.image('bird', 'assets/bird.png')
		this.load.image('pipe', 'assets/pipe.png')
        this.load.audio('jump', 'assets/jump.wav')
        this.load.image('sky', 'assets/sky.png')
    }

    create() {
        const sky = this.add.image(0, 0, 'sky')
        sky.setOrigin(0, 0)

        const name = this.add.text(100, 200, 'Bappy \nFlird', {
            fontSize: 36,
            color: '#11ee44'
        })

        this.input.on('pointerdown', () => {
            this.scene.start('game')
        })
    }
}

export default Preload