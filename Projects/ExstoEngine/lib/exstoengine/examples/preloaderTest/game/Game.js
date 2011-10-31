(function () {	
	ex.using([
          "ex.Engine",
          "ex.world.World",
          
          "ex.display.ui.TitleMenu",
          "ex.display.ui.StatusBar",
          	], 
  	function () {		
		//--Startup new engine
		var _engine = new ex.Engine(800, 500, 600);
		
		//--Setup rendering
		_engine.setupCanvas("#000000");
		_engine.enableDebugging();
		
		//--Setup input
		_engine.input.listenOn(_engine.renderer.canvas);
		
		//--Open base world
		_engine.openWorld(ex.world.World);
		
		//--Load Images (current code)
		ex.Assets.load("Nebula", "../assets/world/bg.png");
		ex.Assets.load("Explosion", "../assets/effects/explode3.png");
		
		var titleScreen = new ex.display.ui.TitleMenu(
				[{
					text: "Start Game",
					action: function(){
						titleScreenToGame();
					}
				},
				{
					text: "Options",
					action: function() {
						alert("Just kidding! You have no options!");
					}
				},
				{
					text: "Quit",
					action: function(){
						alert("You can't quit! You're miiiine!!!");
					}
				}], 
				0, 
				ex.Assets.getImage("Nebula"),
				ex.Assets.getImage("Explosion"),
				_engine.input);
		
		_engine.currentWorld.addObject(titleScreen);
		
		// function call to remove title screen and start game
		function titleScreenToGame() {
			_engine.currentWorld.removeObject(titleScreen);
			startGame(_engine);
		};
		
		_engine.onUpdate = function(){
			// Extra code to run on each update
			
		};
	});
	
	function startGame(_engine) {		
		_engine.loadLevel("level1");
	}
	
})();