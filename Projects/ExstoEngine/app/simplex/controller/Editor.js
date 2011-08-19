Ext.define('Simplex.controller.Editor', {
	extend: 'Ext.app.Controller',
	
	views: [
        'game.Editor',
        'game.Game'
    ],
    
	init: function() {
		this.control({
			'editor': {
				afterrender: function () {
					initEditor();
				}
			}
		});
	}
});

function initEditor() {
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
          "ex.simplex.Map",
          "ex.display.SpriteMap",
          "ex.display.Image"
          	], 
  	function () {
		//--Startup new engine
		var _engine = new ex.Engine(1000, 500, 60);
		
		_engine.imageRepository.loadImage("simplexBG", "../../lib/exstoengine/examples/assets/world/simplexBG.png");
		_engine.imageRepository.loadImage("Tiles", "../../lib/exstoengine/examples/assets/world/tileset-platformer.png");
		_engine.imageRepository.loadImage("BG", "../../lib/exstoengine/examples/assets/world/bg.png");
		
		var _mapEditor = new ex.simplex.Map("Test Map");

		_mapEditor.addLayer("platform", [
            new ex.display.SpriteMap(32, 32, data, _engine.imageRepository.img.Tiles)
		]);
		
		_mapEditor.addLayer("background", [
		    new ex.display.Image(_engine.imageRepository.img.BG)
		]);
		
		//--Setup rendering
		_engine.setupCanvas("#000000", document.getElementById('game'));
		_engine.enableDebugging();
		_engine.openWorld(ex.world.World);
		_engine.currentWorld.addObject(_mapEditor);
	});
};