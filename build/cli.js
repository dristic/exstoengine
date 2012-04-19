// The command line interface for the exsto engine
var command = process.argv[2];

if(command == 'lint') {
  require('./jshint-test');
} else {
  var message =
    'usage: exsto <command> \n' +
    '\n' +
    'commands: \n' +
    '  lint   Uses JSHint on the source';
  
  console.log(message);
}

