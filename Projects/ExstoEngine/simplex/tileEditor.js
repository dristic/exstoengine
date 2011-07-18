/* 
 * Simplex - Tile Editor
 *
 */
 
if(window.addEventListener) {
	window.addEventListener('load',function(){
		var canvas;
		var context;
		var canvasBuffer;		// Buffers are used for live updating
		var contextBuffer;		// (seeing what you draw before drawing it)
		
		var tools = {};
		var defaultTool = 'pencil';
		var activeTool;
		var started = false;
		
		// Initialization
		function init() {
			// Attempt to find canvas
			canvas = document.getElementById('tileView');
			if(!canvas) {
				alert('Error: canvas was not found on page.');
				return;
			}
			// Attempt to find canvas context
			if(!canvas.getContext) {
				alert('Error: no canvas context.');
				return;
			}
			// Attempt to retrieve canvas context
			context = canvas.getContext('2d');
			if(!context) {
				alert('Error: failed to retrieve context.');
				return;
			}
			// Attempt to create canvas buffer
			var container = canvas.parentNode;
			canvasBuffer = document.createElement('canvas');
			if(!canvasBuffer) {
				alert('Error: failed to create canvas buffer.');
				return;
			}
			canvasBuffer.id		= 'canvasBuffer';
			canvasBuffer.width 	= canvas.width;
			canvasBuffer.height	= canvas.height;
			container.appendChild(canvasBuffer);
			contextBuffer = canvasBuffer.getContext('2d');
			if(!contextBuffer) {
				alert('Error: failed to retrieve buffer context.');
				return;
			}
			
			// Attempt to setup tools
			var toolbar = document.getElementById('toolbar');
			if(!toolbar) {
				alert('Error: toolbar could not be found.');
				return;
			}
			toolbar.addEventListener('change', onToolChange, false);
			
			// Set default tool
			if(tools[defaultTool]) {
				activeTool = new tools[defaultTool]();
				toolbar.value = defaultTool;
			}
			
			//Add event listeners to canvas
			//addEventCollection(canvas);
			canvasBuffer.addEventListener('mousedown', onCanvasEvent, false);
			canvasBuffer.addEventListener('mousemove', onCanvasEvent, false);
			canvasBuffer.addEventListener('mouseup',   onCanvasEvent, false);
		}
		
		// On tool change
		function onToolChange(event) {
			if(tools[this.value]) {
				activeTool = new tools[this.value]();
			}
		}
		
		// Fires on any listened event on the canvas,
		// finds mouse position and fires appropriate action
		// of active tool.
		function onCanvasEvent(event) {
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
			
			// Run active tool's corresponding event
			var action = activeTool[event.type];
			if(action) {
				action(event);
			}
		};
		
		function updateBuffer() {
			context.drawImage(canvasBuffer, 0, 0);
			contextBuffer.clearRect(0,0, canvasBuffer.width, canvasBuffer.height);
		};
		
		function setTool(tool) {
			activeTool = new tool();
		};
		
		tools.pencil = function() {
			var tool = this;		//named self-reference
			this.started = false;
			
			// Mouse Down - start drawing
			this.mousedown = function(event) {
				contextBuffer.beginPath();
				contextBuffer.moveTo(event._x, event._y);
				tool.started = true;
			};
			
			// Mouse Move - continue drawing if mouse down
			this.mousemove = function(event) {
				if(tool.started) {
					contextBuffer.lineTo(event._x, event._y);
					contextBuffer.stroke();
				}
			};
			
			// Mouse Up - stop drawing
			this.mouseup = function(event) {
				if(tool.started) {
					tool.mousemove(event);
					tool.started = false;
					updateBuffer();
				}
			};
		};
		
		tools.line = function() {
			var tool = this;		//named self-reference
			this.started = false;
			
			// Mouse Down - start drawing
			this.mousedown = function(event) {
				tool.started = true;
				tool.x0 = event._x;
				tool.y0 = event._y;
				contextBuffer.moveTo(tool.x0, tool.y0);
			};
			
			// Mouse Move - continue drawing if mouse down
			this.mousemove = function(event) {
				if(!tool.started) {
					return;
				}
				
				contextBuffer.clearRect(0, 0, canvasBuffer.width, canvasBuffer.height);
				contextBuffer.beginPath();
				contextBuffer.moveTo(tool.x0, tool.y0);
				contextBuffer.lineTo(event._x, event._y);
				contextBuffer.stroke();
				contextBuffer.closePath();
			};
			
			// Mouse Up - stop drawing
			this.mouseup = function(event) {
				if(tool.started) {
					tool.mousemove(event);
					tool.started = false;
					updateBuffer();
				}
			};
		};
		
		tools.rect = function() {
			var tool = this;		//named self-reference
			this.started = false;
			
			// Mouse Down - start drawing
			this.mousedown = function(event) {
				tool.started = true;
				tool.x0 = event._x;
				tool.y0 = event._y;
			};
			
			// Mouse Move - continue drawing if mouse down
			this.mousemove = function(event) {
				if(!tool.started) {
					return;
				}
				
				var x = Math.min(event._x, tool.x0);
				var y = Math.min(event._y, tool.y0);
				var width = Math.abs(event._x - tool.x0);
				var height = Math.abs(event._y - tool.y0);
				
				contextBuffer.clearRect(0,0, canvasBuffer.width, canvasBuffer.height);
				if( !width || !height) {
					return;
				}
				
				contextBuffer.strokeRect(x, y, width, height);
			};
			
			// Mouse Up - stop drawing
			this.mouseup = function(event) {
				if(tool.started) {
					tool.mousemove(event);
					tool.started = false;
					updateBuffer();
				}
			};
		};

		tools.image = function() {
			var tool = this;		//named self-reference
			this.started = false;
			this.ready = false;
			this.image = new Image();
			this.image.src = 'imageTest.png';
			this.image.addEventListener('load', this.ready = true, false);
			// Mouse Down - start drawing
			this.mousedown = function(event) {
				tool.started = true;
				tool.x0 = event._x;
				tool.y0 = event._y;
			};
			
			// Mouse Move - continue drawing if mouse down
			this.mousemove = function(event) {
				if(tool.ready){
					contextBuffer.clearRect(0,0, canvasBuffer.width, canvasBuffer.height);				
					contextBuffer.drawImage(tool.image,event._x, event._y);
				}
			};
			
			// Mouse Up - stop drawing
			this.mouseup = function(event) {
				if(tool.started && tool.ready && tool.x0 == event._x && tool.y0 == event._y){
					tool.started = false;
					updateBuffer();
				}
			};
		};
		
		init();
	}, false);
}