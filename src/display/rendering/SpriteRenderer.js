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
    
    destroyDom: function (el) {
      el.removeChild(this.rendering.el);
      this.rendering = null;
    },
    
    renderDom: function (el, camX, camY, camWidth, camHeight) {
      // Set opacity to 0 if not visible
      if(!this.visible){
        this.rendering.el.style.opacity = 0;
        return;
      } else {
        this.rendering.el.style.opacity = this.opacity;
      }
      
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
      
      if(this.rotationEnabled == false) {
        this.rendering.el.style.left = viewPortX + 'px';
        this.rendering.el.style.top = viewPortY + 'px';
      } else {
        
      }
    },
    
    setup2dCanvas: function () {
      this.rendering = {
          rotationCanvas: document.createElement('canvas')  
      };
      
      this.rendering.rotationCanvas.width = this.width;
      this.rendering.rotationCanvas.height = this.height;
      this.rendering.rotationContext = this.rendering.rotationCanvas.getContext("2d");
    },
    
    /**
     * Renders sprite, usually called by Renderer.
     * 
     * @function
     * @name render
     * @memberOf ex.display.Sprite
     * 
     * @param {Context} context canvas context to draw with
     * @param {Number} camX camera offset on x
     * @param {Number} camY camera offset on y
     * @param {Number} camWidth viewport width
     * @param {Number} camHeight viewport height
     */
    render2dCanvas: function (context, camX, camY, camWidth, camHeight) {
      // Do nothing if sprite is not visible
      if(!this.isVisible()){
        return;
      }
      
      // Position of the sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
            
      // Do nothing if sprite is out of the viewport
      if((viewPortX + this.width) < 0
          || viewPortX > camWidth
          || (viewPortY + this.height) < 0
          || viewPortY > camHeight) {
        return;
      }
            
      if (this.rotationEnabled == false) {
          context.drawImage(
              this.img, 
              viewPortX, 
              viewPortY);
      } else {
          //--Ensure width and height are not 0 to avoid INVALID_STATE_ERR
        var rotCanvas = this.rendering.rotationCanvas,
            rotContext = this.rendering.rotationContext;
        rotCanvas.width = this.img.width || 1;
        rotCanvas.height = this.img.height || 1;
        
        rotContext.save();
        rotContext.translate(this.width / 2, this.height / 2);
        rotContext.rotate(this.rotation);
        rotContext.translate(-this.width / 2, -this.height / 2);
        rotContext.drawImage(this.img, 0, 0);
        rotContext.restore();

        context.drawImage(
            rotCanvas, 
            viewPortX, 
            viewPortY);
      }
    }
  });
});