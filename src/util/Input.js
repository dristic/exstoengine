ex.using([
  "ex.util.Key"
], function () {
	ex.define("ex.util.Input", {
		constructor: function () {
			this.keys = [];
			this.pressed = [];
			this.pressedTimer = 1;
			this.mouseX = 0;
			this.mouseY = 0;
			this.mouseDown = false;
			this.mouseUp = false;
			this.rightButton = false;
			
			this.lastMouseX = 0;
			this.lastMouseY = 0;
			this.dragging = false;						// If the mouse is dragging or not
			this._beginDrag = false;					// Buffer so dragging does not always happen instantly
		},
		
		listenOn: function(element) {
			document.addEventListener("keydown", ex.bind(this, this.onKeyDown));
			document.addEventListener("keyup", ex.bind(this, this.onKeyUp));
			element.addEventListener("mousedown", ex.bind(this, this.onMouseDown));
			element.addEventListener("mouseup", ex.bind(this, this.onMouseUp));
			element.addEventListener("mousemove", ex.bind(this, this.onMouseMove));
		},
		
		update: function(dt) {			
			var i = this.pressed.length;
			while(i--) {
				if(this.pressed[i] > 0)
				this.pressed[i]--;
			}
			
			if(this._beginDrag == true && this.mouseUp == false) {
				this.dragging = true;
			}
			
			this.mouseDown = false;
			this.mouseUp = false;
			
			this.lastMouseX = this.mouseX;
			this.lastMouseY = this.mouseY;
		},
		
		getMousePosition: function(event) {
			// Firefox, IE9, & Chrome
			if(event.layerX || event.layerX == 0) {
				event._x = event.layerX;
				event._y = event.layerY;
			}
			// Opera
			else if(event.offsetX || event.offsetX == 0) {
				event._x = event.offsetX;
				event._y = event.offsetY;
			}
			// Unsupported
			else {
				event._x = -1;
				event._y = -1;
			}
			
			return event;
		},
		
		getMouseDelta: function () {
			return [(this.mouseX - this.lastMouseX), (this.mouseY - this.lastMouseY)];
		},
		
		onMouseDown: function(event) {
			this.mouseDown = true;
			this._beginDrag = true;
			
			if (event.which) this.rightButton = (event.which == 3);
			else if (event.button) this.rightButton = (event.button == 2);
		},
		
		onMouseUp: function(event) {
			this.mouseUp = true;
			this._beginDrag = false;
			this.dragging = false;
			this.rightButton = false;
		},
		
		onMouseMove: function(event) {
			event = this.getMousePosition(event);
			this.mouseX = event._x;
			this.mouseY = event._y;
		},
		
		onKeyDown: function(event) {
			if(this.keys[event.keyCode] == false || !this.keys[event.keyCode]) {
				this.keys[event.keyCode] = true;
				this.pressed[event.keyCode] = this.pressedTimer;	
			}
		},
		
		onKeyUp: function(event) {
			this.keys[event.keyCode] = undefined;
		},
		
		isKeyDown: function(keyCode) {
			return this.keys[keyCode];
		},
		
		isKeyPressed: function(keyCode) {
			if(this.pressed[keyCode] > 0) {
				return true;
			} else {
				return false;
			}
		}
	});
});
