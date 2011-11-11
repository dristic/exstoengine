var app = require('http').createServer(handler),
    fs = require('fs'),
    nv = require('novus');

nv.configure('./config-local.json');

app.listen(8080);

nv.listen(app);

function handler (req, res) {
  var parts = require('url').parse(req.url);
  if(parts.pathname.substr(0, 10) != '/socket.io' && parts.pathname.substr(0, 6) != '/novus') {
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