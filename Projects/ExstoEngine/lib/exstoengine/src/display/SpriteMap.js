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

			// Run TileMap constructor to prepare tile data
			this._super("constructor", [tileWidth, tileHeight, map]);

			// Used to pre-render the whole map as an image
			this.preRenderCanvas = document.createElement("canvas");
			this.preRenderCanvas.width = this.width;
			this.preRenderCanvas.height = this.height;
			this.preRenderContext = this.preRenderCanvas.getContext('2d');
			
			this._preRenderSpriteMap();
			this.rendered = 10;
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
			if(this.rendered-- > 0) {
				this._preRenderSpriteMap();
			}
			// Check for any tile changes
			// If changes found, 
			//		alter the preRenderCanvas accordingly
		},
		
		/*
		 * Pre-renders the SpriteMap to the preRenderCanvas,
		 * which acts as a buffer to the SpriteMap. This
		 * results in the SpriteMap not having to be fully
		 * generated each frame, instead redrawing the buffer
		 * as a single image.
		 */
		_preRenderSpriteMap: function () {
			var yPos = 0,
				xPos = 0;
			for(yPos; yPos < this.data.length; yPos++) {
				for(xPos; xPos < this.data[yPos].length; xPos++) {
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
						this.preRenderContext.drawImage(
								this.tileSet,
								sx,
								sy,
								this.tileWidth,
								this.tileHeight,
								tile.position.x,
								tile.position.y,
								tile.width,
								tile.height);
					}
				}
				xPos = 0;
			}
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
			
			// Position of the sprite in the viewport
			var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
				viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
						
			// Do nothing if sprite map is out of the viewport
			if((viewPortX + this.preRenderCanvas.width) < 0
					|| viewPortX > camWidth
					||(viewPortY + this.preRenderCanvas.height) < 0
					|| viewPortY > camHeight) {
				return;
			}
			
			// Calculate section of preRenderCanvas to draw
			var sourceX = -viewPortX,
				sourceY = -viewPortY,
				sourceWidth = camWidth - viewPortX,
				sourceHeight = camWidth - viewPortY;
			var destX = viewPortX,
				destY = viewPortY;
			
			// Constrain values to image size
			if(sourceX < 0) sourceX = 0;
			if(sourceY < 0) sourceY = 0;
			if((sourceX + sourceWidth) > this.preRenderCanvas.width) sourceWidth = this.preRenderCanvas.width - sourceX;
			if((sourceY + sourceHeight) > this.preRenderCanvas.height) sourceHeight = this.preRenderCanvas.height - sourceY;
			if(destX < 0) destX = 0;
			if(destY < 0) destY = 0;
			
			// Draw image
			context.drawImage(
            		this.preRenderCanvas,
            		sourceX,
            		sourceY,
            		sourceWidth,
            		sourceHeight,
            		destX, 
            		destY,
            		sourceWidth,	//destWidth and Height == sourceWidth and Height
            		sourceHeight);
		}
	});
});
