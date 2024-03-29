(function () {
	ex.define("ex.base.Vector", {
	  __alias: 'ex.Vector',
	  
		/**
		 * @name ex.base.Vector
		 * @param {Number} x magnitude on x axis
		 * @param {Number} y magnitude on y axis
		 * 
		 * @property {Number} x
		 * @property {Number} y
		 * @constructor
		 */
		constructor: function(x, y) {
			this.x = x || 0;
			this.y = y || 0;
		},
		
		/**
		 * Adds another vector to this one.
		 * @function
		 * @name add
		 * @memberOf ex.base.Vector
		 * @param {ex.base.Vector} v other vector
		 * @returns {ex.base.Vector} this
		 */
		add: function(v) {
			this.x += v.x;
			this.y += v.y;
			return this;
		},
		
		/**
		 * Adds a scaled vector to this vector. To subtract, 
		 * the scalar should be made negative.
		 * @function
		 * @name addScaled
		 * @memberOf ex.base.Vector
		 * @param {ex.base.Vector} v vector to add
		 * @param {Number} s scalar value to apply to v
		 * @returns {ex.base.Vector} this
		 */
		addScaled: function(v, s) {
			this.x += (v.x * s);
			this.y += (v.y * s);
			return this;
		},
		
		/** Adds a number to both the x and y value of this vector
		 * 
		 * @param {Number} n The number to add.
		 * @returns {ex.base.Vector} The resulting vector.
		 */
		addNumber: function (n) {
		  this.x += n;
		  this.y += n;
		  return this;
		},
		
		/**
		 * Subtracts a vector from this vector.
		 * @function
		 * @name subtract
		 * @memberOf ex.base.Vector
		 * @param {ex.base.Vector} v the vector to be subtracted
		 * @returns {ex.base.Vector} this
		 */
		subtract: function(v) {
			this.x -= v.x;
			this.y -= v.y;
			return this;
		},
		
		/**
		 * Scales the vector.
		 * @function
		 * @name scale
		 * @memberOf ex.base.Vector
		 * @param {Nummber} s scalar value
		 * @returns {ex.base.Vector} this
		 */
		scale: function(s) {
			this.x *= s;
			this.y *= s;
			return this;
		},
		
		/**
		 * Returns the magnitude of the vector from the 
		 * supplied vector to this vector. (Magnitude of B-A)
		 * @function
		 * @name distance
		 * @memberOf ex.base.Vector
		 * @param {ex.base.Vector} vectorB vector to check distance between
		 * @returns {Number} magnitude of vectorB - this
		 */
		distance: function(vectorB) {
			return Math.sqrt((this.x - vectorB.x)*(this.x - vectorB.x) 
					+ (this.y - vectorB.y)*(this.y - vectorB.y));
		},
		
		/**
		 * Returns the magnitude of the vector
		 * @function
		 * @name length
		 * @memberOf ex.base.Vector
		 * @returns {Number} magnitude of this vector
		 */
		length: function() {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		},
		
		/**
		 * Creates a copy of this vector (instead of a pointer if
		 * called directly).
		 * @function
		 * @name clone
		 * @memberOf ex.base.Vector
		 * @returns {ex.base.Vector} a copy of this
		 */
		clone: function() {
			return new ex.base.Vector(this.x, this.y);
		},
		
		/**
		 * Rotates the vector by the supplied value in radians.
		 * @function
		 * @name rotate
		 * @memberOf ex.base.Vector
		 * @param {Number} rad radians to rotate by
		 * @returns {ex.base.Vector} this
		 */
		rotate: function(rad) {
	    var cos = Math.cos(rad), sin = Math.sin(rad), x = this.x, y = this.y;
	    this.x = x * cos - y * sin;
	    this.y = x * sin + y * cos;
	    return this;
  	},
  	
  	/**
  	 * Equality check between this vector and another.
  	 * 
  	 * @function
  	 * @name equals
  	 * @memberOf ex.base.Vector
  	 * 
  	 * @param {ex.base.Vector} vector2 vector to test equality against
  	 * @returns {Boolean}
  	 */
  	equals: function(vector2) {
  	  if(this.x != vector2.x){
  	    return false;
  	  } else if (this.y != vector2.y) {
  	    return false;
  	  } else {
  	    return true;
  	  }
  	},
  	
  	inverse: function () {
      this.x = 1 / this.x;
      this.y = 1 / this.y;
      return this;
    },
    
    /**
     * Trims this vector to the positive and negative values of
     * the other vector.
     */
    limit: function (v) {
      if(this.x > v.x) this.x = v.x;
      else if(this.x < -v.x) this.x = -v.x;
      if(this.y > v.y) this.y = v.y;
      else if(this.y < -v.y) this.y = -v.y;
    }
	});
}());
