ex.using([
  'ex.base.Vector',
  'ex.display.Sprite',
  'ex.display.Rectangle',
  'ex.display.Renderable'
], function() { 
  ex.define("ex.display.ui.StatusBar", ex.display.Renderable, {
    constructor: function(options) {
      this.defaults = {
        position: new ex.Vector(50, 50),
        offset: 3,
        update: 'manual',
        updateOptions: {
          target: null,
          currentSelector: '',
          maxSelector: ''
        },
        outer: new ex.display.Rectangle({
          x: 350, y: 300,
          width: 200, height: 16,
          alpha: 0.5,
          fill: {
            type: 'none'          
          },
          stroke: {
            width: 2,
            color: '#FFF'
          }
        }),
        inner: new ex.display.Rectangle({
          x: 353, y: 303,
          width: 194, height: 10,
          alpha: 0.5,
          fill: {
            type: 'solid',
            color: '#FFF'
          }
        })
      };
      
      this.options = {};
      ex.extend(this.options, this.defaults);
      ex.extend(this.options, options);
      
      this.options.outer.position = this.options.position;
      this.options.inner.position = this.options.position.clone().addNumber(this.options.offset);
      
      this.totalWidth = this.options.inner.width;
      this.currentWidth = 0;
      this.options.inner.width = 0;
      
      // Add to items list for rendering
      this.items = [this.options.inner, this.options.outer];
      
      this._super("constructor", [true, 1.0]);
    },
    
    update: function(dt) {
      if(this.options.update == 'auto') {
        var options = this.options.updateOptions,
            percent = options.target[options.currentSelector] / options.target[options.maxSelector];
        
        percent = ex.toInt(percent * 100);
        this.updatePercentage(percent);
      }
      
      this.options.inner.width = this.currentWidth;
    },
    
    updatePercentage: function (percent) {
      if(percent > 1) percent = percent / 100;
      this.currentWidth = this.totalWidth * percent;
    }
  });
});