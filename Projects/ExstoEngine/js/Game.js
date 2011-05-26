//@include "exstoengine/ExstoEngine.js"
//@include "exstoengine/display/Sprite.js"
//@include "exstoengine/base/Class.js"

(function (engine) {
	
	var shipSpeed = 5;
	var playerSpeed = 10;
	
	
		//--Startup new engine
		var _engine = new ExstoEngine.Base.Engine(800, 500, 60);
		var sprite = new ExstoEngine.Display.Sprite(0, 0, new Image());
		
		//--Setup rendering
		_engine.setupCanvas("#000000");
		_engine.enableDebugging();
		
		_engine.onUpdate = function() {
			//
		};
		
		//--Open base world
		_engine.openWorld(ExstoEngine.World.World);
		
		//--Images
		_engine.imageRepository.loadImage("Ship", "assets/units/ship1.png");
		_engine.imageRepository.loadImage("Base", "assets/units/base2.png");
		_engine.imageRepository.loadImage("Nebula", "assets/world/bg.png");
		_engine.imageRepository.loadImage("Explosion", "assets/effects/explode3.png");
		_engine.imageRepository.loadImage("Tiles", "assets/world/tileset-platformer.png");
		_engine.imageRepository.loadImage("Player", "assets/units/player.png");
		
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
			[ 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0, 0,   4,  5,  5,  5,  5,  5,  6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[ 0, 0,  0, 10, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0],
			[ 0, 0,  0, 10, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0, 0, 0, 0,  4,  5, 81, 82, 82, 82, 81, 5],
			[ 4,  6, 0, 10, 11, 11, 11, 11, 11, 12, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 0, 0, 0, 10, 11],
			[10, 12, 0, 10, 11, 11, 11, 66, 11, 12, 2, 2, 2, 2, 2, 3, 0, 10, 11, 12, 0, 0, 0, 10, 11],
			[10, 12, 0, 10, 11, 11, 66, 66, 11,  8, 8, 8, 8, 8, 8, 9, 0, 10, 11, 12, 0, 0, 0, 10, 11],
			[10, 12, 0, 10, 11, 11, 66, 66,  8,  8, 8, 8, 8, 8, 8, 9, 0, 10, 11, 12, 0, 0, 0, 10, 11],
		];
		
		//--Add game objects		
		/*var ship = new ExstoEngine.Display.Sprite(10, 10, _engine.imageRepository.img.Ship);
		ship.rotationEnabled = true;
		_engine.currentWorld.addObject(ship);
		
		ship.update = function(dt) {
			if(_engine.input.isKeyDown(ExstoEngine.Util.Key.W)) {
				this.y += shipSpeed * -Math.cos(this.rotation);
				this.x += shipSpeed * Math.sin(this.rotation);
			}
			
			if(_engine.input.isKeyDown(ExstoEngine.Util.Key.S)) {
				this.y += shipSpeed * Math.cos(this.rotation);
				this.x += shipSpeed * -Math.sin(this.rotation);
			}
			
			if(_engine.input.isKeyDown(ExstoEngine.Util.Key.A)) {
				this.rotation -= shipSpeed * Math.PI / 180;
			}
			
			if(_engine.input.isKeyDown(ExstoEngine.Util.Key.D)) {
				this.rotation += shipSpeed * Math.PI / 180;
			}
		}*/
		
		var explosion = new ExstoEngine.Display.AnimatedSprite(100, 100, 48, 48, 7, _engine.imageRepository.img.Explosion);
		_engine.currentWorld.addObject(explosion);
		
		var player = new ExstoEngine.Display.AnimatedSprite(400, 150, 41, 47, 7, _engine.imageRepository.img.Player);
		player.createAnimation("Stand", [5]);
		player.createAnimation("Walk", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		player.play("Stand");
		_engine.currentWorld.addObject(player);
		
		var collisionMap = new ExstoEngine.World.CollisionMap(32, 32, colData);
		
		player.onUpdate = function(dt) {
			if(_engine.input.isKeyPressed(ExstoEngine.Util.Key.W)) {
				//--Jump
				this.velocity.y -= playerSpeed * 75;
			}
			
			if(_engine.input.isKeyDown(ExstoEngine.Util.Key.S)) {
				//--Crouch
				this.velocity.y += playerSpeed;
				this.play("Walk");
			}
			
			if(_engine.input.isKeyDown(ExstoEngine.Util.Key.A)) {
				this.velocity.x -= playerSpeed;
				this.play("Walk");
			}
			
			if(_engine.input.isKeyDown(ExstoEngine.Util.Key.D)) {
				this.velocity.x += playerSpeed;
				this.play("Walk");
			}
			
			if(this.velocity.x < 0.5 && this.velocity.x > -0.5) this.play("Stand");
			
			this.velocity.y += playerSpeed;
			
			var collision = collisionMap.collide(dt, this.position.x, this.position.y, this.velocity.x, this.velocity.y, this.width, this.height);
			this.handleCollision(collision);
			
			this.position.addScaled(this.velocity, dt);
			this.x = this.position.x;
			this.y = this.position.y;
			
			this.velocity.scale(0.95);
		};
		
		_engine.camera.follow(player);
		
		var emitter = new ExstoEngine.Display.Emitter({});
		_engine.currentWorld.addObject(emitter);
		
		var tiles = new ExstoEngine.Display.SpriteMap(32, 32, data, _engine.imageRepository.img.Tiles);
		_engine.currentWorld.addObject(tiles);
		
		var nebula = new ExstoEngine.Display.Sprite(0, 0, _engine.imageRepository.img.Nebula);
		nebula.scrollFactorX = nebula.scrollFactorY = 0;
		_engine.currentWorld.addObject(nebula);
	
	
})(window.ExstoEngine);