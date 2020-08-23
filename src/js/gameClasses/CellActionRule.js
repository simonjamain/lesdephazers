export default class CellActionRule
{
    constructor(exNihilo)
    {
        this.exNihilo = exNihilo;
        this.actions = [
            'convert',
            'circleConvert',
            'neutralize',
            'neutralizeAll',
            'neutralizeAndCycle'
        ]
    }

    /**
     * Helpers
     */

    getRandomInt(min, max, rand) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(rand * (max - min +1)) + min;
    }

    /**
     * Creation
     */

    convert(player, cell, force = false)
    {
        if (force || player.getMunition())
            if (!this.player)
            {
                cell.setPlayer(player);
                player.removeMunition(force);
                cell.launchConvertionAnimation(player.color);
            }
    }

    circleConvert(player, cell, force = false)
    {
        const cells = cell.exNihilo.cells;
        if (force || player.getMunition())
        {
            let col = cell.col - 1 >= 0 ? cell.col - 1 : cell.exNihilo.nbCol - 1;
            let row = cell.row - 1 >= 0 ? cell.row - 1 : cell.exNihilo.nbRow - 1;
            if (typeof(cells[col]) !== 'undefined' &&
                typeof(cells[col][row]) !== 'undefined' &&
                !cells[col][row].player)
                    cells[col][row].setPlayer(player);
                    cell.launchConvertionAnimation(player.color);

            col = cell.col - 1 >= 0 ? cell.col - 1 : cell.exNihilo.nbCol - 1;
            row = cell.row;
            if (typeof(cells[col]) !== 'undefined' &&
                !cells[col][row].player)
                    cells[col][row].setPlayer(player);
                    cell.launchConvertionAnimation(player.color);

            col = cell.col - 1 >= 0 ? cell.col - 1 : cell.exNihilo.nbCol - 1;
            row = cell.row + 1 < cell.exNihilo.nbRow ? cell.row + 1 : 0;
            if (typeof(cells[col]) !== 'undefined' &&
                typeof(cells[col][row]) !== 'undefined' &&
                !cells[col][row].player)
                    cells[col][row].setPlayer(player);
                    cell.launchConvertionAnimation(player.color);
            
            col = cell.col;
            row = cell.row + 1 < cell.exNihilo.nbRow ? cell.row + 1 : 0;
            if (typeof(cells[col][row]) !== 'undefined' &&
                !cells[col][row].player)
                    cells[col][row].setPlayer(player);
                    cell.launchConvertionAnimation(player.color);

            col = cell.col + 1 < cell.exNihilo.nbCol ? cell.col + 1 : 0;
            row = cell.row + 1 < cell.exNihilo.nbRow ? cell.row + 1 : 0;
            if (typeof(cells[col]) !== 'undefined' &&
                typeof(cells[col][row]) !== 'undefined' &&
                !cells[col][row].player)
                    cells[col][row].setPlayer(player);
                    cell.launchConvertionAnimation(player.color);

            col = cell.col + 1 < cell.exNihilo.nbCol ? cell.col + 1 : 0;
            row = cell.row;
            if (typeof(cells[col]) !== 'undefined' &&
                !cells[col][row].player)
                    cells[col][row].setPlayer(player);
                    cell.launchConvertionAnimation(player.color);

            col = cell.col + 1 < cell.exNihilo.nbCol ? cell.col + 1 : 0;
            row = cell.row - 1 >= 0 ? cell.row - 1 : cell.exNihilo.nbRow - 1;
            if (typeof(cells[col]) !== 'undefined' &&
                typeof(cells[col][row]) !== 'undefined' &&
                !cells[col][row].player)
                    cells[col][row].setPlayer(player);
                    cell.launchConvertionAnimation(player.color);

            col = cell.col;
            row = cell.row - 1 >= 0 ? cell.row - 1 : cell.exNihilo.nbRow - 1;
            if (typeof(cells[col][row]) !== 'undefined' &&
                !cells[col][row].player)
                    cells[col][row].setPlayer(player);
                    cell.launchConvertionAnimation(player.color);

            player.removeMunition(force);
        }

    }

    /**
     * Destruction
     */

    neutralize(player, cell, force = false)
    {
        if (force || player.getMunition())
            if (cell.player && cell.player.color != player.color)
            {
                cell.setPlayer(null);
                player.removeMunition(force);
                cell.launchDestructionAnimation(cell.player.color);
            }
    }

    neutralizeAll(player, cell, force = false)
    {
        if (force || player.getMunition())
        {
            let prevPlayerColorOrCurrentPlayerColorIfEmpty = (cell.player != null) ? cell.player.color : player.color
            cell.setPlayer(null);
            player.removeMunition(force);
            cell.launchDestructionAnimation(prevPlayerColorOrCurrentPlayerColorIfEmpty);
        }
    }

    neutralizeAndCycle(player, cell, force = false)
    {
        if (force || player.getMunition() || (cell.player && player.color === cell.player.color))
        {
            let prevPlayerColorOrCurrentPlayerColorIfEmpty = (cell.player != null) ? cell.player.color : player.color;
            if (cell.player && player.color === cell.player.color)
                player.addMunition(force);
            else
                if (cell.player)
                    player.removeMunition(force);
            cell.setPlayer(null);
            cell.launchDestructionAnimation(prevPlayerColorOrCurrentPlayerColorIfEmpty);
        }
    }

    /**
     * Bonus
     */

    random = (player, cell) => {
        const rand = this.getRandomInt(1, this.actions.length, cell.rand) - 1;

        cell.setPlayer(null);
        this[this.actions[rand]](player, cell, true);
        cell.special = false;
        cell.action1 = this.exNihilo.defaultAction1;
        cell.action2 = this.exNihilo.defaultAction2;
    }
}