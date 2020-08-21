import { Game } from 'phaser';
import main from './scenes/main';
import { config } from './config';

const gameConfig = {
    ...config,
    scene: [main, levelOne, levelTwo, levelThree],
};

window.onload = function() {
	const game = new Phaser.Game(gameConfig);
	game.scene.start({key:'main'});
}

const levelOne = new Phaser.Scene('levelOne');

levelOne.init = function (data){console.log('tutu')};
levelOne.preload = function (){};
levelOne.create = function (data){};
levelOne.update = function (time, delta){};

const levelTwo = new Phaser.Scene('levelTwo');

levelTwo.init = function (data){console.log('titi')};
levelTwo.preload = function (){};
levelTwo.create = function (data){};
levelTwo.update = function (time, delta){};

const levelThree = new Phaser.Scene('levelThree');

levelThree.init = function (data){console.log('tata')};
levelThree.preload = function (){};
levelThree.create = function (data){};
levelThree.update = function (time, delta){};

let player;
let cursors;

