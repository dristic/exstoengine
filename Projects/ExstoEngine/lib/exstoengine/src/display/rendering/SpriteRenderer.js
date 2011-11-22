ex.using([
    'ex.display.rendering.ObjectRenderer'
], function () {
  ex.define('ex.display.rendering.SpriteRenderer', ex.display.rendering.ObjectRenderer, {
    setupDom: function (el) {
      var thisEl = this.img;
      thisEl.style.position = 'absolute';
      thisEl.style.width = this.width + 'px';
      thisEl.style.height = this.height + 'px';
      thisEl.style.left = this.position.x + 'px';
      thisEl.style.top = this.position.y + 'px';
      
      this.rendering = {
        el: thisEl
      };
      
      el.appendChild(this.rendering.el);
    },
    
    renderDom: function (el, camX, camY, camWidth, camHeight) {
      // Position of the sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
      
      // Do nothing if sprite is out of the viewport
      if((viewPortX + this.width) < 0
          || viewPortX > camWidth
          || (viewPortY + this.height) < 0
          || viewPortY > camHeight) {
        if(this.visible == true) {
          this.visible = false;
          this.rendering.el.style.display = 'none';
        }
        return;
      } else if(this.visible == false) {
        this.visible = true;
        this.rendering.el.style.display = 'inherit';
      }
      
      if(this.rotationEnabled = false) {
        this.rendering.el.style.left = viewPortX + 'px';
        this.rendering.el.style.top = viewPortY + 'px';
      } else {
        
      }
    },
    
    destroyDom: function (el) {
      el.removeChild(this.rendering.el);
      this.rendering = null;
    }
  });
});