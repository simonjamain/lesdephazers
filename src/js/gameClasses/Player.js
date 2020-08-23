import { Geom } from 'phaser';

export default class Player {
    constructor(exNihilo, color) {
        this.exNihilo = exNihilo;
        this.nbMunitionMax = this.exNihilo.nbMunitionMaxDefault;
        this.nbMunitionLeft = this.exNihilo.nbMunitionOnStartupDefault;
        this.color = color;
        this.nbPoints = 0;

    }

    addMunition(force = false) {
        if (force || this.nbMunitionLeft < this.nbMunitionMax)
            this.nbMunitionLeft += 1;
        // console.log(this.getMunition());
    }

    removeMunition(force = false) {
        if (force || this.nbMunitionLeft > 0)
            this.nbMunitionLeft -= 1;
        // console.log(this.getMunition());
    }

    getMunition() {
        return this.nbMunitionLeft;
    }



    // addBall = () => {

    // }

    // setCursorCircle = () => {
    //     this.munitionsGraphics = this.exNihilo.scene.add.group();
    //     this.cursorCircle = new Geom.Circle(0, 0, 50);
    //     this.graphicsCursorCircle = this.exNihilo.scene.add.graphics();
    //     this.graphicsCursorCircle.setStrokeStyle(1, this.color);
    //     this.graphicsCursorCircle.strokeCircleShape(this.cursorCircle);
    // }

    // updateCursorCircle = (e) => {
    //     this.cursorCircle.x = e.x;
    //     this.cursorCircle.y = e.y;
    // }

    // setCircles = () => {
    // for (let i = 0; i < this.nbMunitionLeft; i++) {
    // const graphics = this.exNihilo.scene.add.graphics();
    // graphics.fillStyle(this.color);
    // graphics.setStrokeStyle(1, this.color)
    // const circle = new Phaser.Geom.Circle(0, 0, 15);
    // graphics.fillCircleShape(circle);
    // graphics.strokeCircleShape(circle);

    // this.munitionsGraphics.push();

    // }
    // }

    // createCircle = () => {
    //     for (let i = 0; i < this.nbMunitionLeft; i++) {
    //         const graphics = this.exNihilo.scene.add.graphics();
    //         graphics.fillStyle(this.color);
    //         const circle = new Phaser.Geom.Circle(500, 500, 20);
    //         graphics.fillCircleShape(circle);

    //         this.munitionsGraphics.push();

    //     }

    //     // this.exNihilo.scene.add.existing(circle);


    // }


    pointerMove = (pointer) => {
        // console.log('pointer.x', pointer.x)
    }
}