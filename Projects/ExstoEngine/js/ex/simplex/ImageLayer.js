(function () {
	ex.namespace("ex.simplex");
	
	var ImageLayer = new ex.Class({		
		constructor: function($name, $width, $height, $image){
			this.name = $name;
			this.width = $width;
			this.height = $height;
			this.image = $image;
			this.frame = null;
		},
		
		update: function($dt){
			
		},
		
		render: function($context, $camX, $camY){
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
	
	window.ex.simplex.ImageLayer = ImageLayer;
}());