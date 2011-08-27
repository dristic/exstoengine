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
		
		if(engine.input.isKeyPressed(ex.util.Key.Keyb1)) {
			alert("One pressed");
		}
		if(engine.input.isKeyPressed(ex.util.Key.Keyb2)) {
			alert("Two pressed");
		}
		
		var mapX = engine.input.mouseX + engine.camera.x;
		var mapY = engine.input.mouseY + engine.camera.y;
		if(engine.input.mouseDown){
			tileNumber = engine.currentWorld.objects[0].layers[1].items[0].getTile(mapX, mapY);
			if(typeof tileNumber != 'undefined'){
				engine.currentWorld.objects[0].layers[1].items[0].setTile(mapX, mapY, Math.floor(Math.random()*93));
			}
		}
		
		if(engine.input.dragging) {
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
	}
});