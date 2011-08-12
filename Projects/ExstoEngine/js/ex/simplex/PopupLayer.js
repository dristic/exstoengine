ex.using([
   "ex.simplex.Layer"
], function () {
	ex.define("ex.simplex.PopupLayer", ex.simplex.Layer, {
		constructor: function($name, $frame){
			this._super("constructor", [$name, $frame]);
		},
		
		render: function($context, $camX, $camY){
			this._super("render", [$context, $camX, $camY]);
			
			var x = 100;
		    var y = 40;
		    $context.font = "40pt Calibri";
		    $context.fillStyle = "#f7941d"; // text color
		    $context.fillText("Simplex Tile Editor", x, y);
		}
	});
});