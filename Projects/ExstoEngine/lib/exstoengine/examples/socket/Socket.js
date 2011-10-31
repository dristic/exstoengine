var client;

window.login = function (data, callback, scope) {
	ex.using([
	      "ex.novus.NovusClient"
	  ], function () {
		client = new ex.novus.NovusClient('http://localhost:8080');
		client.login(data.name, data.password, function (success) {
			if(success == true) {
				client.createRoom('Awesome Room');
				client.createRoom('Awesome Room2');
				client.createRoom('Awesome Room3');
				
				client.roomList(function (list) {
					ex.bind(scope, callback)(list);
				});
			}
		});
	});
};

window.joinRoom = function (name, callback, scope) {
	client.joinRoom(name, function (data) {
		if(data.success == true) {
			ex.bind(scope, callback)();
		}
	});
};

window.startGame = function (canvas) {
	ex.using([
          "ex.Engine",
          "ex.display.AnimatedSprite",
          "ex.world.World",
          "ex.world.CollisionMap",
          "ex.display.SpriteMap",
          "ex.display.Emitter",
          "ex.plugins.Emitter2",
          "ex.sound.Sound",
          
          "game.entities.Player"
          	], 
  	function () {
		//--Startup new engine
		var _engine = new ex.Engine(800, 500, 40);
		
		//--Setup rendering
		_engine.setupCanvas("#000000", canvas);
		_engine.enableDebugging();
		
		//--Setup input
		_engine.input.listenOn(_engine.renderer.canvas);
		
		// Assets
		ex.Assets.load('Player', '../assets/units/Character%20Boy.png');
		
		//--Open base world
		_engine.openWorld(ex.world.World);
		
		// Add player
		var player = new game.entities.Player(
				"Player", 
				new ex.base.Vector(0, 0), 
				new ex.display.Sprite(
						new ex.base.Vector(0, 0),
						ex.Assets.getImage("Player")), 
				true, 
				_engine.input);
		
		_engine.currentWorld.addObject(player);
		_engine.renderer.renderables.push(player.sprite);
		
		_engine.camera.follow(player);
		
		_engine.onUpdate = function () {
			if(_engine.input.isKeyDown(ex.util.Key.Spacebar)) {
				client.messageTo('Dan', 'test', {});
			}
		};
		
		client.on('test', function (data) {
			console.log('works');
		});
	});
};