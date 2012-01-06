function init() {
  // Grab all the needed elements on the interface.
  var convertButton = $('convert'),
      saveButton = $('save'),
      canvas = $('font-canvas'),
      context = canvas.getContext('2d'),
      saveData = $('save-data');

  // Add click listeners
  convertButton.addEventListener('mousedown', generateFont);
  saveButton.addEventListener('mousedown', saveFont);
  
  // Generates the font into the canvas.
  function generateFont() {
    var face = $('font').value,
        size = $('size').value,
        color = $('color').value,
        chars = "";
    
    // Grab all the characters we want to draw.
    var i = 0,
        ln = 255;
    for(; i < ln; i++) {
      chars += String.fromCharCode(i);
    }
    
    setFontStyle(face, size, color);
    
    // Resize the canvas
    var height = context.measureText('m').width,
        width = context.measureText(chars).width;
    canvas.height = height + 10;
    canvas.width = width;
    
    setFontStyle(face, size, color);
    
    context.clearRect(0, 0, width, height);
    
    // Draw all the characters.
    i = 0;
    ln = chars.length;
    var char,
        curX = 0;
    for(; i < ln; i++) {
      char = chars.charAt(i);
      context.fillText(char, curX, 0);
      curX += context.measureText(char).width;
    }
  };
  
  // Saves the font to a png.
  function saveFont() {
    var img = canvas.toDataURL('image/png'),
        data = {
          width: 100,
          height: 200,
          data: img
        };
    saveData.innerHTML = JSON.stringify(data);
    
    /*imgTag = document.createElement('img');
    imgTag.src = img;
    document.getElementsByTagName('body')[0].appendChild(imgTag);
    */
  }
  
  // Sets the style for drawing fonts.
  function setFontStyle(face, size, color) {
    context.font = size + 'pt ' + face;
    context.fillStyle = color;
    context.textBaseline = 'top';
  };
  
  // Utility functions.
  function $(id) {
    return document.getElementById(id);
  };
  
  JSON = {};
  // implement JSON.stringify serialization
  JSON.stringify = JSON.stringify || function (obj) {
      var t = typeof (obj);
      if (t != "object" || obj === null) {
          // simple data type
          if (t == "string") obj = '"'+obj+'"';
          return String(obj);
      }
      else {
          // recurse array or object
          var n, v, json = [], arr = (obj && obj.constructor == Array);
          for (n in obj) {
              v = obj[n]; t = typeof(v);
              if (t == "string") v = '"'+v+'"';
              else if (t == "object" && v !== null) v = JSON.stringify(v);
              json.push((arr ? "" : '"' + n + '":') + String(v));
          }
          return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
      }
  };
};