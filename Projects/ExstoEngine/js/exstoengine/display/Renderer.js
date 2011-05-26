(function() {
	
	var Renderer = new ExstoEngine.Base.Class(null, {
		constructor: function (width, height, bgColor, canvas) {
			this.canvas = canvas || document.createElement("canvas");
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
		
		update: function (dt, camX, camY) {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			
			var i = this.renderables.length;
			while(i--) {
				this.renderables[i].render(this.context, camX, camY);
			}
		}
	});
	
	window.ExstoEngine.Display.Renderer = Renderer;
	
}());
