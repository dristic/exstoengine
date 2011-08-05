ex.using([
   "ex.simplex.Layer"       
], function () {
	ex.namespace("ex.simplex");
	
	var MapLayer = new ex.Class(ex.simplex.Layer, {
		constructor: function($name, $frame){
			this._super("constructor", [$name, $frame]);
		}
	});
	
	ex.simplex.MapLayer = MapLayer;
});