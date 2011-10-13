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
		var collisionBits = 0;
		while(index--) {
			//Get x edge intersections
			if(data[index].edges.left) {
				if(box.position.x <= data[index].position.x && 
					(box.position.x + box.width) > data[index].position.x){
					collisionBits += 1;
				}
			}
			if(data[index].edges.right) {
				if (box.position.x < (data[index].position.x + data[index].width) &&
					(box.position.x + box.width) >= (data[index].position.x + data[index].width)) {
					collisionBits += 2;
				}
			}
			//Get y edge interesctions
			if(data[index].edges.up) {
				if(box.position.y <= data[index].position.y &&
					(box.position.y + box.height) > data[index].position.y) {
					collisionBits += 4;
				} 
			}
			if (data[index].edges.down) {
				if (box.position.y < (data[index].position.y + data[index].height) &&
					(box.position.y + box.height) >= (data[index].position.y + data[index].height)) {
					collisionBits += 8;
				}
			}
			
			switch(collisionBits){
			case 1:		// Left
				moveEntity(box, "Left", data[index]);
				break;
			case 2:		// Right
				moveEntity(box, "Right", data[index]);
				break;
			case 4:		// Up
				moveEntity(box, "Above", data[index]);
				break;
			case 8:		// Down
				moveEntity(box, "Below", data[index]);
				break;
			case 5:		// Up & Left
				if(box.position.x + box.width > data[index].position.x){
					moveEntity(box, "Above", data[index]);
				} else {
					moveEntity(box, "Left", data[index]);
				}
				break;
			case 6:		// Up & Right
				if(box.position.x < data[index].position.x + data[index].width){
					moveEntity(box, "Above", data[index]);
				} else {
					moveEntity(box, "Right", data[index]);
				}
				break;
			case 9:		// Down & Left
				if(box.position.x + box.width > data[index].position.x){
					moveEntity(box, "Below", data[index]);
				} else {
					moveEntity(box, "Left", data[index]);
				}
				break;
			case 10:	// Down & Right
				if(box.position.x < data[index].position.x + data[index].width){
					moveEntity(box, "Below", data[index]);
				} else {
					moveEntity(box, "Right", data[index]);
				}
				break;
			case 7:		// Left Up Right
				moveEntity(box, "Above", data[index]);
				break;
			case 11:	// Left Down Right
				moveEntity(box, "Below", data[index]);
				break;
			case 13:	// Up Left Down
				moveEntity(box, "Left", data[index]);
				break;
			case 14:	// Up Right Down
				moveEntity(box, "Right", data[index]);
				break;
			}
		}
	};
	
	function resolveBoxToBox(source, target, data, dt) {
		
	};
	
	function moveEntity(source, relation, target) {
		if(relation == "Left of"){
			source.setPosition(
					target.position.x - source.width,
					source.position.y);
			source.velocity.x = 0;
		} else if(relation == "Right of") {
			source.setPosition(
					target.position.x + target.width,
					source.position.y);
			source.velocity.x = 0;
		} else if(relation == "Above") {
			source.setPosition(
					source.position.x,
					target.position.y - source.height);
			source.velocity.y = 0;
		} else if(relation == "Below") {
			source.setPosition(
					source.position.x,
					target.position.y + target.height);
			source.velocity.y = 0;
		}
	}
}());