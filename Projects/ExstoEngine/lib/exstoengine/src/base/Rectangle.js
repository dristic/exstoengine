(function () {
	ex.define("ex.base.Rectangle", {
		constructor: function(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		},
		
		containsPoint: function(x, y) {
			if(x instanceof ExstoEngine.Base.Point) {
				if(x.x > this.x && x.x  < this.x + this.width 
				   && x.y > this.y && x.y < this.y + this.height) {
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
		
		shift: function(x, y) {
			this.x -= x;
			this.y -= y;
			return this;
		}
	});
}());
