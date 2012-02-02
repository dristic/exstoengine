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
		constructor: function(tileWidth, tileHeight, data, userData) {
			this.tileMap = new ex.world.TileMap(tileWidth, tileHeight, data);
		  
			this._super("constructor", ['CollisionMap', userData]);
		},
		
		draw: function (context, camX, camY) {
		  var x = 0,
		      y = 0,
		      tile, drawX, drawY;
		  for(; x != this.tileMap.data.length; x++) {
		    y = 0;
		    for(; y != this.tileMap.data[x].length; y++) {
		      tile = this.tileMap.data[x][y];
		      if(tile.value > 0) {
		        drawX = tile.position.x - camX;
		        drawY = tile.position.y - camY;
		        context.beginPath();
		        if(tile.edges.top) {
		          context.moveTo(drawX, drawY);
		          context.lineTo(drawX + tile.width, drawY);
		        }
		        if(tile.edges.bottom) {
              context.moveTo(drawX, drawY + tile.height);
              context.lineTo(drawX + tile.width, drawY + tile.height);
            }
		        if(tile.edges.left) {
              context.moveTo(drawX, drawY);
              context.lineTo(drawX, drawY + tile.height);
            }
		        if(tile.edges.right) {
              context.moveTo(drawX + tile.width, drawY);
              context.lineTo(drawX + tile.width, drawY + tile.height);
            }
		        context.stroke();
		        context.closePath();
		      }
		    }
		  }
		}
	});
});