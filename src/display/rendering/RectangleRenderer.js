ex.using([
    'ex.display.rendering.ObjectRenderer'
], function () {
  ex.define('ex.display.rendering.RectangleRenderer', ex.display.rendering.ObjectRenderer, {
    setupDom: function (el) {
      // SVG implementation
    },
    
    destroyDom: function (el) {
      
    },
    
    renderDom: function (el, camX, camY, camWidth, camHeight) {
      
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
     * @memberOf ex.display.Rectangle
     * 
     * @param {Context} context canvas context to draw with
     * @param {Number} camX camera offset on x
     * @param {Number} camY camera offset on y
     * @param {Number} camWidth viewport width
     * @param {Number} camHeight viewport height
     */
    render2dCanvas: function (context, camX, camY, camWidth, camHeight) {
      // Do nothing if this is not visible
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
      } else {
        if (this.rotationEnabled == false) {
          context.save();
          
          if(this.options.alpha < 1) {
            context.globalAlpha = this.options.alpha;
          }
          
          if(this.options.stroke.type != 'none') {
            context.strokeStyle = this.getStrokeStyle(context);
            context.lineWidth = this.getLineWidth();
            context.strokeRect(viewPortX, viewPortY, this.width, this.height);
          }
          
          if(this.options.fill.type != 'none') {
            context.fillStyle = this.getFillStyle(context);
            context.fillRect(viewPortX, viewPortY, this.width, this.height); 
          }
          
          context.restore();
        } else {
          throw "Not implemented.";
        }
      }
    }
  });
});