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
        this.position = position;
        this.img = img || new Image();

        this.rotation = 0;
        this.rotationEnabled = false;
        
        this.rendering = null;
        
        this.scrollFactor = new ex.base.Vector(1,1);
        
        this.width = this.img.naturalWidth;
        this.height = this.img.naturalHeight;
        
        if(this.width == 0  && this.height == 0) {
        	ex.event.listen(img, 'load', function () {
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
      
      if(this.rotationEnabled = false) {
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