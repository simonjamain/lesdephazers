// import { Scene, Input, GameObjects } from 'phaser';
import CellSprite from './CellSprite';
import { gameSettings } from '../config';

export default class Cell {

	constructor(exNihilo, scene, row, col, action1, action2, rule) {
		//console.log('action1', typeof action1 === undefined, typeof action2 === undefined)

		this.exNihilo = exNihilo;
		this.scene = scene;

		this.col = col;
		this.row = row;

		this.side = gameSettings.grid.cellSide;

		this.x = this.getCoord().x;
		this.y = this.getCoord().y;

		this.special = false;
		this.rand = null;
		this.action1 = action1;
		this.action2 = action2;

		this.player = null;
		this.futurPlayer = null;
		this.color = this.player?.color ? this.player.color : 0xffffff;

		this.cellSprite = new CellSprite(this);
		this.rule = rule;
	}

	setPlayer = (player) => {
		this.player = player;
		this.color = this.player?.color && this.player !== null ? this.player.color : 0xffffff;
		this.cellSprite.init();
	}

	launchConvertionAnimation(color) {
		if (this.exNihilo.drawEvents) {
			this.exNihilo.scene.cellConvertionEmitter.active = true
			this.exNihilo.scene.cellConvertionEmitter.setPosition(this.x, this.y)
			this.exNihilo.scene.cellConvertionEmitter.setTint(color)
			this.exNihilo.scene.cellConvertionEmitter.explode()
			this.exNihilo.scene.cellConvertionEmitter.explode()
			this.exNihilo.scene.cellConvertionEmitter.explode()
			this.exNihilo.scene.cellConvertionEmitter.explode()
		}
	}

	launchDestructionAnimation(color) {
		if (this.exNihilo.drawEvents) {
			this.exNihilo.scene.cellDestructionEmmitter.active = true
			this.exNihilo.scene.cellDestructionEmmitter.setPosition(this.x, this.y)
			this.exNihilo.scene.cellDestructionEmmitter.setTint(color)
			this.exNihilo.scene.cellDestructionEmmitter.explode()
			this.exNihilo.scene.cellDestructionEmmitter.explode()
			this.exNihilo.scene.cellDestructionEmmitter.explode()
		}
	}

	getCoord() {

		const gridHalfSizeX = gameSettings.grid.nbCol * this.side / 2;
		const gridHalfSizeY = gameSettings.grid.nbRow * this.side / 2;
		const offSetX = window.innerWidth / 2 - gridHalfSizeX;
		const offSetY = (window.innerHeight - gameSettings.score.board.height) / 2 - gridHalfSizeY + gameSettings.score.board.height;


		return {
			x: this.row * this.side + this.side / 2 + offSetX,
			y: this.col * this.side + this.side / 2 + offSetY,
		};
	}
	// exNihilo.doAction(action);

	iterate() {
		this.rule(this);
	}
}