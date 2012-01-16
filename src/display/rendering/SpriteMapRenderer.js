ex.using([
  'ex.display.rendering.ObjectRenderer'
], function () {
  ex.define('ex.display.rendering.SpriteMapRenderer', ex.display.rendering.ObjectRenderer, {
    setupDom: function (el) {
      var tileMap = document.createElement('div');
      tileMap.style.position = 'absolute';
      tileMap.style.left = this.position.x + 'px';
      tileMap.style.top = this.position.y + 'px';
      tileMap.style.display = 'block';
      tileMap.style.width = this.tileMap.width + 'px';
      tileMap.style.height = this.tileMap.height + 'px';
      tileMap.style.zIndex = '99';
      
      var yPos = this.tileMap.data.length - 1,
          xPos = 0;
      for(yPos; yPos > -1; yPos--) {
        for(xPos; xPos < this.tileMap.data[yPos].length; xPos++) {
          var tile = this.tileMap.data[yPos][xPos], sx = 0, sy = 0;
          var tileValue = tile.value;
          if(tileValue != 0) {
            while(--tileValue) {
              sx += this.tileMap.tileWidth;
              if(sx >= this.tileSet.width) {
                sy += this.tileMap.tileHeight;
                sx = 0;
              }
            }
            
            var tileEl = document.createElement('div');
            tileEl.style.position = 'absolute';
            tileEl.style.left = tile.position.x + 'px';
            tileEl.style.top = (tile.position.y - (this.yOffset * yPos)) + 'px';
            tileEl.style.display = 'block';
            tileEl.style.width = tile.width + 'px';
            tileEl.style.height = tile.height + 'px';
            tileEl.style.backgroundImage = 'url(' + this.tileSet.src + ')';
            tileEl.style.backgroundPosition = 
              -sx + 'px' + ' ' + -sy + 'px';
            tileMap.appendChild(tileEl);
          } else {
            var tileEl = document.createElement('div');
            tileEl.style.position = 'absolute';
            tileEl.style.left = tile.position.x + 'px';
            tileEl.style.top = (tile.position.y - (this.yOffset * yPos)) + 'px';
            tileEl.style.width = tile.width + 'px';
            tileEl.style.height = tile.height + 'px';
            tileEl.style.display = 'none';
            tileMap.appendChild(tileEl);
          }
        }
        xPos = 0;
      }
      
      this.rendering = {
        el: tileMap
      };
      
      el.appendChild(this.rendering.el);
    },
    
    renderDom: function (el, camX, camY, camWidth, camHeight) {
      // Set opacity to 0 if not visible
      if(!this.visible){
        this.rendering.el.style.opacity = 0;
        return;
      } else {
        this.rendering.el.style.opacity = this.opacity;
      }
      
      // Position of the sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
            
      // Do nothing if sprite map is out of the viewport
      if((viewPortX + this.tileMap.width) < 0
          || viewPortX > camWidth
          ||(viewPortY + this.tileMap.height) < 0
          || viewPortY > camHeight) {
        this.rendering.el.style.display = 'none';
        return;
      } else {
        this.rendering.el.style.display = 'inherit';
      }
      
      var yPos = this.tileMap.data.length - 1,
          xPos = 0;
      for(yPos; yPos > -1; yPos--) {
        for(xPos; xPos < this.tileMap.data[yPos].length; xPos++) {
          var tile = this.tileMap.data[yPos][xPos];
          var tileValue = tile.value;
          if(tileValue != 0) {
            var tilePortX = ex.toInt((this.position.x + tile.position.x) - (camX * this.scrollFactor.x)),
                tilePortY = ex.toInt((this.position.y + tile.position.y) + (camY * this.scrollFactor.y) - (camHeight / 2));
            if((tilePortX + tile.width) < 0
                || tilePortX > camWidth
                || (tilePortY + tile.height) < 0
                || tilePortY > camHeight) {
              if(tile.visible == true) {
                var tileIndex = (yPos * this.tileMap.data[0].length) + xPos;
                var el = this.rendering.el.childNodes[tileIndex];
                el.style.display = 'none';
                tile.visible = false; 
              }
            } else if(tile.visible == false) {
              var tileIndex = (yPos * this.tileMap.data[0].length) + xPos;
              var el = this.rendering.el.childNodes[tileIndex];
              tile.visible = true;
              el.style.display = 'inherit';
            }
          }
        }
        xPos = 0;
      }
      
      this.rendering.el.style.left = -camX + 'px';
      this.rendering.el.style.top = -camY + 'px';
    },
    
    destroyDom: function (el) {
      el.removeChild(this.rendering.el);
      this.rendering = null;
    },
    
    /**
     * Pre-renders the SpriteMap to the preRenderCanvas,
     * which acts as a buffer to the SpriteMap. This
     * results in the SpriteMap not having to be fully
     * generated each frame, instead redrawing the buffer
     * as a single image.
     */
    setup2dCanvas: function (canvas) {
      if(this.options.preRender == true) {
        // Used to pre-render the whole map as an image
        this.preRenderCanvas = document.createElement("canvas");
        this.preRenderCanvas.width = this.tileMap.width;
        this.preRenderCanvas.height = this.tileMap.height;
        this.preRenderContext = this.preRenderCanvas.getContext('2d');
        
        ex.display.rendering.SpriteMapRenderer.renderSpriteMapToContext(this, this.preRenderContext);
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
    render2dCanvas: function(context, camX, camY, camWidth, camHeight) {
      // Do nothing if not visible
      if(!this.isVisible()){
        return;
      }
      
      // Position of the sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
            
      // Do nothing if sprite map is out of the viewport
      if((viewPortX + this.tileMap.width) < 0
          || viewPortX > camWidth
          ||(viewPortY + this.tileMap.height) < 0
          || viewPortY > camHeight) {
        if(this.options.repeat == false) {
          return;
        }
      }
      
      var SpriteMapRenderer = ex.display.rendering.SpriteMapRenderer;
      
      if(this.options.repeat == false) {
        if(this.options.preRender == true) {
          SpriteMapRenderer.renderPreRenderedSpriteMapToContext(this, context, { x: viewPortX, y: viewPortY }, camWidth, camHeight);
        } else {
          // Render all the tiles on the map at once.
          SpriteMapRenderer.renderSpriteMapToContext(this, context, { x: viewPortX, y: viewPortY });
        }
      } else {
        // The starting x and y is equal to the remainder of how many times the tile
        // map can fit between its position and the camera top left.
        var startX = viewPortX % this.tileMap.width, 
            startY = viewPortY % this.tileMap.height,
            curX, curY;
        
        // Subtract one more tile if the tiles need to repeat negatively.
        if(viewPortX > 0) startX -= this.tileMap.width;
        if(viewPortY > 0) startY -= this.tileMap.height;
        
        curX = startX;
        curY = startY;
        
        while(curX < camWidth) {
          while(curY < camHeight) {
            // Copied from after if(this.options.repeat == false)
            if(this.options.preRender == true) {
              SpriteMapRenderer.renderPreRenderedSpriteMapToContext(this, context, { x: curX, y: curY }, camWidth, camHeight);
            } else {
              // Render all the tiles on the map at once.
              SpriteMapRenderer.renderSpriteMapToContext(this, context, { x: curX, y: curY });
            }
            curY += this.tileMap.height;
          }
          curY = startY;
          curX += this.tileMap.width;
        }
      }
    },
    
    // Global static functions.
    __statics: {
      renderPreRenderedSpriteMapToContext: function (spriteMap, context, position, width, height) {
        position = position || {
          x: 0,
          y: 0
        };
        
        // Calculate section of preRenderCanvas to draw
        var sourceX = -position.x,
            sourceY = -position.y,
            sourceWidth = width - position.x,
            sourceHeight = height - position.y;
        var destX = position.x,
            destY = position.y;
        
        // Constrain values to image size
        if(sourceX < 0) sourceX = 0;
        if(sourceY < 0) sourceY = 0;
        if((sourceX + sourceWidth) > spriteMap.preRenderCanvas.width) sourceWidth = spriteMap.preRenderCanvas.width - sourceX;
        if((sourceY + sourceHeight) > spriteMap.preRenderCanvas.height) sourceHeight = spriteMap.preRenderCanvas.height - sourceY;
        if(destX < 0) destX = 0;
        if(destY < 0) destY = 0;
        
        // Draw image
        context.drawImage(
                  spriteMap.preRenderCanvas,
                  sourceX,
                  sourceY,
                  sourceWidth,
                  sourceHeight,
                  destX, 
                  destY,
                  sourceWidth,  //destWidth and Height == sourceWidth and Height
                  sourceHeight);
      },
      
      renderSpriteMapToContext: function (spriteMap, context, offset) {
        var yPos = spriteMap.tileMap.data.length - 1,
            xPos = 0;
        
        offset = offset || {
          x: 0,
          y: 0
        };
        
        // Loop through all the tiles and draw them onto the context.
        for(yPos; yPos > -1; yPos--) {
          for(xPos; xPos < spriteMap.tileMap.data[yPos].length; xPos++) {
            var tile = spriteMap.tileMap.data[yPos][xPos], sx = 0, sy = 0;
            var tileValue = tile.value;
            if(tileValue != 0) {
              while(--tileValue) {
                sx += spriteMap.tileMap.tileWidth;
                if(sx >= spriteMap.tileSet.width) {
                  sy += spriteMap.tileMap.tileHeight;
                  sx = 0;
                }
              }
              context.drawImage(
                  spriteMap.tileSet,
                  sx,
                  sy,
                  spriteMap.tileMap.tileWidth,
                  spriteMap.tileMap.tileHeight,
                  tile.position.x + offset.x,
                  tile.position.y - (spriteMap.options.offset.y * yPos) + offset.y,
                  tile.width,
                  tile.height);
            }
          }
          xPos = 0;
        }
      }
    }
  });
});