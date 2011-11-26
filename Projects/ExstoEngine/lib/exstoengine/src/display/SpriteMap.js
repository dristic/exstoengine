ex.using([
  "ex.world.TileMap",
  "ex.display.Renderable"
], function () {
	ex.define("ex.display.SpriteMap", ex.display.Renderable, {
		
		/**
		 * The graphical representation of a TileMap.
		 * 
		 * @name ex.display.SpriteMap
		 * @extends ex.world.TileMap
		 * 
		 * @param {Number} tileWidth
		 * @param {Number} tileHeight
		 * @param {Number[]} map a 2D array of integer values relating to the
		 * 		tiles in the supplied tileSet
		 * @param {Image} tileSet
		 * @param {String} name
		 * 
		 * @property {Boolean} collides Controls whether the object is included
		 * 		in collision detection.
		 * @propety {String} name
		 * @property {Image} tileSet the tile set to use when rendering.
		 * @property {ex.base.Vector} position
		 * @property {ex.base.Vector} scrollFactor
		 */
		constructor: function(tileWidth, tileHeight, map, tileSet, name, yOffset) {
		  this.type = "SpriteMap";
		  
			this.collides = false;
			this.name = name;
			this.tileSet = tileSet;
			this.position = new ex.base.Vector(0,0);
			this.scrollFactor = new ex.base.Vector(1,1);
			this.yOffset = yOffset || 0;

			// Call Renderable constructor (visibility, opacity)
			this._super("constructor", [true, 1.0]);
			
			// Create TileMap
			this.tileMap = new ex.world.TileMap(tileWidth, tileHeight, map);
		},
		
		/**
		 * Contains any event handling when a collision occurs between this
		 * and another object.
		 * 
		 * @function
		 * @name onCollide
		 * @memberOf ex.display.SpriteMap
		 */
		onCollide: function() {
			
		},
		
		/**
		 * The update routine.
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.display.SpriteMap
		 * 
		 * @param {Number} dt timestep
		 */
		update: function(dt) {
			// Check for any tile changes
			// If changes found, 
			//		alter the preRenderCanvas accordingly
		}
	});
});
