export default class CellIterationRule
{
    constructor(exNihilo)
    {
        this.exNihilo = exNihilo;
    }

    basic(cell)
    {
        let counter = [];
        
        if (typeof(this.exNihilo.cells[cell.col - 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col - 1][cell.row].player !== null)
            {
                counter[0] = {
                    player: this.exNihilo.cells[cell.col - 1][cell.row].player,
                    count: 1
                };
            }
        
        if (typeof(this.exNihilo.cells[cell.col][cell.row + 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col][cell.row + 1].player !== null)
            {
                counter.forEach(m => {
                    if (m.player.color === this.exNihilo.cells[cell.col][cell.row + 1].player.color)
                        m.count += 1;
                    else
                        counter[1] = {
                            player: this.exNihilo.cells[cell.col][cell.row + 1].player,
                            count: 1
                        };
                })
            }

        if (typeof(this.exNihilo.cells[cell.col + 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col + 1][cell.row].player !== null)
            {
                counter.forEach(m => {
                    if (m.player.color === this.exNihilo.cells[cell.col + 1][cell.row].player.color)
                        m.count += 1
                    else
                        counter[2] = {
                            player: this.exNihilo.cells[cell.col + 1][cell.row].player,
                            count: 1
                        };
                })
            }

        if (typeof(this.exNihilo.cells[cell.col][cell.row - 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col][cell.row - 1].player !== null)
            {
                counter.forEach(m => {
                    if (m.player.color === this.exNihilo.cells[cell.col][cell.row - 1].player.color)
                        m.count += 1;
                    else
                    counter[3] = {
                        player: this.exNihilo.cells[cell.col][cell.row - 1].player,
                        count: 1
                    };
                })
            }

        if (counter.length > 0)
            console.log(counter);
        if(counter.length > 0)
            counter.map(m => {
                if (cell.futurPlayer === null)
                {
                    if (cell.player === null && m.count >= 3)
                        cell.futurPlayer = m.player; //cell.setPlayer(m.player);
                    if (cell.player !== null && m.count <= 1)
                        cell.futurPlayer = null; //cell.setPlayer(null);
                }
            });
        else
            cell.futurPlayer = null; //cell.setPlayer(null);
    }
}