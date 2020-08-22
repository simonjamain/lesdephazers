export default class CellActionRule
{
    constructor(exNihilo)
    {
        this.exNihilo = exNihilo;
    }

    convert(player, cell, force = false)
    {
        if (force || !this.player)
            cell.setPlayer(player);
    }

    neutralize(player, cell, force = false)
    {
        if (force || cell.player && cell.player.color != player.color)
            cell.setPlayer(null);
    }

    neutralizeAll(player, cell, force = false)
    {
        cell.setPlayer(null);
    }
}