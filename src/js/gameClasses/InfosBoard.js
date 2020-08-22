import { gameSettings } from '../config';
import { GameObjects } from 'phaser';

export default class InfoBoard {
	constructor(exNihilo) {
		this.exNihilo = exNihilo;
		this.scene = this.exNihilo.scene;
		this.generationBarWidth = 400;
		this.InitialGenerationTime = null;
		this.createGraphics();
	}

	createGraphics() {
		const board = this.scene.add.graphics();
		board.fillStyle(gameSettings.score.board.color, .9);
		board.fillRect(0, 0, window.innerWidth, gameSettings.score.board.height);

		this.generationBar = new GameObjects.Rectangle(this.scene,
			window.innerWidth / 2,
			gameSettings.score.board.height / 2,
			this.generationBarWidth, 10,
			0xf2f2f2, 1);

		// console.log('window.innerWidth / 2 - this.generationBarWidth / 2', window.innerWidth / 2 - this.generationBarWidth / 2)

		this.scene.add.existing(this.generationBar);
		// console.log('this.generationBar', this.generationBar)

		this.timeText = this.scene.add.text(window.innerWidth - 280, gameSettings.score.text.y, 'Time : ', {
			color: '#f2f2f2', align: 'center', fontFamily: 'cursive', fontSize: 40
		});

	}

	updateTime() {
		this.timeText.text = `Time : ${this.exNihilo.elapsedTime}s`;
	}

	updateGenerationBar(timeRemaining) {
		if (this.InitialGenerationTime === null)
			this.InitialGenerationTime = timeRemaining;

		const multiFactor = timeRemaining / this.InitialGenerationTime;
		this.generationBar.displayWidth = this.generationBarWidth * multiFactor;
	}


}