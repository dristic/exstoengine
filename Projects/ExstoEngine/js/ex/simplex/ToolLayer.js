ex.using([
   "ex.simplex.Layer"          
], function () {
	ex.define("ex.simplex.ToolLayer", ex.simplex.Layer, {
		constructor: function($name, $frame){
			this._super("constructor", [$name, $frame]);
			
			this.addLayer(new ex.simplex.ImageLayer("Tool Viewer BG", 800, 500, null));
			
		},
		
		render: function($context, $camX, $camY){
			if(!this.isVisible())
				return;
			
			var count = this.sublayers.length;
			var currentLayer = 0;
			while(count--){
				this.sublayers[currentLayer].render($context, $camX, $camY);
				currentLayer++;
			}
			
			var x = 60;
		    var y = 25;
		    $context.font = "20pt Calibri";
		    $context.fillStyle = "#f7941d"; // text color
		    $context.fillText(this.name, this.frame.offsetX + x, this.frame.offsetY + y);
		}
	});
});