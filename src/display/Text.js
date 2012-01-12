ex.using([
  'ex.display.Renderable'
], function () {
  ex.define('ex.display.Text', ex.display.Renderable, {
    constructor: function (text, position, options) {
      this.type = "Text";
      
      this.defaults = {
        type: 'canvas',   // 'canvas' or 'sprite'
        maxWidth: null,
        color: '#FFFFFF',
        font: '14pt Arial',
        textAlign: 'left',
        prefix: '',
        suffix: '',
        fontData: {},
        alpha: 1
      };
      
      this.options = {};
      ex.extend(this.options, this.defaults);
      ex.extend(this.options, options);
      
      this.text = text;
      this.position = position;
      
      this._super("constructor", [true, 1.0]);
      
      // If we are using a sprite font generate the font's Image object.
      if(this.options.type == 'sprite') {
        this.loadFontData(this.options.fontData);
      } else {
        var ctx = document.createElement('canvas').getContext('2d');
        ctx.font = this.options.font;
        this.height = ctx.measureText('m');
        this.width = ctx.measureText(this.text);
      }
    },
    
    loadFontData: function (fontData) {
      this.options.fontData = fontData;
      
      var imgData = fontData.data,
          img = new Image();
      img.src = imgData;
      this.img = img;
      
      // Height is always equal to the height of the image.
      this.height = this.img.height;
      
      // Width has to be calculated by character.
      this.width = 0;
      var i = 0,
          ln = this.text.length,
          charCode, width;
      for(; i < ln; i++) {
        charCode = this.text.charCodeAt(i);
        width = this.options.fontData.widths[charCode];
        this.width += width;
      }
    }
  });
});