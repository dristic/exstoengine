(function () {
	ex.define("ex.display.Camera", {
		constructor: function() {
			this.x = 0;
			this.y = 0;
			this.following = null;
			this.canvas = null;
		},
		
		update: function(dt) {
			if(this.following != null && this.canvas != null) {
				this.x = this.following.position.x + (this.following.width >> 1) - (this.canvas.width >> 1);
				this.y = this.following.position.y + (this.following.height >> 1) - (this.canvas.height >> 1);
			}
		},
		
		move: function(x, y) {
			this.x += x;
			this.y += y;
		},
		
		moveTo: function (x, y) {
			this.x = x;
			this.y = y;
		},
		
		follow: function (object) {
			this.following = object;
		}
	});
}());
