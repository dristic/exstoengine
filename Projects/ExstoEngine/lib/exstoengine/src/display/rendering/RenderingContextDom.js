ex.using([
    'ex.display.rendering.RenderingContext'
], function () {
  ex.define('ex.display.rendering.RenderingContextDom', ex.display.rendering.RenderingContext, {
    constructor: function (width, height, el, bgColor) {
      this._super('constructor', [width, height]);
      
      this.el = el || document.createElement('div');
      this.el.id = 'exstoGame';
      this.el.style.display = 'block';
      this.el.style.width = width + 'px';
      this.el.style.height = height + 'px';
      this.el.style.overflow = 'hidden';
      this.el.style.position = 'relative';
      this.el.style.backgroundColor = bgColor;
      
      // If a canvas was not passed in, add a new one to the page
      if(el == null) {
        document.body.appendChild(this.el);
      }
    },
    
    render: function (items, camX, camY, camWidth, camHeight) {
      var i = 0,
          ln = items.length;
      for(; i < ln; i++) {
        items[i].renderDom(this.el, camX, camY, camWidth, camHeight);
      }
    }
  });
});