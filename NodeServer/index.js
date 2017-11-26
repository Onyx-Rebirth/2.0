// Get Method
function getById(table, id) {
    let getUrl = 'http://onyx2.azurewebsites.net/api/' + table + '/' + id;
    let response = 'none';

    require('http').get(getUrl, function (res) {
        let body = '';
            
        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            response = JSON.parse(body);
        });

    }).on('error', function (e) {
        console.log("Error: ", e);
    });
}



//Custom module import
//let t = require('./TestModule.js');
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

    //Example listener
    socket.on('potato', function (data) {
        console.log("[" + socket.id + "]; " + data);
        //Broadcasts to all connected users
        io.emit('cake','a');
    });
});

//Catches 404
getRoute('/*', '404'); 

//Hosts the server on port
server.listen(port);