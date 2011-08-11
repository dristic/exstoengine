(function() {
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
	
	// Setup base URL for includes
	ex.config.baseUrl = "../js/";
		
	ex.using([
          "ex.Engine",
          "ex.world.World",
          "ex.simplex.LevelEditor",
          "ex.simplex.TileLayer",
          "ex.simplex.ImageLayer"
          	], 
  	function () {
		//--Startup new engine
		var _engine = new ex.Engine(1200, 570, 60);
		
		_engine.imageRepository.loadImage("simplexBG", "../assets/world/simplexBG.png");
		_engine.imageRepository.loadImage("Tiles", "../assets/world/tileset-platformer.png");
		_engine.imageRepository.loadImage("BG", "../assets/world/bg.png");
		
		var _levelEditor = new ex.simplex.LevelEditor(1200, 675, _engine.imageRepository.img.simplexBG);

		_levelEditor.addMapLayer(new ex.simplex.ImageLayer("background", 1000, 625, _engine.imageRepository.img.BG));
		_levelEditor.addMapLayer(new ex.simplex.TileLayer("main tile layer", _levelEditor.frame, 32, 32, data, _engine.imageRepository.img.Tiles));
		
		//--Setup rendering
		_engine.setupCanvas("#000000");
		_engine.enableDebugging();
		_engine.openWorld(ex.world.World);
		_engine.currentWorld.addObject(_levelEditor);
		
		_levelEditor.update = function(dt) {
			if(_engine.input.isKeyPressed(ex.util.Key.Keyb1)) {
				_levelEditor.toggleMapLayer(0);
			}
			if(_engine.input.isKeyPressed(ex.util.Key.Keyb2)) {
				_levelEditor.toggleMapLayer(1);
			}
			
			var mouseX = _engine.input.mouseX;
			var mouseY = _engine.input.mouseY;
			var mapFrame = _levelEditor.mapLayer.frame;
			if(mouseX > mapFrame.topLeftX && mouseX < (mapFrame.topLeftX + mapFrame.width) &&
					mouseY > mapFrame.topLeftY && mouseY < (mapFrame.topLeftY + mapFrame.height)){
				console.log(_levelEditor.mapLayer.sublayers[1].spriteMap.getTile(mouseX - mapFrame.topLeftX, mouseY - mapFrame.topLeftY));
			}
			
		};
	});
}());
