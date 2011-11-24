ex.using([
  "ex.base.Vector",
  "ex.display.Renderable"
], function () {
  ex.define("ex.display.Rectangle", ex.display.Renderable, {
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
     * @memberOf ex.display.Sprite
     * 
     * @param {Number} dt timestep
     */
    update: function (dt) {
        if (typeof this.onUpdate === "function") this.onUpdate(dt);
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