ex.using([
   "ex.simplex.Layer"       
], function () {
	ex.namespace("ex.simplex");
	
	var MapLayer = new ex.Class(window.ex.simplex.Layer, {
		constructor: function($name, $frame){
			this._super("constructor", [$name, $frame]);
		}
	});
	
	window.ex.simplex.MapLayer = MapLayer;
});