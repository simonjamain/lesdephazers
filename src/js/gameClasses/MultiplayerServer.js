import Player from "./Player";

class MultiplayerServer {
    constructor(exNihilo, serverUrl) {
        this.exNihilo = exNihilo;
        this.socket = io(serverUrl);

        this.socket.on('newPlayer', (playerColor) => {
            //todo: do not send the new player message to myself
            if (this.exNihilo.player.color !== playerColor) {
                this.exNihilo.addPlayer(
                    new Player(this.exNihilo, playerColor)
                )
            }
        });

        this.socket.on('newAction', (action) => {
            this.exNihilo.getAction(action)
        });


        this.socket.on('allPlayers', (playerColors) => {
            this.exNihilo.players = []
            for (const playerColor of playerColors) {
                this.exNihilo.addPlayer(
                    new Player(this.exNihilo, playerColor)
                )

            }
        });
        
        this.socket.on('newAmmunition', (iterationDuration) => {
            this.exNihilo.addAmmunition();
        });

        this.socket.on('iterate', (iterationDuration) => {
            this.exNihilo.iterateCells(iterationDuration);
        });

        this.socket.on('disconnect', () => {
            // console.log('you have been disconnected');
        });

        this.socket.on('reconnect', () => {
            // console.log('you have been reconnected');
        });

        this.socket.on('reconnect_error', () => {
            // console.log('attempt to reconnect has failed');
        });
    }

    sendNewPlayer(playerColor) {
        this.socket.emit('newPlayer', playerColor)
    }

    sendNewAction(action) {
        this.socket.emit('newAction', action)
    }
}

export default MultiplayerServer