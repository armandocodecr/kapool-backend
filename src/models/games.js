const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: false },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true, unique: false },
    hostId: { type: String, required: true, unique: false },
    playerList: [{
        name: { type: String,}, 
    },],
    resultList: [{ type: String, unique: false }],
    isLive: { type: Boolean, required: true, default: false, unique: false },
});

module.exports = mongoose.model('Game', gameSchema);
