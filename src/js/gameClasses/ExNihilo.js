import Cell from './Cell';
/** import Player from './Player'; */
/** import CellIterationRule from './CellIterationRule'; */
/** import FinalStateRule from './FinalStateRule'; */
/** import CellActionRule from './CellActionRule'; */

export class ExNihilo
{
	init({scene, w, h})
	{
		this.cells = [];
		this.nbActionOnStartupDefault = 2;

		for (let i = 0; i < w; i++)
		{
			this.cells[i] = [];
			for (let j = 0; j < h; j ++)
				this.cells[i][j] = new Cell(this, scene,j, i, 'convertCell', 'action2');
		}
		
		this.player = '#ff0000';
		this.playerFake = '#00ff00';
		this.players = [];
		this.munitionMaxDefault = 5;
		this.finalStateRule = 'finalStateRule';
		this.iterationDuration = 30; /** seconds */
		this.elapsedTime = 0; /** seconds */

		console.log(this);
	}

	/**
	 * Action from server - START
	 */

	iterateCells()
	{
		this.cells = this.cells.map(i => {
			i.map(j => {
				j.ierate();
			});
		});
		this.checkFinalState();
	}

	convertCell(player, x, y)
	{
		this.cells[y][x].convert(player);
	}

	neutralizeCell(x, y)
	{
		this.cells[y][x].neutralize();
	}

	/**
	 * Action from server - END
	 */

	checkFinalState()
	{
		return false;
	}

	doAction()
	{
		/** To server : */
		/** Send action */
		/** Send this.player */
	}

	find(cell)
	{
		return {x: cell.x, y: cell.y};
	}
}