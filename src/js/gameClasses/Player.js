class Player
{
    constructor(game, color)
    {
        this.game = game;
        this.nbActionMax = this.game.nbActionMaxDefault
        this.nbActionsLeft = this.game.nbActionOnStartupDefault
        this.color = color
    }
}