(function () {
	
	// Globals
	var socket = io.connect('http://localhost:8080');
	socket.emit('login', { username: 'Dan' });
	socket.emit('createRoom', { name: 'DansRoom' });
	
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
	});
	
})();