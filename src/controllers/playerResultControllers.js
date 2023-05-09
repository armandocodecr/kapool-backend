const playerResultSchema = require("../models/playerResult");

const controllerResult = {
    savePlayerResult: (req, res) => {
        const playerResult = playerResultSchema(req.body)

        playerResult
        .save()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }))
    }
}

module.exports = controllerResult;