//Custom module import
let DBH = require('./custom_modules/DBHandler.js');
//Express, to serve the webpages
let express = require('express');
var request = require('request');
//Instance of express
let app = express();
//The web server
let server = require('http').createServer(app);
//Socket io instance on server, to allow for easy client-server messaging
let io = require('socket.io')(server);
//The port the server runs on
let port = 80;
let router = express.Router();

//require('APIClient.js');

//Create view engine
app.set('view engine', 'ejs');

//Location of files the client uses
app.use(express.static('./node_modules'));
app.use(express.static('./SATClient'));

// Routes
getRoute('/',               'home');
getRoute('/home',           'home');
getRoute('/users',          'users/users');
getRoute('/users/add',      'users/addUser');
getRoute('/users/:id',      'users/userDetails');
getRoute('/users/:id/edit', 'users/editUser');
getRoute('/class/add',      'classes/addClass');
getRoute('/class/:id',      'classes/classDetails');

function getRoute(route, path) {
    app.get(route, function (req, res, next) {
        let title = path;
        let id = req.params.id;

        res.render('./../SATClient/views/' + path + '.ejs', {
            title: title,
            id: id
        });
    });
}

router.get('/api/users/1', function (req, res, next) {
    request({
        uri: 'http://onyx2.azurewebsites.net/api/users/1'
    },
    function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
            res.json(body);
        } else {
            res.json(error);
        }
    }).pipe(res);
});

//Gets called when new client connects
io.on('connection', function (socket) {
    console.log('Client has connected; ' + socket.id);

    socket.on('get', function (data) {
        console.log("[" + socket.id + "]; GET; " + data);
        DBH.getById(data.table, data.para, function (d) {
            socket.emit('response', d)
        });
    });

    socket.on('post', function (data) {
        console.log("[" + socket.id + "]; POST; " + data);
        DBH.post(data.table, data.data, function(d) {socket.emit(d)});
    });
});

//Catches 404
getRoute('/*', '404'); 

//Hosts the server on port
server.listen(port);