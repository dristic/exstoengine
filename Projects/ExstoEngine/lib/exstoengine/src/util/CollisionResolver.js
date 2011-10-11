(function() {
	ex.define("ex.util.CollisionResolver", {
		constructor: function(){
			this.algorithms = {
					EntityToSpriteMap: 	resolveBoxToMap,
					EntityToEntity: 	resolveBoxToBox
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
			return this.algorithms[selector](source, target, data, dt);
		}
	});
	
	function resolveBoxToMap(box, map, data, dt) {		
		//Loop through each tile
		var index = data.length;
		while(index--) {
			//Resolve x
			if(box.velocity.x > 0){
				if(data[index].edges.left) {
					box.setPosition(
							data[index].position.x - box.width,
							box.position.y);
					box.velocity.x = 0;
				}
			} else if (box.velocity.x < 0) {
				if(data[index].edges.right) {
					box.setPosition(
							data[index].position.x + map.tileWidth,
							box.position.y);
					box.velocity.x = 0;
				}
			}
			//Resolve y
			if(box.velocity.y > 0) {
				if(data[index].edges.up) {
					box.setPosition(
							box.position.x,
							data[index].position.y - box.height);
					box.velocity.y = 0;
				} 
			} else if (box.velocity.y < 0) {
				if (data[index].edges.down) {
					box.setPosition(
							box.position.x,
							data[index].position.y + map.tileHeight);
					box.velocity.y = 0;
				}
			}
		}
	};
	
	function resolveBoxToBox(source, target, data, dt) {
		
	};
}());