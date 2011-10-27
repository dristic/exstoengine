var client;

window.login = function (data) {
	ex.using([
	      "ex.novus.NovusClient"
	  ], function () {
		client = new ex.novus.NovusClient('http://localhost:8080');
		client.login(data.username, data.password, function (success) {
			if(success == true) {
				client.createRoom('Awesome Room');
				client.createRoom('Awesome Room2');
				client.createRoom('Awesome Room3');
				
				var viewport = Ext.getCmp('viewport');
				viewport.removeAll();
				viewport.add(Ext.create('exsocket.RoomList'));
				
				client.roomList(function (list) {
					var store = Ext.data.StoreManager.lookup('roomStore');
					store.loadData(list);
				});
			}
		});
	});
};

function startGame() {
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
		//--Startup new engine
		var _engine = new ex.Engine(800, 500, 40);
		
		//--Setup rendering
		_engine.setupCanvas("#000000");
		_engine.enableDebugging();
		
		//--Setup input
		_engine.input.listenOn(_engine.renderer.canvas);
		
		//--Open base world
		_engine.openWorld(ex.world.World);
		
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