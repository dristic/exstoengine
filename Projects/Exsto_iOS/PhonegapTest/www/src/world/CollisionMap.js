ex.using([
  "ex.base.Point",
  "ex.world.TileMap"
], function () {
	ex.define("ex.world.CollisionMap", ex.world.TileMap, {
		constructor: function(tileWidth, tileHeight, data, debug, debugImages) {
			this.tileWidth = tileWidth;
			this.tileHeight = tileHeight;
			this.collides = true;
			
			this.position = new ex.base.Vector(0,0);
			this.scrollFactor = new ex.base.Vector(1,1);
			
			this.type = "TileMap";
			
			this.debug = debug;
			
			this.debugImages = debugImages;
			
			this._super("constructor", [tileWidth, tileHeight, data]);
		},
		
		/**
		 * 
		 */
		onCollide: function(){
			
		},
		
		/**
		 * 
		 * @param x
		 * @param y
		 * @returns
		 */
		getTile: function(x, y) {
			x = Math.floor(x / this.tileWidth);
			y = Math.floor(y / this.tileHeight);
			
			if(x >= 0 && y >= 0 &&
					y < this.data.length && x < this.data[y].length) {
				return this.data[y][x];
			} else {
				return null;
			}
		},
		
		/**
		 * 
		 * @param x
		 * @param y
		 * @param value
		 */
		setTile: function(x, y, value) {
			var tile = this.getTile(x,y);
			if(tile != null){
				tile.value = value;
			}
		},
		
		update: function(dt) {
			
		},
		
		render: function(context, camX, camY){
			// This has no render view
		},
		
		/**
		 * 
		 */
		debugRender: function(context, camX, camY) {
			var tile = null;
			var yPos = 0,
				xPos = 0;
			for(yPos = 0; yPos < this.data.length; yPos++){
				for(xPos = 0; xPos < this.data[yPos].length; xPos++){
					tile = this.data[yPos][xPos];
					if(tile.value != 0){
						this._renderTileEdges(context, camX, camY, tile);
					}
				}
			}
		},
	
		/**
		 * 
		 * @param context
		 * @param camX
		 * @param camY
		 * @param tile
		 */
		_renderTileEdges: function(context, camX, camY, tile) {
			if(tile.edges.left){
				context.drawImage(this.debugImages.left,
						tile.position.x - (camX * this.scrollFactor.x),
						tile.position.y - (camY * this.scrollFactor.y),
						tile.width,
						tile.height);
			}
			if(tile.edges.right){
				context.drawImage(this.debugImages.right,
						tile.position.x - (camX * this.scrollFactor.x),
						tile.position.y - (camY * this.scrollFactor.y),
						tile.width,
						tile.height);
			}
			if(tile.edges.top){
				context.drawImage(this.debugImages.top,
						tile.position.x - (camX * this.scrollFactor.x),
						tile.position.y - (camY * this.scrollFactor.y),
						tile.width,
						tile.height);
			}
			if(tile.edges.bottom){
				context.drawImage(this.debugImages.bottom,
						tile.position.x - (camX * this.scrollFactor.x),
				      	tile.position.y - (camY * this.scrollFactor.y),
				      	tile.width,
				      	tile.height);
			}
		}
	});
});