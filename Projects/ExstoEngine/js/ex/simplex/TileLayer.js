ex.using([
	"ex.simplex.Layer"
], function () {
	ex.namespace("ex.simplex");
	
	var TileLayer = new ex.Class(ex.simplex.Layer, {
		constructor: function($name, $frame, $tileWidth, $tileHeight, $map, $img){
			this._super("constructor", [$name, null]);
			this.spriteMap = new ex.display.SpriteMap($tileWidth, $tileHeight, $map, $img);
			
			this.renderBuffer = document.createElement('canvas');
			this.renderBuffer.width = 1200;
			this.renderBuffer.height = 675;
			this.bufferContext = this.renderBuffer.getContext('2d');
		},
		
		render: function($context, $camX, $camY){
			if(!this.isVisible())	// Don't render if it won't be seen
				return;
			
			this.bufferContext.clearRect(0,0,this.renderBuffer.width, this.renderBuffer.height);
			
			if(!this.frame){
				this.spriteMap.render($context, $camX, $camY);
			} else {
				this.spriteMap.render(this.bufferContext, $camX, $camY);
				$context.drawImage(
						this.renderBuffer, 
						this.frame.topLeftX, this.frame.topLeftY,
						this.frame.width, this.frame.height,
						this.frame.offsetX, this.frame.offsetY,
						this.frame.width, this.frame.height);
			}
		}
	});
	
	window.ex.simplex.TileLayer = TileLayer;
});