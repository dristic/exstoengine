/**
 * Displays an image with a given position, width, and height
 * 
 * @class ex.display.Image
 * @param image
 *            {Image}: image to be displayed
 * @param position
 *            {ex.base.Point}: position of the image
 * @param size
 *            {ex.base.Vector}: size of the image
 */
ex.using([ 'ex.base.Point', 'ex.base.Vector' ], function() {
	ex.define("ex.display.Image", {
		/**
		 * 
		 * @param $image
		 *            {Image}: image to be displayed
		 * @param $position
		 *            {ex.base.Point}: starting position of image
		 * @param $size
		 *            {ex.base.Vector}: starting size of image
		 * @constructor
		 */
		constructor : function($image, $position, $size, $name) {
			this.visible = true;
			this.type = "Image";
			this.name = $name;
			this.position = $position || new ex.base.Point(0, 0);
			this.size = $size
					|| new ex.base.Vector($image.width, $image.height);
			this.image = $image;
			
			// If the image is not loaded reset size when it loads
			if(this.image.complete == false) {
				ex.event.listenOnce(this.image, 'load', this.autoSize, this);
			}
		},
		
		/**
		 * Auto sizes this object's width and height to the image supplied, and removes
		 * any event listeners on the image for loading
		 * 
		 * @return {ex.base.Vector} The new size
		 */
		autoSize: function () {
			this.size = new ex.base.Vector(this.image.width, this.image.height);
			//console.log(this.size.x + " : " + this.size.y);
			return this.size;
		},

		/**
		 * Retrieves an object containing the position an dsize of the rendered
		 * 		SpriteMap
		 * @returns {___anonymous479_619} the position and size of the rendered
		 * 				SpriteMap
		 */
		getBounds: function() {
			return {
				x		: this.x,
				y		: this.y,
				width	: this.size.x,
				height	: this.size.y
			};
		},
		
		/**
		 * performs actions every time period dt
		 * 
		 * @param $dt
		 *            {Number}: delta time, length of each time cycle
		 */
		update : function($dt) {

		},

		/**
		 * Supplies a canvas context and camera offset to each item and calls
		 * their render functions
		 * 
		 * @param $context
		 *            {Context}: canvas context to draw with
		 * @param $camX
		 *            {Number}: camera offset on x
		 * @param $camY
		 *            {Number}: camera offset on y
		 */
		render : function($context, $camX, $camY) {
			if(!this.visible){
				return;
			}
			
			if (this.image == null) {
				$context.fillStyle = '#888888';
				$context.fillRect(
						this.position.x, this.position.y,
						this.size.x, this.size.y
				);
			} else {
				$context.drawImage(
						this.image, 
						this.position.x - $camX, this.position.y - $camY, 
						this.size.x, this.size.y
				);
			}
		}
	});
});