(function () {	
	ex.using([
          "ex.Engine",
          "ex.base.Vector",
          "ex.display.AnimatedSprite",
          "ex.display.Image",
          "ex.world.World",
          "ex.display.Sprite",
          "ex.display.SpriteMap",
          "ex.sound.Sound",
          "ex.simplex.Map",
          "ex.simplex.Layer",
          "ex.display.ui.TitleMenu",
          
          "entity.Player",
          "entity.Generic",
          "entity.Teleporter"
          	], 
  	function () {		
		//--Startup new engine
		var _engine = new ex.Engine(800, 500, 60);
		
		//--Setup rendering
		_engine.setupCanvas("#000000");
		_engine.enableDebugging();
		
		//--Setup input
		_engine.input.listenOn(_engine.renderer.canvas);
		
		//--Open base world
		_engine.openWorld(ex.world.World);
		
		//--Load Images
		_engine.imageRepository.loadImage("Nebula", "../assets/world/bg.png");
		_engine.imageRepository.loadImage("Explosion", "../assets/effects/explode3.png");
		
		var titleScreen = new ex.display.ui.TitleMenu(
				[{
					text: "Start Game",
					action: function(){
						_engine.currentWorld.removeObject(titleScreen);
						startGame(_engine);
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
				_engine.imageRepository.getImage("Nebula"), 
				_engine.imageRepository.getImage("Explosion"), 
				_engine.input);
		
		var onOptions = 
		
		_engine.currentWorld.addObject(titleScreen);
		
		_engine.onUpdate = function(){
			// Extra code to run on each update
		};
	});
	
	function startGame(_engine) {
		// Global variables
		var map1Data = [
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 51, 52, 52, 53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 52, 52, 52, 52, 53, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12],
				];
		
		var map2Data = [
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 51, 52, 52, 53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 52, 52, 52, 52, 53, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
					[ 0, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9],
					[ 0, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9],
					[ 0, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9],
					[ 0, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9],
					[ 0, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9],
					[ 0, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9],
					[ 0, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9],
				];
		
		// Sounds
		var laser = new ex.sound.Sound('../assets/sounds/lazer.ogg', 7);
		
		// Images
		_engine.imageRepository.loadImage("Nebula", "../assets/world/bg.png");
		_engine.imageRepository.loadImage("Explosion", "../assets/effects/explode3.png");
		_engine.imageRepository.loadImage("Teleport", "../assets/effects/teleport2.png");
		_engine.imageRepository.loadImage("Tiles", "../assets/world/tileset-platformer.png");
		_engine.imageRepository.loadImage("Player", "../assets/units/player.png");
		
		// Setup player
		var player = new entity.Player(
				"Player", 
				new ex.base.Vector(100, 150), 
				new ex.display.AnimatedSprite(
						new ex.base.Vector(0,0),
						41, 47, 7,
						_engine.imageRepository.getImage("Player")), 
				true, 
				_engine.input);
		
		// Setup explosion animations & teleporter
		var explosion1 = new entity.Generic(
				"Explosion", 
				new ex.base.Vector(200, 145), 
				new ex.display.AnimatedSprite(
						new ex.base.Vector(0,0), 
						48, 48, 7, 
						_engine.imageRepository.getImage("Explosion")), 
				true);
		var explosion2 = new entity.Generic(
				"Explosion", 
				new ex.base.Vector(300, 50), 
				new ex.display.AnimatedSprite(
						new ex.base.Vector(0,0), 
						48, 48, 7, 
						_engine.imageRepository.getImage("Explosion")),
				true);
		var explosion3 = new entity.Generic(
				"Explosion", 
				new ex.base.Vector(500, 155), 
				new ex.display.AnimatedSprite(
						new ex.base.Vector(0,0), 
						48, 48, 7, 
						_engine.imageRepository.getImage("Explosion")),
				true);
		var teleporter = new entity.Teleporter(
				"Teleporter", 
				new ex.base.Vector(750, 162), 
				new ex.display.AnimatedSprite(
						new ex.base.Vector(0,0), 
						60, 60, 10, 
						_engine.imageRepository.getImage("Teleport")),
				true);
		teleporter.onCollide = function(target, data){
			if(target.name == "Player" && !teleporter.triggered){
				playLaserSound();
				teleporter.triggered = true;
				_engine.currentWorld.loadLevel("Level 2");
				_engine.currentWorld.activeLevel.getLayer("Ground").addItem(player);
				_engine.collisionManager.setActiveLevel(_engine.currentWorld.activeLevel);
				
			}
		};
		
		
		// Load tile maps
		var level1Map = new ex.display.SpriteMap(32, 32, map1Data, _engine.imageRepository.getImage("Tiles"));
		var level2Map = new ex.display.SpriteMap(32, 32, map2Data, _engine.imageRepository.getImage("Tiles"));
		
		// Setup background sprite
		var nebula = new ex.display.Sprite(new ex.base.Vector(0,0), _engine.imageRepository.getImage("Nebula"));
		
		// Setup level 1
		var firstLevel = new ex.simplex.Map("Level 1");
		firstLevel.addLayer(new ex.simplex.Layer("Ground", level1Map, new ex.base.Vector(0,0), new ex.base.Vector(1,1)));
		firstLevel.addLayer(new ex.simplex.Layer("Background", null, new ex.base.Vector(0,0), new ex.base.Vector(0.1,0.1)));
		firstLevel.getLayer("Background").addItem(nebula);
		firstLevel.getLayer("Ground").addItem(teleporter);
		
		// Setup level 2
		var secondLevel = new ex.simplex.Map("Level 2");
		secondLevel.addLayer(new ex.simplex.Layer("Ground", level2Map, new ex.base.Vector(0,0), new ex.base.Vector(1,1)));
		secondLevel.getLayer("Ground").addItem(explosion1);
		secondLevel.getLayer("Ground").addItem(explosion2);
		secondLevel.getLayer("Ground").addItem(explosion3);
		secondLevel.addLayer(new ex.simplex.Layer("Background", null, new ex.base.Vector(0,0), new ex.base.Vector(0.1,0.1)));
		secondLevel.addLayer(new ex.simplex.Layer("Explosions", null, new ex.base.Vector(0,0), new ex.base.Vector(1,1)));
		secondLevel.getLayer("Background").addItem(nebula);
		
		// Add levels to world
		_engine.currentWorld.addLevel(firstLevel);
		_engine.currentWorld.addLevel(secondLevel);
		
		// Load level 2
		_engine.currentWorld.loadLevel("Level 1");
		_engine.currentWorld.activeLevel.getLayer("Ground").addItem(player);
		_engine.collisionManager.setActiveLevel(_engine.currentWorld.activeLevel);
		
		console.log(_engine.collisionManager.activeLevel.getLayer("Ground").items);

		// Focus camera on player
		_engine.camera.follow(player);
		
		var playLaserSound = function(){
			laser.play();
		};
	}
	
})();