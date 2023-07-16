function guessWord(wordToGuess, userGuess) {
    let modifiedString = '';
  
    for (let i = 0; i < wordToGuess.length; i++) {
      if (wordToGuess[i] === userGuess[i]) {
        modifiedString += '1';
      } else if (wordToGuess.includes(userGuess[i])) {
        modifiedString += '0';
      } else {
        modifiedString += 'x';
      }
    }
  
    const response = {
      word: userGuess,
      response: modifiedString,
      game: {}
    };
  
    return response;
  }
  
  // Example usage:
  const wordToGuess = 'mugil';
  const userGuess = 'mhwhg';
  const result = guessWord(wordToGuess, userGuess);
  console.log(result);