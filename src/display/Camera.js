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
		 * @property {Number} width width of the viewport
		 * @property {Number} height height of the viewport
		 * @property {Object} following Entity being followed. 
		 * 		Initialized to null.
		 * @property {Canvas} canvas Canvas to use for rendering.
		 * 		Initialized to null.
		 * @constructor
		 */
		constructor: function(position, width, height) {
			this.position = position;
			this.width = width;
			this.height = height;
			this.following = null;
			this.offset = null;
			this.bounds = null;
		},
		
		/**
		 * Moves the camera to the position of the object being followed.
		 * @function
		 * @name update
		 * @memberOf ex.display.Camera
		 * @param {Number} dt
		 */
		update: function(dt) {
			if(this.following != null) {
			  var halfWidth = (this.width >> 1),
			      halfHeight = (this.height >> 1),
			      followX = this.following.position.x + (this.following.width >> 1),
			      followY = this.following.position.y + (this.following.height >> 1),
			      camX = this.position.x + halfWidth - followX,
			      camY = this.position.y + halfHeight - followY;
			  
			  if(camX > this.offset.x) {
			    this.position.x = followX  + this.offset.x - halfWidth;
		    } else if(camX < -this.offset.x) {
		      this.position.x = followX - this.offset.x - halfWidth;
		    }
				
			  if(camY > this.offset.y) {
			    this.position.y = followY + this.offset.y - halfHeight;
			  } else if(camY < -this.offset.y) {
			    this.position.y = followY - this.offset.y - halfHeight;
			  }
			}
			
			if(this.bounds != null) {
			  if(this.position.x < this.bounds.minX) this.position.x = this.bounds.minX;
			  else if(this.position.x > this.bounds.maxX) this.position.x = this.bounds.maxX;
			  if(this.position.y < this.bounds.minY) this.position.y = this.bounds.minY;
			  else if(this.position.y > this.bounds.maxY) this.position.y = this.bounds.maxY;
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
		 * @param {Number} offset The dead zone offset on each side.
		 */
		follow: function (object, offset) {
		  this.offset = offset || 0;
			this.following = object;
		},
		
		unfollow: function () {
		  this.following = null;
		},
		
		reset: function () {
		  this.moveTo(0, 0);
		  this.unfollow();
		  this.unbind();
		},
		
		/**
		 * Calculates the bounds that the camera cannot go beyond.
		 * @function
		 * @name bind
		 * @memberOf ex.display.Camera
		 * @param {Number} x The x position of the rectangle.
		 * @param {Number} y The y position of the rectangle.
		 * @param {Number} width The width of the rectangle.
		 * @param {Number} height The height of the rectangle.
		 */
		bind: function (x, y, width, height) {
		  this.bounds = {
	      minX: x,
	      minY: y,
	      maxX: x + width - this.width,
	      maxY: y + height - this.height
		  }
		},
		
		unbind: function () {
		  this.bounds = null;
		}
	});
});
