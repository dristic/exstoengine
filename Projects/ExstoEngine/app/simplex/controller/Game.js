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
          "ex.simplex.Map",
          "ex.display.SpriteMap",
          "ex.display.Image",
          "ex.base.Point",
          "ex.base.Vector"
          	], 
	  	function () {
			// Load images
			engine.imageRepository.loadImage("simplexBG", "../../lib/exstoengine/examples/assets/world/simplexBG.png");
			engine.imageRepository.loadImage("Tiles", "../../lib/exstoengine/examples/assets/world/tileset-platformer.png");
			engine.imageRepository.loadImage("BG", "../../lib/exstoengine/examples/assets/world/bg.png");
			engine.imageRepository.loadImage("Asteroid", "../../lib/exstoengine/examples/assets/world/asteroid.png");
			
			// Create map editor
			var _mapEditor = new ex.simplex.Map("Map");
			_mapEditor.addLayer("foreground", 
					[
					 	new ex.display.Image(engine.imageRepository.img.Asteroid, new ex.base.Point(Math.floor(Math.random()*800), Math.floor(Math.random()*500))),
					 	new ex.display.Image(engine.imageRepository.img.Asteroid, new ex.base.Point(Math.floor(Math.random()*800), Math.floor(Math.random()*500))),
					 	new ex.display.Image(engine.imageRepository.img.Asteroid, new ex.base.Point(Math.floor(Math.random()*800), Math.floor(Math.random()*500))),
					 	new ex.display.Image(engine.imageRepository.img.Asteroid, new ex.base.Point(Math.floor(Math.random()*800), Math.floor(Math.random()*500))),
					 	new ex.display.Image(engine.imageRepository.img.Asteroid, new ex.base.Point(Math.floor(Math.random()*800), Math.floor(Math.random()*500))),
					 	new ex.display.Image(engine.imageRepository.img.Asteroid, new ex.base.Point(Math.floor(Math.random()*800), Math.floor(Math.random()*500))),
					 	new ex.display.Image(engine.imageRepository.img.Asteroid, new ex.base.Point(Math.floor(Math.random()*800), Math.floor(Math.random()*500))),
					]
			);
			_mapEditor.layers[0].scrollFactor = new ex.base.Vector(2.0, 2.0);
			_mapEditor.addLayer("platforms", [new ex.display.SpriteMap(32, 32, data, engine.imageRepository.img.Tiles)]);
			_mapEditor.addLayer("background", [new ex.display.Image(engine.imageRepository.img.BG)]);
			_mapEditor.layers[2].scrollFactor = new ex.base.Vector(0.05, 0.0);
			
			// Set update functions
			_mapEditor.update = function(dt) {
				
			};
			
			// Add the map
			engine.currentWorld.addObject(_mapEditor);
		});
}