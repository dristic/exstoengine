(function () {
	
	// Global variables
	var playerSpeed = 20;
	var data = [
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
          "ex.world.World",
          "ex.display.AnimatedSprite",
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
		_engine.imageRepository.loadImage("Ball", "resources/ball.png");
		_engine.imageRepository.loadImage("Tiles", "resources/bricks.png");
		_engine.imageRepository.loadImage("Paddle", "resources/paddle.png");
		_engine.imageRepository.loadImage("BG", "resources/bg.png");
		
		//--Open base world
		_engine.openWorld(ex.world.World);

		// Setup player animation
		var player = new ex.display.Sprite(20, 460, _engine.imageRepository.img.Paddle, "Paddle");
		_engine.currentWorld.addObject(player);
		_engine.collisionManager.addCollidable(player);
		
		// Setup player controls
		player.onUpdate = function(dt) {
			if(_engine.input.isKeyDown(ex.util.Key.A)) {
				this.velocity.x -= playerSpeed;
			}
			if(_engine.input.isKeyDown(ex.util.Key.D)) {
				this.velocity.x += playerSpeed;
			}
			if(_engine.input.isKeyPressed(ex.util.Key.J)) {
				laser.play();
			}
			
			// Apply the velocity and set the positions for the camera to follow
			this.position.addScaled(this.velocity, dt);
			
			if(this.position.x < 0) this.position.x = 0;
			else if(this.position.x > 700) this.position.x = 700;
			
			this.x = this.position.x;
			this.y = this.position.y;
			
			// Scale down the velocity
			this.velocity.scale(0.95);
		};
		
		// Focus camera on player
		//_engine.camera.follow(player);
		
		// Load tile map
		var tiles = new ex.display.SpriteMap(100, 20, data, _engine.imageRepository.img.Tiles);
		_engine.currentWorld.addObject(tiles);
		_engine.collisionManager.addCollidable(tiles);
		
		var playLaserSound = function(){
			laser.play();
		};
		
		var ball = new ex.display.Sprite(20, 400, _engine.imageRepository.img.Ball, "Ball");
		_engine.currentWorld.addObject(ball);
		_engine.collisionManager.addCollidable(ball);
		ball.velocity.x = 100;
		ball.velocity.y = -100;
		ball.onUpdate = function(dt) {
			// Apply the velocity and set the positions for the camera to follow
			this.position.addScaled(this.velocity, dt);
			
			if(this.position.x < 0) {
				this.position.x = 0;
				this.velocity.x = -this.velocity.x;
			} else if(this.position.x > 775) {
				this.position.x = 775;
				this.velocity.x = -this.velocity.x;
			}
			
			this.x = this.position.x;
			this.y = this.position.y;
		};
		
		var resolveBallTileCollision = function(collision) {
			var tileX = collision.data[0].x,
				tileY = collision.data[0].y,
				tileMap = collision.target;
			
			tileMap.map[tileY][tileX] = 0;
			
			tileX = tileMap.tileWidth * tileX;
			tileY = tileMap.tileHeight * tileY;
			
			if(tileY < ball.position.y) {
				ball.velocity.y = -ball.velocity.y;
			} else {
				ball.velocity.x = -ball.velocity.x;
			}
			
			if(ball.velocity.y < 0) ball.velocity.y--;
			else ball.velocity.y++;
			
			if(ball.velocity.x < 0) ball.velocity.x--;
			else ball.velocity.x++;
		};
		
		var resolveBallPaddleCollision = function(collision) {
			ball.velocity.y = -ball.velocity.y;
		};
		
		_engine.collisionManager.events = [
           	{ source: ball, target: player, event: resolveBallPaddleCollision },
           	{ source: player, target: ball, event: resolveBallPaddleCollision },
           	{ source: ball, target: tiles, event: resolveBallTileCollision }
		];
		
		_engine.onUpdate = function(){
			// Extra code to run on each update
		};
		
		var nebula = new ex.display.Sprite(0, 0, _engine.imageRepository.img.BG, "BG");
		_engine.currentWorld.addObject(nebula);
		_engine.collisionManager.addCollidable(nebula);
	});
	
})();