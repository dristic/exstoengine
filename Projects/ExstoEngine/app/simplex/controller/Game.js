Ext.define('Simplex.controller.Game', {
	extend: 'Ext.app.Controller',
	
	views: [
        'game.Editor'
    ],
    
	init: function() {
		initGame();
	}
});

function initGame() {
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
          "ex.Engine",
          "ex.world.World",
          "ex.simplex.MapLayer",
          "ex.simplex.TileLayer",
          "ex.simplex.ImageLayer"
          	], 
  	function () {
		//--Startup new engine
		var _engine = new ex.Engine(1000, 500, 60);
		
		_engine.imageRepository.loadImage("simplexBG", "../../lib/exstoengine/examples/assets/world/simplexBG.png");
		_engine.imageRepository.loadImage("Tiles", "../../lib/exstoengine/examples/assets/world/tileset-platformer.png");
		_engine.imageRepository.loadImage("BG", "../../lib/exstoengine/examples/assets/world/bg.png");
		
		var _mapEditor = new ex.simplex.MapLayer("Map", {
															topLeftX: 0, 
															topLeftY: 0,
															width: 1000,
															height:500,
															offsetX: 0,
															offsetY: 0
		});

		_mapEditor.addLayer(new ex.simplex.ImageLayer("background", 1000, 625, _engine.imageRepository.img.BG));
		_mapEditor.addLayer(new ex.simplex.TileLayer("main tile layer", _mapEditor.frame, 32, 32, data, _engine.imageRepository.img.Tiles));
		
		//--Setup rendering
		_engine.setupCanvas("#000000", document.getElementById('game'));
		_engine.enableDebugging();
		_engine.openWorld(ex.world.World);
		_engine.currentWorld.addObject(_mapEditor);
		
		_mapEditor.update = function(dt) {
			if(_engine.input.isKeyPressed(ex.util.Key.Keyb1)) {
				_mapEditor.toggleMapLayer(0);
			}
			if(_engine.input.isKeyPressed(ex.util.Key.Keyb2)) {
				_mapEditor.toggleMapLayer(1);
			}
			
			var mouseX = _engine.input.mouseX;
			var mouseY = _engine.input.mouseY;
			var mapFrame = _mapEditor.frame;
			if(mouseX > mapFrame.topLeftX && mouseX < (mapFrame.topLeftX + mapFrame.width) &&
					mouseY > mapFrame.topLeftY && mouseY < (mapFrame.topLeftY + mapFrame.height)){
				console.log(_mapEditor.sublayers[1].spriteMap.getTile(mouseX - mapFrame.topLeftX, mouseY - mapFrame.topLeftY));
			}
			
		};
	});
};