var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var positions = [];
var nextId = 1;

io.sockets.on('connection', function (socket) {
	if(nextId == 1) nextId = 2;
	else nextId = 1;
	socket.emit('playerId', { id: nextId });
	
	socket.on('positionUpdate', function (data) {
		positions[data.id] = data.position;
		
		var pos;
		var id;
		
		if(data.id == 1) {
			id = 2;
			pos = positions[2];
		} else {
			id = 1;
			pos = positions[1];
		}
		
		socket.emit('position', { id: id, position: pos });
	});
});