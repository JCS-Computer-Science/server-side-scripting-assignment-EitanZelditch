const express = require("express");
const uuid = require("uuid");
const server = express();
server.use(express.json());
server.use(express.static("public"));

//All your code goes here
let activeSessions = {};

//   ***RANDOM WORD GENERATOR***
async function randomWordGen() {
  let response = await fetch(`https://api.datamuse.com/words?sp=?????&max=200`);

  let result = await response.json();
  //Get a random word from the apis 'list' to be able to return result at index of random result.length
  let randNum = Math.floor(Math.random() * result.length);
  //console.log(result);
  return result[randNum].word;
}

server.get("/newgame", async (req, res) => {
  let wordleAnswer;
  //If statement to put in the custom query string as the wordle answer, or to use the random word generator
  if (req.query.answer.length == 5) {
    wordleAnswer = req.query.answer.toLowerCase();
  } else {
    wordleAnswer = await randomWordGen();
  }

  let newID = uuid.v4();
  let newGame = {
    wordToGuess: wordleAnswer,
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
