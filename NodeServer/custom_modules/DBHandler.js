let URL = 'http://onyxat.azurewebsites.net/api/';
let http = require('http');
let request = require('request');

//Get Method
this.getById = function(table, id, callback) {
    let getUrl = URL + table + '/' + id;
    let response;

    http.get(getUrl, function (res) {
        let body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            //Body is undefined if a request is made for an id that doesn't exist
            if (!body) {
                console.log('Request for non-existant id');
                return;
            }
            response = JSON.parse(body);
            console.log("e" + response);
            callback(response);
        });

    }).on('error', function (e) {
        console.log("Error: ", e);
    });
}

//Post Method
this.post = function (table, data, callback) {
    /*var options = {
        host: URL,
        path: '/'+table,
        port: '80',
        method: 'POST'
    };
    let req = http.request(options, function (res) {
        let str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            console.log(str);
        });
        req.write(data);
        req.end();
    });*/


    // Set the headers
    var headers = {
        'Content-Type': 'application/json'
    }
    
    // Configure the request
    var options = {
        url: URL+table,
        body: JSON.stringify(data),
        method: 'POST',
        headers: headers        
    }

    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body)
        } else {
            console.log("Err; " + error);
            console.log("Res; " + JSON.stringify(response));
        }
        callback(response);
    })
}