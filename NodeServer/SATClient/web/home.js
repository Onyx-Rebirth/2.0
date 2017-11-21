(function test() {
    let socket = io.connect("http://127.0.0.10");
    socket.on('connect', function () {
        socket.emit('potato', "I am aeroplane jelly");
    });
})();