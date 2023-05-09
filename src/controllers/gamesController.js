const { default: mongoose } = require("mongoose");
const gameSchema = require("../models/games");

const gamesController = {
    saveGame: async(req, res) => {
        const { hostId } = req.body

        try {
          let game = await gameSchema.findOne({ hostId })

          if(game){
            return res.status(400).json({
              ok: false,
              msg: "Este juego ya existe"
            })
          }

          game = new gameSchema(req.body)
          console.log(game)
          game.save()

          res.status(201).json({
            ok: true,
            game
          })
        } catch (error) {
          console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Por favor hable con el administrador"
            })
        }
    },

    getGames: async(req, res) => {
      const idOwner = req.params.id;

      try {
        if (!mongoose.Types.ObjectId.isValid(idOwner)) {
          return res.status(404).send(`No game with id: ${idOwner}`)
        }

        let games = await gameSchema.find({ owner: idOwner })

        if(!games){
          return res.status(404).json({
            ok: false,
            msg: "Este usuario no tiene juegos creados"
          })
        }

        return res.json({
          ok: true,
          games
        })

      } catch (error) {
        console.log(error)
        return res.status(500).json({
          ok: false,
          msg: "Por favor hable con el administrador"
        })
      }
    },

    getOne: async(req, res) => {
      const id = req.params.id;

      try {
          
          let game = await gameSchema.findOne({ hostId: id })

          if(!game) {
              return res.status(404).json({ 
                  ok: false,
                  msg: 'No existe un quiz con ese id'
              })
          }

          return res.json({
              ok: true,
              game
          })

      } catch (error) {
          console.log(error)
          return res.status(500).json({
              ok: false,
              msg: 'Hable con el administrador'
          })
      }
    },

    getGameById: async(req, res) => {
      const id = req.params.id;

      try {
          
          let game = await gameSchema.findById({ _id: id })

          if(!game) {
              return res.status(404).json({ 
                  ok: false,
                  msg: 'No existe un quiz con ese id'
              })
          }

          return res.json({
              ok: true,
              game
          })

      } catch (error) {
          console.log(error)
          return res.status(500).json({
              ok: false,
              msg: 'Hable con el administrador'
          })
      }
    },

    addPlayer: async (req, res) => {
        const gameId = req.params.id
        const { name } = req.body

        if (!mongoose.Types.ObjectId.isValid(gameId)) {
          return res.status(404).send(`No game with id: ${id}`)
        }
      
        let game
        try {
          game = await gameSchema.findById(gameId)
          game.playerList.push({ name })
          const updatedGame = await game.save()
          res.send(updatedGame)
        } catch (error) {
          res.status(400).json({ message: error.message })
        }
      },

      updateStateGame: async (req, res) => {
        const { hostId } = req.params
        const { game, state } = req.body

        try {
          let gameBD = await gameSchema.findOne({ hostId })
  
          if(!gameBD){
            return res.status(400).json({
              ok: false,
              msg: "Este juego no existe"
            })
          }

          gameBD = new gameSchema({
            ...game,
            isLive: state
          })

          const gameUpdated = await gameSchema.findByIdAndUpdate( game._id, gameBD, { new: true } );

          res.json({
            ok: true,
            game: gameUpdated
        });

        } catch (error) {
          console.log(error);
          res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        }
      }
}

module.exports = gamesController;