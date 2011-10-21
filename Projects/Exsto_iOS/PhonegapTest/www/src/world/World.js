ex.using([
    "ex.util.CollisionManager"
], function() {
	ex.define("ex.world.World", {
		
		/**
		 * The world object cotains all the relevant game data such as
		 * levels, menus, and entities.
		 * 
		 * @name ex.world.World
		 * 
		 * @param {ex.display.Renderer} renderer the renderer to call
		 * 		to render each frame
		 * 
		 * @property {ex.simplex.Map} activeLevel the current level
		 * @proeprty {ex.display.Renderer} renderer
		 * @property {ex.simplex.Map[]} levels all levels in the world
		 * @property {Object[]} objects all global data such as player
		 * 		stats, game stats, and menus.
		 * 
		 * @constructor
		 */
		constructor: function(renderer) {
			this.activeLevel = null;
			this.renderer = renderer;
			this.levels = [];
			this.objects = [];
		},
		
		/**
		 * Updates all levels and objects.
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.world.World
		 * 
		 * @param {Number} dt timestep
		 */
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

		/**
		 * Retrieves a level by name.
		 * 
		 * @function
		 * @name getLevel
		 * @memberOf ex.world.World
		 * 
		 * @param {String} name
		 * 
		 * @returns {ex.simplex.Map}
		 */
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
		
		/**
		 * Sets the active level to the level with the given name.
		 * 
		 * @function
		 * @name loadLevel
		 * @memberOf ex.world.World
		 * 
		 * @param {String} name
		 */
		loadLevel: function(name){
			this._setActiveLevel(this.getLevel(name));
			console.log("World activeLevel: " + this.activeLevel.name);
		},
		
		_setActiveLevel: function(level){
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
		
		/**
		 * Adds a level to the world.
		 * 
		 * @function
		 * @name addLevel
		 * @memberOf ex.world.World
		 * 
		 * @param {ex.simplex.Map} level
		 */
		addLevel: function(level) {
			this.levels.push(level);
		},
		
		/**
		 * Adds an object to the world by direct reference.
		 * 
		 * @function
		 * @name addObject
		 * @memberOf ex.world.World
		 * 
		 * @param {Object} object
		 */
		addObject: function(object) {
			this.objects.push(object);
			this.renderer.renderables.push(object);
		},
		
		/**
		 * Removes an object from the world by direct reference.
		 * 
		 * @function
		 * @name removeObject
		 * @memberOf ex.world.World
		 * 
		 * @param {Object} object
		 */
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
