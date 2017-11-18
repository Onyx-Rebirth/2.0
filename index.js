// Dependancies
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();    // Start server
var router = express.Router();  // Create router instance
app.use(bodyParser.urlencoded({ extended: false }));    // Used to get body information from webpages

try { app.use(express.static(path.join(__dirname, 'SATClient/public'))); } catch (e) { console.log(e); }// Gets css and javascript files

// Listen on this port
var port = process.env.PORT || 80;
var server = app.listen(port);
console.log("Server running at http://localhost:%d", port);

// Routes
getRoute('/', 'home.html');
getRoute('/users', 'users/users.html');
getRoute('/users/add', 'users/addUser.html');
getRoute('/class/add', 'class/addClass.html');

function getRoute(route, path) {
    router.get(route, function (req, res, next) {
        res.sendFile(path, { root: __dirname + '/SATClient/web/' });
    });
}

// Catches 404
router.use(function (req, res, next) {
    res.sendFile('SATClient/web/404.html', { root: __dirname });
});

app.use('/', router);



//POST
try {
    app.post("/submit", function (request, response) {

        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write(request.item("i"));
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