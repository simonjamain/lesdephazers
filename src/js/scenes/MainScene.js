import { Scene, Input } from 'phaser';
import { ExNihilo } from '../gameClasses/ExNihilo';


export default class MainScene extends Scene {
	constructor() {
		super({ key: 'mainScene' });

	}

	init(data) {
			const exNihilo = new ExNihilo();
				exNihilo.init({
				scene: this,
				w:10,
				h:10
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

