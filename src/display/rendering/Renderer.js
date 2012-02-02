ex.using([
    'ex.display.rendering.RenderingContextDom',
    'ex.display.rendering.RenderingContext2dCanvas',
    'ex.display.rendering.RenderingContext3dCanvas',
    
    'ex.display.rendering.SpriteRenderer',
    'ex.display.rendering.RectangleRenderer',
    'ex.display.rendering.TextRenderer',
    'ex.display.rendering.AnimatedSpriteRenderer',
    'ex.display.rendering.SpriteMapRenderer'
], function () {
	ex.define("ex.display.rendering.Renderer", {
	  __statics: {
	    DOM: 1,
	    CANVAS2D: 2,
	    CANVAS3D: 3
	  },
	  
		/**
		 * The rendering component of the engine.
		 * 
		 * @name ex.display.Renderer
		 * 
		 * @param {Number} width
		 * @param {Number} height
		 * @param {String} bgColor hex value, eg #FFFFFF
		 * @param {Canvas} canvas DOM Canvas to render to
		 * 
		 * @property {Canvas} canvas
		 * @property {Context} context
		 * @property {ex.display.Renderable[]} renderables objects to render
		 */
		constructor: function (options) {
		  // Set dimensions and background color
		  this.width = options.width;
		  this.height = options.height;
		  this.bgColor = options.bgColor;
		  this.fullscreen = options.fullscreen;
		  this.fullscreenType = options.fullscreenType;
		  
		  this.renderables = [];
			this.renderingContext = null;
			this.type = options.context;
			
			// Setup the default renderers
			this.renderers = {
			  Sprite: new ex.display.rendering.SpriteRenderer(),
			  Rectangle: new ex.display.rendering.RectangleRenderer(),
			  Text: new ex.display.rendering.TextRenderer(),
			  AnimatedSprite: new ex.display.rendering.AnimatedSpriteRenderer(),
			  SpriteMap: new ex.display.rendering.SpriteMapRenderer()
			};
			
			this.setup(options.params);
		},
		
		/**
     * Initiate the rendering context depending on what type is passed in.
     * @param {Int} type The type of rendering.
     * @param {Object} params The parameters to pass into the context.
     */
    setup: function (params) {
      if(this.type == ex.display.rendering.Renderer.DOM) {
        this.renderingContext = 
          new ex.display.rendering.RenderingContextDom(this.width, this.height, this.renderers, params.el, this.bgColor);
      } else if(this.type == ex.display.rendering.Renderer.CANVAS2D) {
        this.renderingContext = 
          new ex.display.rendering.RenderingContext2dCanvas(this.width, this.height, this.renderers, params.canvas, this.bgColor);
      } else if(this.type == ex.display.rendering.Renderer.CANVAS3D) {
        this.renderingContext = 
          new ex.display.rendering.RenderingContext3dCanvas(this.width, this.height, this.renderers, params.canvas, this.bgColor);
      }
    },
    
    getRenderingElement: function () {
      if(this.renderingContext.el) {
        return this.renderingContext.el;
      } else if(this.renderingContext.canvas) {
        return this.renderingContext.canvas;
      }
      
      return null;
    },
    
    _resizeViewport: function() {
      if(this.type == ex.display.rendering.Renderer.DOM) {
        switch(this.fullscreenType) {
          case 'resize':
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.renderingContext.resizeViewport(this.width, this.height);
        }
      } else if (this.type == ex.display.rendering.Renderer.CANVAS2D) {
        switch(this.fullscreenType) {
          case 'resize':
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.renderingContext.resizeViewport(this.width, this.height);
            break;
          case 'scale':
            // Do nothing, CSS will auto scale it
            break;
        }
      } else if (this.type == ex.display.rendering.Renderer.CANVAS3D) {
        
      }
    },
		
		/**
		 * Sets up rendering for an object and adds it to the list of renderables.
		 * @param {Renderable} object The object to add to the rendering list.
		 */
		addRenderable: function (object) {
	    // Checking to see if a renderer exists for this object
	    if(!object.renderer && !this.renderers[object.type]) {
	      ex.Debug.log('There is no renderer setup for ' + object.type, 'ERROR');
	    }
	    
	    if(this.type == ex.display.rendering.Renderer.DOM) {
        if(!object.renderer) {
          this.renderers[object.type].setupDom.call(object, this.renderingContext.el);
        } else {
          object.renderer.setupDom.call(object, this.renderingContext.el);
        }
      } else if(this.type == ex.display.rendering.Renderer.CANVAS2D) {
        if(!object.renderer) {
          this.renderers[object.type].setup2dCanvas.call(object, this.renderingContext.canvas);
        } else {
          object.renderer.setup2dCanvas.call(object, this.renderingContext.canvas);
        }
      } else if(this.type == ex.display.rendering.Renderer.CANVAS3D) {
        if(!object.renderer) {
          this.renderers[object.type].setup3dCanvas.call(object, this.renderingContext.canvas);
        } else {
          object.renderer.setup3dCanvas.call(object, this.renderingContext.canvas);
        }
      }
      
      this.renderables.push(object);
		},
		
		/**
		 * Removes an object from the rendering list and calls destroy based on the rendering type.
		 * @param {Renderable} object The object to remove from the list.
		 */
		removeRenderable: function (object) {
		  // If this item has child items remove them, otherwise just
		  // remove the item itself.
		  if(object.items) {
		    var i = 0,
		        ln = object.items.length;
		    for(; i < ln; i++) {
		      this.removeRenderable(object.items[i]);
		    }
		  } else {
		    if(this.type == ex.display.rendering.Renderer.DOM) {
	        if(!object.renderer) {
	          this.renderers[object.type].destroyDom.call(object, this.renderingContext.el);
	        } else {
	          object.renderer.destroyDom.call(object, this.renderingContext.el);
	        }
	      } else if(this.type == ex.display.rendering.Renderer.CANVAS2D) {
	        if(!object.renderer) {
	          this.renderers[object.type].destroy2dCanvas.call(object, this.renderingContext.canvas);
	        } else {
	          object.renderer.destroy2dCanvas.call(object, this.renderingContext.canvas);
	        }
	      } else if(this.type == ex.display.rendering.Renderer.CANVAS3D) {
	        if(!object.renderer) {
	          this.renderers[object.type].destroy3dCanvas.call(object, this.renderingContext.canvas);
	        } else {
	          object.renderer.destroy3dCanvas.call(object, this.renderingContext.canvas);
	        }
	      }
	      
	      index = this.renderables.length;
	      while(index--) {
	        if(this.renderables[index] === object) {
	          this.renderables.splice(index, 1);
	        }
	      }
		  }
		},
		
		/**
		 * Called on every frame to update the screen.
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.display.Renderer
		 * 
		 * @param {Number} dt 
		 * @param {ex.display.Camera} camera
		 */
		update: function (dt, camera) {
			this.renderingContext.render(this.renderables, camera.position.x, camera.position.y, camera.width, camera.height);
		}
	});
});