ex.using([
  'ex.display.rendering.ObjectRenderer'
], function () {
  ex.define('ex.display.rendering.TextRenderer', ex.display.rendering.ObjectRenderer, {
    setupDom: function (el) {
      var thisEl = document.createElement('div');
      thisEl.innerHTML = this.text;
      thisEl.style.position = 'absolute';
      thisEl.style.left = this.options.position.x + 'px';
      thisEl.style.top = this.options.position.y + 'px';
      thisEl.style.font = this.options.font;
      thisEl.style.color = this.options.color;
      
      this.rendering = {
        el: thisEl
      };
      
      el.appendChild(this.rendering.el);
    },
    
    renderDom: function (el, camX, camY, camWidth, camHeight) {
      this.rendering.el.innerHTML = this.text;
      this.rendering.el.style.left = this.options.position.x + 'px';
      this.rendering.el.style.top = this.options.position.y + 'px';
    },
    
    destroyDom: function (el) {
      el.removeChild(this.rendering.el);
      this.rendering = null;
    },
    
    render2dCanvas: function(context, camX, camY, camWidth, camHeight) {
      if(!this.isVisible()) {
        return;
      }
        
      context.save();
      
      if(this.options.type == 'canvas') {
        context.font = this.options.font;
        context.fillStyle = this.options.color;
        
        context.fillText(
            this.text, 
            this.options.position.x, 
            this.options.position.y,
            this.options.maxWidth);
      } else if(this.options.type == 'sprite') {
        var i = 0,
            ln = this.text.length,
            charCode, width, x, objX = this.options.position.x;
        for(; i < ln; i++) {
          charCode = this.text.charCodeAt(i);
          width = this.options.fontData.widths[charCode];
          x = this.options.fontData.positions[charCode];
          context.drawImage(this.img,
              x,
              0,
              width,
              this.img.height,
              objX,
              this.options.position.y,
              width,
              this.img.height);
          objX += width;
        }
      }
      
      context.restore();
    }
  });
});