import { gameSettings } from '../config';
import Cell from './Cell';
/** import Player from './Player'; */
// import CellIterationRule from './CellIterationRule';
/** import FinalStateRule from './FinalStateRule'; */
import CellActionRule from './CellActionRule';
/** import CellActionRule from ./CellActionRule */
import MultiplayerServer from "./MultiplayerServer"
import Action from './Action';

export class ExNihilo {
	init({ scene, w, h }) {
		this.multiplayerServer = new MultiplayerServer(this, "http://vps.simonjamain.fr:3000")//Note : this has to be set early
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
		console.log(this.cells)

		this.nbActionOnStartupDefault = 2;
		this.player = { color: Math.round(Math.random() * 0xffffff )};
		this.multiplayerServer.sendNewPlayer(this.player.color)
		this.players = [];
		
		this.munitionMaxDefault = 5;
		this.finalStateRule = 'finalStateRule';
		this.iterationDuration = 30; /** seconds */
		this.elapsedTime = 0; /** seconds */

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
	/** @param action.action : 'action1', 'action2', etc. */
	getAction(action) {
		console.log(action)
		console.log(this)
		this.cells[action.i][action.j][action.action](this.findPlayer(action.playerColor), this.cells[action.i][action.j]);
	}

	/**
	 * Action from server - END
	 */

	checkFinalState() {
		return false;
	}

	/** To server */
	/** @param action : 'action1', 'action2', etc. */
	doAction(action, i, j) {
		this.multiplayerServer.sendNewAction(
			new Action(action, this.player, i, j)
		)
		/** To server : */
		/** Send action */
		/** Send this.player */
	}

	addPlayer(player) {
		this.players.push(player)
	}

	findPlayer(playerColor) {

		let playerFound = null;
		for (const player of this.players) {
			if(player.color === playerColor){
				playerFound = player;
			}
		}
		return playerFound;
	}

	find(cell) {
		return { x: cell.x, y: cell.y };
	}
}