import { Game } from 'phaser';
import MainScene from './scenes/MainScene';
import { config } from './config';
import { ExNihilo } from './gameClasses/ExNihilo';


const exNihilo = new ExNihilo();
document.exNihilo = exNihilo;
exNihilo.init(10, 10);

const gameConfig = {
	...config,
	scene: [MainScene],
};


const game = new Game(gameConfig);

console.log('game.scenes', game.scenes)