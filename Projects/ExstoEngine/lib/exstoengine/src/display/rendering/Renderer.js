ex.using([
    'ex.display.rendering.RenderingContextDom',
    'ex.display.rendering.RenderingContext2dCanvas',
    'ex.display.rendering.RenderingContext3dCanvas'
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
		constructor: function (width, height, bgColor) {
		  this.width = width;
		  this.height = height;
		  this.bgColor = bgColor;
			this.renderables = [];
			this.renderingContext = null;
		},
		
		addRenderable: function (object) {
		  if(this.type == ex.display.rendering.Renderer.DOM) {
        object.setupDom(this.renderingContext.el);
      } else if(this.type == ex.display.rendering.Renderer.CANVAS2D) {
        if(object.setup2dCanvas) {
          object.setup2dCanvas(this.renderingContext.canvas);
        }
      } else if(this.type == ex.display.rendering.Renderer.CANVAS3D) {
        object.setup3dCanvas(this.renderingContext.canvas);
      }
		  
		  this.renderables.push(object);
		},
		
		setup: function (type, params) {
		  this.type = type;
		  if(type == ex.display.rendering.Renderer.DOM) {
		    this.renderingContext = new ex.display.rendering.RenderingContextDom(this.width, this.height, params.el, this.bgColor);
		  } else if(type == ex.display.rendering.Renderer.CANVAS2D) {
		    this.renderingContext = 
		      new ex.display.rendering.RenderingContext2dCanvas(this.width, this.height, params.canvas, this.bgColor);
		  } else if(type == ex.display.rendering.Renderer.CANVAS3D) {
		    this.renderingContext = 
		      new ex.display.rendering.RenderingContext3dCanvas(this.width, this.height, params.canvas, this.bgColor);
		  }
		},
		
		removeRenderable: function (object) {
		  if(this.type == ex.display.rendering.Renderer.DOM) {
        object.destroyDom(this.renderingContext.el);
      } else if(this.type == ex.display.rendering.Renderer.CANVAS2D) {
        if(object.destroy2dCanvas) {
          object.destroy2dCanvas(this.renderingContext.canvas);
        }
      } else if(this.type == ex.display.rendering.Renderer.CANVAS3D) {
        object.destroy3dCanvas(this.renderingContext.canvas);
      }
		  
		  index = this.renderables.length;
      while(index--) {
        if(this.renderables[index] === object) {
          this.renderables.splice(index, 1);
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