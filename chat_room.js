var Room = require('colyseus').Room;

class ChatRoom extends Room {

  constructor () {
    super();

    this.setState({
      players: {},
      messages: []
    });
  }

  onInit (options) {
    this.setPatchRate( 1000 / 100 );
    this.setSimulationInterval( this.update.bind(this) );
    console.log("ChatRoom created!", options);
  }

  requestJoin (options) {
    console.log("request join!", options);
    return true;
  }

  onJoin (client) {
    console.log("client joined! sessionid: " + client.sessionId + " id: " + client.id);
    //New player with session id
    this.state.players[client.sessionId] = {
      session: client.sessionId,
      id: client.id
    };

    //TODO: if master is already connected, reject connection
  }

  onMessage (client, data) {
    switch(data.action)
    {
      case "master_sync":
        data["slave_count"] = Object.keys(this.state.players).length;
        this.broadcast(data);
        break;
    }


    //let player = this.state.players[client.sessionId];

    console.log("data received: " + JSON.stringify(data)); 
    

    //console.log(data, "received from", client.sessionId, " x ", player.x);

    //this.state.messages.push(client.sessionId + " sent " + data);
    //this.state.players[client.sessionId].x += 0.01

    
  }

  update () {
    //console.log("num clients:", Object.keys(this.clients).length);
    for (var sessionId in this.state.players) {
      //this.state.players[sessionId].x += 0.0001;
    }
  }

  onLeave (client) {
    console.log("client left!", client.sessionId);
    delete this.state.players[client.sessionId];
  }

  onDispose () {
    console.log("Dispose ChatRoom");
  }
}

module.exports = ChatRoom;
