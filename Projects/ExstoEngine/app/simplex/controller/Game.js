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
				
				// Listen to update
				this.engine.onUpdate = ex.bind(this, this.onEngineUpdate);
				
				this.loadMap(platformer);
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
		
		var mouseX = engine.input.mouseX;
		var mouseY = engine.input.mouseY;
		
		if(engine.input.dragging) {
			var delta = engine.input.getMouseDelta();
			engine.camera.move(-delta[0], -delta[1]);
		}
	},
	
	loadMap: function (map) {
		map(this.engine);
	}
});

// Map file data
function platformer(engine) {
	var data = [
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 51, 52, 52, 53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 52, 52, 52, 52, 53, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0,  91, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0, 0, 0,  93, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0, 0, 0,91, 92, 95, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0, 0,   4,  5,  5,  5,  5,  5,  6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[ 0, 0,  0, 10, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,83, 83, 83, 0, 0],
		[ 0, 0,  0, 10, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0, 0, 0, 0,  4,  5, 81, 82, 82, 82, 81, 5],
		[ 4,  6, 0, 10, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 0, 0, 0, 10, 11],
		[10, 12, 0, 10, 11, 11, 11, 66, 11, 12, 2, 2, 2, 2, 2, 3, 0, 10, 11, 12, 0, 0, 0, 10, 11],
		[10, 12, 0, 10, 11, 11, 66, 66, 11,  8, 8, 8, 8, 8, 8, 9, 0, 10, 11, 12, 0, 0, 0, 10, 11],
		[10, 12, 0, 10, 11, 11, 66, 66,  8,  8, 8, 8, 8, 8, 8, 9, 0, 10, 11, 12, 0, 0, 0, 10, 11],
	];
	
	ex.using([
          "ex.simplex.MapLayer",
          "ex.simplex.TileLayer",
          "ex.simplex.ImageLayer"
          	], 
	  	function () {
			// Load images
			engine.imageRepository.loadImage("simplexBG", "../../lib/exstoengine/examples/assets/world/simplexBG.png");
			engine.imageRepository.loadImage("Tiles", "../../lib/exstoengine/examples/assets/world/tileset-platformer.png");
			engine.imageRepository.loadImage("BG", "../../lib/exstoengine/examples/assets/world/bg.png");
			
			// Create map editor
			var _mapEditor = new ex.simplex.MapLayer("Map", {
														topLeftX: 0, 
														topLeftY: 0,
														width: 1000,
														height:500,
														offsetX: 0,
														offsetY: 0
			});
			_mapEditor.addLayer(new ex.simplex.ImageLayer("background", 1000, 625, engine.imageRepository.img.BG));
			_mapEditor.addLayer(new ex.simplex.TileLayer("main tile layer", _mapEditor.frame, 32, 32, data, engine.imageRepository.img.Tiles));
			
			// Set update functions
			_mapEditor.update = function(dt) {
				
				
			};
			
			// Add the map
			engine.currentWorld.addObject(_mapEditor);
		});
}