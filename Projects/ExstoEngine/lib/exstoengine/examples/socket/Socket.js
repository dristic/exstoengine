(function () {
	
	// Globals
	var socket = io.connect('http://localhost:8080');
	var playerSpeed = 10;
	
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
		
		//--Setup input
		_engine.input.listenOn(_engine.renderer.canvas);
		
		// Images
		_engine.imageRepository.loadImage("Ship", "../assets/units/ship1.png");
		_engine.imageRepository.loadImage("Nebula", "../assets/world/bg.png");
		
		//--Open base world
		_engine.openWorld(ex.world.World);
		
		_engine.onUpdate = function() {
			//
		};
		
		var player = new ex.display.Sprite(400, 150, _engine.imageRepository.img.Ship);
		_engine.currentWorld.addObject(player);
		
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
		jetPackEmitter.options.active = true;		
		
		player.onUpdate = function(dt) {
			if(_engine.input.isKeyDown(ex.util.Key.W)) {
				this.velocity.y -= playerSpeed;
			}
			
			if(_engine.input.isKeyDown(ex.util.Key.S)) {
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
			
			jetPackEmitter.options.position = player.position.clone().add(jetPackOffset);
			jetPackEmitter.options.particleVector = jetPackBaseVector.clone();
			jetPackEmitter.options.particleVector.add(new ex.base.Vector(this.velocity.x, this.velocity.y));
			
			this.position.addScaled(this.velocity, dt);
			this.x = this.position.x;
			this.y = this.position.y;
			
			socket.emit('positionUpdate', { id: playerId, position: this.position });
			
			this.velocity.scale(0.95);
			jetPackEmitter.options.position = this.position.clone().add(jetPackOffset);
		};
		
		// Have the camera follow the player
		_engine.camera.follow(player);
		
		// Socket API
		var player2 = new ex.display.Sprite(400, 150, _engine.imageRepository.img.Ship);
		_engine.currentWorld.addObject(player2);
		
		var playerId = 0;
		socket.on('playerId', function (data) {
			if(playerId == 0) {
				playerId = data.id;
			}
		});
		
		socket.on('position', function(data) {
			if(data.id != playerId && data.position != null) {
				player2.x = data.position.x;
				player2.y = data.position.y;
				player2.position.x = data.position.x;
				player2.position.y = data.position.y;
			}
		});
		
		// Background image
		var nebula = new ex.display.Sprite(0, 0, _engine.imageRepository.img.Nebula);
		nebula.scrollFactorX = nebula.scrollFactorY = 1;
		_engine.currentWorld.addObject(nebula);
	});
	
})();