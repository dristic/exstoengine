Ext.define('Simplex.controller.Game', {
	extend: 'Ext.app.Controller',
	
	views: [
        'game.Editor',
        'game.Game'
    ],
    
    refs: [
       { ref:'game', selector:'game' }
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
	
	loadMap: function (map) {
		map(this.engine);
	},
	
	toggleLayer: function(layerId) {
		this.engine.currentWorld.objects[0].layers[layerId].toggleVisibility();
	},
	
	showLayer: function(layerId) {
		this.engine.currentWorld.objects[0].layers[layerId].show();
	},
	
	hideLayer: function(layerId) {
		this.engine.currentWorld.objects[0].layers[layerId].hide();
	}
});