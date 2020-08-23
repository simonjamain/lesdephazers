export default class CellActionRule
{
    constructor(exNihilo)
    {
        this.exNihilo = exNihilo;
    }

    convert(player, cell, force = false)
    {
        if (force || !this.player)
        {
            console.log(this.exNihilo.scene.creationEmitter)
            console.log(cell)
            cell.setPlayer(player);
            if(this.exNihilo.drawEvents)
            {
                this.exNihilo.scene.creationEmitter.setPosition(cell.x, cell.y)
                this.exNihilo.scene.creationEmitter.active = true
                this.exNihilo.scene.creationEmitter.tint.onChange(0x00ff00)
                this.exNihilo.scene.creationEmitter.explode()
                this.exNihilo.scene.creationEmitter.explode()
                this.exNihilo.scene.creationEmitter.explode()
                this.exNihilo.scene.creationEmitter.explode()
            }
        }
    }

    neutralize(player, cell, force = false)
    {
        if (force || cell.player && cell.player.color != player.color)
        {
            cell.setPlayer(null);
            if(this.exNihilo.drawEvents)
            {
                this.exNihilo.scene.explosionEmmitter.setPosition(cell.x, cell.y)
                this.exNihilo.scene.explosionEmmitter.active = true
                this.exNihilo.scene.explosionEmmitter.explode()
                this.exNihilo.scene.explosionEmmitter.explode()
                this.exNihilo.scene.explosionEmmitter.explode()
            }
        }
    }

    neutralizeAll(player, cell, force = false)
    {
        cell.setPlayer(null);
        if(this.exNihilo.drawEvents)
        {
            this.exNihilo.scene.explosionEmmitter.setPosition(cell.x, cell.y)
            this.exNihilo.scene.explosionEmmitter.explode()
        }
    }
}