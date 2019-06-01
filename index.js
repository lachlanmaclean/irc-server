const fs = require('fs');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const https = require('https');


const io = require('socket.io')(http);
const rug = require('random-username-generator');

const PORT = process.env.PORT || 8080;

app.get('/', function(req, res) {
    res.render('index.ejs', {port : PORT});
});
app.get('/#', function(req, res) {
    res.render('channel.ejs');
});
app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function(socket) {
    socket.on('username', function() {
        socket.username = rug.generate();
        io.emit('is_online', socket.username + ' join the chat..');
        console.log(socket.username + ' is online')
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '<i>' + socket.username + ' left the chat..</i>');
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