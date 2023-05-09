const quizSchema = require("../models/quiz");

const controller = {
    save: (req, res) => {
        const quiz = quizSchema(req.body)

        quiz
        .save()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }))
    },

    edit: (req, res) => {
        const id = req.params.id;
        const { questionsGame, answers } = req.body;

        quizSchema
        .updateOne({_id: id}, { $set: {questionsGame, answers} })
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }))
    },

    delete: (req, res) => {
        const id = req.params.id;

        quizSchema
        .deleteOne({_id: id})
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }))
    },

    get: (req, res) => {
        quizSchema
        .find()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }))
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