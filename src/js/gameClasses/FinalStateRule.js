export default class FinalStateRule {
    constructor(exNihilo) {
        this.exNihilo = exNihilo;

        this.maxTime = 120;

        this.timer = this.exNihilo.scene.time.addEvent({
            delay: this.maxTime * 1000,
            callback: this.endGame,
            callbackScope: this.exNihilo.scene,
            loop: false
        });
    }

    getRemainingTime = () => {
        return Math.floor(this.maxTime - this.timer.getElapsedSeconds());
    }

    endGame = () => {
        this.exNihilo.gameEnd = true;
        this.exNihilo.scene.scene.pause('mainScene');

        this.exNihilo.cells.map(i => i.map(j => {
            if (j.player !== null)
                j.player.nbPoints++;
        }));
        // this.exNihilo.players = [...this.exNihilo.players, this.exNihilo.player];
        this.exNihilo.players.sort((a, b) => b.nbPoints - a.nbPoints);
        this.exNihilo.scene.scene.start('gameOverScene', {
            exNihilo: this.exNihilo
        });
    }
}