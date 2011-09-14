Ext.define('Simplex.controller.Game', {
	extend: 'Ext.app.Controller',
	
	views: [
        'game.Editor',
        'game.Game'
    ],
    
    refs: [
       { ref: 'game', 		selector: 'game' },
       { ref: 'layerList', 	selector: 'layerlist' },
       { ref: 'itemList' ,  selector: 'itemlist' },
       { ref: 'status', 	selector: 'status' }
    ],
    
    map: null,
    activeTool: null,
    activeLayer: null,
    activeItem: null,
    
	init: function() {
		this.fpsLog = [];
		
		this.control({
			'editor': {
				afterrender: this.createGame
			},
			'game': {
				resize: this.resizeCanvas
			}
		});
	},
	
	/**
	 * Resizes the canvas to a new width and height. This is called
	 * automatically when the browser window is resized.
	 * 
	 * @param panel
	 * 			{Object}: view panel
	 * @param newWidth
	 * 			{Number}: 
	 * @param newHeight
	 * 			{Number}: 
	 */
	resizeCanvas: function (panel, newWidth, newHeight) {
		if(this.engine && this.engine.renderer) {
			this.engine.renderer.resizeCanvas(newWidth, newHeight);
		}
	},
	
	/**
	 * Creates a minimal game engine in the editor to which maps can be loaded.
	 */
	createGame: function () {
		ex.using(
			[
	          'ex.Engine',
	          'ex.world.World'
	        ], 
	        ex.bind(this, function () {
				//--Startup new engine
				this.engine = new ex.Engine(this.getGame().getWidth(), this.getGame().getHeight(), 60);
				
				//--Setup rendering
				this.engine.setupCanvas("#000000", document.getElementById('game'));
				this.engine.openWorld(ex.world.World);
				
				//--Setup input
				this.engine.input.listenOn(this.engine.renderer.canvas);
				
				// Listen to update
				this.engine.onUpdate = ex.bind(this, this.onEngineUpdate);
			})
		);
	},
	
	/**
	 * Update routine for the engine.
	 * 
	 * @param dt
	 * 			{Number}: time interval
	 */
	onEngineUpdate: function (dt) {
		var engine = this.engine;
		if(this.activeTool && this.activeLayer){
			this.activeTool.update(dt);
		}
		
		if(engine.input.dragging && engine.input.isKeyDown(ex.util.Key.Shift)) {
			var delta = engine.input.getMouseDelta();
			engine.camera.move(-delta[0], -delta[1]);
		}
		
		this.fpsLog.push(dt);
		if(this.fpsLog.length > 20) {
			this.fpsLog.shift();
		}
		var ms = ex.Math.average(this.fpsLog);
		this.getStatus().update('FPS: ' + Math.floor(1 / ms) + " | MS: " + Math.floor(ms * 1000));
	},
	
	/**
	 * Loads a map into the editor and sets up the appropriate
	 * data stores for the menu panels
	 * @param map
	 */
	loadMap: function (map) {
		// Load the map into the engine
		map(this);
	},
	
	/**
	 * Populates the editor with map data.
	 */
	onMapLoad: function(){
		this.updateLayerList();
		this.map = this.engine.currentWorld.objects[0];
	},
	
	/**
	 * Clears and updates the layer list
	 */
	updateLayerList: function(){
		// Clear layerList store
		var layerListStore = this.getLayerList().store;
		layerListStore.removeAll();
		// Finish if there is no map
		if(!this.map){
			return;
		}
		// Populate layerList store
		var index = 0;
		var layers = this.engine.currentWorld.objects[0].layers;
		for(index; index < layers.length; index++){
			layerListStore.add({
				layerId	: index,
				name	: layers[index].name,
				visible	: layers[index].visible
			});
		}
		// Update itemList
		this.updateItemList();
	},
	
	updateItemList: function(){
		// Clear itemList store
		var itemListStore = this.getItemList().store;
		itemListStore.removeAll();
		// Finish if there is no active layer
		if(!this.activeLayer){
			return;
		}
		// Populate itemlist store
		var index = 0;
		var items = this.activeLayer.items;
		for(index; index < items.length; index++){
			itemListStore.add({
				itemId	: index,
				name	: items[index].name || (items[index].type + " " + index),
				visible	: items[index].visible
			});
		}
	},
	
	/**
	 * Toggles layer visibility (does not affect opacity)
	 * @param layerId
	 */
	toggleLayer: function(layerId) {
		this.map.layers[layerId].toggleVisibility();
	},
	
	/**
	 * Sets layer visibility to true (does not affect opacity)
	 * @param layerId
	 */
	showLayer: function(layerId) {
		this.map.layers[layerId].show();
	},
	
	/**
	 * Sets layer visibility to false (does not affect opacity)
	 * @param layerId
	 */
	hideLayer: function(layerId) {
		this.map.layers[layerId].hide();
	},
	
	/**
	 * Adds a layer with a given name to the end of the layer array
	 * 
	 * @param name
	 * 			{String}: name of layer
	 */
	addLayer: function(name) {
		this.map.addLayer(name, []);
		this.updateLayerList();
	},
	
	/**
	 * Removes the active layer from the layer list
	 */
	removeActiveLayer: function() {
		if(!this.activeLayer){
			return;
		}
		var index = this.map.layers.length;
		while(index--){
			if(this.map.layers[index] === this.activeLayer){
				this.map.removeLayer(index);
				this.activeLayer = null;
				this.updateLayerList();
				return;
			}
		}
	},
	
	/**
	 * Toggles visiblity of an item on the active layer
	 * 
	 * @param itemId
	 * 			{Number}: position of item in the array
	 */
	toggleItem: function(itemId) {
		this.activeLayer.items[itemId].visible = !this.activeLayer.items[itemId].visible;
	},
	
	/**
	 * Sets item visibility to true on the active layer
	 * 
	 * @param itemId
	 * 			{Number}: position of item in the array
	 */
	showItem: function(itemId) {
		this.activeLayer.items[itemId].visible = true;
	},
	
	/**
	 * Sets item visibility to false on the active layer
	 * 
	 * @param itemId
	 * 			{Number}: position of item in the array
	 */
	hideItem: function(itemId) {
		this.activeLayer.items[itemId].visible = false;
	},
	
	addItem: function(object) {
		this.activeLayer.addItem(object);
		this.updateItemList();
	},
	
	removeActiveItem: function() {
		if(!this.activeItem){
			return;
		}
		var index = this.activeLayer.items.length;
		while(index--){
			if(this.activeLayer.items[index] === this.activeItem){
				this.activeLayer.removeItem(index);
				this.activeItem = null;
				this.updateItemList();
				return;
			}
		}
	},
	
	/**
	 * Sets the active layer in the editor
	 * 
	 * @param layerId
	 * 			{Number}: position of the layer in the array
	 */
	setActiveLayer: function(layerId) {
		this.activeLayer = this.engine.currentWorld.objects[0].layers[layerId];
		this.activeItem = null;
		this.activeTool = null;
		
		this.updateItemList();
	},
	
	/**
	 * Sets the active item of the current layer in the editor
	 * 
	 * @param itemId
	 * 			{Number}: position of the item in the array
	 */
	setActiveItem: function(itemId) {
		if(!this.activeLayer){
			this.activeItem = null;
			alert("This item does not exist.");
		}
		this.activeItem = this.activeLayer.items[itemId];
	},
	
	/**
	 * Sets the active tool in the editor
	 * 
	 * @param toolName
	 * 			{String}: tool selector
	 */
	setActiveTool: function(toolName) {
		if(toolName == 'imagePlacer'){
			this.activeTool = imagePlacer(this);
		} else if (toolName == 'tilePlacer') {
			this.activeTool = tilePlacer(this);
		} else {
			this.activeTool = null;
		}
	}
});

/**
 * Tile placement tool
 * 
 * @param engine
 * 			{Engine}: game engine reference
 * @param $target
 * 			{Object}: target object to edit
 * @returns {___anonymous5412_6838}
 * 			{Tool}: the entire tool object
 */
function tilePlacer (engine, $target) {
	return {
		name: "Tile Editor",
		edits: ["SpriteMap"],
		selectedTile: 0,
		target: $target,
		update: function(dt){
			if(engine.input.isKeyPressed(ex.util.Key.Keyb0)){
				this.selectedTile = 0;
			} else if(engine.input.isKeyPressed(ex.util.Key.Keyb1)) {
				this.selectedTile = 1;
			} else if(engine.input.isKeyPressed(ex.util.Key.Keyb2)) {
				this.selectedTile = 2;
			} else if(engine.input.isKeyPressed(ex.util.Key.Keyb3)) {
				this.selectedTile = 3;
			} else if(engine.input.isKeyPressed(ex.util.Key.Keyb4)) {
				this.selectedTile = 4;
			} else if(engine.input.isKeyPressed(ex.util.Key.Keyb5)) {
				this.selectedTile = 5;
			} else if(engine.input.isKeyPressed(ex.util.Key.Keyb6)) {
				this.selectedTile = 6;
			} else if(engine.input.isKeyPressed(ex.util.Key.Keyb7)) {
				this.selectedTile = 7;
			} else if(engine.input.isKeyPressed(ex.util.Key.Keyb8)) {
				this.selectedTile = 8;
			} else if(engine.input.isKeyPressed(ex.util.Key.Keyb9)) {
				this.selectedTile = 9;
			}
			
			var mapX = engine.input.mouseX + engine.camera.x;
			var mapY = engine.input.mouseY + engine.camera.y;
			if((engine.input.mouseDown || engine.input.dragging) && !engine.input.isKeyDown(ex.util.Key.Shift)){
				tileNumber = this.target.items[0].getTile(mapX, mapY);
				if(typeof tileNumber != 'undefined'){
					this.target.items[0].setTile(mapX, mapY, this.selectedTile);
				}
			}
		}
		
	};
}

/**
 * Image placement tool
 * 
 * @param engine
 * 			{Engine}: game engine reference
 * @param $target
 * 			{Object}: target layer
 * @returns {___anonymous5412_6838}
 * 			{Tool}: the entire tool object
 */
function imagePlacer (game) {
	return {
		name: "Image Editor",
		selectedTile: 0,
		update: function(dt){
			var engine = game.engine;
			var imageName = "";
			var mapX = engine.input.mouseX + (engine.camera.x * game.activeLayer.scrollFactor.x);
			var mapY = engine.input.mouseY + (engine.camera.y * game.activeLayer.scrollFactor.y);
			if(engine.input.mouseDown && !engine.input.isKeyDown(ex.util.Key.Shift)){
				game.addItem(
						new ex.display.Image(engine.imageRepository.img.Asteroid, new ex.base.Point(mapX, mapY))
				);
			}
		}
		
	};
}