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
	
	resizeCanvas: function (panel, newWidth, newHeight) {
		if(this.engine && this.engine.renderer) {
			this.engine.renderer.resizeCanvas(newWidth, newHeight);
		}
	},
	
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
	
	onMapLoad: function(){
		// Clear and populate layer list store
		var layerListStore = this.getLayerList().store;
		layerListStore.removeAll();
		var index = 0;
		var layers = this.engine.currentWorld.objects[0].layers;
		for(index; index < layers.length; index++){
			layerListStore.add({
				layerId	: index,
				name	: layers[index].name,
				visible	: layers[index].visible
			});
		}
	},
	
	/**
	 * Toggles layer visibility (does not affect opacity)
	 * @param layerId
	 */
	toggleLayer: function(layerId) {
		this.engine.currentWorld.objects[0].layers[layerId].toggleVisibility();
	},
	
	/**
	 * Sets layer visibility to true (does not affect opacity)
	 * @param layerId
	 */
	showLayer: function(layerId) {
		this.engine.currentWorld.objects[0].layers[layerId].show();
	},
	
	/**
	 * Sets layer visibility to false (does not affect opacity)
	 * @param layerId
	 */
	hideLayer: function(layerId) {
		this.engine.currentWorld.objects[0].layers[layerId].hide();
	},
	
	toggleItem: function(itemId) {
		this.activeLayer.items[itemId].visible = !this.activeLayer.items[itemId].visible;
	},
	
	showItem: function(itemId) {
		this.activeLayer.items[itemId].visible = true;
	},
	
	hideItem: function(itemId) {
		this.activeLayer.items[itemId].visible = false;
	},
	
	setActiveLayer: function(layerId) {
		this.activeLayer = this.engine.currentWorld.objects[0].layers[layerId];
		this.activeItem = null;
		this.activeTool = null;
		
		var itemListStore = this.getItemList().store;
		itemListStore.removeAll();
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
	
	setActiveItem: function(itemId) {
		if(!this.activeLayer){
			this.activeItem = null;
			alert("This item does not exist.");
		}
		this.activeItem = this.activeLayer.items[itemId];
	},
	
	setActiveTool: function(toolName) {
		if(toolName == 'imagePlacer'){
			this.activeTool = imagePlacer(this.engine, this.activeLayer);
		} else if (toolName == 'tilePlacer') {
			this.activeTool = tilePlacer(this.engine, this.activeLayer);
		} else {
			this.activeTool = null;
		}
	}
});

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

function imagePlacer (engine, $target) {
	return {
		name: "Image Editor",
		edits: ["Image"],
		selectedTile: 0,
		target: $target,
		update: function(dt){
			var imageName = "";
			var mapX = engine.input.mouseX + (engine.camera.x * this.target.scrollFactor.x);
			var mapY = engine.input.mouseY + (engine.camera.y * this.target.scrollFactor.y);
			if(engine.input.mouseDown && !engine.input.isKeyDown(ex.util.Key.Shift)){
				this.target.items.push(
						new ex.display.Image(engine.imageRepository.img.Asteroid, new ex.base.Point(mapX, mapY))
				);
			}
		}
		
	};
}