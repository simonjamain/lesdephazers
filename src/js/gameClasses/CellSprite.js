import { Scene, Input, GameObjects } from 'phaser';

class CellSprite extends GameObjects.Rectangle {
	constructor(cell) {
		super(cell.scene, cell.x, cell.y, cell.side, cell.side);

		this.cell = cell;

		this.setInteractive({ useHandCursor: true });
		cell.scene.add.existing(this);

		this.init();

		this.on('pointerdown', (pointer) => {
			if (pointer.rightButtonDown()) {
				this.cell.exNihilo.doAction('action2', this.cell.row, this.cell.col);
			}
			else if (pointer.leftButtonDown()) {
				this.cell.exNihilo.doAction('action1', this.cell.row, this.cell.col);
			}
		}, this);
	}

	init = () => {
		if(this.cell.exNihilo.drawEvents){
			this.updateColor()
		}
	}

	updateColor(){
		this.setFillStyle(this.cell.color, 1);
		this.setStrokeStyle(1, 0x000000);
	}


}

export default CellSprite;