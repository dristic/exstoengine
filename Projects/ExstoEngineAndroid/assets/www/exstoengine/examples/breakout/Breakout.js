(function () {
	
	// Global variables
	var level1Data = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2],
        [5, 5, 5, 5, 5, 5, 5, 5],
        [4, 4, 4, 4, 4, 4, 4, 4],
        [3, 3, 3, 3, 3, 3, 3, 3],
        [6, 6, 6, 6, 6, 6, 6, 6],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [8, 8, 8, 8, 8, 8, 8, 8]
	];
	
	ex.using([
          "ex.Engine",
          "ex.base.Vector",
          "ex.world.World",
          "ex.display.AnimatedSprite",
          "ex.world.CollisionMap",
          "ex.display.SpriteMap",
          "ex.sound.Sound",
          "ex.world.Map",
          "ex.world.Layer",
          
          "entity.Paddle",
          "entity.Ball"
          	], 
  	function () {		
		//--Startup new engine
		var _engine = new ex.Engine(800, 500, 60);
		
		//--Setup rendering
		_engine.setupCanvas("#000000");
		_engine.enableDebugging();
		
		//--Setup input
		_engine.input.listenOn(_engine.renderer.canvas);
		
		// Images
		_engine.imageRepository.loadImage("Ball", "resources/ball.png");
		_engine.imageRepository.loadImage("Paddle", "resources/paddle.png");
		_engine.imageRepository.loadImage("Tiles", "resources/bricks.png");
		_engine.imageRepository.loadImage("BG", "resources/bg.png");
		
		// Sounds
		var laser = new ex.sound.Sound('../assets/sounds/lazer.ogg', 7);
		
		// Setup Sprites
		var paddleSprite = new ex.display.Sprite(new ex.base.Vector(0, 0), _engine.imageRepository.getImage("Paddle"));
		var ballSprite = new ex.display.Sprite(new ex.base.Vector(0, 0), _engine.imageRepository.getImage("Ball"));
		
		// Setup Player
		var paddle = new entity.Paddle(
				"Paddle", 
				new ex.base.Vector(20, 460), 
				paddleSprite,
				true, 
				_engine.input);
		
		// Setup Ball
		var ball = new entity.Ball(
				"Ball",
				new ex.base.Vector(20, 400),
				ballSprite,
				true);
		ball.velocity = new ex.base.Vector(100, -100);
		
		// Load tile map
		var level1Map = new ex.display.SpriteMap(
				100, 20, 
				level1Data, 
				_engine.imageRepository.getImage("Tiles"));

		// Load background image
		var nebula = new ex.display.Sprite(new ex.base.Vector(0, 0), _engine.imageRepository.getImage("BG"));
		
		// Setup level
		var level1 = new ex.world.Map("Level 1");
		level1.addLayer(new ex.world.Layer(
				"Ground",
				level1Map,
				new ex.base.Vector(0,0),
				new ex.base.Vector(0,0)));
		level1.addLayer(new ex.world.Layer(
				"Background",
				null,
				new ex.base.Vector(0,0),
				new ex.base.Vector(0,0)));
		
		level1.getLayer("Ground").addItem(paddle);
		level1.getLayer("Ground").addItem(ball);
		level1.getLayer("Background").addItem(nebula);
		
		//--Open world and add levels
		_engine.openWorld(ex.world.World);
		_engine.currentWorld.addLevel(level1);
		
		// Load Level 1
		_engine.currentWorld.loadLevel("Level 1");
		_engine.collisionManager.setActiveLevel(_engine.currentWorld.activeLevel);
		
		_engine.onUpdate = function(){
			// Extra code to run on each update
		};
		
	});
	
})();