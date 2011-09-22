(function () {
	
	// Global variables
	var playerSpeed = 10;
	var data = [
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
	
	ex.using([
          "ex.Engine",
          "ex.display.AnimatedSprite",
          "ex.world.World",
          "ex.world.CollisionMap",
          "ex.display.SpriteMap",
          "ex.sound.Sound"
          	], 
  	function () {		
		//--Startup new engine
		var _engine = new ex.Engine(800, 500, 60);
		
		//--Setup rendering
		_engine.setupCanvas("#000000");
		_engine.enableDebugging();
		
		//--Setup input
		_engine.input.listenOn(_engine.renderer.canvas);
		
		// Sounds
		var laser = new ex.sound.Sound('../assets/sounds/lazer.ogg', 7);
		
		// Images
		_engine.imageRepository.loadImage("Nebula", "../assets/world/bg.png");
		_engine.imageRepository.loadImage("Explosion", "../assets/effects/explode3.png");
		_engine.imageRepository.loadImage("Tiles", "../assets/world/tileset-platformer.png");
		_engine.imageRepository.loadImage("Player", "../assets/units/player.png");
		
		//--Open base world
		_engine.openWorld(ex.world.World);

		// Setup player animation
		var player = new ex.display.AnimatedSprite(50, 150, 41, 47, 7, _engine.imageRepository.img.Player);
		player.createAnimation("Stand", [5]);
		player.createAnimation("Walk", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		player.play("Walk");
		_engine.currentWorld.addObject(player);
		_engine.collisionManager.addCollidable(player);
		
		// Setup explosion animation
		var explosion1 = new ex.display.AnimatedSprite(200, 145, 48, 48, 7, _engine.imageRepository.img.Explosion);
		explosion1.createAnimation("Explode", [0, 1, 2, 3]);
		explosion1.play("Explode");
		_engine.currentWorld.addObject(explosion1);
		_engine.collisionManager.addCollidable(explosion1);
		
		var explosion2 = new ex.display.AnimatedSprite(300, 50, 48, 48, 7, _engine.imageRepository.img.Explosion);
		explosion2.createAnimation("Explode", [0, 1, 2, 3]);
		explosion2.play("Explode");
		_engine.currentWorld.addObject(explosion2);
		_engine.collisionManager.addCollidable(explosion2);
		
		var explosion3 = new ex.display.AnimatedSprite(500, 145, 48, 48, 7, _engine.imageRepository.img.Explosion);
		explosion3.createAnimation("Explode", [0, 1, 2, 3]);
		explosion3.play("Explode");
		_engine.currentWorld.addObject(explosion3);
		_engine.collisionManager.addCollidable(explosion3);
		
		// Setup player controls
		player.onUpdate = function(dt) {
			if(_engine.input.isKeyPressed(ex.util.Key.Spacebar)) {
				//--Jump
				this.velocity.y -= playerSpeed * 75;
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
				laser.play();
			}
			
			if(this.velocity.x < 0.5 && this.velocity.x > -0.5){
				this.play("Stand");
			} else {
				this.play("Walk");
			}
			
			// Gravity
			this.velocity.y += playerSpeed;
			
			// Apply the velocity and set the positions for the camera to follow
			this.position.addScaled(this.velocity, dt);
			
			this.x = this.position.x;
			this.y = this.position.y;
			
			// Scale down the velocity
			this.velocity.scale(0.95);
		};
		
		// Focus camera on player
		_engine.camera.follow(player);
		
		// Load tile map
		var tiles = new ex.display.SpriteMap(32, 32, data, _engine.imageRepository.img.Tiles);
		_engine.currentWorld.addObject(tiles);
		_engine.collisionManager.addCollidable(tiles);
		
		// Load background image
		var nebula = new ex.display.Sprite(0, 0, _engine.imageRepository.img.Nebula);
		nebula.scrollFactorX = nebula.scrollFactorY = 0;
		_engine.currentWorld.addObject(nebula);
		
		var playLaserSound = function(){
			laser.play();
		};
		
		var resolvePlayerToMapCollision = function(collision){
			var index = 0;
			var x = 0;
			var y = 0;
			for(index; index < collision.data.length; index++) {
				x = collision.data[index].x;
				y = collision.data[index].y;
				collision.target.map[y][x] = 0;
			}
			playLaserSound();
		};
		
		_engine.collisionManager.events = [
   		    { source: explosion1, 	target: player, 	event: playLaserSound },
   		    { source: player, 		target: explosion1, event: playLaserSound },
    		{ source: explosion2, 	target: player, 	event: playLaserSound },
    		{ source: player, 		target: explosion2, event: playLaserSound },
		    { source: explosion3, 	target: player, 	event: playLaserSound },
		    { source: player, 		target: explosion3, event: playLaserSound },
		    { source: tiles, 		target: player,		event: resolvePlayerToMapCollision  },		
		    { source: player, 		target: tiles,		event: resolvePlayerToMapCollision  },		
		];
		
		_engine.onUpdate = function(){
			// Extra code to run on each update
		};
	});
	
})();