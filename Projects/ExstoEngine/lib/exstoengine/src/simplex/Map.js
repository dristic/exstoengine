/**
 * @class A single environment that can be loaded into the world. In most cases,
 *        can be considered one game level or zone.
 * @param name
 *            {String}: name of map
 * @param layers
 *            {Array}: contains all layers in order of z-index
 */
ex.using([ 'ex.simplex.Layer' ], function() {
	ex.define("ex.simplex.Map", {
		/**
		 * Builds the map with a name and an empty set of layers
		 * 
		 * @param $name
		 *            {String}: name of map
		 * @constructor
		 */
		constructor : function($name) {
			this.name = $name;
			this.layers = [];
		},

		/**
		 * Adds a layer to the map with the supplied items
		 * 
		 * @param $name
		 *            {String}: name of the layer
		 * @param $items
		 *            {Array}: array of items to be included in the layer
		 */
		addLayer : function($name, $items) {
			if ($name != null && $items != null) {
				var newLayer = new ex.simplex.Layer($name);
				newLayer.items = $items;
				this.layers.push(newLayer);
			}
		},

		/**
		 * Removes the layer at the specified index
		 * 
		 * @param $index
		 *            {Number}: location of layer in array
		 */
		removeLayer : function($index) {
			if ($index < 0 || $index >= this.layers.length) {
				return;
			}
			this.layers.splice($index, 1);
		},

		/**
		 * toggles layer visiblity
		 * 
		 * @param $layerId
		 *            {Number}: index of layer to toggle
		 */
		toggleLayer : function($layerId) {
			var layer = this.layers[$layerId];
			layer.visible = !layer.visible;
		},

		/**
		 * performs actions every time period dt
		 * 
		 * @param $dt
		 *            {Number}: delta time, length of each time cycle
		 */
		update : function($dt) {

		},

		/**
		 * Supplies a canvas context and camera offset to each layer and calls
		 * their render functions
		 * 
		 * @param $context
		 *            {Context}: canvas context to draw with
		 * @param $camX
		 *            {Number}: camera offset on x
		 * @param $camY
		 *            {Number}: camera offset on y
		 */
		render : function($context, $camX, $camY) {
			var i = this.layers.length;
			while (i--) {
				this.layers[i].render($context, $camX, $camY);
			}
		}
	});
});