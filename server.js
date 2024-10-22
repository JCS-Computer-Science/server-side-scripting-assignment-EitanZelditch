const express = require("express");
const uuid = require("uuid");
const server = express();
server.use(express.json());
server.use(express.static("public"));

//All your code goes here
let activeSessions = {};

server.get("/newgame", (req, res) => {
  let newID = uuid.v4();
  let newGame = {
    wordToGuess: "spike",
    guesses: [],
    wrongLetters: [],
    closeLetters: [],
    rightLetters: [],
    remainingGuesses: 6,
    gameOver: false,
  };
  activeSessions.newID = newGame;
  res.status(201);
  res.send({ sessionID: newID });
  console.log(activeSessions);
});

//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports
module.exports = server;
