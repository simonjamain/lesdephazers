import { Game } from 'phaser';
import MainScene from './scenes/MainScene';
import { config } from './config';

import { ExNihilo } from './gameClasses/ExNihilo';

const gameConfig = {
	...config,
	scene: [MainScene],
};

const game = new Game(gameConfig);