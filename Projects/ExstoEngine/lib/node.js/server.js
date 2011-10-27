var app = require('http').createServer(handler)
  , fs = require('fs')
  , nv = require('novus');

nv.configure({
	db: {
		url: '127.0.0.1:27017',
		name: 'exsto'
	}
});

app.listen(8080);

nv.listen(app);

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