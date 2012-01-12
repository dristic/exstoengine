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
        weight = $('weight').value,
        strokeColor = $('stroke-color').value,
        lineWidth = $('line-width').value,
        shadow = {
          color: $('shadow-color').value,
          x: parseInt($('shadow-x').value),
          y: parseInt($('shadow-y').value),
          blur: $('shadow-blur').value
        },
        clear = $('clear').checked,
        heightPad = $('height-pad').value,
        chars = "",
        widths = [],
        positions = [];
    
    // Grab all the characters we want to draw.
    var i = 0,
        ln = 255;
    for(; i < ln; i++) {
      chars += String.fromCharCode(i);
    }
    
    setFontStyle(face, size, color, weight, strokeColor, lineWidth, shadow);
    
    // Resize the canvas
    var height = context.measureText('m').width,
        width = context.measureText(chars).width + ((shadow.x + 1) * chars.length);
    canvas.height = height + parseInt(heightPad);
    canvas.width = width;
    
    setFontStyle(face, size, color, weight, strokeColor, lineWidth, shadow);
    
    if(clear) context.clearRect(0, 0, width, height);
    
    // Draw all the characters.
    i = 0;
    ln = chars.length;
    var char,
        curX = 0;
    for(; i < ln; i++) {
      char = chars.charAt(i);
      context.fillText(char, curX, 0);
      context.strokeText(char, curX, 0);
      positions.push(curX);
      widths.push(context.measureText(char).width + (shadow.x + 1));
      curX += context.measureText(char).width + (shadow.x + 1);
    }
    
    saveFont(widths, positions);
  };
  
  // Saves the font to a png.
  function saveFont(widths, positions) {
    var img = canvas.toDataURL('image/png'),
        data = {
          height: canvas.height,
          widths: widths,
          positions: positions,
          data: img
        };
    saveData.innerHTML = JSON.stringify(data);
  }
  
  // Sets the style for drawing fonts.
  function setFontStyle(face, size, color, weight, strokeColor, lineWidth, shadow) {
    context.font = weight + ' ' + size + 'pt ' + face;
    context.fillStyle = color;
    context.textBaseline = 'top';
    context.strokeStyle = strokeColor;
    context.lineWidth = lineWidth;
    
    context.shadowColor = shadow.color;
    context.shadowOffsetX = shadow.x;
    context.shadowOffsetY = shadow.y;
    context.shadowBlur = shadow.blur;
  };
  
  // Utility functions.
  function $(id) {
    return document.getElementById(id);
  };
};