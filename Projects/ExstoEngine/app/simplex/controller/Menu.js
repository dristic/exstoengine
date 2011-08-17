Ext.define('Simplex.controller.Menu', {
	extend: 'Ext.app.Controller',
	
	views: [
        'menu.Panel'
    ],

	init: function () {
		this.control({
			'menu': {
				afterrender: function () {
					initTileViewer("../resources/images/tileset.png");
				}
			}
		});
	}
});

function initTileViewer(filePath){
	var tileView = this;
	this.canvas = document.getElementById('tileView');
	this.context = tileView.canvas.getContext('2d');
	this.xOffset = 0;
	this.yOffset = 0;				// for scrolling through tiles
	this.tileSetReady = false;			// bool for state of tileset
	this.tileSet = new Image();				// Image object
	this.tileSet.src = filePath;
	this.tileCount;
	this.columnCount;
	this.selectedTile;
	
	tileView.tileSet.addEventListener('load', tileView.onTileSetLoaded, false);
	tileView.canvas.addEventListener('mousemove', tileView.onCanvasEvent, false);
	tileView.canvas.addEventListener('click', tileView.onCanvasEvent, false);
	tileView.canvas.addEventListener('mouseout', tileView.onCanvasEvent, false);
	tileView.canvas.addEventListener('mousewheel', tileView.onCanvasEvent, false);
	
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
	
	this.getMousePosition = function(event) {
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