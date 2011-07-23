(function () {
	ex.namespace("ex.simplex");
	
	var ToolLayer = new ex.Class({
		constructor: function($name, $frame){
			this.name = $name;
			this.frame = $frame;
			this.sublayers = new Array();
			
			this.addLayer(new ex.simplex.ImageLayer("Tool Viewer BG", 800, 500, null));
		},
		
		addLayer: function($layer){
			$layer.frame = this.frame;
			this.sublayers.push($layer);
		},
		
		update: function($dt){
			
		},
		
		render: function($context, $camX, $camY){
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
	
	window.ex.simplex.ToolLayer = ToolLayer;
}());