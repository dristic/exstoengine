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
		},
		
		/**
		 * Registers new collidable objects
		 * @param {Array} $newCollidables
		 */
		addCollidable: function($newCollidables){
			this.collidables.extend($newCollidables);
		},
		
		/**
		 * unregisters all collidable objects from the CollisionManager
		 */
		clearAllCollidables: function() {
			this.collidables = [];
		},
		
		/**
		 * clears the collisions array, checks for new collisions, and runs
		 * each collision's actions.
		 * @param dt
		 */
		update: function(dt) {
			// Clear collisions from last update
			this.collisions = [];
			
			// If there are none or one collidables, do nothing
			if(this.collidables.length < 2){
				return;
			}
			
			// Else, check for collisions
			var source = 0;
			var target = 0;
			for(source; source < this.collidables.length - 1; source++) {
				for(target = source + 1; target < this.collidables.length; target++) {					
					this.performCollisionCheckOn(source, target);
				}
			}
			
			// Act on collisions
		},
		
		/**
		 * The main collision check function. Performs a bounding box collision
		 * test first. If successful, it will perform a per pixel collision
		 * check if per pixel checks are enabled
		 * @param $source {Collidable} first collidable object
		 * @param $target {Collidable} second collidable object
		 * @returns {null} if a collision is found, it gets pushed to
		 * CollisionManager's collisions property.
		 */
		performCollisionCheckOn: function($source, $target) {
			if(boundingBoxCollision($source,$target)) {
				if(this.usingPerPixel && perPixelCollision($source, $target)){
					this.collisions.push({
						source: $source,
						target: $target
					});
				} else {
					this.collisions.push({
						source: $source,
						target: $target
					});
				}
			}
		}
	});
	
	/**
	 * performs a quad tree analysis on the collidables, this is the roughest
	 * and fastest collision check.
	 */
	function quadTreeCheck() {
		
	};
	
	/**
	 * performs a bounding box check between two collidables. This is a finer
	 * collision detection algorithm, the second stage in collision detection.
	 * Most applications will not need to go farther than this.
	 * @param $source {Collidable} first collidable object
	 * @param $target {Collidable} second collidable object
	 * @returns {Boolean} true if bounding box intersection, otherwise false
	 */
	function boundingBoxCollision($source, $target) {
		var sourceBounds = $source.getBounds();
		var targetBounds = $target.getBounds();
		
		// check for intersection
		// if intersected return true
		// else return false
	};
	
	/**
	 * performs a per pixel check between two collidables. This is the finest
	 * and most processor intesive collision check. Looks for pixel overlap
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