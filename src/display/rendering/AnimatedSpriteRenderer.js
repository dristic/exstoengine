ex.using([
  'ex.display.rendering.ObjectRenderer'
], function () {
  ex.define('ex.display.rendering.AnimatedSpriteRenderer', ex.display.rendering.ObjectRenderer, {
    setupDom: function (el) {
      var spriteSheet = this.currentAnimation.sheet;
      var thisEl = document.createElement('div');
      thisEl.style.backgroundImage = 'url(' + spriteSheet.image.src + ')';
      thisEl.style.display = 'block';
      thisEl.style.width = spriteSheet.renderingRect.width + 'px';
      thisEl.style.height = spriteSheet.renderingRect.height + 'px';
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
      var spriteSheet = this.currentAnimation.sheet;
      
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
        spriteSheet.renderingRect.position.x + 'px' + ' ' + spriteSheet.renderingRect.position.y + 'px';
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
      var spriteSheet = this.currentAnimation.sheet;
      if(!this.isVisible()){
        return;
      }
      
      // Position of the animated sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
      
      // Render only if the animated sprite is within the viewport
      if((viewPortX + spriteSheet.renderingRect.width) > 0
          && viewPortX < camWidth
          && (viewPortY + spriteSheet.renderingRect.height) > 0
          && viewPortY < camHeight) {
        context.drawImage(spriteSheet.image, 
                  spriteSheet.renderingRect.x, 
                  spriteSheet.renderingRect.y,
                  spriteSheet.renderingRect.width,
                  spriteSheet.renderingRect.height,
                  viewPortX, 
                  viewPortY,
                  this.width,
                  this.height);
      }
    }
  });
});