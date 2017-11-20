let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let port = 80;

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/SATClient'));
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/SATClient/web/home.html');
});

io.on('connection', function(socket) {
    console.log('Client has connected; ' + socket.id);

    socket.on('potato', function(data) {
        console.log("[" + socket.id + "]; " + data);
    });
});

server.listen(port);

temp();

function temp() {
    setTimeout(function () {
        console.log("ONE");
        io.emit('one', 'a');
        console.log("TWO");
        io.emit('two', 'b');
        temp();
    }, 1000);
}