(function() {
	ex.define("ex.util.CollisionResolver", {
		constructor: function(){
			
		},
		
		resolveCollisions: function(collisions, dt) {
			var index = collisions.length;
			while(index--) {
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
		}
	});
}());