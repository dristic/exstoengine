(function () {
	ex.namespace("ex.display");
	
	var Camera = new ex.Class({
		constructor: function() {
			this.x = 0;
			this.y = 0;
			this.following = null;
			this.canvas = null;
		},
		
		update: function(dt) {
			if(this.following != null && this.canvas != null) {
				this.x = this.following.x + (this.following.width >> 1) - (this.canvas.width >> 1);
				this.y = this.following.y + (this.following.height >> 1) - (this.canvas.height >> 1);
			}
		},
		
		follow: function (object) {
			this.following = object;
		}
	});
	
	window.ex.display.Camera = Camera;
	
}());
