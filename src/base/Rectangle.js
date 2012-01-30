ex.using([
    "ex.base.Point"          
],function () {
	ex.define("ex.base.Rectangle", {
	  __alias: 'ex.Rectangle',
	  
		/**
		 * @name ex.base.Rectangle
		 * @param {ex.base.Point} position of top left corner
		 * @param {Number} width width of rectangle
		 * @param {Number} height height of rectangle
		 * 
		 * @property {ex.base.Point} position top left corner
		 * @property {Number} width
		 * @property {Number} height
		 * @constructor
		 */
		constructor: function(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		},
		
		/**
		 * Checks if the supplied point is contained in the Rectangle
		 * @function
		 * @name containsPoint
		 * @memberOf ex.base.Rectangle
		 * @param {Number or ex.base.Point} x 
		 * 			point's x axis value or an ex.base.Point
		 * @param {Number} [y] 
		 * 			point's y axis value (not used if x is an ex.base.Point)
		 * @returns {Boolean}
		 */
		containsPoint: function(x, y) {
			if(x instanceof ex.base.Point) {
				if(x.x > this.x && x.x  < this.position.x + this.width 
				   && x.y > this.y && x.y < this.position.y + this.height) {
					return true;
				} else {
					return false;
				}
			} else {
				if(x > this.x && x < this.x + this.width
				   && y > this.y && y < this.y + this.height) {
			   		return true;
			   } else {
			   		return false;
			   }
			}
		},
		
		/**
		 * Checks if the supplied point is contained in the Rectangle
		 * @function
		 * @name translate
		 * @memberOf ex.base.Rectangle
		 * @param {Number, ex.base.Point, or ex.base.Vector} x 
		 * 			translation on x axis value, ex.base.Point offset, 
		 * or ex.base.Vector offset
		 * @param {Number} [y] 
		 * 			translation on y axis value (not used if x is an 
		 * ex.base.Point or ex.base.Vector)
		 * @return {ex.base.Rectangle} this
		 */
		translate: function(x, y) {
			if(x instanceof ex.base.Point || x instanceof ex.base.Vector){
				this.x -= x.x;
				this.y -= x.y;
			} else {
				this.x -= x;
				this.y -= y;
			}
			return this;
		}
	});
});
