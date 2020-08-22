import { gameSettings } from '../config';
import Cell from './Cell';
/** import Player from './Player'; */
// import CellIterationRule from './CellIterationRule';
/** import FinalStateRule from './FinalStateRule'; */
import CellActionRule from './CellActionRule';

export class ExNihilo {
	init({ scene, w, h }) {
		this.cellActionRule = new CellActionRule(this);

		this.cells = [];
		for (let i = 0; i < w; i++) {
			this.cells[i] = [];
			for (let j = 0; j < h; j++)
				this.cells[i][j] = new Cell(
					this,
					scene,
					j,
					i,
					this.cellActionRule[gameSettings.actions.action1],
					this.cellActionRule[gameSettings.actions.action2]
				);
		}

		this.nbActionOnStartupDefault = 2;
		this.player = { color: 0xff0000 };
		this.playerFake = { color: 0x00ff00 };
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

	iterateCells() {
		this.cells = this.cells.map(i => {
			i.map(j => {
				j.ierate();
			});
		});
		this.checkFinalState();
	}

	/** From server */
	/** @param action : 'action1', 'action2', etc. */
	getAction(action, player, x, y) {
		if (action === 'iterateCells')
			this.iterateCells()
		else
			this.cells[y][x][action](player, this.cells[y][x]);
	}

	/**
	 * Action from server - END
	 */

	checkFinalState() {
		return false;
	}

	/** To server */
	/** @param action : 'action1', 'action2', etc. */
	doAction(action, x, y) {
		getAction(action, this.player, x, y); /** TODO : to Delete finally */
		/** To server : */
		/** Send action */
		/** Send this.player */
	}

	find(cell) {
		return { x: cell.x, y: cell.y };
	}
}