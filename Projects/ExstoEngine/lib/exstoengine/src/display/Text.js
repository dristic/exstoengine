ex.using([
  'ex.display.Renderable'
], function () {
  ex.define('ex.display.Text', ex.display.Renderable, {
    constructor: function (text, options) {
      this.type = "Text";
      
      this.defaults = {
        position: new ex.base.Vector(50,50),
        color: '#FFFF00',
        font: '40pt Calibri',
        displayFormat: 'absolute',
        maxSelector: null,
        textBefore: null,
        textAfter: null
      };
      
      this.options = {};
      ex.extend(this.options, this.defaults);
      ex.extend(this.options, options);
      
      this.text = text;
      
      this._super("constructor", [true, 1.0]);
    },
    
    _setStyle: function(context) {
      context.font = this.options.font;
      context.fillStyle = this.options.color;
    },
  });
});