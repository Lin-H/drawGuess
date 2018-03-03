// init project
var express = require('express');
var app = express();
var WebSocketServer = require('uws').Server;

var wss = new WebSocketServer({ port: 3000 });

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set('view engine', 'ejs')

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
    response.render('index')
});

wss.on('connection', function(ws) {
    ws.on('message', onMessage);
    ws.send('something');
});

function onMessage(message) {
    console.log('received: ' + message);
}

// listen for requests :)
var listener = app.listen(8000, function () {
    console.log('Your app is listening on port: ' + listener.address().port);
});
