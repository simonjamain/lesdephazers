export default class CellActionRule
{
    constructor(exNihilo)
    {
        this.exNihilo = exNihilo;
    }

    convert(player, cell, force = false)
    {
        if (force || !this.player)
            cell.player = player;
    }

    neutralize(player, cell, force = false)
    {
        if (force || cell.player.color != player.color)
            cell.player = null;
    }
}