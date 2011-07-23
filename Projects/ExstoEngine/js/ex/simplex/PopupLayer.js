(function () {
	ex.namespace("ex.simplex");
	
	var PopupLayer = new ex.Class({
		constructor: function($name, $frame){
			this.name = $name;
			this.sublayers = new Array();
			this.frame = $frame;
		},
		
		update: function($dt){
			
		},
		
		render: function($context, $camX, $camY){
			var x = 100;
		    var y = 40;
		    $context.font = "40pt Calibri";
		    $context.fillStyle = "#f7941d"; // text color
		    $context.fillText("Simplex Tile Editor", x, y);
		}
	});
	
	window.ex.simplex.PopupLayer = PopupLayer;
}());