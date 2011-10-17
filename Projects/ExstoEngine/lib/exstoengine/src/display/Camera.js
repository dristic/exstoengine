ex.using([
    "ex.base.Vector"          
], function () {
	ex.define("ex.display.Camera", {
		/**
		 * A viewport for the game.
		 * @name ex.display.Camera
		 * 
		 * @property {ex.base.Point} position Position of camera.
		 * 		Initialized to (0,0).
		 * @property {Object} following Entity to follow. 
		 * 		Initialized to null.
		 * @property {Canvas} canvas Canvas to use for rendering.
		 * 		Initialized to null.
		 * @constructor
		 */
		constructor: function() {
			this.position = new ex.base.Vector(0,0);
			this.following = null;
			this.canvas = null;
		},
		
		/**
		 * Moves the camera to the position of the object being followed.
		 * @function
		 * @name update
		 * @memberOf ex.display.Camera
		 * @param {Number} dt
		 */
		update: function(dt) {
			if(this.following != null && this.canvas != null) {
				this.position.x = this.following.position.x + (this.following.width >> 1) - (this.canvas.width >> 1);
				this.position.y = this.following.position.y + (this.following.height >> 1) - (this.canvas.height >> 1);
			}
		},
		
		/**
		 * Translates the camera by the supplied x and y values.
		 * @function
		 * @name translate
		 * @memberOf ex.display.AnimatedSprite
		 * @param {Number} x translation on the x axis
		 * @param {Number} y translation on the y axis
		 */
		translate: function(x, y) {
			this.position.x += x;
			this.position.y += y;
		},
		
		/**
		 * Moves the camera to a specific position.
		 * @function
		 * @name moveTo
		 * @memberOf ex.display.AnimatedSprite
		 * @param {Number} x position on the x axis
		 * @param {Number} y position on the y axis
		 */
		moveTo: function (x, y) {
			this.position.x = x;
			this.position.y = y;
		},
		
		/**
		 * Sets an object for the camera to follow.
		 * @function
		 * @name follow
		 * @memberOf ex.display.AnimatedSprite
		 * @param {Entity} object entity to follow
		 */
		follow: function (object) {
			this.following = object;
		}
	});
});
