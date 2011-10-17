ex.using([
    "ex.world.Tile",
    "ex.base.Vector"
], function () {
	ex.define("ex.world.TileMap", {
		
		/**
		 * A 2D grid of ex.world.Tile objects used to create a game level.
		 * 
		 * @name ex.world.TileMap
		 * 
		 * @param {Number} tileWidth the uniform width of each tile.
		 * 		Do not change once set, can and most likely will cause
		 * 		odd behavior.
		 * @param {Number} tileHeight the uniform height of each tile.
		 * 		Do not change once set, can and most likely will cause
		 * 		odd behavior.
		 * @param {Number[][]} map the 2D numerical values for each tile.
		 * 		These values will be converted into ex.world.Tile objects
		 * 		during initialization.
		 * 
		 * @property {Number} tileWidth
		 * @property {Number} tileHeight
		 * @property {ex.world.Tile[][]} data 2D grid of ex.world.Tile objects
		 * @property {Number} width total width of the map
		 * @property {Number} height total height of the map
		 * 
		 * @constructor 
		 */
		constructor: function(tileWidth, tileHeight, map) {
			this.tileWidth = tileWidth;
			this.tileHeight = tileHeight;
			this.data = convertValueMapToTileMap(map, tileWidth, tileHeight);
			setupNeighbors(this.data);
			
			//--Calculate width and height
			this.width = map[0].length * this.tileWidth;
			this.height = map.length * this.tileHeight;
		},
		
		/**
		 * Retrieves a tile at the supplied x, y position.
		 * 
		 * @function
		 * @name getTile
		 * @memberOf ex.world.TileMap
		 * 
		 * @param {Number} x
		 * @param {Number} y
		 * @returns {ex.world.Tile
		 */
		getTile: function(x, y) {
			x = Math.floor(x / this.tileWidth);
			y = Math.floor(y / this.tileHeight);
			
			if(x >= 0 && x < this.data[0].length && 
					y >= 0 && y < this.data.length){
				return this.data[y][x];
			} else {
				return null;
			}
		},
		
		/**
		 * Sets a tile at the given x,y position to the given value.
		 * 
		 * @function
		 * @name setTile
		 * @memberOf ex.world.TileMap
		 * 
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} value
		 */
		setTile: function(x, y, value) {
			x = Math.floor(x / this.tileWidth);
			y = Math.floor(y / this.tileHeight);
			this.data[y][x].setValue(value);
		}
	});
	
	function convertValueMapToTileMap(tileData, tileWidth, tileHeight) {
		var yPos = 0;
		var xPos = 0;
		for(yPos; yPos < tileData.length; yPos++) {
			for(xPos = 0; xPos < tileData[yPos].length; xPos++) {
				tileData[yPos][xPos] = new ex.world.Tile(
						tileData[yPos][xPos],
						new ex.base.Vector(xPos * tileWidth, yPos * tileHeight),
						tileWidth,
						tileHeight);
			}
		}
		return tileData;
	};
	
	function setupNeighbors(tiles) {
		var yPos = 0;
		var xPos = 0;
		for(yPos; yPos < tiles.length; yPos++) {
			for(xPos = 0; xPos < tiles[yPos].length; xPos++) {
				if(xPos == 0) {
					tiles[yPos][xPos].neighbors.left = null;
					tiles[yPos][xPos].neighbors.right = tiles[yPos][xPos + 1];
				} else if(xPos == tiles[yPos].length - 1) {
					tiles[yPos][xPos].neighbors.left = tiles[yPos][xPos - 1];
					tiles[yPos][xPos].neighbors.right = null;
				} else {
					tiles[yPos][xPos].neighbors.left = tiles[yPos][xPos - 1];
					tiles[yPos][xPos].neighbors.right = tiles[yPos][xPos + 1];
				}
				if(yPos == 0) {
					tiles[yPos][xPos].neighbors.top = null;
					tiles[yPos][xPos].neighbors.bottom = tiles[yPos + 1][xPos];
				} else if(yPos == tiles.length - 1) {
					tiles[yPos][xPos].neighbors.top = tiles[yPos - 1][xPos];
					tiles[yPos][xPos].neighbors.bottom = null;
				} else {
					tiles[yPos][xPos].neighbors.top = tiles[yPos - 1][xPos];
					tiles[yPos][xPos].neighbors.bottom = tiles[yPos + 1][xPos];
				}
				tiles[yPos][xPos].update();
			}
		}
	};
});