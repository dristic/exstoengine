ex.using([
    'ex.display.rendering.RenderingContext'
], function () {
  ex.define('ex.display.rendering.RenderingContextDom', ex.display.rendering.RenderingContext, {
    constructor: function (width, height, renderers, el, bgColor) {
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
      
      this.renderers = renderers;
    },
    
    resizeViewport: function(newWidth, newHeight) {
      this.el.style.width = newWidth + 'px';
      this.el.style.height = newHeight + 'px';
    },
    
    render: function (items, camX, camY, camWidth, camHeight) {
      var i = 0,
          ln = items.length,
          item,
          el = this.el,
          renderers = this.renderers;
      
      for(; i < ln; i++) {
        item = items[i];
        if(!item.renderer) {
          renderers[item.type].renderDom.call(item, el, camX, camY, camWidth, camHeight);
        } else {
          item.renderer.renderDom.call(item, el, camX, camY, camWidth, camHeight);
        }
      }
    }
  });
});