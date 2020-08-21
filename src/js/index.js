import { Game } from 'phaser';
import main from './scenes/main';
import { config } from './config';

const gameConfig = {
    ...config,
    scene: [main],
};

window.onload = function() {
	const game = new Phaser.Game(gameConfig);
	game.scene.start({key:'main'});
}

