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
		 */
		constructor: function() {
			this.activeLevel = null;
			
			this.algorithms = {
				EntityToSpriteMap: 	boxToSpriteMapCheck,
				SpriteMapToEntity: 	boxToSpriteMapCheck,
				EntityToEntity: 	boxToBoxCheck
			};
			
			this.benchmarkData = [];
			this.benchmarkAverage = {
					time: 0,
					collisions: 0
			};
		},
		
		setActiveLevel: function(level) {
			this.activeLevel = level;
			console.log("Active Level: " + this.activeLevel.name);
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
		 * clears the collisions array, checks for new collisions, and runs
		 * each collision's actions.
		 * @param dt
		 */
		update: function(dt) {
			// Grab start time for benchmark data
			var startTime = new Date();
			
			if(this.activeLevel == null){
				return;
			}
			
			var collisions = [];
			// Loop through activeLevel.layers
			var index = this.activeLevel.layers.length;
			while(index--){
				// Test spriteMap -> entities
				var source = 0;
				var target = 0;
				for(source; source < this.activeLevel.layers[index].items.length; source++) {
					// Check source to spritemap (entity to spritemap)
					if(this.activeLevel.layers[index].map != null){
						var sourceToMap = this.checkCollisionBetween(
								this.activeLevel.layers[index].items[source], 
								this.activeLevel.layers[index].map);
						if(sourceToMap != null){
							collisions.push(sourceToMap);
						}
					}
					
					// Check source to target (entity to entity)
					for(target = source + 1; target < this.activeLevel.layers[index].items.length; target++){
						var sourceToTarget = this.checkCollisionBetween(
								this.activeLevel.layers[index].items[source], 
								this.activeLevel.layers[index].items[target]);
						if(sourceToTarget != null){
							collisions.push(sourceToTarget);
						}
					}
				}
			}
			
			// Call entity.onCollide() for each collision
			index = collisions.length;
			while(index--){
				// call source -> target event
				collisions[index].source.onCollide(
						collisions[index].target, collisions[index].data, dt);
				// call target -> source event 
				collisions[index].target.onCollide(
						collisions[index].source, collisions[index].data, dt);
			}
				
			// Calculate and display benchmark data
			var endTime = new Date();
			this.updateBenchmark(endTime - startTime, collisions.length);
			if(document.getElementById("debug")){
				document.getElementById("debug").innerHTML += 
				'<br>Collision Loop Benchmark: ' + 
				'<br>' + this.benchmarkAverage.time + 'ms' +
				'<br>' + this.benchmarkAverage.collisions + ' collisions';
			}
		},
		
		checkCollisionBetween: function(source, target) {
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
	}
	
	/**
	 * checks collision between a spriteMap and a bounding box.
	 * 
	 * @returns {Object} both elements with a list of tiles that collided.
	 */
	function boxToSpriteMapCheck(box, map){		
		// find collisions between tiles and box
		var collidedTiles = [];
		var xPos = box.position.x;
		var yPos = box.position.y;
		for(yPos; yPos < (box.position.y + box.height); yPos += map.tileHeight) {
			for(xPos; xPos < (box.position.x + box.width); xPos += map.tileWidth) {
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
			return null;
		}
	}
}());