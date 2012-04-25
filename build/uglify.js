var uglify =    require('uglify-js').uglify,
    parser =    require('uglify-js').parser,
    file =      require('./lib/file'),
    loop =      require('./lib/loop'),
    exsto =     require('./exsto-uglify'),
    src = '',
    fileData = [];

var config = {
  version: '0.9.0',
  name: 'exstoengine',
  source: '../src',
  precompiles: [
    '../src/ExstoEngine.js'
  ],
  uglify: {
    beautify: true
  }
};

config.precompiles.forEach(function (filename) {
  src += file.readSync(filename);
});

// Read and compile source files.
file.traverse(config.source, function (arr) {
  loop.asyncFor(arr.length, function (loop) {
    var filename = arr[loop.iteration()],
        ext = filename.substr(filename.lastIndexOf('.'));
    
    if(ext != '.js' || config.precompiles.indexOf(filename) != -1) {
      loop.next();
      return;
    }
    
    // Build dependencies list
    file.read(filename, 'utf-8', function (err, data) {
      fileData.push(parseExFile(data));
      loop.next();
    });
  }, function () {
    // Sort through file data.
    fileData = sortFiles(fileData);   
    
    fileData.forEach(function (data) {
      src += data.code;
    });
    
    // Write src to file.
    writeCodeToFile(src);
  });
});

function sortFiles(fileList) {
  var list = [];
  
  fileList.forEach(function (node) {
    var depth = true;
    
    fileList.forEach(function (other) {
      if(other.requires.indexOf(node.defines) != -1) {
        depth = false;
      }
    });
    
    if(depth == true) {
      visit(node);
    }
  });
  
  function visit(node) {
    if(!node.visited) {
      node.visited = true;
      fileList.forEach(function (other) {
        if(node.requires.indexOf(other.defines) != -1) {
          visit(other);
        }
      });
      if(node.defines != '') {
        list.push(node);
      }      
    }
  };
  
  fileList.forEach(function (node) {
    if(node.defines == '') {
      list.push(node);
    }
  });
  
  return list;
};

function parseExFile(source) {
  var params = {
    requires: [],
    code: source,
    defines: ''
  };
  
  // Find what the code requires.
  params.requires = params.requires.concat(exsto.requires(source));
  
  // Find out what it extends and add it to requires.
  params.requires = params.requires.concat(exsto.extend(source));
  
  // Find what it defines.
  params.defines = exsto.defines(source);
  
  return params;
};

function writeCodeToFile(code) {
  console.log('Compiling ast...');
  
  // Compile source text.
  var ast = parser.parse(code);
  ast = uglify.ast_mangle(ast);
  ast = uglify.ast_squeeze(ast);
  
  console.log('Compiling final code...');
  
  var finalCode = uglify.gen_code(ast, config.uglify);
  
  var filename = 'dist/' + config.name + '-' + config.version + '.js';
  
  // Write code to file.
  file.write(filename, finalCode, function (err) {
    if(err) {
      throw err;
    } else {
      console.log('Complete!');
      console.log('File written to ' + filename);
    }
  });
};