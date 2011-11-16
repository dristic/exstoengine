ex.using([
  "ex.base.Vector",
  "ex.display.Renderable"
], function () {
  ex.define("ex.display.Rectangle", ex.display.Renderable, {
    constructor: function (options) {
      this.defaults = {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        fill: {
          type: 'solid',      // none, solid, linear-gradient, radial-gradient
          color: '#FF0000'
        },
        stroke: {
          type: 'none',       // none, solid
          width: 0,
          color: '#00FF00'
        }
      };
      
      this.options = {};
      ex.extend(this.options, this.defaults);
      ex.extend(this.options, options);
      
      this.position = new ex.base.Vector(this.options.x, this.options.y);
      this.width = this.options.width;
      this.height = this.options.height;
      this.scrollFactor = new ex.base.Vector(1, 1);
      this.rotationEnabled = false;
        
      this._super("constructor", [true, 1.0]);
    },

    /**
     * Update routine
     * 
     * @function
     * @name update
     * @memberOf ex.display.Sprite
     * 
     * @param {Number} dt timestep
     */
    update: function (dt) {
        if (typeof this.onUpdate === "function") this.onUpdate(dt);
    },
    
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
          if(this.options.stroke.type != 'none') {
            context.strokeStyle = this.getStrokeStyle(context);
            context.lineWidth = this.getLineWidth();
            context.strokeRect(viewPortX, viewPortY, this.width, this.height);
          }
          
          if(this.options.fill.type != 'none') {
            context.fillStyle = this.getFillStyle(context);
            context.fillRect(viewPortX, viewPortY, this.width, this.height); 
          }
        } else {
          throw "Not implemented.";
        }
      }
    },
    
    getFillStyle: function (context) {
      var fillStyle = "",
          options = this.options.fill;
      
      if(options.type == 'solid') {
        fillStyle = options.color;
      } else if(options.type == 'linear-gradient' || options.type == 'radial-gradient') {
        var grad,
            i = 0,
            ln = options.stops.length,
            stop;
        
        if(options.type == 'linear-gradient') {
          grad = context.createLinearGradient(
              options.start.x, options.start.y, options.end.x, options.end.y);
        } else {
          grad = context.createRadialGradient(
              options.start.x, options.start.y, options.start.radius,
              options.end.x, options.end.y, options.end.radius);
        }
        
        for(; i < ln; i++) {
          stop = options.stops[i];
          grad.addColorStop(stop.position, stop.color);
        }
        
        fillStyle = grad;
      }
      
      return fillStyle;
    },
    
    getStrokeStyle: function () {
      return this.options.stroke.color;
    },
    
    getLineWidth: function () {
      return this.options.stroke.width;
    },

    /**
     * Returns bounding box of sprite.
     * 
     * @function
     * @name getBounds
     * @memberOf ex.display.Sprite
     * @returns {ex.base.Rectangle} bounding box
     */
    getBounds: function () {
        return new ex.base.Rectangle(
            this.position, 
            this.width, 
            this.height);
    }
  });
});