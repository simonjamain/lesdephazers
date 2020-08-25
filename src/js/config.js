import { AUTO } from 'phaser';

const DEFAULT_HEIGHT = window.innerHeight;
const DEFAULT_WIDTH = window.innerWidth;

const config = {
    type: AUTO,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    pixelArt: true,
    transparent: false,
    antialias: false,
    pixelArt: true,
    failIfMajorPerformanceCaveat: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
        }
    },
    // fps: {
    //     target: 25,
    //     min: 25,
    //     forceSetTimeOut: true
    // },
    canvas: document.querySelector('canvas')
};

const gameSettings = {
    grid: {
        nbCol: 40,
        nbRow: 40,
        cellSide: 17,
    },
    actions: {
        action1: 'convert',
        action2: 'neutralizeAndCycle'
    },
    rule: 'surprise',
    player: {
        speedX: 100,
        speedY: 70,
    },
    score: {
        bombValue: {
            default: 20,
            red: 30,
            grey: 20,
        },
        board: {
            height: 70,
            color: 0x121212,
        },
        text: {
            x: 10,
            y: 10,
            fontSize: 40,
        }
    }
};

const getSizes = () => {
    return {
        width: document.querySelector('#gameContainer > canvas')?.width,
        height: document.querySelector('#gameContainer > canvas')?.height,
    };
}

export { config, gameSettings, getSizes };
