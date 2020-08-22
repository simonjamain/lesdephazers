export default class FinalStateRule {
    constructor(exNihilo) {
        this.exNihilo = exNihilo;
    }

    checkState() {
        if (this.exNihilo.elapsedTime >= 5000) {
            console.log('clear  ', clearInterval(this.exNihilo.interateInterval));

            this.exNihilo.cells.map(i => i.map(j => {
                if (j.player !== null)
                    j.player.nbPoints++;
            }));
            this.exNihilo.players.sort((a, b) => b.y - a.y);

            this.exNihilo.scene.scene.start('gameOverScene', {
                exNihilo: this.exNihilo
            });

        }
    }
}