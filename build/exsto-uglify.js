var tokens = {
  requires: {
    opening: 'ex.using([',
    closing: '],'
  },
  defines: {
    opening: 'ex.define("',
    closing: '",'
  }
};

exports.requires = function (source) {
  var requires = source.split(tokens.requires.opening);
  if(requires[1]) {
    requires = requires[1].split(tokens.requires.closing);
    requires = requires[0].split(',');
  } else {
    requires = [];
  }
  
  /*var requires = source.match(/ex\.using\:\ \[[A-z.,' \n]+\]/g);
  if(requires) {
    requires = requires[0];
    requires = requires.substring(requires.indexOf('['), requires.lastIndexOf(']') + 1);
    requires = eval(requires);
    params.requires = requires;
  }*/
  
  requires.forEach(function (el, i) {
    var string = requires[i];
    string = string.trim();
    string = string.replace(/\'/gi, '');
    string = string.replace(/\"/gi, '');
    requires[i] = string;
  });
  
  return requires;
};

exports.extend = function (source) {
  /*var extend = source.match(/extend\: [A-z.' ]+\,/g);
  if(extend) {
    extend = extend[0];
    extend = extend.substring(extend.indexOf('\''), extend.lastIndexOf(','));
    extend = eval(extend);
    params.requires.push(extend);
  }*/
  
  return [];
};

exports.defines = function (source) {
  var defines = source.split(tokens.defines.opening);
  if(defines[1]) {
    defines = defines[1].split(tokens.defines.closing);
    defines = defines[0];
  } else {
    defines = '';
  }
  
  /*var defines = source.match(/Ext\.define\([A-z.' ]+\,/g);
  if(defines) {
    defines = defines[0];
    defines = defines.substring(defines.indexOf('(') + 1, defines.lastIndexOf(','));
    defines = eval(defines);
    params.defines = defines;
  }*/
  
  defines = defines.trim();
  
  return defines;
};