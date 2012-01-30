(function() {
	ex.define("ex.physics.CollisionDetector", {
		constructor: function() {
			this.algorithms = {
				EntityToTileMap: 	boxToMapCheck,
				TileMapToEntity: 	boxToMapCheck,
				EntityToEntity: 	boxToBoxCheck,
				EntityToTrigger:	boxToBoxCheck,
				TriggerToEntity:	boxToBoxCheck,
			};
		},
		
		detectGroupCollisions: function(group, dt){
			var collisions = [];
			var source = 0;
			var target = 0;
			for(source; source < group.length; source++) {
				if(group[source].collides){
					for(target = source + 1; target < group.length; target++){
						if(group[target].collides){
							var result = this.detectCollisionBetween(
									group[source],
									group[target],
									dt);
							if(result != null){
								collisions.push(result);
							}
						}
					}
				}
			}
			
			return collisions;
		},
		
		detectCollisionBetween: function(source, target, dt) {
			var selector = source.type + "To" + target.type;
			if(this.algorithms[selector]){
				return this.algorithms[selector](source, target, dt);
			}
		}
	});
	
	/**
	 * Strict bounding box to bounding box collision test.
	 * 
	 * @returns {CollisionData}
	 */
	function boxToBoxCheck(source, target, dt){
		// check for x intersection
		if(source.position.x <= target.position.x) {
			if((source.position.x + source.width) < target.position.x) {
				return null;
			}
		} else {
			if((target.position.x + target.width) < source.position.x) {
				return null;
			}
		}
		// check for y intersection
		if(source.position.y <= target.position.y) {
			if((source.position.y + source.height) < target.position.y) {
				return null;
			}
		} else {
			if((target.position.y + target.height) < source.position.y) {
				return null;
			}
		}
		
		var penVector = new ex.base.Vector(0,0),
			tempPenVector = new ex.base.Vector(0,0);
		// Find y penetration
		if(source.velocity.y > 0) {
			// Find out if box is penetrating top edge of tile
			if(source.position.y < target.position.y && source.position.y + source.height > target.position.y) {
				tempPenVector.y = (source.position.y + source.height) - target.position.y;
			}
		} else if(source.velocity.y < 0) {
			// Find out if box is penetrating bottom edge of tile
			if(target.position.y < source.position.y && target.position.y + target.height > source.position.y) {
				tempPenVector.y = source.position.y - (target.position.y + target.height);
			}
		}
		
		// Find x penetration
		if(source.velocity.x > 0) {
			// Find out if box is penetrating left edge of tile
			if(source.position.x < target.position.x && source.position.x + source.width > target.position.x) {
				tempPenVector.x = (source.position.x + source.width) - target.position.x;
			}
		} else if(source.velocity.x < 0) {
			// Find out if box is penetrating right edge of tile
			if(target.position.x < source.position.x && target.position.x + target.width > source.position.x) {
				tempPenVector.x = source.position.x - (target.position.x + target.width);
			}
		}
		
		if(tempPenVector.x != 0 && tempPenVector.y != 0) {
			var deltaDX = source.velocity.x * dt,
				deltaDY = source.velocity.y * dt,
				x2 = tempPenVector.x,
				y2 = tempPenVector.y,
				x1 = x2 - deltaDX,
				y1 = y2 - deltaDY,
				b = -(y2 - (( (y1 - y2) / (x1 - x2) ) * x2)),
				top = tempPenVector.y > 0;
				
			if(top) {
				if(b < 0)
					penVector.x = tempPenVector.x;
				else
					penVector.y = tempPenVector.y;
			} else {
				if(b > 0)
					penVector.x = tempPenVector.x;
				else
					penVector.y = tempPenVector.y;
			}
		} else if(tempPenVector.x != 0) {
			penVector.x = tempPenVector.x;
		} else if(tempPenVector.y != 0) {
			penVector.y = tempPenVector.y;
		}
		
		return {
			source: source,
			target: target,
			data: {
				pen: penVector
			}
		};
	};
	
	/**
	 * checks collision between a spriteMap and a bounding box.
	 * 
	 * @returns {CollisionData} both elements with a list of tiles that collided.
	 */
	function boxToMapCheck(box, map, dt){	
		// Swap box and map if the arguments get pushed in backwards
		if(box.type == "Map"){
			var temp = box;
			box = map;
			map = temp;
		}
		
		// Collision map actually just wraps a tile map so it can extend Collidable.
		map = map.tileMap;
		
		// find collisions between tiles and box
		var collidedTiles = [],
			xPos = 0,
			yPos = 0,
			firstTile = map.getTile(box.position.x, box.position.y) || { position: { x: 0, y: 0 }},
			xMax = Math.floor((box.width + box.position.x - firstTile.position.x) / map.tileWidth),
			yMax = Math.floor((box.height + box.position.y - firstTile.position.y) / map.tileHeight),
			penVector = new ex.base.Vector(0, 0),
			tempPenVector = new ex.base.Vector(0, 0),
			i,
			currentTile,
			tile;
		
		// Generate list of tile collisions
		for(yPos; yPos <= yMax; yPos++) {
			for(xPos; xPos <= xMax; xPos++) {
				currentTile = map.getTile(
						box.position.x + (xPos*map.tileWidth), 
						box.position.y + (yPos*map.tileHeight));
					
				if(currentTile){
					if(currentTile.value != 0) {
						collidedTiles.push(currentTile);
					}
				}
			}
			xPos = 0;
		}
		
		i = collidedTiles.length;
		while(i--) {
			tile = collidedTiles[i];
			
			// Find y penetration
			if(box.velocity.y > 0 && tile.edges.top) {
				// Find out if box is penetrating top edge of tile
				if(box.position.y < tile.position.y && box.position.y + box.height > tile.position.y) {
					tempPenVector.y = (box.position.y + box.height) - tile.position.y;
				}
			} else if(box.velocity.y < 0 && tile.edges.bottom) {
				// Find out if box is penetrating bottom edge of tile
				if(tile.position.y < box.position.y && tile.position.y + tile.height > box.position.y) {
					tempPenVector.y = box.position.y - (tile.position.y + tile.height);
				}
			}
			
			// Find x penetration
			if(box.velocity.x > 0 && tile.edges.left) {
				// Find out if box is penetrating left edge of tile
				if(box.position.x < tile.position.x && box.position.x + box.width > tile.position.x) {
					tempPenVector.x = (box.position.x + box.width) - tile.position.x;
				}
			} else if(box.velocity.x < 0 && tile.edges.right) {
				// Find out if box is penetrating right edge of tile
				if(tile.position.x < box.position.x && tile.position.x + tile.width > box.position.x) {
					tempPenVector.x = box.position.x - (tile.position.x + tile.width);
				}
			}
			
			if(tempPenVector.x != 0 && tempPenVector.y != 0) {
				var deltaDX = box.velocity.x * dt,
					deltaDY = box.velocity.y * dt,
					x2 = tempPenVector.x,
					y2 = tempPenVector.y,
					x1 = x2 - deltaDX,
					y1 = y2 - deltaDY,
					b = -(y2 - (( (y1 - y2) / (x1 - x2) ) * x2)),
					top = tempPenVector.y > 0;
					
				if(top) {
					if(b < 0)
						penVector.x = tempPenVector.x;
					else
						penVector.y = tempPenVector.y;
				} else {
					if(b > 0)
						penVector.x = tempPenVector.x;
					else
						penVector.y = tempPenVector.y;
				}
			} else if(tempPenVector.x != 0) {
				penVector.x = tempPenVector.x;
			} else if(tempPenVector.y != 0) {
				penVector.y = tempPenVector.y;
			}
			
			tempPenVector = new ex.base.Vector(0, 0);
		}
		
		if(collidedTiles.length > 0) {
			return {
				source: box,
				target: map,
				data: {
					pen: penVector,
					tiles: collidedTiles
				}
			};
		} else {
			return null;
		}
	};
}());