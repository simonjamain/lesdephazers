import { Scene, Input, GameObjects } from 'phaser';

export default class CellSprite extends GameObjects.Sprite {
	constructor(scene, cell, x, y, color, scale = 1) {

		super(scene, x, y, type);

		this.color = color !== null ? color : '#fff'

		this.setScale(scale);
		scene.add.existing(this);

	}

}