export default class Player {
    constructor(exNihilo, color) {
        this.exNihilo = exNihilo;
        this.nbActionMax = this.exNihilo.nbActionMaxDefault;
        this.nbActionsLeft = this.exNihilo.nbActionOnStartupDefault;
        this.color = color;
        this.nbPoints = 0;
    }
}