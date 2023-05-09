const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const useRoutes = require('./routes/games');
const socketIO = require('socket.io');
const http = require('http')
const morgan = require('morgan');

const app = express();
const port = process.env.PORT ||  9000;
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*',
    }
});

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', useRoutes);

//Socket connection

let game;
let leaderboard;
let players = [];

const addPlayer = (id, socketId) => {
    !players.some(player => player.socketId === socketId) && players.push({id, socketId});
}

const getPlayer = (socketId) => {
    return players.find(player => player.socketId === socketId);
}

io.on('connection', (socket) => {
    
    socket.on("disconnect", (reason) => {
        console.log("Socket" + socket.id + " was disconnected");
        console.log(reason)
    })

    socket.on("init-game", (newGame, newLeaderboard) => {
        game = JSON.parse(JSON.stringify(newGame));
        leaderboard = JSON.parse(JSON.stringify(newLeaderboard));
        socket.join(game.hostId);
        gameId = socket.id;
        console.log("Game with id: " + gameId + " started game and joined room: " + game.hostId);
    })  

    socket.on("add-player", (username, socketId, hostId) =>{
        if(game.hostId === hostId){
            addPlayer(username, socketId);
            socket.join(game.hostId);
            console.log(
                "Player " + 
                username + 
                " with id:" +
                socket.id +
                " joined room: " 
                + hostId
            );
            let player = getPlayer(socketId);
            io.emit("player-joined", player);
            io.emit("get-game", game._id)
        }else{
            throw new Error("Algo salió mal");
        }
    })

    socket.on("start-game", (newQuiz) => {
        quiz = JSON.parse(JSON.stringify(newQuiz))
        console.log("Move players to game") 
        socket.to(game.hostId).emit("move-to-game-page", game._id)
    })
    
    socket.on("question-preview", (cb) => {
        cb()
        socket.to(game.hostId).emit("host-start-preview")
    })

    socket.on("start-question-timer", (time, question) => {
        console.log("Send question " + question + " data to players")
        socket.to(game.hostId).emit("host-start-question-timer", time, question)
    }) 
    
    socket.on("send-answer-to-host", (score) => {
        let player = getPlayer(socket.id)
        console.log("Send answer from player " + player.id + " with score " + score + " to host")
        socket.to(game.hostId).emit("get-answer-from-player", score, player.id, player.socketId)
    })
    })

//MongoDB connection

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

server.listen(port, () => {
    console.log('Server on port 9000');
});
