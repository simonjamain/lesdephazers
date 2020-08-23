import { Scene, GameObjects } from 'phaser';
import { gameSettings } from '../config';
export default class GameOverScene extends Scene {
	constructor() {
		super({ key: 'gameOverScene' });

	}

	init(data) {
		this.exNihilo = data.exNihilo;
	}

	preload() {

		this.load.image('crown', 'assets/images/crown.png');

	}

	create() {
		const scoreBarWidth = 180;
		const scoreBarMaxHeight = 500;
		const scoreBarMinHeight = 65;
		const barsXOffset = this.exNihilo.players.length <= 4 ?
			this.exNihilo.players.length * scoreBarWidth / 2 : this.exNihilo.players.length * 4 / 2;

		const scoreMax = typeof this.exNihilo.players[0] !== undefined && this.exNihilo.players[0].nbPoints > 0 ? this.exNihilo.players[0].nbPoints : 1;

		for (let index = 0; index < this.exNihilo.players.length && index < 4; index++) {

			const scoreBarHeight = this.exNihilo.players[index].nbPoints / scoreMax * scoreBarMaxHeight + scoreBarMinHeight;
			const scoreBarMiddleX = scoreBarWidth * index + window.innerWidth / 2 - barsXOffset / 2 - scoreBarWidth / 2;

			const scoreBar = new GameObjects.Rectangle(this,
				scoreBarMiddleX,
				window.innerHeight - scoreBarHeight / 2,
				scoreBarWidth,
				scoreBarHeight,
				this.exNihilo.players[index].color, 1);

			this.add.existing(scoreBar);

			const scoreText = this.add.text(scoreBarMiddleX, window.innerHeight - scoreBarMinHeight + 10,
				`${this.exNihilo.players[index].nbPoints}`,
				{
					color: `#ffffff`, align: 'center', fontFamily: '"Open Sans"', fontSize: 40
				});
			scoreText.x = scoreBarMiddleX - scoreText.width / 2;

			if (index === 0 && this.exNihilo.players[index].nbPoints !== 0) {
				const crown = this.add.image(scoreBarMiddleX - scoreBarWidth / 2 + 5, window.innerHeight - scoreBarHeight - 15, 'crown');
				crown.setScale(.2, .2);
				crown.setAngle(-23);
			}

		}

		const board = this.add.graphics();
		board.fillStyle(this.exNihilo.player.color, .9);
		board.fillRect(0, 0, window.innerWidth, gameSettings.score.board.height);
	}



	update(time, delta) {
	}
}

