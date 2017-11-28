let socket;
let ip = window.location.hostname;
let loaded = false;
let callStack = [];

window.onload = function init() {
    //I THINK the setTimeout is no longer required, but I'll test that later(TM)
    setTimeout(function () {
        loadScript(function () {
            loaded = true;
            socket = io.connect(ip);

            for (let i = 0; i < callStack.length; i++) {
                callStack[i]();
            }
        });
    },1);
};

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

function DBGet(table, para, callback) {
    console.log("Getting");
    listen('response', callback);
    sendMessage('get', {table: table, para: para});
}

/**
 * @param {string} table DB table to post to
 * @param {data} data The item to add
 * @param {function} callback runs when the server responds
 */
function DBPost(table, data, callback) {
    console.log("Posting");
    listen('response', callback);
    sendMessage('post', { table: table, data: data});
};

function listen(type, callback) {
    console.log("Listening for; " + JSON.stringify(type));
    qEvent(function() { socket.on(type, callback) });
}

function sendMessage(type, message) {
    console.log("Sending message; " + JSON.stringify(message));
    qEvent(function() { socket.emit(type, message) });
};