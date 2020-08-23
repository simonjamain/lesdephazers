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
		this.load.image('spark', 'assets/particles/white.png');
	}

	create(data) {
		
		this.creationEmitter = this.add.particles('spark').createEmitter({
            speed: { min: -100, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: 50, end: 0 },
            blendMode: 'SCREEN',
            tint: [ this.color ],
            active: false,
            lifespan: 500,
            gravityY: 0
        });

        
        this.explosionEmmitter = this.add.particles('spark').createEmitter({
            speed: { min: -600, max: 600 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'SCREEN',
            tint: [ this.color, this.color, 0x000000, 0x000000, 0x000000 ],
            active: false,
            lifespan: 500,
            gravityY: 0
        });
	}

	update(time, delta) {
		this.exNihilo.elapsedTime = Math.floor(time / 1000);
		this.exNihilo.infosBoard.updateTime();
	}
}

