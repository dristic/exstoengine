ex.using([
    'ex.display.rendering.RenderingContext'
], function () {
  ex.define('ex.display.rendering.RenderingContext2dCanvas', ex.display.rendering.RenderingContext, {
    constructor: function (width, height, canvas, bgColor) {
      this._super('constructor', [width, height]);
      
      this.canvas = canvas || document.createElement("canvas");
      this.canvas.id = "mainCanvas";
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.backgroundColor = bgColor;
      this.context = this.canvas.getContext("2d");
      
      // If a canvas was not passed in, add a new one to the page
      if(canvas == null) {
        document.body.appendChild(this.canvas);
      }
    },
    
    render: function (items, camX, camY, camWidth, camHeight) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      var i = 0,
          ln = items.length;
      for(; i < ln; i++) {
        items[i].render2dCanvas(this.context, camX, camY, camWidth, camHeight);
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
    resizeCanvas: function (newWidth, newHeight) {
      this.canvas.width = newWidth;
      this.canvas.height = newHeight;
    }
  });
});