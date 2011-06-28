(function () {
	ex.namespace("ex.display");
	
	var ImageRepository = new ex.Class({
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
			this.img[$name].onload = function () {
				ImageRepository.imagesLoaded++;
				if(ImageRepository.imagesLoaded == ImageRepository.imagesToLoad) {
					ImageRepository.ready = true;
				}
			};
			
			//--Image caching fix
			this.img[$name].src = "";
			this.img[$name].src = $dir;
		}
	});
	
	window.ex.display.ImageRepository = ImageRepository;
	
}());