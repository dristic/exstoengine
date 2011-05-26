(function() {
	
	function bind(func, object) {
		return function() {
			return func.apply(object, arguments);
		};
	};
	
	/**
	 * The base engine class for loading games and drawing to the canvas
	 * 
	 * @param width: The width of the canvas
	 * @param height: The height of the canvas
	 * @param frameRate: The frame rate of the game
	 */
	var Engine = new ExstoEngine.Base.Class(null, {
		constructor: function (width, height, frameRate) {
			//--Check for canvas support
			if(document.createElement("canvas").getContext) {
				//--Public
				this.frameRate = frameRate || 50;
				this.width = width;
				this.height = height;
				this.currentWorld = null;
				this.lastTime = (new Date()).getTime();
				this.components = [];
				this.debug = false;
				
				var _gameInterval = null;
				
				//--Load logger
				this.logger = new ExstoEngine.Util.Logger();
				
				//--Load up input class
				this.input = new ExstoEngine.Util.Input();
				
				//--Load new image repository
				this.imageRepository = new ExstoEngine.Display.ImageRepository();
				
				//--Load new camera
				this.camera = new ExstoEngine.Display.Camera();
				
				//--Setup update interval
				_gameInterval = setInterval(bind(this.update, this), (1 / frameRate) * 1000);
			} else {
				this.logger = new ExstoEngine.Util.Logger();
				
				this.logger.log("Your browser does not support canvas!");
			}
		},
		
		enableDebugging: function() {
			this.debug = true;
			
			this.loadComponent(new ExstoEngine.Util.Debug());
			
			this.getComponent("Debug").renderer = this.renderer;
			this.getComponent("Debug").logger = this.logger;
		},
		
		setupCanvas: function (bgColor, canvas) {
			this.renderer = new ExstoEngine.Display.Renderer(this.width, this.height, bgColor, canvas);
			
			this.camera.canvas = canvas || this.renderer.canvas;
		},
		
		update: function () {
			//--Calculate delta time
			var newTime = (new Date()).getTime();
			var dt = newTime - this.lastTime;
			dt /= 1000;
			this.lastTime = newTime;
			
			//--Step components
			var i = this.components.length;
			while(i--) {
				this.components[i].update(dt);
			}
			
			//--Step world
			if(this.currentWorld != null) {
				this.currentWorld.update(dt);
			}
			
			//--Step camera
			this.camera.update(dt);
			
			//--Step renderer
			if(this.renderer != null) {
				this.renderer.update(dt, this.camera.x, this.camera.y);
			}
			
			this.onUpdate();
			
			this.input.update(dt);
		},
		
		onUpdate: function() {
			
		},
		
		openWorld: function(world) {
			if(this.currentWorld != null) {
				this.currentWorld.destroy();
			}
			
			this.currentWorld = new world(this.renderer);
		},
		
		loadComponent: function(component) {
			if(component instanceof ExstoEngine.Base.Component == false) {
				this.logger.log("Component must be an instance of ExstoEngine.Base.Component!");
			} else {
				this.components.push(component);
			}
		},
		
		getComponent: function(name) {
			var i = this.components.length;
			while(i--) {
				if(this.components[i].name == name) {
					return this.components[i];
				}
			}
		}
	});
	
	//--Show class
	window.ExstoEngine.Base.Engine = Engine;
}());
