(function () {
	
	var Vector = new ExstoEngine.Base.Class(null, {
		constructor: function(x, y) {
			this.x = x || 0;
			this.y = y || 0;
		},
		
		add: function(v) {
			this.x += v.x;
			this.y += v.y;
			return this;
		},
		
		addScaled: function(v, s) {
			this.x += (v.x * s);
			this.y += (v.y * s);
			return this;
		},
		
		subtract: function(v) {
			this.x -= v.x;
			this.y -= v.y;
		},
		
		scale: function(s) {
			this.x *= s;
			this.y *= s;
			return this;
		},
		
		distance: function(v) {
			return Math.sqrt(Math.pow((this.x - v.x), 2) + Math.pow((this.y - v.y), 2));
		},
		
		length: function() {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		},
		
		clone: function() {
			return new ExstoEngine.Base.Vector(this.x, this.y);
		},
		
		rotate: function(rad) {
		    var cos = Math.cos(rad), sin = Math.sin(rad), x = this.x, y = this.y;
		    this.x = x * cos - y * sin;
		    this.y = x * sin + y * cos;
		    return this;
	  	}
	});
	
	window.ExstoEngine.Base.Vector = Vector;
	
}());
