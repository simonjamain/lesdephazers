// import { Scene, Input, GameObjects } from 'phaser';
import CellSprite from './CellSprite';
import { gameSettings } from '../config';

export default class Cell {
	constructor(exNihilo, scene, x, y, action1, action2) {

		this.exNihilo = exNihilo;
		this.x = x;
		this.y = y;
		this.side = gameSettings.grid.cellSide;
		this.action1 = action1;
		this.action2 = action2;

		this.player = null;

		this.cellSprite = new CellSprite(scene, this, x, y, this.side, this.player?.color);
	}

	// exNihilo.doAction(action);
}