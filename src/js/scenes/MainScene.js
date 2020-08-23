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
		console.log(this.load.image('spark', 'assets/particles/white.png'));
	}

	create(data) {
		
		this.cellConvertionEmitter = this.add.particles('spark').createEmitter({
            speed: { min: -300, max: 300 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.09, end: 0 },
            blendMode: 'NORMAL',
            active: false,
            lifespan: 500,
            gravityY: 0
		});

        this.cellDestructionEmmitter = this.add.particles('spark').createEmitter({
            speed: { min: 10, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.07, end: 0 },
			blendMode: 'NORMAL',
            active: false,
            lifespan: 300,
            gravityY: 0
        });
	}

	update(time, delta) {
		this.exNihilo.elapsedTime = Math.floor(time / 1000);
		this.exNihilo.infosBoard.updateTime();
	}
}

