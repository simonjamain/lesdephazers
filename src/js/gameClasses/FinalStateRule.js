export default class FinalStateRule {
    constructor(exNihilo) {
        this.exNihilo = exNihilo;
        this.maxTime = 300;
    }

    checkState() {
        if (this.exNihilo.elapsedTime >= this.maxTime && !this.exNihilo.gameEnd) {
            this.exNihilo.gameEnd = true;
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
}