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
      
      this._super("constructor", [true, 1.0]);
    },
    
    update: function(dt) {
      // Show text in proper format
      if(this.options.displayFormat == 'percentage') {
        this.text = ex.toInt(this.target[this.selector] / this.target[this.options.maxSelector] * 100);
        this.text += '%';
      } else if (this.options.displayFormat == 'absolute') {
        this.text = this.target[this.selector];
      }
      
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
    },
    
    setupDom: function (el) {
      
    },
    
    renderDom: function (el, camX, camY, camWidth, camHeight) {
      
    },
    
    destroyDom: function (el) {
      
    },
    
    render2dCanvas: function(context, camX, camY, camWidth, camHeight) {
      if(!this.isVisible()){
        return;
      }
        
      this.options.outer.render2dCanvas(context, camX, camY, camWidth, camHeight);
      this.options.inner.render2dCanvas(context, camX, camY, camWidth, camHeight);
    }
  });
});