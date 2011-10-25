var app = require('http').createServer(handler)
  , fs = require('fs')
  , nv = require('novus');

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