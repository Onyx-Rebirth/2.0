class APIClient {
    constructor() {
        this.baseUrl = 'http:localhost';

    }

    // Get Method
    getById(table, id) {

        let getUrl = this.baseUrl + '/' + table + '/' + id;

        http.get(getUrl, function (res) {
            let body = '';

            res.on('data', function (chunk) {
                body += chunk;
            });

            res.end(, function () {
                let response = JSON.parse(body);
                return response;
            });

        }).on('error', function (e) {
            console.log("Error: ", e);
        });
    }
}
