(function () {
	ex.define("ex.world.TileMap", {
		constructor: function(tileWidth, tileHeight, map) {
			this.tileWidth = tileWidth;
			this.tileHeight = tileHeight;
			this.map = map;
			
			//--Calculate width and height
			this.width = this.map[0].length * this.tileWidth;
			this.height = this.map.length * this.tileHeight;
		},
		
		getTile: function(x, y) {
			x = Math.floor(x / this.tileWidth);
			y = Math.floor(y / this.tileHeight);
			
			if(x >= 0 && x < this.map[0].length && 
					y >= 0 && y < this.map.length){
				return this.map[y][x];
			} else {
				return null;
			}
		},
		
		setTile: function(x, y, value) {
			x = Math.floor(x / this.tileWidth);
			y = Math.floor(y / this.tileHeight);
			this.map[y][x] = value;
		}
	});
}());
