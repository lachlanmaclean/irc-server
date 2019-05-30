const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const rug = require('random-username-generator');
const PORT = process.env.PORT || 8080;
app.get('/', function(req, res) {
    res.render('index.ejs', {
        port: PORT
    });
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

const server = http.listen(PORT, function() {
    console.log('listening on *: ', PORT);
});