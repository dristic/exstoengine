(function () {
	ex.define("ex.display.ImageRepository", {
		
		/**
		 * Manages the loading and retrieving of images for the game.
		 * 
		 * @name ex.display.ImageRepository
		 * 
		 * @property {ex.display.Image[]} images array of managed images.
		 * @property {Boolean} ready true if imagesLoaded == imagesToLoad
		 * 		Internal use only. Do not change!
		 * @property {Number} imagesLoaded number of images loaded.
		 * 		Internal use only. Do not change!
		 * @property {Number} imagesToLoad number of images to load.
		 * 		Internal use only. Do not change!
		 * 
		 * @constructor
		 */
		constructor: function () {
			this.images = [];
			this.ready = true;
			this.imagesLoaded = 0;
			this.imagesToLoad = 0;
		},
		
		/**
		 * Retrieves an image by name from the repository.
		 * 
		 * @function
		 * @name getImage
		 * @memberOf ex.display.ImageRepository
		 * 
		 * @param {String} name
		 * @returns {ex.display.Image} returns null if name is not found
		 */
		getImage: function(name) {
			return this.images[name];
		},
		
		/**
		 * Loads an image, creates an ex.base.Image, and gives it a name.
		 * @param {String} name
		 * @param {String} filePath
		 */
		loadImage: function (name, filePath) {
			this.images[name] = new Image();
			
			//--Image loading checking
			this.ready = false;
			this.imagesToLoad++;
			
			var that = this;
			this.images[name].onload = function () {
				that.imagesLoaded++;
				if(that.imagesLoaded == that.imagesToLoad) {
					that.ready = true;
				}
			};
			
			//--Image caching fix
			this.images[name].src = "";
			this.images[name].src = filePath + '? ex=' + (new Date()).getTime();
		}
	});	
}());
