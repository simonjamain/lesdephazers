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


    pointerMove = (pointer) => {
        // console.log('pointer.x', pointer.x)
    }
}