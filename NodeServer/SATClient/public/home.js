(function test() {
    console.log("DOING THE THINGS");
    console.log("DOING THE THINGS");
    let socket = io.connect("http://127.0.0.10");
    socket.on('connect', function () {
        socket.emit('potato', "I am aeroplane jelly");
    });
})();