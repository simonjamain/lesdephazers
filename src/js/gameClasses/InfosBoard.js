import { gameSettings } from '../config';
import { GameObjects } from 'phaser';

export default class InfoBoard {
	constructor(exNihilo) {
		this.exNihilo = exNihilo;
		this.scene = this.exNihilo.scene;
		this.generationBarWidth = 400;

		this.createGraphics();
	}

	createGraphics() {
		const board = this.scene.add.graphics();
		board.fillStyle(this.exNihilo.player.color, .9);
		board.fillRect(0, 0, window.innerWidth, gameSettings.score.board.height);

		this.generationBar = new GameObjects.Rectangle(this.scene,
			window.innerWidth / 2,
			gameSettings.score.board.height / 2,
			this.generationBarWidth, 10,
			0xf2f2f2, 1);

		this.scene.add.existing(this.generationBar);

		this.timeText = this.scene.add.text(window.innerWidth - 360, gameSettings.score.text.y, 'Time : ', {
			color: '#f2f2f2', align: 'center', fontFamily: '"Open Sans"', fontSize: 40
		});

	}

	updateTime() {
		this.timeText.text = `Remaining : ${this.exNihilo.finalStateRule.maxTime - this.exNihilo.elapsedTime}s`;
	}

	updateGenerationBar(timeRemaining) {
		const tween = this.scene.tweens.add({
			targets: this.generationBar,
			displayWidth: { from: this.generationBarWidth, to: 0 },
			ease: 'Linear',
			duration: timeRemaining,
			yoyo: false,
			repeat: 0,
			callbackScope: this,
		});
	}



}