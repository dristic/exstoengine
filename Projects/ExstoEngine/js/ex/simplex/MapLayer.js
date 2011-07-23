(function () {
	ex.namespace("ex.simplex");
	
	var MapLayer = new ex.Class({
		constructor: function($name, $frame){
			this.name = $name;
			this.frame = $frame;
			this.sublayers = new Array();
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
		}
	});
	
	window.ex.simplex.MapLayer = MapLayer;
}());