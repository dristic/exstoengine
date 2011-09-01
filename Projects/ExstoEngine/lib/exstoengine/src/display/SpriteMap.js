ex.using([
  "ex.world.TileMap"
], function () {
	ex.define("ex.display.SpriteMap", ex.world.TileMap, {
		constructor: function(tileWidth, tileHeight, map, img, name) {
			this.visible = true;
			this.name = name;
			this.type = "SpriteMap";
			this.img = img;
			this.x = 0;
			this.y = 0;
			this.scrollFactorX = this.scrollFactorY = 1;
			
			this._super("constructor", [tileWidth, tileHeight, map]);
		},
		
		/**
		 * Retrieves an object containing the position an dsize of the rendered
		 * 		SpriteMap
		 * @returns {___anonymous479_619} the position and size of the rendered
		 * 				SpriteMap
		 */
		getBounds: function() {
			return {
				x		: this.x,
				y		: this.y,
				width	: this.tileWidth * this.map[0].length,
				height	: this.tileHeight * this.map.length
			};
		},
		
		update: function(dt) {
			
		},
		
		render: function(context, camX, camY) {
			if(!this.visible){
				return;
			}
			
			for(var y = 0; y < this.map.length; y++) {
				for(var x = 0; x < this.map[y].length; x++) {
					var tile = this.map[y][x], sx = 0, sy = 0;
					if(tile != 0) {
						while(--tile) {
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
					}
				}
			}
		}
	});
});
