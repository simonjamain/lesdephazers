import { Scene, Input } from 'phaser';
import { ExNihilo } from '../gameClasses/ExNihilo';
import { gameSettings, config } from '../config';

export default class MainScene extends Scene {
	constructor() {
		super({ key: 'mainScene' });

	}

	init(data) {
		this.exNihilo = new ExNihilo();
		document.exNihilo = this.exNihilo;
		this.exNihilo.init({
			scene: this,
			w: gameSettings.grid.nbCol,
			h: gameSettings.grid.nbRow
		});
		this.input.mouse.disableContextMenu();
	}

	preload() {

	}

	create(data) {
	}

	update(time, delta) {
		this.exNihilo.elapsedTime = Math.floor(time / 1000);
	}
}

