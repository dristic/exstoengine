ex.using([
    "ex.Engine",
		"ex.world.World",
		"ex.display.ui.LoadingScreen"
	], 
	function () {
		var _engine = new ex.Engine(
	    800, 500, 
	    60, 
	    '#000', 
	    {
	      renderingContext: ex.display.rendering.Renderer.CANVAS2D,
	      renderingParams: { canvas: null },
	      fullscreen: true,
	      fullscreenType: 'resize'
	    }
		);

    _engine.enableDebugging(ex.util.Debug.DOM, ex.util.Logger.LEVEL.DEBUG);

    ex.Input.loadInputMaps(
      [
        [ 
          ['up', 'W'],
          ['left', 'A'],
          ['down', 'S'],
          ['right', 'D'],
          ['mousemove', 'move'],
          ['use', 'E LMB'],          
        ],
        [
          ['up', 'Up'],
          ['left', 'Left'],
          ['down', 'Down'],
          ['right', 'Right'],
          ['use', 'Shift'],
        ]
      ],
      {
        up: [],
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