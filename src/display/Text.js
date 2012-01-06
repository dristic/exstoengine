ex.using([
  'ex.display.Renderable'
], function () {
  ex.define('ex.display.Text', ex.display.Renderable, {
    constructor: function (text, options) {
      this.type = "Text";
      
      this.defaults = {
        position: new ex.base.Vector(50,50),
        type: 'canvas',   // 'canvas' or 'sprite'
        maxWidth: null,
        color: '#FFFFFF',
        font: '14pt Arial',
        textAlign: 'left',
        prefix: '',
        suffix: '',
        fontData: {}
      };
      
      this.options = {};
      ex.extend(this.options, this.defaults);
      ex.extend(this.options, options);
      
      this.text = text;
      
      this._super("constructor", [true, 1.0]);
      
      // If we are using a sprite font generate the font's Image object.
      if(this.options.type == 'sprite') {
        var imgData = options.fontData.data,
            img = new Image();
        img.src = imgData;
        this.img = img;
      }
      
      var ctx = document.createElement('canvas').getContext('2d');
      ctx.font = this.options.font;
      this.height = ctx.measureText('m');
      this.width = ctx.measureText(this.text);
    }
  });
});