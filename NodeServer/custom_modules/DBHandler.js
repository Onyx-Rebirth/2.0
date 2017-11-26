// Get Method
this.getById = function(table, id, callback) {
    let getUrl = 'http://onyx2.azurewebsites.net/api/' + table + '/' + id;
    let response;

    require('http').get(getUrl, function (res) {
        let body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            response = JSON.parse(body);
            console.log("e" + response);
            callback(response);
        });

    }).on('error', function (e) {
        console.log("Error: ", e);
    });
}