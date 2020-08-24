import { gameSettings } from '../config';
import Player from './Player';
import Cell from './Cell';
import CellIterationRule from './CellIterationRule';
import CellActionRule from './CellActionRule';
import MultiplayerServer from "./MultiplayerServer"
import Action from './Action';
import FinalStateRule from './FinalStateRule';
import InfosBoard from './InfosBoard';

export class ExNihilo {
	timeElapsed = 0;
	constructor() {
	}

	init({ scene, w, h }) {
		this.multiplayerServer = new MultiplayerServer(this, "http://vps.simonjamain.fr:3000")//Note : this has to be set early
		// this.multiplayerServer = new MultiplayerServer(this, "http://localhost:3002")//Note : this has to be set early
		this.cellActionRule = new CellActionRule(this);
		this.cellIterationRule = new CellIterationRule(this);

		this.cells = [];
		this.nbCol = w;
		this.nbRow = h;
		this.defaultAction1 = this.cellActionRule[gameSettings.actions.action1];
		this.defaultAction2 = this.cellActionRule[gameSettings.actions.action2];
		for (let i = 0; i < w; i++) {
			this.cells[i] = [];
			for (let j = 0; j < h; j++)
				this.cells[i][j] = new Cell(
					this,
					scene,
					j,
					i,
					this.defaultAction1,
					this.defaultAction2,
					this.cellIterationRule[gameSettings.rule]
				);
		}

		this.drawEvents = true;//set this to false when dequeuing history of events
		this.scene = scene;
		this.nbMunitionMaxDefault = 5;
		this.nbMunitionOnStartupDefault = 2;
		this.player = new Player(this, Math.round(Math.random() * 0xffffff));
		this.multiplayerServer.sendNewPlayer(this.player.color)
		this.players = [];
		this.players.push(this.player);

		this.startingTime = new Date();
		// this.elapsedTime = 0; /** seconds */
		this.infosBoard = new InfosBoard(this);
		this.gameEnd = false;

	}

	setFinalSateRule = () => {
		this.finalStateRule = new FinalStateRule(this);
	}

	/**
	 * Action from server - START
	 */

	iterateCells(iterationDuration) {
		this.iterationDuration = iterationDuration;
		this.infosBoard.updateGenerationBar(this.iterationDuration);

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

	}

	/**
	 * action from server
	 */
	addAmmunition() {
		this.players.forEach(player => player.addMunition());
	}

	addSpecialCell(specialCellEvent) {
		let cell = this.cells[specialCellEvent.col][specialCellEvent.row]
		this.cellIterationRule.bonuxify(cell, true, specialCellEvent.randNumber)
	}

	/** From server */
	/** @param action.action : 'action1', 'action2', etc. */
	getAction(action) {
		this.cells[action.j][action.i][action.action](this.findPlayer(action.playerColor), this.cells[action.j][action.i]);
	}

	/**
	 * Action from server - END
	 */

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
			if (player.color === playerColor) {
				playerFound = player;
			}
		}
		return playerFound;
	}

	find(cell) {
		return { x: cell.x, y: cell.y };
	}
}