ex.using([
  "ex.base.Point",
  "ex.world.TileMap"
], function () {
	ex.define("ex.world.CollisionMap", ex.world.TileMap, {
		constructor: function(tileWidth, tileHeight, data) {
			this._super("constructor", [tileWidth, tileHeight, data]);
		},
		
		collide: function(dt, x, y, vx, vy, width, height) {
			var collision = {
				x:false,
				y:false,
				position: new ex.base.Vector(),
				tileType: new ex.base.Point()
			};
			
			var stepsX = Math.ceil(Math.abs(vx * dt) / this.tileWidth);
			var stepsY = Math.ceil(Math.abs(vy * dt) / this.tileHeight);
			var steps = Math.max(stepsX, stepsY);
			
			if(steps > 1) {
				while(steps) {
					var px = vx / steps;
					var	py = vy / steps;
					this.checkArea(dt, collision, x, y, px, py, width, height);
					if(collision.x == true) {
						break;
					} else if(collision.y == true) {
						break;
					}
					steps--;
				}
			} else {
				this.checkArea(dt, collision, x, y, vx, vy, width, height);	
			}
			
			return collision;
		},
		
		checkArea: function(dt, collision, x, y, vx, vy, width, height) {
			var colX = x + (vx * dt);
			var colY = y + (vy * dt);
			
			//--Check x collision
			if(vx != 0) {
				//--Find tiles that are potential collisions
				var posX, tileX, firstTileY, lastTileY;
				
				posX = colX;
				if(vx > 0) posX += width;
				tileX = Math.floor(posX / this.tileWidth);
				
				firstTileY = Math.floor(y / this.tileHeight);
				lastTileY = Math.ceil((y + height) / this.tileHeight);
				
				//--Check collision against each tile
				for(var tileY = firstTileY; tileY < lastTileY; tileY++) {
					if(this.map[tileY]) {
						var tile = this.map[tileY][tileX];
						if(tile != 0 && tile != null) {
							collision.x = true;
							collision.position.x = (tileX * this.tileWidth);
							if(vx < 0) {
								collision.position.x += this.tileWidth;
							} else {
								collision.position.x -= width;
							}
							collision.tileType.x = tile;
							break;
						}
					}
				}
			}
			
			//--Check y collision
			if(vy != 0) {
				//--Find tiles that are potential collisions
				var posY, tileY, firstTileX, lastTileX;
				
				posY = colY;
				if(vy > 0) posY += height;
				tileY= Math.floor(posY / this.tileHeight);
				
				firstTileX = Math.floor(x / this.tileWidth);
				lastTileX = Math.ceil((x + width) / this.tileWidth);
				
				//--Check collision against each tile
				for(var tileX = firstTileX; tileX < lastTileX; tileX++) {
					if(this.map[tileY]) {
						var tile = this.map[tileY][tileX];
						if(tile != 0 && tile != null) {
							collision.y = true;
							collision.position.y = (tileY * this.tileHeight);
							if(vy < 0) {
								collision.position.y += this.tileHeight;
							} else {
								collision.position.y -= height;
							}
							collision.tileType.y = tile;
							break;
						}
					}
				}
			}
		}
	});
});