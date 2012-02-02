ex.using([
    'ex.base.WorldComponent',
    'ex.physics.CollisionDetector',
    'ex.physics.CollisionResolver',
    'ex.physics.Collidable',
    'ex.physics.Force'
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
		constructor: function (renderer, options) {
			this.collisionGroups = [];
			this.forces = [];
			this.detector = new ex.physics.CollisionDetector();
			this.resolver = new ex.physics.CollisionResolver();
			this.renderer = renderer;
			
			this.defaults = {
			    debugDraw: false
			};
			
			this.options = ex.extend({}, this.defaults);
			ex.extend(this.options, options);
			
			// Debug drawing.
			this.context = null;
			if(this.options.debugDraw && this.renderer.type == ex.display.rendering.Renderer.CANVAS2D) {
			  this.context = this.renderer.renderingContext.context;
			}
		},
		
		addObject: function (object) {
		  if(object instanceof ex.physics.Collidable) {
		    var index = this.collisionGroups.length - 1;
	      if(index == -1) {
	        this.collisionGroups.push([]);
	        index++;
	      }
	      this.collisionGroups[index].push(object);
		  } else if (object instanceof ex.physics.Force) {
		    this.forces.push(object);
		  }
		},
		
		removeObject: function (object) {
		  if(object instanceof ex.physics.Collidable) {
		    var groupIndex = this.collisionGroups.length,
            objectIndex = 0;
        while(groupIndex--) {
          objectIndex = this.collisionGroups[groupIndex].length;
          while(objectIndex--) {
            if(object === this.collisionGroups[groupIndex][objectIndex]) {
              this.collisionGroups[groupIndex].splice(objectIndex, 1);
              object.destroy();
            }
          }
        }
		  } else if (object instanceof ex.physics.Force) {
		    ex.Array.remove(this.forces, object);
		    object.destroy();
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
		update: function (dt, camera) {
			ex.Debug.time('collision');
			
			// Solve for all forces.
			var i = 0,
          ln = this.collisionGroups.length;
      for(; i != ln; i++) {
        var n = 0,
            nln = this.forces.length;
        for(; n != nln; n++) {
          this.forces[n].solve(dt, this.collisionGroups[i]);
        }
      }
			
			// Integrate all objects forward in time.
			i = 0;
	    ln = this.collisionGroups.length;
			for(; i != ln; i++) {
			  n = 0;
	      nln = this.collisionGroups[i].length;
			  for(; n != nln; n++) {
			    this.collisionGroups[i][n].integrate(dt);
			  }
			}
			
			var collisions = [];
			var index = 0;
		  
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
		
		debug: function (dt, camera) {
		  if(this.options.debugDraw == true) {
		    this.draw(this.context, camera);
		  }
		},
		
		draw: function (context, camera) {
	    context.save();
	    
	    context.strokeStyle = '#FF0000';
      context.lineWidth = 1;
	    
      var i = 0,
          ln = this.collisionGroups.length;
      for(; i != ln; i++) {
        n = 0;
        nln = this.collisionGroups[i].length;
        for(; n != nln; n++) {
          if(this.collisionGroups[i][n].draw) {
            this.collisionGroups[i][n].draw(context, camera.position.x, camera.position.y);
          }
        }
      }
      
      context.restore();
		},
		
		destroy: function () {
		  delete this.collisionGroups;
		  delete this.detector;
		  delete this.resolver;
		}
	});	
});