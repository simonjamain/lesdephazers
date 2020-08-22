import { Game } from 'phaser';
import MainScene from './scenes/MainScene';
import { config } from './config';
import { ExNihilo } from './gameClasses/exNihilo';

const exNihilo = new ExNihilo();
exNihilo.init(10, 10);

const gameConfig = {
	...config,
	scene: [MainScene],
};


const game = new Game(gameConfig);


