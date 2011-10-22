ex.using([
  "ex.base.Vector"
], function () {
	ex.define("ex.display.Sprite", {
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
		 * @property {String} type
		 * 		Internal use only. Do not change!
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
            this.visible = true;

            this.rotation = 0;
            this.rotationEnabled = false;
            this.rotationCanvas = document.createElement("canvas");
            
            this.scrollFactor = new ex.base.Vector(1,1);
            
            this.width = this.img.naturalWidth;
            this.height = this.img.naturalHeight;
            this.rotationCanvas.width = this.width;
            this.rotationCanvas.height = this.height;
            this.rotationContext = this.rotationCanvas.getContext("2d");
            
            if(this.width == 0  && this.height == 0) {
            	ex.event.listen(img, 'load', function () {
            		this._recalcDimensions();
            	}, this);
            }
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
            this.rotationCanvas.width = this.width;
            this.rotationCanvas.height = this.height;
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
		render: function (context, camX, camY, camWidth, camHeight) {
			// Do nothing if sprite is not visible
			if(!this.visible){
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
                this.rotationCanvas.width = this.img.width || 1;
                this.rotationCanvas.height = this.img.height || 1;

                this.rotationContext.save();
                this.rotationContext.translate(this.width / 2, this.height / 2);
                this.rotationContext.rotate(this.rotation);
                this.rotationContext.translate(-this.width / 2, -this.height / 2);
                this.rotationContext.drawImage(this.img, 0, 0);
                this.rotationContext.restore();

                context.drawImage(
                		this.rotationCanvas, 
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