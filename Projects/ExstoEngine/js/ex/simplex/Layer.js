(function () {
	ex.namespace("ex.simplex");
	
	var Layer = new ex.Class({
		constructor: function($name, $frame){
			this.name = $name;
			this.frame = $frame;
			this.sublayers = new Array();
			this.visible = true;
			this.opacity = 1.0;
		},
		
		addLayer: function($layer){
			$layer.frame = this.frame;
			$layer.visible = this.visible;
			$layer.opacity = this.opacity;
			this.sublayers.push($layer);
		},
		
		update: function($dt){
			
		},
		
		isVisible: function(){
			if(this.visible && this.opacity > 0.0){
				return true;
			} else {
				return false;
			}
		},
		
		render: function($context, $camX, $camY){
			if(!this.isVisible())	// Don't render if it won't be seen
				return;
		
			var count = this.sublayers.length;
			var currentLayer = 0;
			while(count--){
				this.sublayers[currentLayer].render($context, $camX, $camY);
				currentLayer++;
			}
		}
	});
	
	ex.simplex.Layer = Layer;
}());