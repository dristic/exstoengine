ex.using([
    "ex.event.EventTarget"
], function() {
	ex.define("ex.world.Trigger", ex.event.EventTarget, {
		/**
		 * Trigger:
		 * 
		 * A special Entity with no render
		 * function used specifically to
		 * trigger events on contact with other Entities.
		 * 
		 * Properties:
		 * position
		 * width
		 * height (hitbox)
		 * trigger requirement
		 * trigger event
		 */
		constructor: function(position, width, height) {
			this.position = position;
			this.width = width;
			this.height = height;
			this.anchored = true;
		},
		
		onCollide: function(target, data){
			this.dispatchEvent(target.name, data);
		},
		
		update: function(dt) {
			
		},
		
		render: function() {
			
		},
		
		debugRender: function() {
			
		}
	});
});