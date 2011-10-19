ex.using([ 
	'ex.base.Point', 
	'ex.base.Vector' 
], function() {
	ex.define("ex.world.Layer", {

		/**
		 * A collection of items at a certain z-index in a map.
		 * 
		 * @name ex.world.Layer
		 * 
		 * @param {String} name name of the layer (mostly for IDE purposes)
		 * @param {ex.display.SpriteMap} map tile data for the layer
		 * @param {ex.base.Point} origin origin of the layer, defaults to (0,0) 
		 * 		if not supplied
		 * @param {ex.base.Vector} scrollFactor a multiplier that affects the 
		 * 		scroll rate relative to the camera
		 * 
		 * @property {String} name the name of the layer (mostly for 
		 * 		labeling in the IDE)
		 * @property {Object[]} items an array of all items in the layer
		 * @property {Boolean} visible allows rendering if true
		 * @property {Number} opacity ranges from 0.0 - 1.0, this is the 
		 * 		transparency of the layer
		 * @property {ex.base.Vector} position the starting location of the 
		 * 		layer
		 * @property {ex.base.Vector} scrollFactor the multiplier for the 
		 * 		amount of scroll per pixel moved by the camera, can be 
		 * 		used to simulate depth of field.
		 * 
		 * @constructor
		 */
		constructor : function(name, map, origin, scrollFactor) {
			this.name = name;
			this.items = [];
			this.map = map;
			if(this.map != null) {
				this.items.push(this.map);
			}
			this.visible = true;
			this.opacity = 1.0;

			if (origin == null) {
				this.position = new ex.base.Point(0, 0);
			} else {
				this.position = origin;
			}

			if (scrollFactor == null) {
				this.scrollFactor = new ex.base.Vector(1, 1);
			} else {
				this.scrollFactor = scrollFactor;
			}
		},

		/**
		 * Adds an item to the layer, could be anything really...
		 * 
		 * @function
		 * @name addItem
		 * @memberOf ex.world.Layer
		 * 
		 * @param {Object} item something that belongs in the layer
		 */
		addItem : function(item) {
			if(item instanceof ex.world.CollisionMap){
				if(this.map == null){
					this._setMap(item);
				} else {
					console.error("Layers cannot contain more than one CollisionMap");
				}
			} else {
				item.visible = this.visible;
				item.opacity = this.opacity;
				this.items.push(item);
			}
		},
		
		_setMap : function(map) {
			this.map = map;
			this.items.push(this.map);
		},
		
		/**
		 * removes an item from the layer
		 * 
		 * @function
		 * @name removeItem
		 * @memberOf ex.world.Layer
		 * 
		 * @param {Number} index index of the item to remove
		 */
		removeItem: function(index) {
			if (index < 0 || index >= this.items.length) {
				return;
			}
			this.items.splice($index, 1);
		},

		/**
		 * Performs actions every time period dt
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.world.Layer
		 * 
		 * @param {Number} dt delta time, length of each time cycle
		 */
		update : function(dt) {
			var index = this.items.length;
			while(index--){
				this.items[index].update(dt);
			}
		},

		/**
		 * Checks properties and determines if layer is visible
		 * 
		 * @function
		 * @name isVisible
		 * @memberOf ex.world.Layer
		 * 
		 * @returns {Boolean}
		 */
		isVisible : function() {
			if (this.visible && this.opacity > 0.0) {
				return true;
			} else {
				return false;
			}
		},

		/**
		 * Toggles visibility of the layer.
		 * 
		 * @function
		 * @name toggleVisibility
		 * @memberOf ex.world.Layer
		 */
		toggleVisibility : function() {
			if (this.visible)
				this.hide();
			else
				this.show();
		},

		/**
		 * Sets visible property to true, does not affect opacity.
		 * 
		 * @function
		 * @name show
		 * @memberOf ex.world.Layer
		 */
		show : function() {
			this.visible = true;
		},

		/**
		 * Sets visible property to false, does not affect opacity.
		 * 
		 * @function
		 * @name hide
		 * @memberOf ex.world.Layer
		 */
		hide : function() {
			this.visible = false;
		},

		/**
		 * Supplies a canvas context and camera offset to each item and calls
		 * their render functions
		 * 
		 * @function
		 * @name render
		 * @memberOf ex.world.Layer
		 * 
		 * @param {Context} context canvas context to draw with
		 * @param {Number} camX camera offset on x
		 * @param {Number} camY camera offset on y
		 */
		render : function(context, camX, camY) {
			if (!this.isVisible()) // Don't render if it won't be seen
				return;
			
			// render items
			var count = this.items.length;
			while (count--) {
				this.items[count].render(context, camX * this.scrollFactor.x,
						camY * this.scrollFactor.y);
			}
		}
	});
});