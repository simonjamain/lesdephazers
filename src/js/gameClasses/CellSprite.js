import { Scene, Input, GameObjects } from 'phaser';

class CellSprite extends GameObjects.Rectangle {
	constructor(exNihilo, scene, cell, x, y, side, color) {
		super(scene, x, y, side, side);

		this.color = color !== null ? color : 0xffffff;
		console.log('color', this.color)
		this.setFillStyle(this.color, 1);
		this.setStrokeStyle(1, 0x000000);
		this.setInteractive({ useHandCursor: true });
		scene.add.existing(this);

		this.on('pointerdown', (pointer) => {
			if (pointer.rightButtonDown()) {
				this.setFillStyle(0xff00ff, 1);
			}
			else if (pointer.leftButtonDown()) {
				this.setFillStyle(0x0000ff, 1);
			}
		}, this);

	}




}

export default CellSprite;