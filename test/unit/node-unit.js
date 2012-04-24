 var util = require('util'),
     exec = require('child_process').exec,
     child;

child = exec('phantomjs ../test/unit/run-qunit.js ../test/unit/index.html',
  function (error, stdout, stderr) {
    console.log(stdout);
    
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});