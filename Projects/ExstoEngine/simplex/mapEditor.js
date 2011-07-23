/*
 * Map Editor
 * 
 * Required Libraries:
 *  - Tooltip.js: for custom tooltips
 */


if(window.addEventListener) {
	window.addEventListener('load',function(){
		
		/*
		 * DISABLE Toolbar temporarily
		 */
		var toolbarContainer = document.getElementById('toolbarContainer');
		toolbarContainer.style.display = 'none';
		
				
		var canvas;				// DOM Element for HTML5 canvas
		var context;			// context for HTML5 canvas
		var canvasBuffer;		// Buffers are used for live updating
		var contextBuffer;		// (seeing what you draw before drawing it)

		var map;
		var tileView;
		
		var codeViewer;			// DOM Element to activate code viewer
		var toolbar;			// DOM Element for tool selection
		
		var tools = {};
		var defaultTool = 'pencil';	
		var activeTool;
		var started = false;
		
		// Initialization
		function init() {
			// Attempt to find canvas
			canvas = document.getElementById('mapView');
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
			toolbar = document.getElementById('toolbar');
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

			// Attempt to setup code viewer
			codeViewer = document.getElementById('codeViewContainer');
			if(!codeViewer){
				alert('Error: codeView could not be found.');
				return;
			}
			codeViewer.viewCodeButton = document.getElementById('codeView');
			codeViewer.hideCodeButton = document.getElementById('codeHide');
			codeViewer.codeOutput = document.getElementById('codeOutput');
			codeViewer.hideCodeButton.style.display = 'none';
			codeViewer.codeOutput.style.display = 'none';
			codeViewer.viewCodeButton.addEventListener('click', onCodeView, false);
			codeViewer.hideCodeButton.addEventListener('click', onCodeHide, false);
			
			// Setup tile viewer
			
			
			// setup map
			map = new map();
			map.init(20,15,32);		// 20w x 15h x 32px
			map.draw();				// initial map draw
			
			tileView = new tileView();
			tileView.init('tileset.png');
			
			//Add event listeners to canvas
			//addEventCollection(canvas);
			canvasBuffer.addEventListener('mouseover', 	onCanvasEvent, false);
			canvasBuffer.addEventListener('mouseout', 	onCanvasEvent, false);
			canvasBuffer.addEventListener('mousedown', 	onCanvasEvent, false);
			canvasBuffer.addEventListener('mousemove', 	onCanvasEvent, false);
			canvasBuffer.addEventListener('mouseup',   	onCanvasEvent, false);
			
			document.addEventListener('keydown', onCanvasEvent, false);
		}
		
		// On tool change
		function onToolChange(event) {
			if(tools[this.value]) {
				activeTool = new tools[this.value]();
			}
		}
		
		function getMousePosition(event) {
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
		};
		// Fires on any listened event on the canvas,
		// finds mouse position and fires appropriate action
		// of active tool.
		function onCanvasEvent(event) {
			event = getMousePosition(event);
			
			// Run map's corresponding event
			var mapAction = map[event.type];
			if(mapAction) {
				mapAction(event);
			}
			
			// Run active tool's corresponding event
//			var toolAction = activeTool[event.type];
//			if(toolAction) {
//				toolAction(event);
//			}
		};
		
		function onCodeView() {
			var code = generateOutputCode();
			codeViewer.codeOutput.style.display = 'block';
			codeViewer.codeOutput.innerHTML = code;
			codeViewer.viewCodeButton.style.display = 'none';
			codeViewer.hideCodeButton.style.display = 'block';
			//alert(code);
		};
		
		function onCodeHide() {
			codeViewer.codeOutput.style.display = 'none';
			codeViewer.codeOutput.innerHTML = '';
			codeViewer.viewCodeButton.style.display = 'block';
			codeViewer.hideCodeButton.style.display = 'none';
		}
		
		// This outputs the map data as a javascript constructor call
		function generateOutputCode() {
			var mapName = "newMap";
			var output = "";
			output += "var " + mapName + " = <br>[ ";
			
			var yCounter = map.height;
			var xCounter = map.width;
			while(yCounter--){
				output += "[ ";
				while(xCounter--){
					output += "" + map.tileData[yCounter][xCounter];
					if(xCounter > 0){
						output += ", ";
					}
				}
				output += "]";
				if(yCounter > 0){
					output += ", <br>";
				}
				xCounter = map.width;
			}
			output += " ];";
			return output;
		};
		
		function updateBuffer() {
			context.drawImage(canvasBuffer, 0, 0);
			contextBuffer.clearRect(0,0, canvasBuffer.width, canvasBuffer.height);
		};
		
		function setTool(tool) {
			activeTool = new tool();
		};
		
		map = function() {
			var map = this;			//self-reference
			this.width = 20;		// width and height in tiles
			this.height = 15;
			this.tileSize = 32;		// tile size in pixels (square)
			this.zoom = 1;			// zoom level (integer), multiplies tileSize
			this.xOffset = 0;		// offset for map as it moves around the screen
			this.yOffset = 0;
			this.tileData = {};
			
			this.isMouseOnTile = false;			// true if mouse is over a tile
			
			this.tileSetReady = false;			// image related - separate into Image class(?)
			this.tileSet = new Image();
			this.tileSet.src = 'imageTest.png';
			this.tileSet.addEventListener('load', this.tileSetReady = true, false);
			
			this.init = function(width, height, tileSize){
				// Initialize map values
				map.width = width;
				map.height = height;
				map.tileSize = tileSize;
				
				// Allocate tile data
				map.resetMap();
			};
			
			this.resetMap = function() {
				// Allocate map grid for storing tile data 
				//   and fill with -1 (no tile placed)
				map.tileData = new Array(this.width);
				var xCounter = map.width;
				var yCounter = map.height;
				while(yCounter--){
					map.tileData[yCounter] = new Array(map.width);
					while(xCounter--){
						map.tileData[yCounter][xCounter] = -1;
					}
					xCounter = map.width;
				}
			};
			
			this.drawTileAt = function(y, x){
				var finalTileSize = map.tileSize * map.zoom;
				var tileNumber = map.tileData[y][x];
				while(!map.tileSetReady){
					//wait
				}
				contextBuffer.drawImage(
						map.tileSet,
						0,0,
						48, 48,
						x * finalTileSize + map.xOffset, y * finalTileSize + map.yOffset,
						map.tileSize, map.tileSize
				);
			};
			
			this.draw = function() {
				context.clearRect(0,0,canvasBuffer.width, canvasBuffer.height);
				var xCounter = map.width;
				var yCounter = map.height;
				while(yCounter--){
					while(xCounter--){
						this.drawTileAt(yCounter, xCounter);
					}
					xCounter = map.width;
				}
				updateBuffer();
			};
			
			this.updateCanvas = function(){
				map.draw();
				// Draw overlays here
			};
			
			this.scroll = function(dy, dx) {
//				var minScrollY = Math.floor(tileView.canvas.height / 2);
//				var minScrollX = -Math.floor(tileView.canvas.width / 2);
//				var maxScrollY = -((map.tileData.length * map.tileSize) - Math.floor(tileView.canvas.height / 2));
//				var maxScrollX = (map.tileData[0].length * map.tileSize) + Math.floor(tileView.canvas.width / 2);
				
				map.xOffset += dx;
				map.yOffset += dy;
				
//				if(map.xOffset < minScrollX)
//					map.xOffset = minScrollX;				//// Commented out sections are
//				if(map.xOffset > maxScrollX)				//// for keeping the map from
//					map.xOffset = maxScrollX;				//// scrolling off the screen.
//				if(map.yOffset > minScrollY)				
//					map.yOffset = minScrollY;				//// Commented cuz its broken :D
//				if(map.yOffset < maxScrollY)
//					map.yOffset = maxScrollY;
				
				map.updateCanvas();
			};
			
			this.mousedown = function(event){
				
			};
			
			this.mouseover = function(event){
				
			};
			
			this.mouseup = function(event){

			};
			
			this.mousemove = function(event){
				var message = "";
				var finalTileSize = (map.zoom * map.tileSize);
				var tileX = Math.floor((event._x - map.xOffset) / finalTileSize);
				var tileY = Math.floor((event._y - map.yOffset) / finalTileSize);
				
				// Check for mouse over tile
				if(	tileY >= 0 && tileY < map.tileData.length && 
					tileX >= 0 && tileX < map.tileData[0].length){
					map.isMouseOnTile = true;
				} else {
					map.isMouseOnTile = false;
				}
				
				// display tooltip if mouse over tile
				if(map.isMouseOnTile){
					message += 	"(" + (tileX+1) + ", " + (tileY+1) + ")<br>" +
								"Tile #: " + map.tileData[tileY][tileX];
					tooltip.show(message, 150);
				} else {
					tooltip.hide();
				}
				
			};
			
			this.mouseout = function(event){
				tooltip.hide();
			};
			
			this.keydown = function(event){
				switch(event.keyCode){
				case 87:	// W
					map.scroll(-4, 0);		// scroll(y, x)
					break;
				case 65:	// A
					map.scroll(0, -4);
					break;
				case 83:	// S
					map.scroll(4, 0);
					break;
				case 68:	// D
					map.scroll(0, 4);
					break;
				}
			};
		};
		
		tileView = function() {
			var tileView = this;
			this.canvas;
			this.context;
			this.xOffset;
			this.yOffset;				// for scrolling through tiles
			this.tileSetReady;			// bool for state of tileset
			this.tileSet;				// Image object
			this.tileCount;
			this.columnCount;
			this.selectedTile = -1;
			
			this.init = function(filePath) {
				tileView.canvas = document.getElementById('tileView');
				tileView.context = tileView.canvas.getContext('2d');
				tileView.xOffset = 0;
				tileView.yOffset = 0;

				tileView.tileSetReady = false;			// image related - separate into Image class(?)
				tileView.tileSet = new Image();
				tileView.tileSet.src = filePath;
				
				tileView.tileSet.addEventListener('load', tileView.onTileSetLoaded, false);
				tileView.canvas.addEventListener('mousemove', tileView.onCanvasEvent, false);
				tileView.canvas.addEventListener('click', tileView.onCanvasEvent, false);
				tileView.canvas.addEventListener('mouseout', tileView.onCanvasEvent, false);
				tileView.canvas.addEventListener('mousewheel', tileView.onCanvasEvent, false);
			};
			
			this.onTileSetLoaded = function(){
				tileView.tileSetReady = true;
				if(	tileView.tileSet.width % map.tileSize != 0 ||
					tileView.tileSet.height % map.tileSize != 0   ){
					alert('The tileset is not the correct size, width and height must be a multiple of ' + 
							map.tileSize + '.\nCurrent image size is ' + tileView.tileSet.width +
							' x ' + tileView.tileSet.height + '.');
					//return;
				}
				tileView.tileCount = 
					Math.floor(tileView.tileSet.width / map.tileSize) *
					Math.floor(tileView.tileSet.height / map.tileSize);
				tileView.columnCount = Math.floor(tileView.canvas.width / map.tileSize);
				
				// Draw tileset to tile view
				tileView.drawTileSet();
			};
			
			this.onCanvasEvent = function(event){
				event = getMousePosition(event);
				
				var action = tileView[event.type];
				if(action){
					action(event);
				}
			};
			
			this.updateCanvas = function(){
				tileView.context.clearRect(0,0,tileView.canvas.width, tileView.canvas.height);
				tileView.drawTileSet();
				// Draw any overlays
			};
			
			this.getTileAt = function(canvasX, canvasY){
				var tileX = Math.floor((canvasX + tileView.xOffset) / map.tileSize);
				var tileY = Math.floor((canvasY - tileView.yOffset) / map.tileSize);
				var tileNumber = tileY * tileView.columnCount + tileX;
				return tileNumber;
			};
			
			this.drawSelectedTile = function(context, x, y, width, height){
				var position = tileView.getTilePosition(tileView.selectedTile);
				context.drawImage(
						tileView.tileSet,
						position.x, position.y,
						map.tileSize, map.tileSize,
						x, y,
						width, height);
				
			};
			
			this.getTilePosition = function(tileNumber){
				var sourceX = Math.floor(tileNumber % (tileView.tileSet.width / map.tileSize)) * map.tileSize;
				var sourceY = Math.floor(tileNumber / (tileView.tileSet.width / map.tileSize)) * map.tileSize;
				return {x: sourceX, y: sourceY};
			};
			
			this.drawTileSet = function(){
				var counter = tileView.tileCount;
				var currentTile;
				while(counter){
					currentTile = tileView.tileCount - counter;
					// x = tileNumber % (imageWidth / tileSize) * tileSize
					// y = tileNumber / (imageWidth / tileSize) * tileSize
					var sourceX = Math.floor(currentTile % (tileView.tileSet.width / map.tileSize)) * map.tileSize;
					var sourceY = Math.floor(currentTile / (tileView.tileSet.width / map.tileSize)) * map.tileSize;
					
					// Destination is the same, but using the canvas for reference
					var destinationX = Math.floor(currentTile % (tileView.canvas.width / map.tileSize)) * map.tileSize;
					var destinationY = Math.floor(currentTile / (tileView.canvas.width / map.tileSize)) * map.tileSize;
					
					tileView.context.drawImage(
							tileView.tileSet,
							sourceX, sourceY,
							map.tileSize, map.tileSize,
							destinationX, destinationY + tileView.yOffset,
							map.tileSize, map.tileSize);
					
					counter--;
				}
			};
			
			this.mousemove = function(event){
				var tileNumber = tileView.getTileAt(event._x, event._y);
				var message = 'Tile #: ' + tileNumber;
				tooltip.show(message, 100);
			};
			
			this.mouseout = function(event){
				tooltip.hide();
			};
			
			this.click = function(event){
				tileView.selectedTile = tileView.getTileAt(event._x, event._y);
			};
			
			this.mousewheel = function(event){
				var maxScroll = -(Math.ceil(tileView.tileCount / tileView.columnCount) * map.tileSize) + tileView.canvas.height;

				if(event.wheelDelta) {
					tileView.yOffset += event.wheelDelta;
				}
				else if(event.detail) {
					tileView.yOffset += event.detail;
				}
				
				if(tileView.yOffset < maxScroll)
					tileView.yOffset = maxScroll;
				if(tileView.yOffset > 0)
					tileView.yOffset = 0;
				
				tileView.updateCanvas();
			};
		};
		
		/*
		 * Template for editor tools
		 *  - consider separating tools into a separate class!
		 */
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
		
		init();
	}, false);
};