/**
 * Runs collision checks between all registered collidable objects. Has
 * options for doing bounding box collision or per-pixel collision. Per-pixel
 * collision will default to bounding box collision if no pixel collision data
 * is provided.
 * 
 * @class ex.util.CollisionManager
 */
ex.using([
    'ex.util.CollisionDetector',
    'ex.util.CollisionResolver'
], function(){
	ex.define("ex.util.CollisionManager", {
		
		/**
		 * sets up the CollisionManager
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
						this.detector.detectGroupCollisions(this.activeLevel.layers[index].items));
			}
			
			this.resolver.resolveCollisions(collisions, dt);
				
			// Calculate and display benchmark data
			var endTime = new Date();
			this.updateBenchmark(endTime - startTime, collisions.length);
			if(document.getElementById("debug")){
				document.getElementById("debug").innerHTML += 
				'<br>Collision Loop Benchmark: ' + 
				'<br>' + this.benchmarkAverage.time + 'ms' +
				'<br>' + this.benchmarkAverage.collisions + ' collisions';
			}
		}
	});	
});