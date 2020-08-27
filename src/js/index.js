import { Game } from 'phaser';
import MainScene from './scenes/MainScene';
import GameOverScene from './scenes/GameOverScene';
import { config } from './config';

const gameConfig = {
	...config,
	scene: [MainScene, GameOverScene],
};

const game = new Game(gameConfig);

export { gameConfig };