const Letter = require('./Letter.js');

function Word(word){
  this.letters = word.split('').map(item => new Letter(item));
  this.correct = word.split('').reduce((acc, cur) =>{
    if(!(/[a-zA-Z]/.test(cur))){
      acc += 1;
    }
    return acc;
  }, 0)
  // returning all the current letters based on if they have been guessed
  this.toString = () => {
    return this.letters.map(letter => letter.getLetter()).join("")
  }
  this.guessLetter = (guessedLetter) => {
    let guessedCorrect = false;
    this.letters.forEach(letter => {
      if(letter.guessed === true){
        guessedCorrect = true
      }
      else if(letter.guess(guessedLetter ) ){
        this.correct += 1;
        guessedCorrect = true
      }
    });
    return guessedCorrect;
  }
  this.checkForWin = () =>{
    return this.correct === this.letters.length;
  }
}

module.exports = Word;