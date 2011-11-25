ex.using([
  'ex.display.Renderable'
], function () {
  ex.define('ex.display.Text', ex.display.Renderable, {
    constructor: function (text, options) {
      this.type = "Text";
      
      this.defaults = {
        position: new ex.base.Vector(50,50),
        maxWidth: null,
        color: '#FFFFFF',
        font: '14pt Arial',
        textAlign: 'left',
        prefix: '',
        suffix: ''
      };
      
      this.options = {};
      ex.extend(this.options, this.defaults);
      ex.extend(this.options, options);
      
      this.text = text;
      
      this._super("constructor", [true, 1.0]);
    }
  });
});