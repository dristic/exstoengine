(function () {
	
	var Point = new ExstoEngine.Base.Class(null, {
		constructor: function(x, y) {
			this.x = x;
			this.y = y;
		},
		
		add: function(other) {
			this.x += other.x;
			this.y += other.y;
		},
		
		subtract: function(other) {
			this.x -= other.x;
			this.y -= other.y;
		}
	});
	
	window.ExstoEngine.Base.Point = Point;
	
}());
