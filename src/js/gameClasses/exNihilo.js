/** import Cell from ./Cell */
/** import Player from ./Player */
/** import CellIterationRule from ./CellIterationRule */
/** import FinalStateRule from ./FinalStateRule */
/** import CellActionRule from ./CellActionRule */

export class ExNihilo
{
	init(w, h)
	{
		this.cells = [];
		this.nbActionOnStartupDefault = 2;

		for (let i = 0; i < w; i++)
		{
			this.cells[i] = [];
			for (let j = 0; j < h; j ++)
				this.cells[i][j] = 'cell';
		}
		this.players = [];
		this.munitionMaxDefault = 5;
		this.finalStateRule = 'finalStateRule';
		this.iterationDuration = 30; /** seconds */
		this.elapsedTime = 0; /** seconds */

		console.log(this);
	}

	find(cell)
	{
		return {x: cell.x, y: cell.y};
	}

	iterateCells()
	{
		this.cells = this.cells.map(i => {
			i.map(j => {
				j.ierate();
			});
		});
	}

	checkFinalState()
	{
		return false;
	}
}