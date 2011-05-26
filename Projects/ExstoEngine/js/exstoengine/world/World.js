(function() {
	
	var World = new ExstoEngine.Base.Class(null, {
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
	
	window.ExstoEngine.World.World = World;
	
}());
