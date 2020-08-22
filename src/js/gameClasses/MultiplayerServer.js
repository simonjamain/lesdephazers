class MultiplayerServer
{
    constructor(exNihilo, serverUrl)
    {
        this.exNihilo = exNihilo;
        this.socket = io(serverUrl)

        this.socket.on('newPlayer', function (data) {
            console.log(data);
        });

        this.socket.on('newAction', function (data) {
            console.log(data);
        });

        this.socket.on('disconnect', function () {
            console.log('you have been disconnected');
          });
        
        this.socket.on('reconnect', function () {
            console.log('you have been reconnected');
        });
        
          this.socket.on('reconnect_error', function () {
            console.log('attempt to reconnect has failed');
          });
    }

    newPlayer(player){
        this.socket.emit('newPlayer', player)
    }

    newAction(action){
        this.socket.emit('newAction', action)
    }
}

export default MultiplayerServer