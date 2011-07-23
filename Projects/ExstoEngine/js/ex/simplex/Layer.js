(function () {
	ex.namespace("ex.simplex");
	
	var Layer = new ex.Class({
		constructor: function($name, $frame){
			this.name = $name;
			this.frame = $frame;
			this.sublayers = new Array();
		},
		
		addLayer: function($layer){
			this.sublayers.push($layer);
		},
		
		update: function($dt){
			
		},
		
		render: function($context, $camX, $camY){
			
		},
		
		renderFrame: function($context, $camX, $camY){
			// Renders the layer with a certain offset and crops the image
			// at a specific size. (used to keep sublayers within their parent layers)
			
			// use this.frame
		}
	});
	
	ex.simplex.Layer = Layer;
});