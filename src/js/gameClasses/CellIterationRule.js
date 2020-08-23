import Player from './Player';
export default class CellIterationRule {
    constructor(exNihilo) {
        this.exNihilo = exNihilo;
    }

    getNeihborhood = (cell) => {
        let nbNeihbor = 0;
        let counter = [
            {
                player: { color: null }
            }
        ];

        if (typeof (this.exNihilo.cells[cell.col - 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col - 1][cell.row].player !== null &&
            !this.exNihilo.cells[cell.col - 1][cell.row].special) {
            nbNeihbor += 1;
            counter.push({
                player: this.exNihilo.cells[cell.col - 1][cell.row].player,
                count: 1
            });
        }

        if (typeof (this.exNihilo.cells[cell.col][cell.row + 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col][cell.row + 1].player !== null &&
            !this.exNihilo.cells[cell.col][cell.row + 1].special) {
            nbNeihbor += 1;
            counter.forEach(m => {
                if (m.player.color === this.exNihilo.cells[cell.col][cell.row + 1].player.color)
                    m.count += 1;
                else
                    counter.push({
                        player: this.exNihilo.cells[cell.col][cell.row + 1].player,
                        count: 1
                    });
            })
        }

        if (typeof (this.exNihilo.cells[cell.col + 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col + 1][cell.row].player !== null &&
            !this.exNihilo.cells[cell.col + 1][cell.row].special) {
            nbNeihbor += 1;
            counter.forEach(m => {
                if (m.player.color === this.exNihilo.cells[cell.col + 1][cell.row].player.color)
                    m.count += 1
                else
                    counter.push({
                        player: this.exNihilo.cells[cell.col + 1][cell.row].player,
                        count: 1
                    });
            })
        }

        if (typeof (this.exNihilo.cells[cell.col][cell.row - 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col][cell.row - 1].player !== null &&
            !this.exNihilo.cells[cell.col][cell.row - 1].special) {
            nbNeihbor += 1;
            counter.forEach(m => {
                if (m.player.color === this.exNihilo.cells[cell.col][cell.row - 1].player.color)
                    m.count += 1;
                else
                    counter.push({
                        player: this.exNihilo.cells[cell.col][cell.row - 1].player,
                        count: 1
                    });
            })
        }

        if (typeof (this.exNihilo.cells[cell.col - 1]) !== 'undefined' &&
            typeof (this.exNihilo.cells[cell.col - 1][cell.row - 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col - 1][cell.row - 1].player !== null &&
            !this.exNihilo.cells[cell.col - 1][cell.row - 1].special) {
            nbNeihbor += 1;
            counter.forEach(m => {
                if (m.player.color === this.exNihilo.cells[cell.col - 1][cell.row - 1].player.color)
                    m.count += 1;
                else
                    counter.push({
                        player: this.exNihilo.cells[cell.col - 1][cell.row - 1].player,
                        count: 1
                    });
            })
        }

        if (typeof (this.exNihilo.cells[cell.col + 1]) !== 'undefined' &&
            typeof (this.exNihilo.cells[cell.col + 1][cell.row - 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col + 1][cell.row - 1].player !== null &&
            !this.exNihilo.cells[cell.col + 1][cell.row - 1].special) {
            nbNeihbor += 1;
            counter.forEach(m => {
                if (m.player.color === this.exNihilo.cells[cell.col + 1][cell.row - 1].player.color)
                    m.count += 1;
                else
                    counter.push({
                        player: this.exNihilo.cells[cell.col + 1][cell.row - 1].player,
                        count: 1
                    });
            })
        }

        if (typeof (this.exNihilo.cells[cell.col + 1]) !== 'undefined' &&
            typeof (this.exNihilo.cells[cell.col + 1][cell.row + 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col + 1][cell.row + 1].player !== null &&
            !this.exNihilo.cells[cell.col + 1][cell.row + 1].special) {
            nbNeihbor += 1;
            counter.forEach(m => {
                if (m.player.color === this.exNihilo.cells[cell.col + 1][cell.row + 1].player.color)
                    m.count += 1;
                else
                    counter.push({
                        player: this.exNihilo.cells[cell.col + 1][cell.row + 1].player,
                        count: 1
                    });
            })
        }

        if (typeof (this.exNihilo.cells[cell.col - 1]) !== 'undefined' &&
            typeof (this.exNihilo.cells[cell.col - 1][cell.row + 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col - 1][cell.row + 1].player !== null &&
            !this.exNihilo.cells[cell.col - 1][cell.row + 1].special) {
            nbNeihbor += 1;
            counter.forEach(m => {
                if (m.player.color === this.exNihilo.cells[cell.col - 1][cell.row + 1].player.color)
                    m.count += 1;
                else
                    counter.push({
                        player: this.exNihilo.cells[cell.col - 1][cell.row + 1].player,
                        count: 1
                    });
            })
        }
        return {nbNeihbor: nbNeihbor, counter: counter};
    }

    bonuxify = (cell, rand = Math.random()) => {
        if (Math.random() < 0.00005 + this.exNihilo.players.length / 100000)
        {
            cell.futurPlayer = new Player(this.exNihilo, 0x010101);
            cell.special = true;
            cell.rand = rand;
            cell.action1 = this.exNihilo.cellActionRule['random'];
            cell.action2 = cell.action1;
            console.log('bonux');
        }
    }

    basic = (cell) => {
        const {nbNeihbor, counter} = this.getNeihborhood(cell);

        if (counter.length > 0)
            counter.map(m => {
                if (cell.futurPlayer === null) {
                    if (((cell.player === null && m.count >= 3) ||
                        (cell.player !== null && m.count >= 2) &&
                        nbNeihbor < 4))
                        cell.futurPlayer = m.player;
                    if (cell.player !== null && m.count <= 1)
                        cell.futurPlayer = null;
                }
            });
        else
            cell.futurPlayer = null;
    }

    surprise = (cell) => {
        if (cell.special)
        {
            cell.futurPlayer = cell.player;
            return;
        }
        const {nbNeihbor, counter} = this.getNeihborhood(cell);

        if (counter.length > 0)
            counter.map(m => {
                if (cell.futurPlayer === null) {
                    if (((cell.player === null && m.count >= 3) ||
                        (cell.player !== null && m.count >= 2) &&
                        nbNeihbor < 4))
                        cell.futurPlayer = m.player;
                    if (cell.player !== null && m.count <= 1)
                        cell.futurPlayer = null;
                }
            });
        else
            cell.futurPlayer = null;
        this.bonuxify(cell);
    }
}