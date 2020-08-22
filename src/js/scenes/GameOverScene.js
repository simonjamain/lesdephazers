import { Scene } from 'phaser';

export default class GameOverScene extends Scene {
	constructor() {
		super({ key: 'gameOverScene' });

	}

	init(data) {
		this.exNihilo = data.exNihilo;
		console.log('overinit')
	}

	preload() {
		// console.log('overpreload')
		// let test = this.load.bitmapFont('pixelFont', '../../assets/fonts/font.png', '../../assets/fonts/font.xml');
		// console.log('test', test)

	}

	create() {
		for (let index = 0; index < this.exNihilo.players.length; index++) {

			const scoreMessage = this.add.text(window.innerWidth / 2, 200 + 120 * index,
				`Player ${index} : ${this.exNihilo.players[index].nbPoints} Points`,
				{
					color: `#${this.exNihilo.players[index].color.toString(16).padStart(6, '0')}`, align: 'center', fontFamily: 'cursive', fontSize: 80
				});

			scoreMessage.setPadding(20, 15);
			scoreMessage.setShadow(10, 10, '#222', 5);
			scoreMessage.x = window.innerWidth / 2 - scoreMessage.width / 2;
		}



	}

	update(time, delta) {
	}
}

