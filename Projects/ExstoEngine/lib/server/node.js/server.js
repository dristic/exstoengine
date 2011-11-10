var app = require('http').createServer(handler),
    fs = require('fs'),
    nv = require('novus');

nv.configure({
	db: {
		url: 'mongo://nodejs:ShadowRule123@exsto-sharpper-data-0.dotcloud.com:17710',
		name: 'exsto'
	}
});

app.listen(8080);

nv.listen(app);

function handler (req, res) {
  var parts = require('url').parse(req.url);
  if(parts.pathname != '/socket.io' && parts.pathname != '/novus') {
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
};