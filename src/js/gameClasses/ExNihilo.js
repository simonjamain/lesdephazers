import { gameSettings } from '../config';
import Player from './Player';
import Cell from './Cell';
import CellIterationRule from './CellIterationRule';
import CellActionRule from './CellActionRule';
import FinalStateRule from './FinalStateRule';

export class ExNihilo {
	timeElapsed = 0;

	init({ scene, w, h }) {
		this.cellActionRule = new CellActionRule(this);
		this.cellIterationRule = new CellIterationRule(this);

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
					this.cellActionRule[gameSettings.actions.action2],
					this.cellIterationRule[gameSettings.rule]
				);
		}

		this.scene = scene;
		this.nbActionOnStartupDefault = 2;
		this.player = new Player(this, 0xff0000);
		this.playerFake = new Player(this, 0x00ff00);
		this.players = [
			this.player,
			this.playerFake
		];
		this.munitionMaxDefault = 5;
		this.finalStateRule = new FinalStateRule(this);
		this.iterationDuration = 10; /** seconds */
		this.elapsedTime = 0; /** seconds */

		this.interateInterval = setInterval(() => {
			this.iterateCells();
		}, this.iterationDuration * 1000);

	}

	/**
	 * Action from server - START
	 */

	iterateCells()
	{
		this.cells.forEach(i => {
			i.forEach(j => {

				j.iterate();
			});
		});
		this.cells.forEach(col => {
			col.forEach(row => {
				row.player = row.futurPlayer;
				row.futurPlayer = null;
				row.setPlayer(row.player);
			})
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
		this.finalStateRule.checkState();

	}

	/** To server */
	/** @param action : 'action1', 'action2', etc. */

	doAction(action, x, y) {
		this.getAction(action, this.player, x, y); /** TODO : to Delete finally */
		/** To server : */
		/** Send action */
		/** Send this.player */
	}

	find(cell) {
		return { x: cell.x, y: cell.y };
	}
}