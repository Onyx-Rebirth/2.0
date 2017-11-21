//TODO; FIX PAGE ROUTING



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
let router = express.Router();

//Location of files the client uses
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/SATClient'));

router.use(function (req, res) {
    res.sendFile(__dirname + '/SATClient/web/template.html');
});
/*
function addRoute(dir) {
    let s = dir.split('/');
    s = s[s.length - 1];
    console.log(dir);
    console.log(s);
    console.log(dir.substring(0, dir.length - s.length - 1));
    
    router.get('/' + dir.substring(0, dir.length - s.length - 1), function (req, res) {
        res.sendFile(__dirname + '/SATClient/web/template.html');
    });
}
*/

//Gets called when new client connects
io.on('connection', function (socket) {
    console.log('Client has connected; ' + socket.id);

    //Example listener
    socket.on('potato', function (data) {
        console.log("[" + socket.id + "]; " + data);
        //Broadcasts to all connected users
        io.emit('cake','a');
    });
});

app.use('/',router);

//Hosts the server on port
server.listen(port);