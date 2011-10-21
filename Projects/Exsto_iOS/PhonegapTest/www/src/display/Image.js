ex.using([ 
    'ex.base.Point', 
    'ex.base.Vector' 
], function() {
	ex.define("ex.display.Image", {
		/**
		 * Container class for HTML Images with additional position,
		 * size, and name data.
		 * 
		 * @name ex.display.Image
		 * 
		 * @param {Image} image
		 * @param {ex.base.Point} position
		 * @param {ex.base.Vector} size width and height
		 * @param {String} name 
		 * 
		 * @property {Boolean} visible controls whether the image
		 * 		is rendered or not.
		 * @property {String} type For internal use only. Do not change!
		 * @property {ex.base.Point} position
		 * @property {ex.base.Vector} size width and height
		 * @property {Image} image
		 * 
		 * @constructor
		 */
		constructor : function(image, position, size, name) {
			this.visible = true;
			this.type = "Image";
			this.name = name;
			this.position = position || new ex.base.Point(0, 0);
			this.width = image.naturalWidth;
			this.height = image.naturalHeight;
			this.image = image;
			
			// If the image is not loaded reset size when it loads
			if(this.image.complete == false) {
				ex.event.listenOnce(this.image, 'load', this.autoSize, this);
			}
		},
		
		/**
		 * Auto sizes this object's width and height to the image supplied, and removes
		 * any event listeners on the image for loading
		 * 
		 * @function
		 * @name autoSize
		 * @memberOf ex.display.Image
		 */
		autoSize: function () {
			this.width = this.image.naturalWidth;
			this.height = this.image.naturalHeight;
		},

		/**
		 * Retrieves an axis aligned bounding box (AABB) surrounding
		 * 		the image.
		 * 
		 * @function
		 * @name getBounds
		 * @nemberOf ex.display.Image
		 * 
		 * @returns {ex.base.Rectangle} 
		 */
		getBounds: function() {
			return new ex.base.Rectangle(
					this.position,
					this.size.x,
					this.size.y);
		},
		
		/**
		 * performs actions every time period dt
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.display.Image
		 * 
		 * @param {Number} dt length of current time cycle
		 */
		update : function(dt) {

		},

		/**
		 * Supplies a canvas context and camera offset to each item and calls
		 * their render functions
		 * 
		 * @function
		 * @name render
		 * @memberOf ex.display.Image
		 * 
		 * @param {Context} context canvas context to draw with
		 * @param {Number} camX camera offset on x
		 * @param {Number} camY camera offset on y
		 * @param {Number} camWidth viewport width
		 * @param {Number} camHeight viewport height
		 */
		render : function(context, camX, camY, camWidth, camHeight) {
			if(!this.visible){
				return;
			}
			
			// Position of the sprite in the viewport
			var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
				viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
						
			// Do nothing if sprite is out of the viewport
			if((viewPortX + this.width) < 0
					&& viewPortX > camWidth
					&& (viewPortY + this.height) < 0
					&& viewPortY > camHeight) {
				return;
			}
			
			if (this.image == null) {
				context.fillStyle = '#888888';
				context.fillRect(
						this.position.x, this.position.y,
						this.size.x, this.size.y
				);
			} else {
				context.drawImage(
						this.image, 
						viewPortX, viewPortY, 
						this.size.x, this.size.y
				);
			}
		}
	});
});