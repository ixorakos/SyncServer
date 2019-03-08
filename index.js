const http = require("http");
const express = require("express");

const colyseus = require("colyseus");
const ChatRoom = require('./chat_room');

const PORT = 8081;

const app = new express();
const gameServer = new colyseus.Server({
  server: http.createServer(app)
});

// Register ChatRoom as "chat"
gameServer.register("chat", ChatRoom);

app.get("/test", function (req, res) {
  res.send("Syncserver up and running: " + process.pid);
});

// Listen on specified PORT number
gameServer.listen(PORT);

console.log("Syncserver up and running: " + process.pid + " on port: " + PORT);
