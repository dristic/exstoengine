/* 
 * Simplex - Tile Editor
 *
 */
 
if(window.addEventListener) {
	window.addEventListener('load',function(){
		var canvas;
		var context;
		
		var tools = {};
		var defaultTool = 'pencil';
		var activeTool;
		var started = false;
		
		// Initialization
		function init() {
			//Attempt to find canvas
			canvas = document.getElementById('tileView');
			if(!canvas) {
				alert('Error: canvas was not found on page.');
				return;
			}
			//Attempt to find canvas context
			if(!canvas.getContext) {
				alert('Error: no canvas context.');
				return;
			}
			//Attempt to retrieve canvas context
			context = canvas.getContext('2d');
			if(!context) {
				alert('Error: failed to retrieve context.');
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
			canvas.addEventListener('mousedown', onCanvasEvent, false);
			canvas.addEventListener('mousemove', onCanvasEvent, false);
			canvas.addEventListener('mouseup', onCanvasEvent, false);
		}
		
		// MouseMove event handler
		function onMouseMove (event) {
			var mousePos = getMousePosition(event);
			if(!started){
				context.beginPath();
				context.moveTo(mousePos[0], mousePos[1]);
				started = true;
			} else {
				context.lineTo(mousePos[0], mousePos[1]);
				context.stroke();
			}
		}
		
		// On tool change
		function onToolChange(event) {
			if(tools[this.value]) {
				activeTool = new tools[this.value]();
			}
		}
		
		function onCanvasEvent(event) {
			// Firefox
			if(event.layerX || event.layerX == 0) {
				event._x = event.layerX;
				event._y = event.layerY;
			}
			// Opera
			else if(event.offsetX || event.offsetX == 0) {
				event._x = event.offsetX;
				event._y = event.offsetY;
			}
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
		
		function setTool(tool) {
			activeTool = new tool();
		};
		
		tools.pencil = function() {
			var tool = this;		//named self-reference
			this.started = false;
			
			// Mouse Down - start drawing
			this.mousedown = function(event) {
				context.beginPath();
				context.moveTo(event._x, event._y);
				tool.started = true;
			};
			
			// Mouse Move - continue drawing if mouse down
			this.mousemove = function(event) {
				if(tool.started) {
					context.lineTo(event._x, event._y);
					context.stroke();
				}
			};
			
			// Mouse Up - stop drawing
			this.mouseup = function(event) {
				if(tool.started) {
					tool.mousemove(event);
					tool.started = false;
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
				context.moveTo(tool.x0, tool.y0);
			};
			
			// Mouse Move - continue drawing if mouse down
			this.mousemove = function(event) {
				if(!tool.started) {
					return;
				}
				
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.beginPath();
				context.moveTo(tool.x0, tool.y0);
				context.lineTo(event._x, event._y);
				context.stroke();
				context.closePath();
			};
			
			// Mouse Up - stop drawing
			this.mouseup = function(event) {
				if(tool.started) {
					tool.mousemove(event);
					tool.started = false;
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
				
				context.clearRect(0,0, canvas.width, canvas.height);
				if( !width || !height) {
					return;
				}
				
				context.strokeRect(x, y, width, height);
			};
			
			// Mouse Up - stop drawing
			this.mouseup = function(event) {
				if(tool.started) {
					tool.mousemove(event);
					tool.started = false;
				}
			};
		};
		
		init();
	}, false);
}