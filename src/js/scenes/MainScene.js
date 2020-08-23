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
		this.crosshairGraphics = this.add.graphics()
		document.crosshairGraphics = this.crosshairGraphics

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
		
		this.crosshairGraphics.clear()
		this.drawCrosshair()
	}

	drawCrosshair(){

		let realPlayer = this.exNihilo.findPlayer(this.exNihilo.player.color)
		var color = realPlayer.color;
		var thickness = 3;
		var alpha = 1;
		this.crosshairGraphics.lineStyle(thickness, color, alpha);
		this.crosshairGraphics.fillStyle(color, alpha);
	
		var a = new Phaser.Geom.Point(this.game.input.mousePointer.x, this.game.input.mousePointer.y);

		// outer
		this.crosshairGraphics.strokeCircle(a.x, a.y, 55);

		//inner
		this.crosshairGraphics.fillCircle(a.x, a.y, 2);

		let startingAngle = 4 * (Math.PI / 6)
		let angleInterMunition = (Math.PI / 6)
		let distance = 80

		for (let munitionIndex = 0; munitionIndex < realPlayer.nbMunitionMax; munitionIndex++) {

			let xCoord = a.x + Math.cos(startingAngle + angleInterMunition * munitionIndex) * distance
			let yCoord = a.y + Math.sin(startingAngle + angleInterMunition * munitionIndex) * distance

			if(munitionIndex < realPlayer.nbMunitionLeft)
			{
				this.crosshairGraphics.fillCircle(xCoord,yCoord,15)
			}else{
				this.crosshairGraphics.strokeCircle(xCoord,yCoord,15)
			}
		}
	}
}

