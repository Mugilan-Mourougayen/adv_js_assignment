const express = require('express');
const WordModel = require('../models/word');
const GameModel = require("../models/game");

const Router = express.Router();

const isLogged = (request, response, next) => {
    if (request.session.user) {
        console.log('test');
        next();
    } else {
        return response.status(500).json({'msg': "not logged !"})
    }
}

Router.post('/', async (request, response) => {
    const word = await WordModel.aggregate([{
        $sample: {size: 1}
    }]);
    console.log(request.session.user)

    let game = new GameModel({
        word: word[0]._id,
        tries: [],
        user: request.session.user._id
    });

    try {
        await game.save();

        game = await GameModel.find({
            _id: game._id
        }).populate('user').populate('word')

        return response.status(200).json({
            "msg": game
        });
    } catch (error) {
        return response.status(500).json({
            "error": error.message
        });
    }
});

Router.get('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        const game = await GameModel.findOne({_id: id});

        return response.status(200).json({
            "msg": game
        });
    } catch (error) {
        return response.status(500).json({
            "error": error.message
        });
    }
})

Router.post('/verif',async (request, response) => {
  

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
      
 
      
  


    if (typeof request.body.word === 'undefined') {
        return response.status(500).json({
            "msg": "You have to send 'word' value"
        });
    }
    const search = await WordModel.findOne({_id:"64b40443462578cb25800374"});
    console.log(search.name)

    if (request.body.word ) {
        const result = guessWord(search.name, request.body.word);
        return response.status(200).json(result);
    }

    return response.status(500).json({
        "result": "You don't find the word !"
    });
})

module.exports = Router;