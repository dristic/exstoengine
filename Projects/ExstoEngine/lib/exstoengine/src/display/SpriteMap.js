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
		 */
		constructor: function(tileWidth, tileHeight, map, tileSet, name) {
			this.visible = true;
			this.collides = false;
			this.name = name;
			this.type = "SpriteMap";
			this.tileSet = tileSet;
			this.position = new ex.base.Vector(0,0);
			this.scrollFactor = new ex.base.Vector(1,1);
			
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
		 * @param {Number} camWidth
		 * @param {Number} camHeight
		 */
		render: function(context, camX, camY, camWidth, camHeight) {
			// Do nothing if not visible
			if(!this.visible){
				return;
			}
			
			//Pre-calculated values for speed
			var camWithScrollX = (camX * this.scrollFactor.x),
				camWithScrollY = (camY * this.scrollFactor.y);
			
			// Calculate the range of tiles in the viewport
			var yStart = ex.toInt(camWithScrollY / this.tileHeight),
				yStop = ex.toInt((camWithScrollY + camHeight) / this.tileHeight + 1),
				xStart = ex.toInt(camWithScrollX / this.tileWidth),
				xStop = ex.toInt((camWithScrollX + camWidth) / this.tileWidth + 1);
			
			// Check for the SpriteMap being completely off screen
			if(yStart < ex.toInt(-(camHeight / this.tileHeight)))
				return;		// SpriteMap below viewport
			else if(yStop < 0)
				return;		// SpriteMap above viewport
			else if(xStart < ex.toInt(-(camWidth / this.tileWidth)))
				return;		// SpriteMap left of viewport
			else if(xStop < 0)
				return;		// SpriteMap right of viewport
			
			// Constrain start/stop parameters to grid values
			if(yStart < 0)
				yStart = 0;
			else if(yStart > this.data.length)
				yStop = this.data.length;
			if(xStart < 0)
				xStart = 0;
			else if(xStart > this.data[0].length)
				xStart = this.data[0].length;
			if(yStop > this.data.length)
				yStop = this.data.length;
			if(xStop > this.data[0].length)
				xStop = this.data[0].length;
			
			// Render tiles in viewport
			var yPos = yStart,
				xPos = xStart;
			for(yPos; yPos < yStop; yPos++) {
				for(xPos; xPos < xStop; xPos++) {
					var tile = this.data[yPos][xPos], sx = 0, sy = 0;
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
								      ex.toInt(tile.position.x - camWithScrollX),
								      ex.toInt(tile.position.y - camWithScrollY),
								      tile.width,
								      tile.height);
					}
				}
				xPos = xStart;
			}
		}
	});
});
