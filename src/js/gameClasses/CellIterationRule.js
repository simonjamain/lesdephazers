export default class CellIterationRule
{
    constructor(exNihilo)
    {
        this.exNihilo = exNihilo;
    }

    basic(cell)
    {
        let counter = [
            {
                player: {color: null}
            }
        ];
        
        if (typeof(this.exNihilo.cells[cell.col - 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col - 1][cell.row].player !== null)
            {
                counter.push({
                    player: this.exNihilo.cells[cell.col - 1][cell.row].player,
                    count: 1
                });
            }
        
        if (typeof(this.exNihilo.cells[cell.col][cell.row + 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col][cell.row + 1].player !== null)
            {
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

        if (typeof(this.exNihilo.cells[cell.col + 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col + 1][cell.row].player !== null)
            {
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

        if (typeof(this.exNihilo.cells[cell.col][cell.row - 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col][cell.row - 1].player !== null)
            {
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

        if (typeof(this.exNihilo.cells[cell.col - 1]) !== 'undefined' &&
            typeof(this.exNihilo.cells[cell.col - 1][cell.row - 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col - 1][cell.row - 1].player !== null)
            {
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

        if (typeof(this.exNihilo.cells[cell.col + 1]) !== 'undefined' &&
            typeof(this.exNihilo.cells[cell.col + 1][cell.row - 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col + 1][cell.row - 1].player !== null)
            {
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

        if (typeof(this.exNihilo.cells[cell.col + 1]) !== 'undefined' &&
            typeof(this.exNihilo.cells[cell.col + 1][cell.row + 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col + 1][cell.row + 1].player !== null)
            {
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

        if (typeof(this.exNihilo.cells[cell.col - 1]) !== 'undefined' &&
            typeof(this.exNihilo.cells[cell.col - 1][cell.row + 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col - 1][cell.row + 1].player !== null)
            {
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

        if(counter.length > 0)
            console.log(counter);
        if(counter.length > 0)
            counter.map(m => {
                if (cell.futurPlayer === null)
                {
                    if ((cell.player === null && m.count >= 3) || (cell.player !== null && m.count >= 2))
                    {
                        console.log(m.count);
                        cell.futurPlayer = m.player;
                    }
                    if (cell.player !== null && m.count <= 1)
                        cell.futurPlayer = null;
                }
            });
        else
            cell.futurPlayer = null;
    }
}