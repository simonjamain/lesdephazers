// import { Scene, Input, GameObjects } from 'phaser';
import CellSprite from './CellSprite';

export default class Cell {
	constructor(exNihilo, scene, action1, action2) {

		this.exNihilo = exNihilo;
		// this.x = x;
		// this.y = y;
		this.action1 = action1;
		this.action2 = action2;

		this.player = null;

		this.cellSprite = new CellSprite(scene, this, x, y, this.player?.color);
	}

	iterate = () => {

	}


}