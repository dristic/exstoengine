var JSHINT = require("./lib/jshint").JSHINT,
    file = require('./lib/file'),
    src = '',
    config = {
      evil: true,
      browser: true,
      wsh: true,
      eqnull: true,
      expr: true,
      curly: true,
      trailing: true,
      undef: true,
      smarttabs: true,
      predef: [
        'ex',
        'console',
        'unescape',
        'escape',
        'JSON'
      ]
    };

var errorLog = '',
    errors = 0;
log = function (text) {
  errorLog += text + '\n';
  //console.log(text);
};

console.log('JSHint starting...');

// Traverse and hint all files.
file.traverse('../src', function (results) {
  console.log('Completed with ' + errors + ' errors');
  
  //Write logs to error file.
  file.write('./jshint-errors.txt', errorLog, function (err) {
    if(err) throw err;
    console.log('Log saved to jshint-errors.txt');
  });
}, function (filename) {
  var src = file.readSync(filename, 'utf-8');
  
  log('File: ' + filename);
  
  if(JSHINT(src, config)) {
    log('No errors found. \n');
  } else {
    log(' Errors found: ');
    
    JSHINT.errors.forEach(function (error) {
      if(!error) return;
      
      var str = error.evidence || "",
          character = error.character == true ? "EOL" : "C" + error.character;
      
      if(str) {
        str = str.replace(/\t/g, " ").trim();
        str = "  [L" + error.line + ":" + character + "] " + error.reason + "\n   " + str + "\n";
        
        log(str);
        errors += 1;
      }
    });
  }
});