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
								      tile.position.x - (camX * this.scrollFactorX),
								      tile.position.y - (camY * this.scrollFactorY),
								      tile.width,
								      tile.height);
						if(this.edgeDebug){
							if(tile.edges.left){
								context.drawImage(this.edgeDebug.left,
										tile.position.x - (camX * this.scrollFactorX),
										tile.position.y - (camY * this.scrollFactorY),
										tile.width,
										tile.height);
							}
							if(tile.edges.right){
								context.drawImage(this.edgeDebug.right,
										tile.position.x - (camX * this.scrollFactorX),
										tile.position.y - (camY * this.scrollFactorY),
										tile.width,
										tile.height);
							}
							if(tile.edges.top){
								context.drawImage(this.edgeDebug.top,
										tile.position.x - (camX * this.scrollFactorX),
										tile.position.y - (camY * this.scrollFactorY),
										tile.width,
										tile.height);
							}
							if(tile.edges.bottom){
								context.drawImage(this.edgeDebug.bottom,
										tile.position.x - (camX * this.scrollFactorX),
								      	tile.position.y - (camY * this.scrollFactorY),
								      	tile.width,
								      	tile.height);
							}
						}
					}
					
				}
			}
		}
	});
});
