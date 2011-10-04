ex.using([
   'ex.simplex.Entity',
   'ex.display.AnimatedSprite'
], function () {
	ex.define('entity.Player', ex.simplex.Entity, {
		constructor: function (name, position, sprite, collides, input) {
			this._super("constructor", 
					[name, 
					 position, 
					 sprite,
					 collides]);
			this.sprite.createAnimation('Stand', [5]);
			this.sprite.createAnimation('Walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
			this.sprite.play('Walk');
			this.input = input;
			this.speed = 10;
		},
		
		onCollide: function(target, data, dt){
			if(target.name == "Explosion"){
				var offset = getOffset(this, target);
				var appliedForce = new ex.base.Vector(
						offset.x,
						offset.y);
				appliedForce.scale(25);
				this.velocity.add(appliedForce);
				
			} else if (target.type == "SpriteMap") {
				handleTileCollision(this, target, data, dt);
			}
		},
		
		update: function(dt) {
			if(this.input.isKeyPressed(ex.util.Key.Spacebar)) {
				//--Jump
				this.velocity.y -= this.speed * 75;
			}
			if(this.input.isKeyDown(ex.util.Key.W)) {
				this.velocity.y -= this.speed;
			}
			if(this.input.isKeyDown(ex.util.Key.S)) {
				this.velocity.y += this.speed;
			}
			if(this.input.isKeyDown(ex.util.Key.A)) {
				this.velocity.x -= this.speed;
			}
			if(this.input.isKeyDown(ex.util.Key.D)) {
				this.velocity.x += this.speed;
			}
			
			if(this.velocity.x < 0.5 && this.velocity.x > -0.5){
				this.sprite.play("Stand");
			} else {
				this.sprite.play("Walk");
			}
			
			// Gravity
			//this.velocity.y += this.speed;
			
			// Apply the velocity and set the positions for the camera to follow
			this.updatePosition(this.velocity, dt);
			
			// Scale down the velocity
			this.velocity.scale(0.95);
			
			this._super("update", [dt]);
		},
		
		render: function(context, camX, camY){
			this.sprite.render(context, camX, camY);
		}
	});
	
	function getOffset(a, b){	
		return {
			x: a.position.x - b.position.x,
			y: a.position.y - b.position.y };
	};
	
	function handleTileCollision(player, tileMap, data, dt) {
		var collision = collide(
				dt, 
				player.position.x - player.halfWidth, 	// the extra math is
				player.position.y - player.halfHeight, 	// to put the player's
				player.velocity.x, 						// effective center
				player.velocity.y, 						// at the top left
				player.halfWidth * 2, 					// corner again. (old
				player.halfHeight * 2,					// code uses that as
				tileMap);								// center).
		
		if (collision.y == true) {
            player.velocity.y = 0;
            player.position.y = collision.position.y + player.halfHeight;
        }
        if (collision.x == true) {
        	player.velocity.x = 0;
        	player.position.x = collision.position.x + player.halfWidth;
        }
	}
	
	function collide(dt, x, y, vx, vy, width, height, tileMap) {
			var collision = {
				x:false,
				y:false,
				position: new ex.base.Vector(),
				tileType: new ex.base.Point()
			};
			
			var stepsX = Math.ceil(Math.abs(vx * dt) / tileMap.tileWidth);
			var stepsY = Math.ceil(Math.abs(vy * dt) / tileMap.tileHeight);
			var steps = Math.max(stepsX, stepsY);
			
			if(steps > 1) {
				while(steps) {
					var px = vx / steps;
					var	py = vy / steps;
					checkArea(dt, collision, x, y, px, py, width, height, tileMap);
					if(collision.x == true) {
						break;
					} else if(collision.y == true) {
						break;
					}
					steps--;
				}
			} else {
				checkArea(dt, collision, x, y, vx, vy, width, height, tileMap);	
			}
			
			return collision;
		};
		
		function checkArea(dt, collision, x, y, vx, vy, width, height, tileMap) {
			var colX = x + (vx * dt);
			var colY = y + (vy * dt);
			
			//--Check x collision
			if(vx != 0) {
				//--Find tiles that are potential collisions
				var posX, tileX, firstTileY, lastTileY;
				
				posX = colX;
				if(vx > 0) posX += width;
				tileX = Math.floor(posX / tileMap.tileWidth);
				
				firstTileY = Math.floor(y / tileMap.tileHeight);
				lastTileY = Math.ceil((y + height) / tileMap.tileHeight);
				
				//--Check collision against each tile
				for(var tileY = firstTileY; tileY < lastTileY; tileY++) {
					if(tileMap.map[tileY]) {
						var tile = tileMap.map[tileY][tileX];
						if(tile != 0 && tile != null) {
							collision.x = true;
							collision.position.x = (tileX * tileMap.tileWidth);
							if(vx < 0) {
								collision.position.x += tileMap.tileWidth;
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
				tileY= Math.floor(posY / tileMap.tileHeight);
				
				firstTileX = Math.floor(x / tileMap.tileWidth);
				lastTileX = Math.ceil((x + width) / tileMap.tileWidth);
				
				//--Check collision against each tile
				for(var tileX = firstTileX; tileX < lastTileX; tileX++) {
					if(tileMap.map[tileY]) {
						var tile = tileMap.map[tileY][tileX];
						if(tile != 0 && tile != null) {
							collision.y = true;
							collision.position.y = (tileY * tileMap.tileHeight);
							if(vy < 0) {
								collision.position.y += tileMap.tileHeight;
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