import { Scene, Input } from 'phaser';
import { ExNihilo } from '../gameClasses/ExNihilo';
import { gameSettings, config } from '../config';

export default class MainScene extends Scene {
	constructor() {
		super({ key: 'mainScene' });

	}

	init(data) {
			const exNihilo = new ExNihilo();
				exNihilo.init({
				scene: this,
				w:gameSettings.grid.nbCell,
				h:gameSettings.grid.nbCell
			});
		console.log('saperlipopette');
	}

	preload() {

	}

	create(data) {

	}

	update(time, delta) {

	}
}

