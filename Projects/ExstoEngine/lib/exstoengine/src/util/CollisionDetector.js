(function() {
	ex.define("ex.util.CollisionDetector", {
		constructor: function() {
			this.algorithms = {
				EntityToSpriteMap: 	boxToSpriteMapCheck,
				SpriteMapToEntity: 	boxToSpriteMapCheck,
				EntityToEntity: 	boxToBoxCheck
			};
		},
		
		detectGroupCollisions: function(group){
			var collisions = [];
			var source = 0;
			var target = 0;
			for(source; source < group.length; source++) {
				if(group[source].collides){
					for(target = source + 1; target < group.length; target++){
						if(group[target].collides){
							var result = this.detectCollisionBetween(
									group[source], 
									group[target]);
							if(result != null){
								collisions.push(result);
							}
						}
					}
				}
			}
			
			return collisions;
		},
		
		detectCollisionBetween: function(source, target) {
			var selector = source.type + "To" + target.type;
			return this.algorithms[selector](source, target);
		}
	});
	
	/**
	 * Strict bounding box to bounding box collision test.
	 * 
	 * @returns {CollisionData}
	 */
	function boxToBoxCheck(source, target){
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
		
		return {
			source: source,
			target: target,
			data:	null
		};
	};
	
	/**
	 * checks collision between a spriteMap and a bounding box.
	 * 
	 * @returns {CollisionData} both elements with a list of tiles that collided.
	 */
	function boxToSpriteMapCheck(box, map){	
		// Swap box and map if the arguments get pushed in backwards
		if(box.type == "SpriteMap"){
			var temp = box;
			box = map;
			map = temp;
		}
		// find collisions between tiles and box
		var collidedTiles = [];
		var xPos = 0;
		var yPos = 0;
		var xMax = Math.ceil(box.width / map.tileWidth);
		var yMax = Math.ceil(box.height / map.tileHeight);
		
		for(yPos; yPos <= yMax; yPos++) {
			for(xPos; xPos <= xMax; xPos++) {
				var currentTile = map.getTile(
						box.position.x + (xPos*map.tileWidth), 
						box.position.y + (yPos*map.tileHeight));
				if(currentTile){
					if(currentTile.value != 0){
						collidedTiles.push(currentTile);
					}
				}
			}
			xPos = 0;
		}
		
		if(collidedTiles.length > 0){
			return {
				source: box,
				target: map,
				data: 	collidedTiles
			};
		} else {
			return null;
		}
	};
}());