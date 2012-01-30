ex.using([
    'ex.base.WorldComponent',
    'ex.physics.CollisionDetector',
    'ex.physics.CollisionResolver'
], function(){
	ex.define("ex.physics.CollisionManager", ex.base.WorldComponent, {
		
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
			this.collisionGroups = [];
			this.detector = new ex.physics.CollisionDetector();
			this.resolver = new ex.physics.CollisionResolver();
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
		
		addObject: function (object) {
		  if(object.collides) {
		    this.addCollidable(object);
		  }
		},
		
		removeObject: function (object) {
		  if(object.collides) {
		    this.removeCollidable(object);
		  }
		},
		
		addCollidable: function(object) {
		  var index = this.collisionGroups.length - 1;
		  if(index == -1) {
		    this.collisionGroups.push([]);
		    index++;
		  }
		  this.collisionGroups[index].push(object);
		},
		
		removeCollidable: function(object) {
		  var groupIndex = this.collisionGroups.length,
		      objectIndex = 0;
		  while(groupIndex--) {
		    objectIndex = this.collisionGroups[groupIndex].length;
		    while(objectIndex--) {
		      if(object === this.collisionGroups[groupIndex][objectIndex]) {
		        this.collisionGroups[groupIndex].splice(objectIndex, 1);
		      }
		    }
		  }
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
			
			var collisions = [];
			var index = 0;

			// Or if collision groups exist, use that
			if(this.collisionGroups.length > 0) {
				index = this.collisionGroups.length;
				while(index--) {
				  var groupCollisions = this.detector.detectGroupCollisions(this.collisionGroups[index], dt);
				  
				  var i = 0,
				      ln = groupCollisions.length;
				  for(; i < ln; i++) {
				    collisions.push(groupCollisions[i]);
				  }
				}
			}
			
			this.resolver.resolveCollisions(collisions, dt);	
			ex.Debug.time('collision');
		},
		
		destroy: function () {
		  delete this.collisionGroups;
		  delete this.detector;
		  delete this.resolver;
		}
	});	
});