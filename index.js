const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

let playerCount = 0; 

io.on('connection', (socket) => {
    playerCount++; 
    const playerNumber = playerCount;
    if(playerCount >= 3){
        console.log('No pueden haber mas de 2 jugadores!');
        console.log(`El jugador ${playerNumber} se ha desconectado`);
        playerCount = 1;

    }
    else{
        console.log(`El jugador ${playerNumber} se ha conectado`);
        socket.emit('player number', playerNumber);
    
        socket.on('move player', (data) => {
            io.emit('player moved', data);
        });    
    }
    socket.on('disconnect', () => {
        console.log(`El jugador ${playerNumber} se ha desconectado`);
    });
});

server.listen(3000, () => {
    console.log('PUERTO: 3000 en uso');
});
