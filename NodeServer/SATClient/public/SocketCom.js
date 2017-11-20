let socket;
let ip = 'http://127.0.0.10';
let loaded = false;
let callStack = [];
let messageListeners = [];

(function init() {
    setTimeout(function () {
        loadScript(function () {
            loaded = true;
            socket = io.connect(ip);

            socket.on('connect', function () {
                //listenerHandler();
            });            

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

let listenerHandler = function () {
    for (let i = 0; i < messageListeners.length; i++) {
        socket.on(messageListeners[i].type, messageListeners[i].callback());
    }
}

function listen(type, callback) {
    messageListeners.push({type: type, callback: callback});
}

function sendMessage(type, message) {
    console.log("Sending message; " + message);
    if (!loaded) {
        callStack.push(function() {
            socket.emit(type, message);
        });
    } else {
        socket.emit(type, message);
    }
};