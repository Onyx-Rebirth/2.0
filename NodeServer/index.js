// Dependancies
let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
let server = require('http').createServer(app);
let io = require('socket.io')(server);

let app = express();    // Start server
let router = express.Router();  // Create router instance

app.use(bodyParser.urlencoded({ extended: false }));    // Used to get body information from webpages
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/SATClient/web'));

//try { app.use(express.static(path.join(__dirname, 'SATClient/public'))); } catch (e) { console.log(e); }// Gets css and javascript files

// Listen on this port
let port = process.env.PORT || 80;
let server = app.listen(port);
console.log("Server running at http://localhost:%d", port);

// Routes
getRoute('/', 'home.html');

function getRoute(route, path) {
    router.get(route, function (req, res, next) {
        res.sendFile(path, { root: __dirname + '/SATClient/web/' });
    });
}

// --PUT STUFF AFTER HERE--


//Socket testing
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/SATClient/web/home.html');
});

io.on('connection', function (socket) {
    console.log('Client has connected; ' + socket.id);

    socket.on('potato', function (data) {
        console.log("[" + socket.id + "]; " + data);
    });
});


//POST
try {
	app.post("/submit", function (request, response) {

		response.writeHead(200, { "Content-Type": "text/plain" });
		response.end("Submitted post");

	});
}
catch (ex) { console.log(ex.toString()); }

//GET
try {
	app.get("/submit", function (request, response) {

		response.writeHead(200, { "Content-Type": "text/plain" });
		response.end("Submitted get");

	});
}
catch (ex) { console.log(ex.toString()); }




// --DO NOT PUT STUFF PAST HERE--

// Catches 404
router.use(function (req, res, next) {
    res.sendFile('SATClient/web/404.html', { root: __dirname });
});

app.use('/', router);