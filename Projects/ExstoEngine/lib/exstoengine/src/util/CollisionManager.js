/**
 * Runs collision checks between all registered collidable objects. Has
 * options for doing bounding box collision or per-pixel collision. Per-pixel
 * collision will default to bounding box collision if no pixel collision data
 * is provided.
 * 
 * @class ex.util.CollisionManager
 */
(function() {
	ex.define("ex.util.CollisionManager", {
		
		/**
		 * sets up the CollisionManager
		 * @constructor
		 * @param $usePerPixel
		 */
		constructor: function($usePerPixel) {
			this.usingPerPixel = $usePerPixel;
			this.collidables = [];
			this.collisions = [];
			this.events = [];
			
			this.algorithms = {
				SpriteToSpriteMap: 	boxToSpriteMapCheck,
				SpriteMapToSprite: 	boxToSpriteMapCheck,
				SpriteToSprite: 	boxToBoxCheck
			};
			
			this.benchmarkData = [];
			this.benchmarkAverage = {
					time: 0,
					collisions: 0
			};
		},
		
		updateBenchmark: function(newTime, newCollisionCount) {
			if(this.benchmarkData.length > 200){
				this.updateBenchmarkAverage();
				this.benchmarkData = [];
			}
			this.benchmarkData.push({ 
				time: newTime,
				collisions: newCollisionCount
			});
		},
		
		updateBenchmarkAverage: function() {
			var index = 0;
			var sumTime = 0;
			var sumCollisions = 0;
			var dataCount = this.benchmarkData.length;
			for(index; index < dataCount; index++){
				sumTime += this.benchmarkData[index].time;
				sumCollisions += this.benchmarkData[index].collisions;
			}
			this.benchmarkAverage.time = sumTime / dataCount;
			this.benchmarkAverage.collisions = sumCollisions / dataCount;
		},
		
		/**
		 * Registers new collidable objects
		 * @param {Array} $newCollidables
		 */
		addCollidable: function($newCollidable){
			this.collidables.push($newCollidable);
		},
		
		/**
		 * unregisters all collidable objects from the CollisionManager
		 */
		clearAllCollidables: function() {
			this.collidables = [];
		},
		
		callCollisionEventFor: function(collision) {
			var index = 0;
			for(index; index < this.events.length; index++){
				if(collision.source === this.events[index].source &&
						collision.target === this.events[index].target){
					this.events[index].event(collision);
				}
			}
		},
		
		/**
		 * clears the collisions array, checks for new collisions, and runs
		 * each collision's actions.
		 * @param dt
		 */
		update: function(dt) {
			var startTime = new Date();
			// Clear collisions from last update
			this.collisions = [];
			
			// Else, check for collisions
			var source = 0;
			var target = 0;
			var collisionResult = {};
			for(source; source < this.collidables.length - 1; source++) {
				for(target = source + 1; target < this.collidables.length; target++) {					
					collisionResult = this.checkCollisionBetween(
							this.collidables[source],
							this.collidables[target]
					);
					if(collisionResult){
						this.collisions.push(collisionResult);
					}
				}
			}
			
			// Act on collisions
			var index = 0;
			for(index; index < this.collisions.length; index++){
				this.callCollisionEventFor(this.collisions[index]);
			}
			var endTime = new Date();
			this.updateBenchmark(endTime - startTime, this.collisions.length);
			document.getElementById("debug").innerHTML += 
				'<br>Collision Loop Benchmark: ' + 
				'<br>' + this.benchmarkAverage.time + 'ms' +
				'<br>' + this.benchmarkAverage.collisions + ' collisions';
		},
		
		/**
		 * The main collision check function. Performs a bounding box collision
		 * test.
		 * 
		 * Future:
		 *  - Bounding circles (maybe?)
		 *  - Quad Tree support
		 *  - Per Pixel collision check support
		 * 
		 * @param source {Collidable} first collidable object
		 * @param target {Collidable} second collidable object
		 * @returns {Boolean} true if collision is found
		 * CollisionManager's collisions property.
		 */
		checkCollisionBetween: function(source, target) {
			var selector = source.type + "To" + target.type;
			return this.algorithms[selector](source, target);
		}
		
		
	});
	
	/**
	 * Strict bounding box to bounding box collision test.
	 * 
	 * @returns {Boolean}
	 */
	function boxToBoxCheck(source, target){
		// check for x intersection
		if(source.position.x <= target.position.x) {
			if((source.position.x + source.width) < target.position.x) {
				return false;
			}
		} else {
			if((target.position.x + target.width) < source.position.x) {
				return false;
			}
		}
		// check for y intersection
		if(source.position.y <= target.position.y) {
			if((source.position.y + source.height) < target.position.y) {
				return false;
			}
		} else {
			if((target.position.y + target.height) < source.position.y) {
				return false;
			}
		}
		
		return {
			source: source,
			target: target
		};
	}
	
	/**
	 * checks collision between a spriteMap and a bounding box.
	 * 
	 * @returns {Object} both elements with a list of tiles that collided.
	 */
	function boxToSpriteMapCheck(box, map){
		// if necessary, swap so the SpriteMap is source
		if (box.type == "SpriteMap") {
			var temp = box;
			box = map;
			map = temp;
		}
		
		// find collisions between tiles and box
		var collidedTiles = [];
		var xPos = box.position.x;
		var yPos = box.position.y;
		for(yPos; yPos < (box.position.y + box.height); yPos += map.tileHeight){
			for(xPos; xPos < (box.position.x + box.width); xPos += map.tileWidth){
				if(map.getTile(xPos, yPos)){
					collidedTiles.push({
						x: Math.floor(xPos / map.tileWidth),
						y: Math.floor(yPos / map.tileHeight)
					});
				}
			}
			xPos = box.position.x;
		}
		
		if(collidedTiles.length > 0){
			return {
				source: box,
				target: map,
				data: 	collidedTiles
			};
		} else {
			return false;
		}
	}
	
	/**
	 * performs a quad tree analysis on the collidables, this is the roughest
	 * and fastest collision check.
	 */
	function quadTreeCheck() {
		
	};
	
	/**
	 * performs a per pixel check between two collidables. This is the finest
	 * and most processor intensive collision check. Looks for pixel overlap
	 * between the source and target collidables.
	 * @param $source {Collidable} first collidable object
	 * @param $target {Collidable} second collidable object
	 * @returns {Boolean} true if there is pixel overlap, otherwise false
	 */
	function perPixelCollision($source, $target) {
		// create bounding box around area of both source and target
		// fill array with 0's
		// bitwise OR on array with source
		// bitwise AND on array with target
			// if a 1 is found, return true (first sign of intersection)
		// return false (no intersection)
	};
}());