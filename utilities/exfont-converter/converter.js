function init() {
  // Grab all the needed elements on the interface.
  var convertButton = $('convert'),
      canvas = $('font-canvas'),
      context = canvas.getContext('2d'),
      saveData = $('save-data');

  // Add click listeners
  convertButton.addEventListener('mousedown', generateFont);
  
  // Generates the font into the canvas.
  function generateFont() {
    var face = $('font').value,
        size = $('size').value,
        color = $('color').value,
        chars = "",
        widths = [],
        positions = [];
    
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
      positions.push(curX);
      widths.push(context.measureText(char).width);
      curX += context.measureText(char).width;
    }
    
    saveFont(widths, positions);
  };
  
  // Saves the font to a png.
  function saveFont(widths, positions) {
    var img = canvas.toDataURL('image/png'),
        data = {
          widths: widths,
          positions: positions,
          data: img
        };
    saveData.innerHTML = JSON.stringify(data);
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
};