import { Scene, Input } from 'phaser';
import Cell from '../gameClasses/Cell';


export default class MainScene extends Scene {
	constructor() {
		super({ key: 'mainScene' });

	}

	init(data) {
		console.log('saperlipopette');
		this.input.mouse.disableContextMenu();
	}

	preload() {

	}

	create(data) {
	}

	update(time, delta) {

	}
}

