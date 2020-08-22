export default class CellIterationRule
{
    constructor(exNihilo)
    {
        this.exNihilo = exNihilo;
    }

    basic(cell)
    {
        let nbNeighbor = 0;
        
        if (typeof(this.exNihilo.cells[cell.col - 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col - 1][cell.row].player !== null)
            {
                console.log('1');
                nbNeighbor += 1;
            }
        
        if (typeof(this.exNihilo.cells[cell.col][cell.row + 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col][cell.row + 1].player !== null)
            {
                console.log('1');
                nbNeighbor += 1;
            }

        if (typeof(this.exNihilo.cells[cell.col + 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col + 1][cell.row].player !== null)
            {
                console.log('1');
                nbNeighbor += 1;
            }

        if (typeof(this.exNihilo.cells[cell.col][cell.row - 1]) !== 'undefined' &&
            this.exNihilo.cells[cell.col][cell.row - 1].player !== null)
            {
                console.log('1');
                nbNeighbor += 1;
            }

        if (nbNeighbor > 0)
            console.log(nbNeighbor);
        
        if(!cell.player && nbNeighbor >= 3)
            console.log('alive');
        if (cell.player && nbNeighbor < 2)
            console.log(die);
    }
}