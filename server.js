const express = require("express");
const uuid = require("uuid");
const server = express();
server.use(express.json());
server.use(express.static("public"));

//All your code goes here
let activeSessions = {};

//   ***RANDOM WORD GENERATOR***
async function randomWordGen() {
  let response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1&length=5"
  );
  let result = await response.json();
  //console.log(result[0]);
  return result[0];
}

server.get("/newgame", async (req, res) => {
  let newID = uuid.v4();
  let newGame = {
    wordToGuess: await randomWordGen(),
    guesses: [],
    wrongLetters: [],
    closeLetters: [],
    rightLetters: [],
    remainingGuesses: 6,
    gameOver: false,
  };
  activeSessions[newID] = newGame;
  res.status(201);
  res.send({ sessionID: newID });
  console.log(activeSessions);
});

server.get("/gamestate", (req, res) => {
  let sessionID = req.params.newID;
  let gameState = {
    wordToGuess: randomWordGen(),
    guesses: [],
  };
  res.status(200);
});

//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports
module.exports = server;
