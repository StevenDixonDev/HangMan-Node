const inquirer = require("inquirer");
const Word = require("./Word.js");
/*
 *
 *  A command line version the popular wrod guessing game HangMan
 *
 */

// define a list of words to use
const wordList = ["Jurrasic Park?"];

// function that given an array of words returns a random word
function getRandomWord(arrayOfWords) {
  return arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
}

function HangManGame() {
  this.settings = {
    wordGuesses: 5,
    word: "",
  };
  this.start = () => {
    this.word = new Word(getRandomWord(wordList).toLowerCase());
    console.log(this.word.toString())
    this.loop(0);
  };
  this.loop = (currentGuess) => {
    if (currentGuess > this.settings.wordGuesses) {
      this.handleLose();
    } else {
      inquirer
        .prompt([
          {
            name: "letter",
            message: "Please Provide a single letter",
            type: "input"
          }
        ])
        .then(answers => {
          if (answers.letter.length === 1) {

            const guessedCorrectly = this.word.guessLetter(answers.letter.toLowerCase());
            console.log(this.word.toString());

            if (this.word.checkForWin()) {
              this.handleWin();
            } else {
              console.log(
                `Number of Guesses left: ${this.settings.wordGuesses -
                  currentGuess}`
              );
              //increase guess
              if(guessedCorrectly){
                this.loop(currentGuess);
              }else{
                this.loop(currentGuess + 1);
              }
            }
          } else {
            console.log("Please provide a single character");
            this.loop(currentGuess);
          }
        });
    }
  };
  this.handleWin = () => {
    console.log("You got it right next Word.");
    this.start();
  };
  this.handleLose = () => {
    console.log("How did you lose this game, it's easy?")
  };
}

const game = new HangManGame();

game.start();
