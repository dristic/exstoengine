ex.using([
   "ex.simplex.Layer"       
], function () {
	ex.define("ex.simplex.MapLayer", ex.simplex.Layer, {
		constructor: function($name, $frame){
			this._super("constructor", [$name, $frame]);
		}
	});
});