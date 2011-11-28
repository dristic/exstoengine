ex.using([
    "ex.Engine",
		"ex.world.World",
		"ex.display.ui.LoadingScreen"
	], 
	function () {
		var _engine = new ex.Engine(800, 500, 60, '#000');
		
//		_engine.renderer.setup(ex.display.rendering.Renderer.DOM, { canvas: null });
//    _engine.enableDebugging(ex.util.Debug.BROWSER, ex.util.Logger.LEVEL.DEBUG);
//    _engine.input.listenOn(_engine.renderer.renderingContext.el);
    
    _engine.renderer.setup(ex.display.rendering.Renderer.CANVAS2D, { canvas: null });
    _engine.enableDebugging(ex.util.Debug.DOM, ex.util.Logger.LEVEL.DEBUG);
    _engine.input.listenOn(_engine.renderer.renderingContext.canvas);

    ex.Input.loadInputMaps(
      [
        [ 
          ['jump', 'keydown W'],
          ['left', 'keypressed A'],
          ['down', 'keypressed S'],
          ['right', 'keypressed D'],
        ],
        [
          ['jump', 'keydown Up'],
          ['left', 'keypressed Left'],
          ['down', 'keypressed Down'],
          ['right', 'keypressed Right'],
        ]
      ],
      {
        jump: [],
        left: [],
        down: [],
        right: [],
        shoot: []
      }
    );
    
    _engine.openWorld(ex.world.World);
		
		ex.Assets.load('__loadBG', 'assets/loadingBG.jpg');
		ex.Assets.load('__exstoLogo', 'assets/exstologo.png');
		
		_engine.loadingScreen = new ex.display.ui.LoadingScreen(ex.Assets.getImage('__exstoLogo'));
		
		//-- ENTRY POINT! ZOMG REALLY?! THAT'S IT?! AWESOME!!! I RUV YOU!! --//
		_engine.loadScene("titleMenu");
	}
);