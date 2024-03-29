ex.using([
    'ex.display.rendering.RenderingContext'
], function () {
  ex.define('ex.display.rendering.RenderingContext2dCanvas', ex.display.rendering.RenderingContext, {
    constructor: function (width, height, renderers, canvas, bgColor) {
      this._super('constructor', [width, height]);
      
      this.canvas = canvas || document.createElement("canvas");
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.backgroundColor = bgColor;
      this.context = this.canvas.getContext("2d");
      
      this.bufferCanvas = document.createElement("canvas");
      this.bufferCanvas.width = width;
      this.bufferCanvas.height = height;
      this.bufferCanvas.style.backgroundColor = bgColor;
      this.buffer = this.bufferCanvas.getContext("2d");
      
      // If a canvas was not passed in, add a new one to the page
      if(canvas == null) {
        document.body.appendChild(this.canvas);
      }
      
      this.renderers = renderers;
    },
    
    render: function (items, camX, camY, camWidth, camHeight) {
      // Move buffer to front.
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(this.bufferCanvas, 0, 0);
      
      // Draw everything else to the back buffer.
      this.buffer.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var i = 0,
          ln = items.length,
          item,
          renderers = this.renderers,
          context = this.buffer;
      for(; i < ln; i++) {
        item = items[i];
        if(!item.renderer) {
          renderers[item.type].render2dCanvas.call(item, context, camX, camY, camWidth, camHeight);
        } else {
          item.renderer.render2dCanvas.call(item, context, camX, camY, camWidth, camHeight);
        }
      }
    },
    
    /**
     * Resizes the canvas.
     * 
     * @function
     * @name resizeCanvas
     * @memberOf ex.display.Renderer
     * 
     * @param {Number} newWidth
     * @param {Number} newHeight
     */
    resizeViewport: function (newWidth, newHeight) {
      this.canvas.width = newWidth;
      this.canvas.height = newHeight;
    }
  });
});