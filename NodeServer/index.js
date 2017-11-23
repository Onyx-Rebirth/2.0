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

//Create view engine
app.set('view engine', 'ejs');

//Location of files the client uses
app.use(express.static('./node_modules'));
app.use(express.static('./SATClient'));

// Routes
getRoute('/',               'home');
getRoute('/home',           'home');
getRoute('/users',          'users/users');
getRoute('/users/:id',      'users/userDetails');
getRoute('/users/add',      'users/addUser');
getRoute('/users/:id/edit', 'users/editUser');
getRoute('/class/add',      'classes/addClass');
getRoute('/class/:id',      'classes/classDetails');

function getRoute(route, path) {
    var title = path;
    var id = 1;
    app.get(route, function (req, res, next) {
        //res.set('Content-Type', 'application/javascript');
        res.render('./../SATClient/views/' + path + '.ejs', {
            title: title,
            id: id
        });
    });
}

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

app.use(function (req, res, next) {
    res.render(__dirname + '/SATClient/web/404.html');
});

//Hosts the server on port
server.listen(port);