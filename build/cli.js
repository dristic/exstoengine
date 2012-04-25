// The command line interface for the exsto engine
var command = process.argv[2];

if(command == 'lint') {
  require('./jshint-test');
} if(command == 'build') {
  require('./uglify.js');
} else {
  var message =
    'usage: exsto <command> \n' +
    '\n' +
    'commands: \n' +
    '  lint   Uses JSHint on the source';
  
  console.log(message);
}

