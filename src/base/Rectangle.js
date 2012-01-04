ex.using([
    "ex.base.Point"          
],function () {
	ex.define("ex.base.Rectangle", {
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
		constructor: function(position, width, height) {
			this.position = position;
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
			if(x instanceof ExstoEngine.Base.Point) {
				if(x.x > this.x && x.x  < this.position.x + this.width 
				   && x.y > this.y && x.y < this.position.y + this.height) {
					return true;
				} else {
					return false;
				}
			} else {
				if(x > this.position.x && x < this.position.x + this.width
				   && y > this.position.y && y < this.position.y + this.height) {
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
				this.position.x -= x.x;
				this.position.y -= x.y;
			} else {
				this.position.x -= x;
				this.position.y -= y;
			}
			return this;
		}
	});
});
