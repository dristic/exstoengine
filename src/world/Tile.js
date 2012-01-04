(function () {
	ex.define("ex.world.Tile", {
		
		/**
		 * An individial tile in a TileMap.
		 * 
		 * @name ex.world.Tile
		 * 
		 * @param {Number} value
		 * @param {ex.base.Vector} position
		 * @param {Number} width
		 * @param {Number} height
		 * @param {ex.world.Tile} neighborTop
		 * @param {ex.world.Tile} neighborBottom
		 * @param {ex.world.Tile} neighborLeft
		 * @param {ex.world.Tile} neighborRight
		 * 
		 * @property {Number} value
		 * @property {ex.base.Vector} position
		 * @property {Number} width
		 * @property {Number} height
		 * @property {Number} mass used in collision detection
		 * 
		 * @constructor
		 */
		constructor: function(value, position, width, height, neighborTop, neighborBottom, neighborLeft, neighborRight) {
			this.value = value;
			this.position = position;
			this.width = width;
			this.height = height;
			this.mass = 1;
			this.visible = true;

			/**
			 * @name neighbors
			 * @memberOf ex.world.Tile
			 * 
			 * @property {ex.world.Tile} top
			 * @property {ex.world.Tile} bottom
			 * @property {ex.world.Tile} left
			 * @property {ex.world.Tile} right
			 */
			this.neighbors = {
					top: 	neighborTop,
					bottom: neighborBottom,
					left: 	neighborLeft,
					right: 	neighborRight
			};
			
			/**
			 * Used in collision edge detection. Each property is true 
			 * if the neighbor on that side is null or valued as a
			 * non-colliding tile (eg: empty space).
			 * 
			 * @name edges
			 * @memberOf ex.world.Tile
			 * 
			 * @property {Boolean} top
			 * @property {Boolean} bottom
			 * @property {Boolean} left
			 * @property {Boolean} right
			 */
			this.edges = {
					top: 	false,
					bottom: false,
					left: 	false,
					right: 	false
			};
			
			this.update();
		},
		
		/**
		 * The update call. Generally only called when a tile's value
		 * is changed or indirectly called when a neighboring tile's
		 * value changes.
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.world.Tile
		 * 
		 * @param {Boolean} requestedByNeighbor If true, this update request was 
		 * 		called by a neighbor. This results in the tile not updating 
		 * 		its own neighbors which would result in a resonance cascade 
		 * 		a la Half-Life. We wouldn't want that now, would we?
		 */
		update: function(requestedByNeighbor) {
			if(this.value == 0){
				this._setAllEdgesTo(false);
				if(!requestedByNeighbor) {
					this.updateNeighbors();
				}
				return;
			}
			// Set edge based on upper neighbor
			if(this.neighbors.top && this.neighbors.top.value == 0) {
				this.edges.top = true;
			} else if (!this.neighbors.top && this.value > 0) {
				this.edges.top = true;
			} else {
				this.edges.top = false;
			}
			// Set edge based on lower neighbor
			if(this.neighbors.bottom && this.neighbors.bottom.value == 0) {
				this.edges.bottom = true;
			} else if (!this.neighbors.bottom && this.value > 0) {
				this.edges.bottom = true;
			} else {
				this.edges.bottom = false;
			}
			// Set edge based on left neighbor
			if(this.neighbors.left && this.neighbors.left.value == 0) {
				this.edges.left = true;
			} else if (!this.neighbors.left && this.value > 0) {
				this.edges.left = true;
			} else {
				this.edges.left = false;
			}
			// Set edge based on right neighbor
			if(this.neighbors.right && this.neighbors.right.value == 0) {
				this.edges.right = true;
			} else if (!this.neighbors.right && this.value > 0) {
				this.edges.right = true;
			} else {
				this.edges.right = false;
			}
			
			// Keeps the update request from cascading across the map
			if(!requestedByNeighbor){
				this.updateNeighbors();
			}
		},
		
		/**
		 * Calls each neighbor's update function if the neighbor exists.
		 * 
		 * @function
		 * @name updateNeighbors
		 * @memberOf ex.world.Tile
		 */
		updateNeighbors: function() {
			if(this.neighbors.up){
				this.neighbors.up.update(true);
			}
			if(this.neighbors.down){
				this.neighbors.down.update(true);
			}
			if(this.neighbors.left){
				this.neighbors.left.update(true);
			}
			if(this.neighbors.right){
				this.neighbors.right.update(true);
			}
		},
		
		/**
		 * Sets the value of the tile to the given value.
		 * 
		 * @function
		 * @name setValue
		 * @memberOf ex.world.Tile
		 * 
		 * @param {Number} value
		 */
		setValue: function(value) {
			this.value = value;
			this.update();
		},
		
		/**
		 * Sets the position of the tile to the given value.
		 * Not recommended for use, can cause lots of confusion with
		 * neighbors. I don't even know why I left this in here.
		 * 
		 * @function
		 * @name setPosition
		 * @memberOf ex.world.Tile
		 * 
		 * @param {Number} x
		 * @param {Number} y
		 */
		setPosition: function(x, y) {
			this.position.x = x;
			this.position.y = y;
		},
		
		_setAllEdgesTo: function(value) {
			this.edges.up 		= 	value;
			this.edges.down 	= 	value;
			this.edges.left 	= 	value;
			this.edges.right 	= 	value;
		}
	});
}());
