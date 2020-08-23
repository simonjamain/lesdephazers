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

	getCoord() {
		return {
			x: this.row * this.side + this.side / 2,
			y: this.col * this.side + this.side / 2,
		};
	}
	// exNihilo.doAction(action);

	iterate() {
		this.rule(this);
	}
}