import { Scene, GameObjects, BlendModes } from 'phaser';
import { gameSettings } from '../config';
import { gameConfig } from '../index';
export default class GameOverScene extends Scene {
	constructor() {
		super({ key: 'gameOverScene' });
		this.nbDisplayedWinners = 4;
	}

	init(data) {
		this.exNihilo = data.exNihilo;
		this.width = this.sys.game.config.width;
		this.height = this.sys.game.config.height;
		this.isSceneOver = false;

		this.sys.canvas.style.cursor = "auto";
	}

	preload() {

		this.load.image('crown', 'assets/images/crown.png');

	}

	create() {
		this.winningFireworkEmitter = this.add.particles('spark').createEmitter({
			speed: { min: -1200, max: 1200 },
			angle: { min: 0, max: 360 },
			scale: { start: 0.18, end: 0 },
			blendMode: 'HARD_LIGHT ',
			active: false,
			lifespan: 800,
			gravityY: 800
		});

		const scoreBarWidth = 180;
		const scoreBarMaxHeight = this.height * 2 / 3;
		const scoreBarMinHeight = 65;
		const barsXOffset = this.exNihilo.players.length <= this.nbDisplayedWinners ?
			this.exNihilo.players.length * scoreBarWidth : scoreBarWidth * this.nbDisplayedWinners;

		const scoreMax = typeof this.exNihilo.players[0] !== undefined && this.exNihilo.players[0].nbPoints > 0 ? this.exNihilo.players[0].nbPoints : 1;

		for (let index = 0; index < this.exNihilo.players.length && index < this.nbDisplayedWinners; index++) {

			const scoreBarHeight = this.exNihilo.players[index].nbPoints / scoreMax * scoreBarMaxHeight + scoreBarMinHeight;
			const scoreBarMiddleX = (index + 0.5) * scoreBarWidth - barsXOffset / 2 + this.width / 2;

			const scoreBar = new GameObjects.Rectangle(this,
				scoreBarMiddleX,
				this.height - scoreBarHeight / 2,
				scoreBarWidth,
				scoreBarHeight,
				this.exNihilo.players[index].color, 1);

			this.add.existing(scoreBar);

			const scoreText = this.add.text(scoreBarMiddleX, this.height - scoreBarMinHeight + 10,
				`${this.exNihilo.players[index].nbPoints}`,
				{
					color: `#ffffff`, align: 'center', fontFamily: '"Open Sans"', fontSize: 40
				});
			scoreText.x = scoreBarMiddleX - scoreText.width / 2;

			if (index === 0 && this.exNihilo.players[index].nbPoints !== 0) {
				const crown = this.add.image(scoreBarMiddleX - scoreBarWidth / 2 + 5, this.height - scoreBarHeight - 15, 'crown');
				crown.setScale(.2, .2);
				crown.setAngle(-23);
			}

		}

		const board = this.add.graphics();
		board.fillStyle(this.exNihilo.player.color, 1);
		board.fillRect(0, 0, this.width, gameSettings.score.board.height);

		this.createRestartButton();

		this.randFireworks();

	}

	randFireworks = () => {
		if (document.hidden || this.isSceneOver)
			return;

		const f = Math.random() * .8 + .4;
		this.launchFirework(this.getRandomCoordX(), this.getRandomCoordY(), f);

		setTimeout(this.randFireworks, Math.random() * 1000);
	}

	launchFirework(x, y, f = 1) {
		this.winningFireworkEmitter.active = true
		this.winningFireworkEmitter.setPosition(x, y)
		this.winningFireworkEmitter.setTint(this.exNihilo.players[0].color)
		this.winningFireworkEmitter.setSpeed({ min: 200, max: 400 * f });
		this.winningFireworkEmitter.setScale({ start: .15 * f, end: 0 });
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()
		this.winningFireworkEmitter.explode()


	}

	getRandomCoordX = () => {
		const x = 50 + (Math.random() * (this.width - 50));
		return x;
	}

	getRandomCoordY = () => {
		const y = 50 + (Math.random() * (this.height / 2 - 50));
		return y;
	}

	createRestartButton = () => {
		const invertColor = this.blackOrWhite(this.exNihilo.player.color);

		this.buttonText = this.add.text(0, 0, "Restart", { color: `#${invertColor}`, align: 'center', fontFamily: '"Open Sans"', fontSize: 32 });
		// this.buttonText.setShadow(2, 2, `#${invertColor}`, 1);
		this.buttonText.setPadding(7, 2, 7, 2);
		this.buttonText.setY(gameSettings.score.board.height / 2 - this.buttonText.height / 2);

		this.buttonBox = this.add.rectangle(this.buttonText.width / 2, gameSettings.score.board.height / 2, this.buttonText.width, this.buttonText.height, 0x000000, 0);
		this.buttonBox.setStrokeStyle(4, `0x${invertColor}`, 1);


		this.button = this.add.container(20, 0, [this.buttonBox, this.buttonText]);

		this.buttonBox.setInteractive();

		this.buttonBox.on('pointerdown', () => {
			this.isSceneOver = true;
			this.scene.start('mainScene')
		});

		this.buttonBox.on('pointerover', () => {
			this.sys.canvas.style.cursor = "pointer";
		})

		this.buttonBox.on('pointerout', () => {
			this.sys.canvas.style.cursor = "auto";
		})
	}

	invertDecimalToHex = (decimalColor) => {
		const hexaColor = decimalColor.toString(16);
		return (Number(`0x1${hexaColor}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
	}

	blackOrWhite = (decimalColor) => {
		const hexaColor = decimalColor.toString(16);
		const r = parseInt(hexaColor.slice(0, 2), 16),
			g = parseInt(hexaColor.slice(2, 4), 16),
			b = parseInt(hexaColor.slice(4, 6), 16);

		return (r * 0.299 + g * 0.587 + b * 0.114) > 186
			? '000000'
			: 'FFFFFF';

	}

}

