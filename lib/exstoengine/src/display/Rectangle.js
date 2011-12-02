ex.using([
  "ex.base.Vector",
  "ex.display.Renderable"
], function () {
  ex.define("ex.display.Rectangle", ex.display.Renderable, {
    /**
     * Rectangle is used to compile drawn rectangles on the screen that are
     * created through the drawing API.
     * 
     * @name ex.display.Rectangle
     * @constructor
     * 
     * @param {Object} options The options used to draw the rectangle:
     * {
     *  x: x position
     *  y: y position
     *  width: Rectangle width
     *  height: Rectangle height
     *  alpha: Rectangle opacity or alpha (0.0 - 1.0)
     *  fill: {
     *    type: The type of fill (none, solid, linear-gradient, radial-gradient)
     *    color: The color of the fill (solid fill only)
     *  },
     *  stroke: {
     *    type: The type of stroke (none, solid)
     *    width: The width of the stroke
     *    color: The color of the stroke (solid fill only)
     *  }
     * }
     */
    constructor: function (options) {
      this.type = "Rectangle";
      
      this.defaults = {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        alpha: 1,
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
     * @memberOf ex.display.Rectangle
     * 
     * @param {Number} dt timestep
     */
    update: function (dt) {
        if (typeof this.onUpdate === "function") this.onUpdate(dt);
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