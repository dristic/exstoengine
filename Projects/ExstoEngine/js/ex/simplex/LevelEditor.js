ex.using([
    "ex.simplex.ImageLayer",
], function () {
	ex.namespace("ex.simplex");
	
	var LevelEditor = new ex.Class({
		constructor: function($width, $height, $bgImage){
			this.xOffset = 0;
			this.yOffset = 0;
			this.width = $width;
			this.height = $height;
			
			var mapFrame = {
					topLeftX: 0, 
					topLeftY: 0,
					width: 900,
					height:500,
					offsetX: 20,
					offsetY: 50
			};
			
			var toolFrame = {
					topLeftX: 0, 
					topLeftY: 0,
					width: 240,
					height:500,
					offsetX: 940,
					offsetY: 50
			};
			
			var popupFrame = {
					topLeftX: 0, 
					topLeftY: 0,
					width: $width,
					height:$height,
					offsetX: 0,
					offsetY: 0
			};
			
			this.backgroundLayer = new ex.simplex.ImageLayer("Background", $width, $height, $bgImage);
			this.mapLayer = new ex.simplex.Layer("Map", mapFrame);
			this.toolLayer = new ex.simplex.Layer("Tool Viewer", toolFrame);
			this.popupLayer = new ex.simplex.Layer("Popup", popupFrame);
		},
		
		addMapLayer: function($layer){
			this.mapLayer.addLayer($layer);
		},
		
		update: function($dt){
			
		},
		
		render: function($context, $camX, $camY){
			this.backgroundLayer.render($context, $camX, $camY);
			this.mapLayer.render($context, $camX, $camY);
			this.toolLayer.render($context, $camX, $camY);
			this.popupLayer.render($context, $camX, $camY);
		}
	});
	
	window.ex.simplex.LevelEditor = LevelEditor;
});