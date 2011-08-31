Ext.define('Simplex.controller.Game', {
	extend: 'Ext.app.Controller',
	
	views: [
        'game.Editor',
        'game.Game'
    ],
    
    refs: [
       { ref: 'game', 		selector: 'game' },
       { ref: 'layerList', 	selector: 'layerlist' }
    ],
    
    activeTool: null,
    activeLayer: null,
    
	init: function() {
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
		
//		if(engine.input.isKeyPressed(ex.util.Key.Keyb1)) {
//			alert("One pressed");
//		}
//		if(engine.input.isKeyPressed(ex.util.Key.Keyb2)) {
//			alert("Two pressed");
//		}
//		
//		var mapX = engine.input.mouseX + engine.camera.x;
//		var mapY = engine.input.mouseY + engine.camera.y;
//		if(engine.input.mouseDown){
//			tileNumber = engine.currentWorld.objects[0].layers[1].items[0].getTile(mapX, mapY);
//			if(typeof tileNumber != 'undefined'){
//				engine.currentWorld.objects[0].layers[1].items[0].setTile(mapX, mapY, Math.floor(Math.random()*93));
//			}
//		}
		
		if(engine.input.dragging && engine.input.isKeyDown(ex.util.Key.Shift)) {
			var delta = engine.input.getMouseDelta();
			engine.camera.move(-delta[0], -delta[1]);
		}
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
	
	setActiveLayer: function(layerId) {
		this.activeLayer = this.engine.currentWorld.objects[0].layers[layerId];
		if(this.activeLayer.name == "platforms"){
			this.activeTool = tilePlacer(this.engine, this.activeLayer);
		} else if (this.activeLayer.name == "foreground") {
			this.activeTool = imagePlacer(this.engine, this.activeLayer);
		} else {
			this.activeTool = null;
		}
		if(this.activeTool)
			alert("active tool is " + this.activeTool.name + " on " + this.activeLayer.name);
		else
			alert("There is no tool for " + this.activeLayer.name);
	}
});

function tilePlacer (engine, $target) {
	return {
		name: "Tile Editor",
		edits: ["TileMap"],
		selectedTile: 0,
		target: $target,
		update: function(dt){
			if(engine.input.isKeyPressed(ex.util.Key.Keyb1)) {
				this.selectedTile = 1;
			}
			else if(engine.input.isKeyPressed(ex.util.Key.Keyb2)) {
				this.selectedTile = 2;
			}
			else if(engine.input.isKeyPressed(ex.util.Key.Keyb3)) {
				this.selectedTile = 3;
			}
			else if(engine.input.isKeyPressed(ex.util.Key.Keyb4)) {
				this.selectedTile = 4;
			}
			else if(engine.input.isKeyPressed(ex.util.Key.Keyb5)) {
				this.selectedTile = 5;
			}
			else if(engine.input.isKeyPressed(ex.util.Key.Keyb6)) {
				this.selectedTile = 6;
			}
			else if(engine.input.isKeyPressed(ex.util.Key.Keyb7)) {
				this.selectedTile = 7;
			}
			else if(engine.input.isKeyPressed(ex.util.Key.Keyb8)) {
				this.selectedTile = 8;
			}
			else if(engine.input.isKeyPressed(ex.util.Key.Keyb9)) {
				this.selectedTile = 9;
			}
			
			var mapX = engine.input.mouseX + engine.camera.x;
			var mapY = engine.input.mouseY + engine.camera.y;
			if(engine.input.mouseDown){
				tileNumber = engine.currentWorld.objects[0].layers[1].items[0].getTile(mapX, mapY);
				if(typeof tileNumber != 'undefined'){
					engine.currentWorld.objects[0].layers[1].items[0].setTile(mapX, mapY, this.selectedTile);
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
			var mapX = engine.input.mouseX + engine.camera.x;
			var mapY = engine.input.mouseY + engine.camera.y;
			if(engine.input.mouseDown){
				engine.currentWorld.objects[0].layers[0].items.push(
						new ex.display.Image(engine.imageRepository.img.Asteroid, new ex.base.Point(mapX, mapY))
				);
			}
		}
		
	};
}