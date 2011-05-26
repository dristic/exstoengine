/**
 * @author Dan
 */
var Page = new Class({
	constructor: function ($width, $height) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = $width;
		this.canvas.height = $height;
		this.context = this.canvas.getContext("2d");
		
		this.context.fillStyle = "rgb(255,255,255)";
		
		this.x = 0;
		this.y = 0;
		
		for(var i = 0; i < 10; i++) {
			var x = this.canvas.width * Math.random();
			var y = this.canvas.height * Math.random();
			
		    this.context.fillRect(x, y, 1, 1);
		}
	},
	
	scrollFactorX: 0,
	
	scrollFactorY: 0,
	
	drawImage: function($img, $x, $y) {
		var context = this.canvas.getContext("2d");
		context.drawImage($img, $x, $y);
	},
	
	render: function ($context, $camX, $camY) {
		$context.drawImage(this.canvas, this.x - (Camera.x * this.scrollFactorX), this.y - (Camera.y * this.scrollFactorY));
		//$context.drawImage(this.canvas,
		//				   0 - (Camera.x - this.scrollFactorX),
		//				   0 - (Camera.y - this.scrollFactorY),
		//				   800,
		//				   500,
		//				   0,
		//				   0,
		//				   800,
		//				   500);
	}
});
