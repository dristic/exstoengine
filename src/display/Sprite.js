ex.using([
  "ex.base.Vector",
  "ex.display.Renderable"
], function () {
	ex.define("ex.display.Sprite", ex.display.Renderable, {
		/**
		 * Sprite object that contains a single image to draw on the canvas.
		 * 
		 * @name ex.display.Sprite
		 * 
		 * @param {Number} x The sprite's x position.
		 * @param {Number} y The sprite's y position.
		 * @param {Image} img The img to use to render the sprite.
		 * @param {String} name The sprite's name.
		 * 
		 * @property {ex.base.Vector} position
		 * @property {ex.display.Image} image
		 * @property {Number} rotation angle of the image
		 * @property {Boolean} rotationEnabled if rotation is currently
		 * 		being used.
		 * @property {Canvas} rotationCanvas buffer canvas used to rotate
		 * 		the sprite.
		 * @property {ex.base.Vector} scrollFactor the rate at which the
		 * 		sprite moves with the camera. Values less than 1 cause the
		 * 		sprite to move slower than the camera making it appear to be
		 * 		farther away from the focus while numbers greater than 1 
		 *		make the sprite appear to be closer than the focus.
		 * @constructor
		 */
    constructor: function (position, img) {
      this.type = "Sprite";
      
      this.position = position;
      this.img = img || new Image();

      this.rotation = 0;
      this.rotationEnabled = false;
      
      this.rendering = null;
      
      this.scrollFactor = new ex.base.Vector(1,1);
      
      this.width = this.img.naturalWidth;
      this.height = this.img.naturalHeight;
      
      if(this.width == 0  && this.height == 0) {
      	ex.event.listen('load', img, function () {
      		this._recalcDimensions();
      	}, this);
      }
      
      this._super("constructor", [true, 1.0]);
    },
    
    /**
     * Recalculates dimensions of sprite based on image. 
     * Automatically called if image changes or loads after sprite 
     * is initialized.
     * 
     * @function
     * @name _recalcDimensions
     * @memberOf ex.display.Sprite
     */
    _recalcDimensions: function () {
    	this.width = this.img.naturalWidth;
      this.height = this.img.naturalHeight;
      
      if(this.rendering && this.rendering.rotationCanvas) {
        this.rendering.rotationCanvas.width = this.width;
        this.rendering.rotationCanvas.height = this.height;
      } else if(this.rendering && this.rendering.el) {
        this.rendering.el.style.width = this.width + 'px';
        this.rendering.el.style.height = this.height + 'px';
      }
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