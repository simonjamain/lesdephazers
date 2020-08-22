import { Game } from 'phaser';
import MainScene from './scenes/MainScene';
import GameOverScene from './scenes/GameOverScene';
import { config } from './config';

import { ExNihilo } from './gameClasses/ExNihilo';

const gameConfig = {
	...config,
	scene: [MainScene, GameOverScene],
};

const game = new Game(gameConfig);