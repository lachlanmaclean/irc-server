const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const rug = require('random-username-generator');

app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = rug.generate();
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
        console.log(socket.username + ' is Online')
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    });

    socket.on('chat_message', function(message) {
        if (message !== ""){
            io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
        }
        else{
        }
    });
});
const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});