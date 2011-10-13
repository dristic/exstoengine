(function () {
	ex.define("ex.world.Tile", {
		constructor: function(value, position, width, height, neighborUp, neighborDown, neighborLeft, neighborRight) {
			this.value = value;
			this.position = position;
			this.width = width;
			this.height = height;
			// Pointers to adjacent tiles
			this.neighbors = {
					up: 	neighborUp,
					down: 	neighborDown,
					left: 	neighborLeft,
					right: 	neighborRight
			};
			// Collision information
			this.edges = {
					up: 	false,
					down: 	false,
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
			if(!this.neighbors.up || this.neighbors.up.value == 0) {
				this.edges.up = true;
			} else {
				this.edges.up = false;
			}
			// Set edge based on lower neighbor
			if(!this.neighbors.down || this.neighbors.down.value == 0) {
				this.edges.down = true;
			} else {
				this.edges.down = false;
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
