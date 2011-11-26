ex.using([
  'ex.display.rendering.ObjectRenderer'
], function () {
  ex.define('ex.display.rendering.AnimatedSpriteRenderer', ex.display.rendering.ObjectRenderer, {
    setupDom: function (el) {
      var thisEl = document.createElement('div');
      thisEl.style.backgroundImage = 'url(' + this.img.src + ')';
      thisEl.style.display = 'block';
      thisEl.style.width = this.renderingRect.width + 'px';
      thisEl.style.height = this.renderingRect.height + 'px';
      thisEl.style.position = 'absolute';
      thisEl.style.left = this.position.x + 'px';
      thisEl.style.top = this.position.y + 'px';
      thisEl.style.zIndex = '100';
      
      this.rendering = {
        el: thisEl
      };
      
      el.appendChild(this.rendering.el);
    },
    
    destroyDom: function (el) {
      el.removeChild(this.rendering.el);
      this.rendering = null;
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
        if(this.visible) {
          this.visible = false;
          this.rendering.el.style = 'none';
        }
        return;
      } else if(this.visible == false) {
        this.visible = true;
        this.rendering.el.style = 'inherit';
      }
      
      this.rendering.el.style.backgroundPosition = 
        this.renderingRect.position.x + 'px' + ' ' + this.renderingRect.position.y + 'px';
      this.rendering.el.style.left = viewPortX + 'px';
      this.rendering.el.style.top = viewPortY + 'px';
    },
    
    /**
     * Renders the current frame of the animation.
     * 
     * @param {Context} context canvas context to draw with
     * @param {Number} camX camera offset on x
     * @param {Number} camY camera offset on y
     * @param {Number} camWidth viewport width
     * @param {Number} camHeight viewport height
     */
    render2dCanvas: function (context, camX, camY, camWidth, camHeight) {
      if(!this.isVisible()){
        return;
      }
      
      // Position of the animated sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
        viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
      
      // Render only if the animated sprite is within the viewport
      if((viewPortX + this.renderingRect.width) > 0
          && viewPortX < camWidth
          && (viewPortY + this.renderingRect.height) > 0
          && viewPortY < camHeight) {
        context.drawImage(this.img, 
                  this.renderingRect.position.x, 
                  this.renderingRect.position.y,
                  this.renderingRect.width,
                  this.renderingRect.height,
                  viewPortX, 
                  viewPortY,
                  this.renderingRect.width,
                  this.renderingRect.height);
      }
    }
  });
});