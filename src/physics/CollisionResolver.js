(function() {
  var DAMPING = 0.98;
  
	ex.define("ex.physics.CollisionResolver", {
		constructor: function(){
			this.algorithms = {
			    RigidBoxToCollisionMap: 	resolveBoxToMap,
			    RigidBoxToRigidBox: 	resolveBoxToBox,
				};
		},
		
		resolveCollisions: function(collisions, dt) {
			var index = collisions.length;
			while(index--) {
				// resolve collisions
				this.resolveCollisionBetween(
						collisions[index].source, 
						collisions[index].target,
						collisions[index].data,
						dt);
				// call source's collision event
				collisions[index].source.onCollide(
						collisions[index].target,
						collisions[index].data, 
						dt);
				// call target's collision event
				collisions[index].target.onCollide(
						collisions[index].source,
						collisions[index].data,
						dt);
			}
		},
		
		/**
		 * Selects the proper algorithms based on source and target types.
		 * 
		 * @param source
		 * @param target
		 * @param data
		 * @param dt
		 * @returns 
		 */
		resolveCollisionBetween: function(source, target, data, dt) {
			var selector = source.type + "To" + target.type;
			if(this.algorithms[selector]) {
				return this.algorithms[selector](source, target, data, dt);
			}
		}
	});
	
	function resolveBoxToMap(box, map, data, dt) {
	  if(box.mass == 0) return;
	  
		data = data.pen;
		if(data.y != 0) {
			if(data.y > 0) data.y += 0.1;
			else data.y -= 0.1;
			box.position.y -= data.y;
			box.velocity.y = -box.velocity.y * box.elasticity;
		}
		
		if(data.x != 0) {
			if(data.x > 0) data.x += 0.1;
			else data.x -= 0.1;
			box.position.x -= data.x;
			box.velocity.x = -box.velocity.x * box.elasticity;
		}
		
		box.velocity.scale(DAMPING);
	};
	
	function resolveBoxToBox(source, target, data, dt) {		
		if(source.anchored) {
			if(target.anchored) {
				return;
			} else {
				resolveBoxToMap(target, source, data, dt);
			}
		} else {
			if(target.anchored) {
				resolveBoxToMap(source, target, data, dt);
			} else {
				
			}
		}
	};
}());