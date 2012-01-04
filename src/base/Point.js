(function () {
	ex.define("ex.base.Point", {
		/**
		 * @name ex.base.Point
		 * @param {Number} x magnitude on x axis
		 * @param {Number} y magnitude on y axis
		 * 
		 * @property {Number} x
		 * @property {Number} y
		 * @constructor
		 */
		constructor: function(x, y) {
			this.x = x;
			this.y = y;
		},
		
		/**
		 * Adds the x and y values of a Vector or Point to this object's
		 * x and y values.
		 * @function
		 * @name add
		 * @memberOf ex.base.Point
		 * @param {ex.base.Point or ex.base.Vector} other Point or Vector to add
		 * to this Point 
		 */
		add: function(other) {
			this.x += other.x;
			this.y += other.y;
		},
		
		/**
		 * Subtracts the x and y values of a Vector or Point from this object's
		 * x and y values.
		 * @function
		 * @name subtract
		 * @memberOf ex.base.Point
		 * @param {ex.base.Point or ex.base.Vector} other Point or Vector to
		 * subtract from this Point 
		 */
		subtract: function(other) {
			this.x -= other.x;
			this.y -= other.y;
		}
	});	
}());
