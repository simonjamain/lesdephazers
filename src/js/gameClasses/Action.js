export default class Action
{
    constructor(action, player, i, j)
    {
        this.action = action;
        this.playerColor = player.color;
        this.i = i;
        this.j = j;
    }
}