// import { Scene, Input, GameObjects } from 'phaser';
import CellSprite from './CellSprite';
import { gameSettings } from '../config';

export default class Cell {
	constructor(exNihilo, scene, col, row, action1, action2) {

		this.exNihilo = exNihilo;

		this.col = col;
		this.row = row;

		this.side = gameSettings.grid.cellSide;

		this.action1 = action1;
		this.action2 = action2;

		this.player = null;

		this.cellSprite = new CellSprite(this.exNihilo, scene, this, this.getCoord().x, this.getCoord().y, this.side, this.player?.color ? this.player.color : null);
	}

	getCoord() {
		return {
			x: this.row * this.side + this.side / 2,
			y: this.col * this.side + this.side / 2,
		};
	}
	// exNihilo.doAction(action);
}