function Letter(Letter){
  this.character = Letter;
  this.guessed = false || !/[a-zA-Z]/.test(this.character);
  this.getLetter = () =>{
    // if the letter is already guessed or not a letter return it
    if(this.guessed || !/[a-zA-Z]/.test(this.character)){
      return this.character;
    }else{
      // if the letter has not been guessed return _
      return "_";
    }
  }
  this.guess = (letter) => {
    if(letter === this.character){
      this.guessed = true;
      return true;
    }
    return false;
  }
}

module.exports = Letter;