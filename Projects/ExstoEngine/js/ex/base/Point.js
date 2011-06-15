(function () {
	
	var Point = new ex.Class({
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
	
	window.ex.base.Point = Point;
	
}());
