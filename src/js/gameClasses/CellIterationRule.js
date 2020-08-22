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
                counter = counter.map(m => {
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
                counter = counter.map(m => {
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
                counter = counter.map(m => {
                    if (m.player.color === this.exNihilo.cells[cell.col][cell.row - 1].player.color)
                        m.count += 1;
                    else
                    counter[3] = {
                        player: this.exNihilo.cells[cell.col][cell.row - 1].player,
                        count: 1
                    };
             })
            }

        if (counter.length >= 1)
            console.log(counter);
        // if(!cell.player && counter.length > 0 && counter.length < 3)
        // {
        //     console.log('multipass');
        //     counter.map(m => m.count >= 3 ? cell.setPlayer(m.player) : null);
        // }
        // else if (cell.player && counter.length !== 0)
        //     cell.setPlayer(null);
    }
}