ex.using([
    "ex.world.Tile",
    "ex.base.Vector"
], function () {
	ex.define("ex.world.TileMap", {
		constructor: function(tileWidth, tileHeight, map) {
			this.tileWidth = tileWidth;
			this.tileHeight = tileHeight;
			this.data = convertValueMapToTileMap(map, tileWidth, tileHeight);
			setupNeighbors(this.data);
			
			//--Calculate width and height
			this.width = map[0].length * this.tileWidth;
			this.height = map.length * this.tileHeight;
		},
		
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
					tiles[yPos][xPos].neighbors.up = null;
					tiles[yPos][xPos].neighbors.down = tiles[yPos + 1][xPos];
				} else if(yPos == tiles.length - 1) {
					tiles[yPos][xPos].neighbors.up = tiles[yPos - 1][xPos];
					tiles[yPos][xPos].neighbors.down = null;
				} else {
					tiles[yPos][xPos].neighbors.up = tiles[yPos - 1][xPos];
					tiles[yPos][xPos].neighbors.down = tiles[yPos + 1][xPos];
				}
				tiles[yPos][xPos].update();
			}
		}
	};
});