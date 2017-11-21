//Custom module import
//let t = require('./TestModule.js');
//Express, to serve the webpages
let express = require('express');
//Instance of express
let app = express();
//The web server
let server = require('http').createServer(app);
//Socket io instance on server, to allow for easy client-server messaging
let io = require('socket.io')(server);
//The port the server runs on
let port = 80;

//Location of files the client uses
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/SATClient'));
app.get('/', function(req,res,next) {
    res.sendFile(__dirname + '/SATClient/web/home.html');
});

//Gets called when new client connects
io.on('connection', function (socket) {
    console.log('Client has connected; ' + socket.id);
});

//Hosts the server on port
server.listen(port);