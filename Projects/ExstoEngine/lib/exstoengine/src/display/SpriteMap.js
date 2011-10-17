ex.using([
  "ex.world.TileMap",
  //"ex.base.Vector"
], function () {
	ex.define("ex.display.SpriteMap", ex.world.TileMap, {
		
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
		 * @param {Object} edgeDebug
		 * 
		 * @property {Boolean} visible Controls whether the object is drawn
		 * 		to the screen.
		 * @property {Boolean} collides Controls whether the object is included
		 * 		in collision detection.
		 * @propety {String} name
		 * @property {String} type
		 * 		Internal use only. Do not change!
		 * @property {Image} tileSet the tile set to use when rendering.
		 * @property {ex.base.Vector} position
		 * @property {ex.base.Vector} scrollFactor
		 * @property {Object} edgeDebug contains collision debug images.
		 * 		If supplied, collision edges will be shown graphically.
		 */
		constructor: function(tileWidth, tileHeight, map, tileSet, name, edgeDebug) {
			this.visible = true;
			this.collides = true;
			this.name = name;
			this.type = "SpriteMap";
			this.tileSet = tileSet;
			this.position = new ex.base.Vector(0,0);
			this.scrollFactor = new ex.base.Vector(1,1);
			
			this.edgeDebug = edgeDebug;
			
			this._super("constructor", [tileWidth, tileHeight, map]);
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
			
		},
		
		/**
		 * The render routine.
		 * 
		 * @function
		 * @name render
		 * @memberOf ex.display.SpriteMap
		 * 
		 * @param {Context} context
		 * @param {Number} camX
		 * @param {Number} camY
		 */
		render: function(context, camX, camY) {
			if(!this.visible){
				return;
			}
			
			for(var y = 0; y < this.data.length; y++) {
				for(var x = 0; x < this.data[y].length; x++) {
					var tile = this.data[y][x], sx = 0, sy = 0;
					var tileValue = tile.value;
					if(tileValue != 0) {
						while(--tileValue) {
							sx += this.tileWidth;
							if(sx >= this.tileSet.width) {
								sy += this.tileHeight;
								sx = 0;
							}
						}
						context.drawImage(this.tileSet,
								      sx,
								      sy,
								      this.tileWidth,
								      this.tileHeight,
								      tile.position.x - (camX * this.scrollFactor.x),
								      tile.position.y - (camY * this.scrollFactor.y),
								      tile.width,
								      tile.height);
						if(this.edgeDebug){
							if(tile.edges.left){
								context.drawImage(this.edgeDebug.left,
										tile.position.x - (camX * this.scrollFactor.x),
										tile.position.y - (camY * this.scrollFactor.y),
										tile.width,
										tile.height);
							}
							if(tile.edges.right){
								context.drawImage(this.edgeDebug.right,
										tile.position.x - (camX * this.scrollFactor.x),
										tile.position.y - (camY * this.scrollFactor.y),
										tile.width,
										tile.height);
							}
							if(tile.edges.top){
								context.drawImage(this.edgeDebug.top,
										tile.position.x - (camX * this.scrollFactor.x),
										tile.position.y - (camY * this.scrollFactor.y),
										tile.width,
										tile.height);
							}
							if(tile.edges.bottom){
								context.drawImage(this.edgeDebug.bottom,
										tile.position.x - (camX * this.scrollFactor.x),
								      	tile.position.y - (camY * this.scrollFactor.y),
								      	tile.width,
								      	tile.height);
							}
						}
					}
					
				}
			}
		}
	});
});
