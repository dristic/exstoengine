(function () {
	
	var Input = ExstoEngine.Base.Class(null, {
		constructor: function () {
			this.keys = [];
			this.pressed = [];
			this.pressedTimer = 1;
			this.mouseX = 0;
			this.mouseY = 0;
			this.mouseDown = false;
			this.mouseUp = false;
			
			document.addEventListener("keydown", ExstoEngine.bind(this.onKeyDown, this));
			document.addEventListener("keyup", ExstoEngine.bind(this.onKeyUp, this));
			document.addEventListener("mousedown", ExstoEngine.bind(this.onMouseDown, this));
			document.addEventListener("mouseup", ExstoEngine.bind(this.onMouseUp, this));
			document.addEventListener("mousemove", ExstoEngine.bind(this.onMouseMove, this));
		},
		
		update: function(dt) {
			var i = this.pressed.length;
			while(i--) {
				if(this.pressed[i] > 0)
				this.pressed[i]--;
			}
			
			this.mouseDown = false;
			this.mouseUp = false;
		},
		
		onMouseDown: function(event) {
			this.mouseDown = true;
		},
		
		onMouseUp: function(event) {
			this.mouseUp = true;
		},
		
		onMouseMove: function(event) {
			if(!event) event = window.event;
			if(event.pageX || event.pageY) {
				this.mouseX = event.pageX;
				this.mouseY = event.pageY;
			} else if(event.clientX || event.clientY) {
				this.mouseX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				this.mouseY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
		},
		
		onKeyDown: function(event) {
			if(this.keys[event.keyCode] == false || !this.keys[event.keyCode]) {
				this.keys[event.keyCode] = true;
				this.pressed[event.keyCode] = this.pressedTimer;	
			}
		},
		
		onKeyUp: function(event) {
			this.keys[event.keyCode] = false;
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
	
	window.ExstoEngine.Util.Input = Input;
	
}());
