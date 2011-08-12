(function () {
	ex.define("ex.display.ImageRepository", {
		constructor: function () {
			this.img = [];
			this.ready = true;
			this.imagesLoaded = 0;
			this.imagesToLoad = 0;
		},
		
		loadImage: function ($name, $dir) {
			this.img[$name] = new Image();
			
			//--Image loading checking
			this.ready = false;
			this.imagesToLoad++;
			
			var that = this;
			this.img[$name].onload = function () {
				that.imagesLoaded++;
				if(that.imagesLoaded == that.imagesToLoad) {
					that.ready = true;
				}
			};
			
			//--Image caching fix
			this.img[$name].src = "";
			this.img[$name].src = $dir;
		}
	});	
}());
