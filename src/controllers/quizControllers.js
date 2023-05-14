const quizSchema = require("../models/quiz");

const controller = {
    save: (req, res) => {
        try {
          const quiz = new gameSchema(req.body)
          console.log(quiz)
          quiz.save()

          res.status(201).json({
            ok: true,
            quiz
          })
        } catch (error) {
          console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Por favor hable con el administrador"
            })
        }
    },

    edit: (req, res) => {
        const id = req.params.id;
        const { questionsGame, answers } = req.body;

        quizSchema
        .updateOne({_id: id}, { $set: {questionsGame, answers} })
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }))
    },

    delete: async(req, res) => {
        const id = req.params.id;

        try {    
            let quiz = await quizSchema.findById({ _id: id })

            if(!quiz) {
                return res.status(404).json({ 
                    ok: false,
                    msg: 'No existe un quiz con ese id'
                })
            }

            await quizSchema.findByIdAndDelete({ _id: id })

            return res.json({
                ok: true,
                msg: 'Quiz eliminado'
            })
    
        } catch(error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            })
        }
    },

    get: (req, res) => {
        const id = req.params.id;

        try {
           
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).send(`No game with id: ${id}`)
            }
            const quiz = quizSchema.findById({ _id: id })

            if(!quiz) {
                return res.status(404).json({ 
                    ok: false,
                    msg: 'No existe un quiz con ese id'
                })
            }

            return res.json({
                ok: true,
                quiz
            })

        } catch (error) {
            
        }
    },

    getOne: async(req, res) => {
        const id = req.params.id;

        try {
            
            let quiz = await quizSchema.findById({ _id: id })

            if(!quiz) {
                return res.status(404).json({ 
                    ok: false,
                    msg: 'No existe un quiz con ese id'
                })
            }
            return res.json({
                ok: true,
                quiz
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            })
        }
    },
}

module.exports = controller;