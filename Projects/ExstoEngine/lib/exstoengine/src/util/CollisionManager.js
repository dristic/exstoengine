ex.using([
    'ex.util.CollisionDetector',
    'ex.util.CollisionResolver'
], function(){
	ex.define("ex.util.CollisionManager", {
		
		/**
		 * The engine component that handles collision detection and
		 * resolution.
		 * 
		 * @name ex.util.CollisionManager
		 * 
		 * @property {ex.simplex.Map} activeLevel the current level in the game
		 * 		world.
		 * 
		 * @constructor
		 */
		constructor: function() {
			this.activeLevel = null;
			this.detector = new ex.util.CollisionDetector();
			this.resolver = new ex.util.CollisionResolver();
			
			this.benchmarkData = [];
			this.benchmarkAverage = {
					time: 0,
					collisions: 0
			};
		},
		
		/**
		 * Sets the level for the manager to handle collisions on.
		 * 
		 * @function
		 * @name setActiveLevel
		 * @memberOf ex.util.CollisionManager
		 * 
		 * @param {ex.simplex.Map} level
		 */
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
		 * Clears the collisions array, request collision detection on each
		 * layer separately from the detector, then requests resolution of
		 * each collision from the resolver.
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.util.CollisionManager
		 * 
		 * @param {Number} dt timestep
		 */
		update: function(dt) {
			ex.Debug.time('collision');
			
			// Do nothing if there is no active level
			if(this.activeLevel == null){
				return;
			}
			
			var collisions = [];
			// Loop through layers and detect collisions
			var index = this.activeLevel.layers.length;
			while(index--){
				// Test spriteMap -> entities
				collisions.push.apply(
						collisions, 
						this.detector.detectGroupCollisions(this.activeLevel.layers[index].items, dt));
			}
			this.resolver.resolveCollisions(collisions, dt);
				
			ex.Debug.time('collision');
		}
	});	
});