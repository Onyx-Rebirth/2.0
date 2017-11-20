let socket;
let ip = 'http://127.0.0.10';
let loaded = false;
let callStack = [];

(function init() {
    setTimeout(function () {
        loadScript(function () {
            loaded = true;
            socket = io.connect(ip);

            for (let i = 0; i < callStack.length; i++) {
                callStack[i]();
            }
        });
    },1);
})();

let loadScript = function(callback) {
    //Add the socket.io script to the HTML
    let sScript = document.createElement('SCRIPT');
    sScript.src = "socket.io/socket.io.js";
    
    sScript.onreadystatechange = callback;
    sScript.onload = callback;

    document.body.appendChild(sScript);    
}

let qEvent = function(call) {
    if (!loaded) {
        callStack.push(call);
    } else {
        call();
    }
}

function listen(type, callback) {
    console.log("Listening for; " + type);
    qEvent(function() { socket.on(type, callback) });
}

function sendMessage(type, message) {
    console.log("Sending message; " + message);
    qEvent(function() { socket.emit(type, message) });
};