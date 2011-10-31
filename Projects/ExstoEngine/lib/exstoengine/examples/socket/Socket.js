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
          "ex.world.Map",
          "ex.world.Layer",
          
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
		ex.Assets.load('WoodBlock', '../assets/world/Wood%20Block.png');
		
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
		
		// Add wood floor
		var data = [
		 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	 	];
		
		var floor = new ex.display.SpriteMap(
				101,
				171,
				data,
				ex.Assets.getImage('WoodBlock'),
				'Floor');
		
		// Collision data
		var collision = new ex.world.CollisionMap(
				101,
				171,
				data);
		
		_engine.camera.follow(player);
		
		// Setup map
		var map = new ex.world.Map('Level');
		var layer = new ex.world.Layer('Layer1', collision, new ex.base.Vector(0, 0), new ex.base.Vector(1, 1));
		map.addLayer(layer);
		
		layer.addItem(player);
		layer.addItem(floor);
		
		_engine.currentWorld.addLevel(map);
		_engine.currentWorld.loadLevel('Level');
		
		_engine.collisionManager.setActiveLevel(map);
		
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