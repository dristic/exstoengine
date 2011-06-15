(function() {
	ex.namespace("ex.world");
	
	var World = new ex.Class({
		constructor: function(renderer) {
			this.renderer = renderer;
			this.objects = [];
		},
		
		update: function(dt) {
			var i = this.objects.length;
			while(i--) {
				this.objects[i].update(dt);
			}
		},
		
		addObject: function(object) {
			this.objects.push(object);
			this.renderer.renderables.push(object);
		},
		
		destroy: function() {
			
		}
	});
	
	window.ex.world.World = World;
	
}());
