import { Scene, Input, GameObjects } from 'phaser';

class CellSprite extends GameObjects.Sprite {
	constructor(scene, cell, x, y, color, scale = 1) {

		super(scene, x, y);

		this.color = color !== null ? color : '#fff'

		this.setScale(scale);
		scene.add.existing(this);

	}

}

export default CellSprite;