import { Game } from 'phaser';
import main from './scenes/main';
import { config } from './config';
import { ExNihilo } from './gameClasses/exNihilo';

const exNihilo = new ExNihilo();
exNihilo.init(10, 10);

const gameConfig = {
    ...config,
    scene: [main],
};

window.onload = function() {
	const game = new Phaser.Game(gameConfig);
	game.scene.start({key:'main'});
}

