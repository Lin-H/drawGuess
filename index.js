// init project
var express = require('express');
var app = express();
var WebSocketServer = require('uws').Server;

var wss = new WebSocketServer({ port: 3000 });
var clients = []

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set('view engine', 'ejs')

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
    response.render('index')
});

wss.on('connection', function(ws) {
    ws.on('message', onMessage);
});

function onMessage(message) {
    let msg = JSON.parse(message)
    switch(msg.type) {
        case 'I draw':
            clients.push({type: 'draw', client: this});break
        case 'I guess':
            clients.push({type: 'guess', client: this});break
        case 'sync':
            broadcast(msg);break
        case 'syncEnd':
            syncEnd(msg);break
    }
}
function broadcast(msg) {
    clients.forEach(e => {
        if (e.type == 'guess') {
            e.client.send(JSON.stringify(msg))
        }
    })
}
function syncEnd(msg) {
    clients.forEach(e => {
        if (e.type == 'guess') {
            e.client.send(JSON.stringify(msg))
        }
    })
}

// listen for requests :)
var listener = app.listen(8000, function () {
    console.log('Your app is listening on port: ' + listener.address().port);
});
