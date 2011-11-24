ex.using([
  'ex.display.Renderable'
], function () {
  ex.define('ex.display.Text', ex.display.Renderable, {
    constructor: function (options) {
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
      
      this._super("constructor", [true, 1.0]);
    }
  });
});