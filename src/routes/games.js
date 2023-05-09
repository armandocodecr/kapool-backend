const express = require('express');
const controller = require('../controllers/quizControllers');
const gamesController = require('../controllers/gamesController');
const userController = require('../controllers/userController');
const controllerResult = require('../controllers/playerResultControllers');

const router = express.Router();

// create a quiz
router.post('/createQuiz', controller.save)

// get all quiz's
router.get('/quiz', controller.get)

// get a specific quiz
router.get('/quiz/:id', controller.getOne)

// update a quiz
router.put('/quiz/:id', controller.edit)

// delete a quiz
router.delete('/quiz/:id', controller.delete)

// save user
router.post('/user/new', userController.save)

// get a specific user
router.post('/user', userController.loginUser)

// save game
router.post('/saveGame', gamesController.saveGame)

// get game
router.get('/getGame/:id', gamesController.getOne)

// get game by id
router.get('/getGameById/:id', gamesController.getGameById)

//update state game
router.put('/updateStateGame/:hostId', gamesController.updateStateGame)

// get games by owner
router.get('/getGames/:id', gamesController.getGames)

// add player to game
router.post('/addPlayer/:id', gamesController.addPlayer)

// save player result
router.post('/savePlayerResult', controllerResult.savePlayerResult)

module.exports = router;
