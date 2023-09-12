const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    questionsGame: [{
        questionNumber: { type: Number, required: true, default: 0 },
        question: { type: String, required: true },
        timeForQuestion: { type: Number, required: true, default: 0 },
        selectedImage: { type: Object, required: false },
      }],
      answers: [{
        answer1: { type: String, required: true },
        answer2: { type: String, required: true },
        answer3: { type: String, required: true },
        answer4: { type: String, required: true },
        correctAnswer: { type: String, required: true },
      }],
      creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

module.exports = mongoose.model('Quiz', quizSchema);