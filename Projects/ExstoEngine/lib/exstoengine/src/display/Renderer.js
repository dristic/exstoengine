(function() {
	ex.define("ex.display.Renderer", {
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
		constructor: function (width, height, bgColor, canvas) {
			this.canvas = canvas || document.createElement("canvas");
			this.canvas.id = "mainCanvas";
			this.canvas.width = width;
			this.canvas.height = height;
			this.canvas.style.backgroundColor = bgColor;
			this.context = this.canvas.getContext("2d");
			
			this.renderables = [];
			
			//--If a canvas was not passed in, add a new one to the page
			if(canvas == null) {
				document.body.appendChild(this.canvas);
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
		 * @param {Number} camX
		 * @param {Number} camY
		 */
		update: function (dt, camX, camY) {			
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			
			var i = this.renderables.length;
			while(i--) {
				this.renderables[i].render(this.context, camX, camY);
			}
		},
		
		/**
		 * Resizes the canvas.
		 * 
		 * @function
		 * @name resizeCanvas
		 * @memberOf ex.display.Renderer
		 * 
		 * @param {Number} newWidth
		 * @param {Number} newHeight
		 */
		resizeCanvas: function (newWidth, newHeight) {
			this.canvas.width = newWidth;
			this.canvas.height = newHeight;
		}
	});
}());
