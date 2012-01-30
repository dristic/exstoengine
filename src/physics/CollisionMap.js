ex.using([
  "ex.world.TileMap",
  "ex.physics.Collidable"
], function () {
	ex.define("ex.physics.CollisionMap", ex.physics.Collidable, {
		/**
		 * Tile based collision data for an area.
		 * 
		 * @name ex.world.CollisionMap
		 * 
		 * @param tileWidth
		 * @param tileHeight
		 * @param data
		 * 
		 * @property tileMap
		 * 
		 * @constructor
		 */
		constructor: function(tileWidth, tileHeight, data) {
			this.tileMap = new ex.world.TileMap(tileWidth, tileHeight, data);
			
			this._super("constructor", ['Map']);
		}
	});
});