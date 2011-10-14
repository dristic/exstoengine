(function () {
	ex.define("ex.world.Tile", {
		constructor: function(value, position, width, height, neighborTop, neighborBottom, neighborLeft, neighborRight) {
			this.value = value;
			this.position = position;
			this.width = width;
			this.height = height;
			this.mass = 1;
			// Pointers to adjacent tiles
			this.neighbors = {
					top: 	neighborTop,
					bottom: neighborBottom,
					left: 	neighborLeft,
					right: 	neighborRight
			};
			// Collision information
			this.edges = {
					top: 	false,
					bottom: false,
					left: 	false,
					right: 	false
			};
			
			this.update();
		},
		
		update: function(requestedByNeighbor) {
			if(this.value == 0){
				this._setAllEdgesTo(false);
			}
			// Set edge based on upper neighbor
			if(!this.neighbors.top || this.neighbors.top.value == 0) {
				this.edges.top = true;
			} else {
				this.edges.top = false;
			}
			// Set edge based on lower neighbor
			if(!this.neighbors.bottom || this.neighbors.bottom.value == 0) {
				this.edges.bottom = true;
			} else {
				this.edges.bottom = false;
			}
			// Set edge based on left neighbor
			if(!this.neighbors.left || this.neighbors.left.value == 0) {
				this.edges.left = true;
			} else {
				this.edges.left = false;
			}
			// Set edge based on right neighbor
			if(!this.neighbors.right || this.neighbors.right.value == 0) {
				this.edges.right = true;
			} else {
				this.edges.right = false;
			}
			
			// Keeps the update request from cascading across the map
			if(!requestedByNeighbor){
				this.updateNeighbors();
			}
		},
		
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
		
		setValue: function(value) {
			this.value = value;
			this.update();
		},

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
