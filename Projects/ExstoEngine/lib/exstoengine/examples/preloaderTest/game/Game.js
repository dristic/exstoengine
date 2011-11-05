ex.using([
        "ex.Engine",
		"ex.world.World",
	], 
	function () {
		var _engine = new ex.Engine(800, 500, 600);
		_engine.setupCanvas("#000000");
		_engine.enableDebugging(ex.util.Debug.BROWSER, ex.util.Logger.LEVEL.DEBUG);
		_engine.input.listenOn(_engine.renderer.canvas);
		_engine.openWorld(ex.world.World);
		
		//-- ENTRY POINT! ZOMG REALLY?! THAT'S IT?! AWESOME!!! I RUV YOU!! --//
		_engine.loadScene("titleMenu");
	}
);