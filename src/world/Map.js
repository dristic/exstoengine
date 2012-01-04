ex.using([ 
    'ex.world.Layer' 
], function() {
	ex.define("ex.world.Map", {
		/**
		 * Builds the map with a name and an empty set of layers
		 * 
		 * @name ex.world.Map
		 * 
		 * @param {String} name name of map
		 * 
		 * @property {String} name
		 * @property {ex.world.Layer[]} layers
		 * 
		 * @constructor
		 */
		constructor : function(name) {
			this.name = name;
			this.layers = [];
		},

		/**
		 * Adds a layer to the the end of layers.
		 * 
		 * @function
		 * @name addLayer
		 * @memberOf ex.world.Map
		 * 
		 * @param layer
		 */
		addLayer : function(layer) {
			if (layer != null){
				this.layers.push(layer);
			}
		},
		
		/**
		 * Retrieves a layer from the map by name.
		 * 
		 * @function
		 * @name getLayer
		 * @memberOf ex.world.Map
		 * 
		 * @param {String} name
		 * @returns {ex.world.Layer} returns null if no layer is found
		 * 		by the supplied name.
		 */
		getLayer: function(name) {
			if(name == null)
				return null;
			
			var index = this.layers.length;
			while(index--){
				if(this.layers[index].name == name){
					return this.layers[index];
				}
			}
			
			// if not found...
			return null;
		},

		/**
		 * Removes the layer at the specified index.
		 * 
		 * @function
		 * @name removeLayer
		 * @memberOf ex.world.Map
		 * 
		 * @param {String} name name of layer to remove
		 */
		removeLayer : function(name) {
			var index = this.layers.length;
			while(index--) {
				if(this.layers[index].name == name){
					this.layers.splice(index, 1);
				}
			}
		},

		/**
		 * Toggles layer visiblity.
		 * 
		 * @function
		 * @name toggleLayer
		 * @memberOf ex.world.Map
		 * 
		 * @param {Number} layerId index of layer to toggle
		 */
		toggleLayer : function(layerId) {
			var layer = this.layers[layerId];
			layer.visible = !layer.visible;
		},

		/**
		 * Performs actions every time period dt.
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.world.Map
		 * 
		 * @param {Number} dt delta time, length of each time cycle
		 */
		update : function(dt) {
			var index = this.layers.length;
			while(index--) {
				this.layers[index].update(dt);
			}
		},

		/**
		 * Supplies a canvas context and camera parameters for
		 * rendering to the canvas.
		 * 
		 * @function
		 * @name render
		 * @memberOf ex.world.Map
		 * 
		 * @param {Context} context canvas context to draw with
		 * @param {Number} camX camera offset on x
		 * @param {Number} camY camera offset on y
		 * @param {Number} camWidth viewport width
		 * @param {Number} camHeight viewport height
		 */
		render : function(context, camX, camY, camWidth, camHeight) {
			var i = this.layers.length;
			while (i--) {
				this.layers[i].render(context, camX, camY, camWidth, camHeight);
			}
		}
	});
});