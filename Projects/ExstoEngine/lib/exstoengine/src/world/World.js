ex.using([
    "ex.util.CollisionManager"
], function() {
	ex.define("ex.world.World", {
		constructor: function(renderer) {
			this.activeLevel = null;
			this.renderer = renderer;
			this.levels = [];
			this.objects = [];
		},
		
		update: function(dt) {
			// update level
			if(this.activeLevel)
				this.activeLevel.update(dt);
			
			// update objects
			var i = this.objects.length;
			while(i--) {
				this.objects[i].update(dt);
			}
		},

		getLevel: function(name){
			var index = this.levels.length;
			while(index--){
				if(this.levels[index].name == name){
					return this.levels[index];
				}
			}
			
			//if not found
			return null;
		},
		
		loadLevel: function(name){
			this.setActiveLevel(this.getLevel(name));
			console.log("World activeLevel: " + this.activeLevel.name);
		},
		
		setActiveLevel: function(level){
			if(this.activeLevel != null){
				// unload renderables
				var index = this.renderer.renderables.length;
				while(index--){
					if(this.renderer.renderables[index] === this.activeLevel){
						this.renderer.renderables.splice(index, 1);
					}	
				}
			}
			
			// set activeLevel
			this.activeLevel = level;
			
			// add renderables
			this.renderer.renderables.push(level);
		},
		
		addLevel: function(level) {
			this.levels.push(level);
		},
		
		addObject: function(object) {
			this.objects.push(object);
			this.renderer.renderables.push(object);
		},
		
		removeObject: function(object) {
			// Remove object from world
			var index = this.objects.length;
			while(index--) {
				if(this.objects[index] === object){
					this.objects.splice(index, 1);
				}
			}
			
			// Remove object from renderer
			index = this.renderer.renderables.length;
			while(index--) {
				if(this.renderer.renderables[index] === object) {
					this.renderer.renderables.splice(index, 1);
				}
			}
		},
		
		destroy: function() {
			
		}
	});
});
