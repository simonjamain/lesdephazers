import { gameSettings } from '../config';
import Player from './Player';
import Cell from './Cell';
import CellIterationRule from './CellIterationRule';
import CellActionRule from './CellActionRule';
/** import CellActionRule from ./CellActionRule */
import MultiplayerServer from "./MultiplayerServer"
import Action from './Action';
import FinalStateRule from './FinalStateRule';

export class ExNihilo {
	timeElapsed = 0;

	init({ scene, w, h }) {
		this.multiplayerServer = new MultiplayerServer(this, "http://vps.simonjamain.fr:3000")//Note : this has to be set early
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
		console.log(this.cells)

		this.scene = scene;
		this.nbActionOnStartupDefault = 2;
		this.player = { color: Math.round(Math.random() * 0xffffff )};
		this.multiplayerServer.sendNewPlayer(this.player.color)
		this.players = [];
		this.players.push(this.player)

		this.munitionMaxDefault = 5;
		this.finalStateRule = new FinalStateRule(this);
		this.iterationDuration = 5; /** seconds */
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
		console.log("iteration");
	}

	/** From server */
	/** @param action.action : 'action1', 'action2', etc. */
	getAction(action) {
		console.log(action.playerColor)
		console.log(this.findPlayer(action.playerColor))

		this.cells[action.j][action.i][action.action](this.findPlayer(action.playerColor), this.cells[action.j][action.i]);
	}

	/**
	 * Action from server - END
	 */

	checkFinalState() {
		this.finalStateRule.checkState();

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