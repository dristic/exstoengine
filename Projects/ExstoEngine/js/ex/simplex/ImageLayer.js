ex.using([
    "ex.simplex.Layer"
], function () {
	ex.define("ex.simplex.ImageLayer", ex.simplex.Layer, {		
		constructor: function($name, $width, $height, $image){
			this._super("constructor", [$name, null]);
			
			this.width = $width;
			this.height = $height;
			this.image = $image;
		},
		
		render: function($context, $camX, $camY){
			if(!this.isVisible())	// Don't render if it won't be seen
				return;
			
			if(!this.image){
				$context.fillStyle = '#888888';
				if(!this.frame){
					$context.fillRect(
							0,0,
							this.width, this.height
					);
				} else {
					$context.fillRect(
							this.frame.offsetX, this.frame.offsetY, 
							this.frame.width, this.frame.height
					);
				}
			} else {
				if(!this.frame){
					$context.drawImage(
							this.image,
							0,0,
							this.width, this.height);
				} else {
					$context.drawImage(
							this.image, 
							this.frame.topLeftX, this.frame.topLeftY,
							this.frame.width, this.frame.height,
							this.frame.offsetX, this.frame.offsetY,
							this.frame.width, this.frame.height);
				}
			}
		}
	});
});