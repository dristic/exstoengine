ex.using([
  "ex.world.TileMap",
  //"ex.base.Vector"
], function () {
	ex.define("ex.display.SpriteMap", ex.world.TileMap, {
		constructor: function(tileWidth, tileHeight, map, img, name, edgeDebug) {
			this.visible = true;
			this.collides = true;
			this.name = name;
			this.type = "SpriteMap";
			this.img = img;
			this.x = 0;
			this.y = 0;
			this.position = new ex.base.Vector(0, 0);
			this.scrollFactorX = this.scrollFactorY = 1;
			
			this.edgeDebug = edgeDebug;
			
			this._super("constructor", [tileWidth, tileHeight, map]);
		},
		
		onCollide: function() {
			
		},
		
		update: function(dt) {
			
		},
		
		render: function(context, camX, camY) {
			if(!this.visible){
				return;
			}
			
			for(var y = 0; y < this.data.length; y++) {
				for(var x = 0; x < this.data[y].length; x++) {
					var tile = this.data[y][x], sx = 0, sy = 0;
					var tileValue = tile.value;
					if(tileValue != 0) {
						while(--tileValue) {
							sx += this.tileWidth;
							if(sx >= this.img.width) {
								sy += this.tileHeight;
								sx = 0;
							}
						}
						context.drawImage(this.img,
								      sx,
								      sy,
								      this.tileWidth,
								      this.tileHeight,
								      this.x - (camX * this.scrollFactorX) + (x * this.tileWidth),
								      this.y - (camY * this.scrollFactorY) + (y * this.tileHeight),
								      this.tileWidth,
								      this.tileHeight);
						if(this.edgeDebug){
							if(tile.edges.left){
								context.drawImage(this.edgeDebug.left,
									this.x - (camX * this.scrollFactorX) + (x * this.tileWidth),
									this.y - (camY * this.scrollFactorY) + (y * this.tileHeight),
									this.tileWidth,
									this.tileHeight);
							}
							if(tile.edges.right){
								context.drawImage(this.edgeDebug.right,
										this.x - (camX * this.scrollFactorX) + (x * this.tileWidth),
										this.y - (camY * this.scrollFactorY) + (y * this.tileHeight),
										this.tileWidth,
										this.tileHeight);
							}
							if(tile.edges.up){
								context.drawImage(this.edgeDebug.up,
										this.x - (camX * this.scrollFactorX) + (x * this.tileWidth),
										this.y - (camY * this.scrollFactorY) + (y * this.tileHeight),
										this.tileWidth,
										this.tileHeight);
							}
							if(tile.edges.down){
								context.drawImage(this.edgeDebug.down,
										this.x - (camX * this.scrollFactorX) + (x * this.tileWidth),
										this.y - (camY * this.scrollFactorY) + (y * this.tileHeight),
										this.tileWidth,
										this.tileHeight);
							}
						}
					}
					
				}
			}
		}
	});
});
