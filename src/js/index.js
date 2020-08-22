import { Game } from 'phaser';
import MainScene from './scenes/MainScene';
import { config } from './config';

const gameConfig = {
	...config,
	scene: [MainScene],
};

const game = new Game(gameConfig);
