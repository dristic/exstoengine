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
      this.scrollFactor = new ex.Vector(0, 0);
      
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
    
    setText: function (text, recalcWidth) {
      if(text instanceof String == false) text = text.toString();
      
      this.text = text;
      
      if(recalcWidth == true) {
        this._calculateWidth();
      }
    },
    
    _calculateWidth: function () {
      if(this.options.type == 'sprite') {
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
      } else {
        var ctx = document.createElement('canvas').getContext('2d');
        ctx.font = this.options.font;
        this.width = ctx.measureText(this.text);
      }
    },
    
    loadFontData: function (fontData) {
      this.options.fontData = fontData;
      
      if(!fontData.img) {
        var imgData = fontData.data,
            img = new Image();
        img.src = imgData;
        fontData.img = img;
      }
      this.img = fontData.img;
      
      // Height is pre-calculated.
      this.height = fontData.height;
      
      this._calculateWidth();
    }
  });
});