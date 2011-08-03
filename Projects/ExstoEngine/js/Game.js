(function () {
	
	// Global variables
	var shipSpeed = 5;
	var playerSpeed = 10;
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
	var colData = [
	   			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	   			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	   			[ 0, 0, 0, 0, 51, 52, 52, 53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	   			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 52, 52, 52, 52, 53, 0, 0, 0, 0, 0, 0],
	   			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	   			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	   			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	   			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	   			[ 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	   			[ 0, 0, 0,   4,  5,  5,  5,  5,  5,  6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	   			[ 0, 0,  0, 10, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0],
	   			[ 0, 0,  0, 10, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0, 0, 0, 0,  4,  5, 81, 82, 82, 82, 81, 5],
	   			[ 4,  6, 0, 10, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 0, 0, 0, 10, 11],
	   			[10, 12, 0, 10, 11, 11, 11, 66, 11, 12, 2, 2, 2, 2, 2, 3, 0, 10, 11, 12, 0, 0, 0, 10, 11],
	   			[10, 12, 0, 10, 11, 11, 66, 66, 11,  8, 8, 8, 8, 8, 8, 9, 0, 10, 11, 12, 0, 0, 0, 10, 11],
	   			[10, 12, 0, 10, 11, 11, 66, 66,  8,  8, 8, 8, 8, 8, 8, 9, 0, 10, 11, 12, 0, 0, 0, 10, 11],
	   		];
	
	// Setup base url for the engine
	ex.config.baseUrl = "../js";
	
	ex.using([
          "ex.Engine",
          "ex.display.AnimatedSprite",
          "ex.world.World",
          "ex.world.CollisionMap",
          "ex.display.SpriteMap",
          "ex.display.Emitter",
          "ex.plugins.Emitter2",
          "ex.sound.Sound"
          	], 
  	function () {
		// Create new sound
		var snd = new ex.sound.Sound('../assets/sounds/lazer.ogg', 7);
		
		//--Startup new engine
		var _engine = new ex.Engine(800, 500, 60);
		
		//--Setup rendering
		_engine.setupCanvas("#000000");
		_engine.enableDebugging();
		
		// Images
		_engine.imageRepository.loadImage("Ship", "../assets/units/ship1.png");
		_engine.imageRepository.loadImage("Base", "../assets/units/base2.png");
		_engine.imageRepository.loadImage("Nebula", "../assets/world/bg.png");
		_engine.imageRepository.loadImage("Explosion", "../assets/effects/explode3.png");
		_engine.imageRepository.loadImage("Tiles", "../assets/world/tileset-platformer.png");
		_engine.imageRepository.loadImage("Player", "../assets/units/player.png");
		
		//--Open base world
		_engine.openWorld(ex.world.World);
		
		_engine.onUpdate = function() {
			//
		};
		
		var explosion = new ex.display.AnimatedSprite(100, 100, 48, 48, 7, _engine.imageRepository.img.Explosion);
		_engine.currentWorld.addObject(explosion);
		
		var player = new ex.display.AnimatedSprite(400, 150, 41, 47, 7, _engine.imageRepository.img.Player);
		player.createAnimation("Stand", [5]);
		player.createAnimation("Walk", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		player.play("Stand");
		_engine.currentWorld.addObject(player);
		
		var collisionMap = new ex.world.CollisionMap(32, 32, colData);
		
		var jetPackOffset = new ex.base.Vector(5,20);
		var jetPackBaseVector = new ex.base.Vector(0, 100);
		var jetPackEmitter = new ex.plugins.Emitter2(
			{   position: player.position.clone().add(jetPackOffset.clone()),
				particleVector: jetPackBaseVector.clone(),
				angleVariance: Math.PI / 12,
				spawnSpeed: 30,
				sizeVariance: 4
			}, 
			{	lifespan: 0.2,
				size: 10,
				color: '#fa0'
			}
		);
		_engine.currentWorld.addObject(jetPackEmitter);
		
		player.onUpdate = function(dt) {
			if(_engine.input.isKeyPressed(ex.util.Key.Spacebar)) {
				//--Jump
				this.velocity.y -= playerSpeed * 75;
				jetPackEmitter.options.active = true;
			}
			
			if(_engine.input.isKeyDown(ex.util.Key.S)) {
				//--Crouch
				this.velocity.y += playerSpeed;
			}
			
			if(_engine.input.isKeyDown(ex.util.Key.A)) {
				this.velocity.x -= playerSpeed;
			}
			
			if(_engine.input.isKeyDown(ex.util.Key.D)) {
				this.velocity.x += playerSpeed;
			}
			
			if(_engine.input.isKeyPressed(ex.util.Key.J)) {
				snd.play();
			}
			
			if(this.velocity.x < 0.5 && this.velocity.x > -0.5){
				this.play("Stand");
			} else {
				this.play("Walk");
			}
			
			if(this.velocity.y > 0){
				jetPackEmitter.options.active = true;
			} else if(this.velocity.y == 0) {
				jetPackEmitter.options.active = false;
			}
			
			
			this.velocity.y += playerSpeed;
			jetPackEmitter.options.position = player.position.clone().add(jetPackOffset);
			jetPackEmitter.options.particleVector = jetPackBaseVector.clone();
			jetPackEmitter.options.particleVector.add(new ex.base.Vector(this.velocity.x, this.velocity.y));
			
			var collision = collisionMap.collide(
					dt, 
					this.position.x, this.position.y, 
					this.velocity.x, this.velocity.y, 
					this.width, this.height);
			this.handleCollision(collision);
			
			this.position.addScaled(this.velocity, dt);
			this.x = this.position.x;
			this.y = this.position.y;
			
			this.velocity.scale(0.95);
			jetPackEmitter.options.position = this.position.clone().add(jetPackOffset);
		};
		
		_engine.camera.follow(player);
		
		//var emitter = new ex.display.Emitter({});
		//_engine.currentWorld.addObject(emitter);
		
		/**
		 * The object function is at ExstoEngine.js:4, Array.prototype.contains
		 * Uncaught TypeError: Object function (item) {
					var i = this.length;
					while(i--) {
						if(this[i] === item) {
							return true;
						}
					}
					return false;
				} has no method 'update'
			Emitter.ex.Class.updateParticleSystem.js:195
			World.ex.Class.updateWorld.js:13
			window.ex.Engine.ex.Class.updateEngine.js:85
			window.ex._ex.bindExstoEngine.js:24
		 */
		var newEmitter = new ex.plugins.Emitter2({}, {});
		_engine.currentWorld.addObject(newEmitter);
		
		var tiles = new ex.display.SpriteMap(32, 32, data, _engine.imageRepository.img.Tiles);
		_engine.currentWorld.addObject(tiles);
		
		var nebula = new ex.display.Sprite(0, 0, _engine.imageRepository.img.Nebula);
		nebula.scrollFactorX = nebula.scrollFactorY = 0;
		_engine.currentWorld.addObject(nebula);
	});
	
})();