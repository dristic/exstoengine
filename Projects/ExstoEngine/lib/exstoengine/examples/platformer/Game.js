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
          "entity.Explosion",
          "entity.Asteroid",
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
				_engine.imageRepository.getImage("Nebula"), 
				_engine.imageRepository.getImage("Explosion"), 
				_engine.input);
		
		_engine.currentWorld.addObject(titleScreen);
		
		// function call to remove title screen and start game
		function titleScreenToGame() {
			_engine.currentWorld.removeObject(titleScreen);
			startGame(_engine);
			document.getElementById("buttonJump").removeEventListener('mousedown', titleScreenToGame, false);
		};
		
		// UI button to start game
		document.getElementById("buttonJump").addEventListener('mousedown', titleScreenToGame, false);
		
		_engine.onUpdate = function(){
			// Extra code to run on each update
			
		};
	});
	
	function startGame(_engine) {		
		// Tile Maps
		var map1Data = [
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 10, 11, 12, 0, 0, 0, 0, 0, 51, 52, 52, 52, 52, 53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 10, 11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 10, 11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 4, 5, 5, 5, 11, 11, 12, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 5, 5, 5, 5, 5, 5, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0, 0, 0],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0, 0],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 0, 0, 0],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12],
					[ 0, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12],
				];
		var map2Data = [
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 51, 52, 52, 53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 52, 52, 52, 52, 53, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 60, 0, 0, 0, 62, 0, 60, 0, 61, 0, 0, 0, 60, 0, 61, 0, 62, 0, 0, 0, 61, 0, 62, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[ 60, 0, 61, 0, 62, 0, 0, 0, 61, 61, 62, 0, 60, 0, 61, 0, 62, 0, 60, 0, 61, 0, 62, 0, 0],
				];
		
		// Sounds
		var laser = new ex.sound.Sound('../assets/sounds/lazer.ogg', 7);
		
		// Images
		_engine.imageRepository.loadImage("Nebula", "../assets/world/bg.png");
		_engine.imageRepository.loadImage("Explosion", "../assets/effects/explode3.png");
		_engine.imageRepository.loadImage("Teleport", "../assets/effects/teleport2.png");
		_engine.imageRepository.loadImage("Tiles", "../assets/world/tileset-platformer.png");
		_engine.imageRepository.loadImage("Player", "../assets/units/player.png");
		_engine.imageRepository.loadImage("Asteroid", "../assets/world/asteroid.png");
		_engine.imageRepository.loadImage("edgeUp", "../assets/debug/EdgeUp.png");
		_engine.imageRepository.loadImage("edgeDown", "../assets/debug/EdgeDown.png");
		_engine.imageRepository.loadImage("edgeLeft", "../assets/debug/EdgeLeft.png");
		_engine.imageRepository.loadImage("edgeRight", "../assets/debug/EdgeRight.png");
		
		// Setup player
		var player = new entity.Player(
				"Player", 
				new ex.base.Vector(100, 150), 
				new ex.display.AnimatedSprite(
						new ex.base.Vector(0,0),
						36, 40, 7,
						_engine.imageRepository.getImage("Player")), 
				true, 
				_engine.input);
		
		// UI Setup
		document.getElementById("buttonJump").addEventListener('mousedown', function(){player.jump();}, false);
		document.getElementById("buttonLeft").addEventListener('mousedown', function(){_engine.input.keys[65] = true;}, false);
		document.getElementById("buttonRight").addEventListener('mousedown', function(){_engine.input.keys[68] = true;}, false);
		document.getElementById("buttonLeft").addEventListener('mouseup', function(){_engine.input.keys[65] = false;}, false);
		document.getElementById("buttonRight").addEventListener('mouseup', function(){_engine.input.keys[68] = false;}, false);
		
		// Setup explosion animations & teleporter
		var explosion1 = new entity.Explosion(
				"Explosion", 
				new ex.base.Vector(200, 145), 
				new ex.display.AnimatedSprite(
						new ex.base.Vector(0,0), 
						48, 48, 7, 
						_engine.imageRepository.getImage("Explosion")), 
				true);
		var explosion2 = new entity.Explosion(
				"Explosion", 
				new ex.base.Vector(300, 50), 
				new ex.display.AnimatedSprite(
						new ex.base.Vector(0,0), 
						48, 48, 7, 
						_engine.imageRepository.getImage("Explosion")),
				true);
		var explosion3 = new entity.Explosion(
				"Explosion", 
				new ex.base.Vector(500, 155), 
				new ex.display.AnimatedSprite(
						new ex.base.Vector(0,0), 
						48, 48, 7, 
						_engine.imageRepository.getImage("Explosion")),
				true);
		var teleporter = new entity.Teleporter(
				"Teleporter", 
				new ex.base.Vector(750, 130), 
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
		var asteroid = new entity.Asteroid(
				"Asteroid",
				new ex.base.Vector(750,162),
				new ex.display.Sprite(
						new ex.base.Vector(0,0),
						_engine.imageRepository.getImage("Asteroid")),
				false);
		
		// Debug images to show edges on tiles
		var edgeDebug = {
			up: _engine.imageRepository.getImage("edgeUp"),
			down: _engine.imageRepository.getImage("edgeDown"),
			left: _engine.imageRepository.getImage("edgeLeft"),
			right: _engine.imageRepository.getImage("edgeRight")
		};
		
		// Generates an array of asteroids at random position and velocities
		// to be added to a layer later.
		var asteroidField = [];
		var cap = 50;
		for(var counter = 0; counter < cap; counter++){
			asteroidField.push(new entity.Asteroid(
					"Asteroid",
					new ex.base.Vector(Math.random() * 2400 - 1200, Math.random() * 1500 - 750),
					new ex.display.Sprite(
							new ex.base.Vector(0,0),
							_engine.imageRepository.getImage("Asteroid")),
					false));
			asteroidField[counter].velocity = new ex.base.Vector(Math.random() * 15 - 7.5, Math.random() * 15 - 7.5);
		}
		
		// Load tile maps
		var level1Map = new ex.display.SpriteMap(32, 32, map1Data, _engine.imageRepository.getImage("Tiles"), null, edgeDebug);
		var level2Map = new ex.display.SpriteMap(32, 32, map2Data, _engine.imageRepository.getImage("Tiles"), null, edgeDebug);
		
		// Setup background sprite
		var nebula = new ex.display.Sprite(new ex.base.Vector(0,0), _engine.imageRepository.getImage("Nebula"));
		
		// Setup level 1
		var firstLevel = new ex.simplex.Map("Level 1");
		firstLevel.addLayer(new ex.simplex.Layer("Ground", level1Map, new ex.base.Vector(0,0), new ex.base.Vector(1,1)));
		firstLevel.addLayer(new ex.simplex.Layer("Background", null, new ex.base.Vector(0,0), new ex.base.Vector(0,0)));
		firstLevel.getLayer("Background").addItem(nebula);
		firstLevel.getLayer("Ground").addItem(teleporter);
		
		// Setup level 2
		var secondLevel = new ex.simplex.Map("Level 2");
		secondLevel.addLayer(new ex.simplex.Layer("Asteroid Field", null, new ex.base.Vector(0,0), new ex.base.Vector(1.5,1.5)));
		secondLevel.addLayer(new ex.simplex.Layer("Ground", level2Map, new ex.base.Vector(0,0), new ex.base.Vector(1,1)));
		secondLevel.getLayer("Ground").addItem(explosion1);
		secondLevel.getLayer("Ground").addItem(explosion2);
		secondLevel.getLayer("Ground").addItem(explosion3);
		secondLevel.getLayer("Ground").addItem(asteroid);
		secondLevel.addLayer(new ex.simplex.Layer("Background", null, new ex.base.Vector(0,0), new ex.base.Vector(0,0)));
		secondLevel.getLayer("Background").addItem(nebula);
		var index = asteroidField.length;
		var asteroidLayer = secondLevel.getLayer("Asteroid Field");
		while(index--){
			asteroidLayer.addItem(asteroidField[index]);
		};
		
		// Add levels to world
		_engine.currentWorld.addLevel(firstLevel);
		_engine.currentWorld.addLevel(secondLevel);
		
		// Load level 1
		_engine.currentWorld.loadLevel("Level 1");
		_engine.currentWorld.activeLevel.getLayer("Ground").addItem(player);
		_engine.collisionManager.setActiveLevel(_engine.currentWorld.activeLevel);
		
		// Focus camera on player
		_engine.camera.follow(player);
		
		var playLaserSound = function(){
			laser.play();
		};
	}
	
})();