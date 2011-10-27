ex.using([
          "ex.base.Component",
          "ex.util.Input",
          "ex.util.Debug",
          "ex.util.AssetManager",
          "ex.display.ImageRepository",
          "ex.util.CollisionManager",
          "ex.display.Camera",
          "ex.display.Renderer"
          ],
	function () {
	
	ex.define("ex.Engine", {
		/**
		 * The base engine class for loading games and drawing to the canvas
		 * @name ex.Engine
		 * 
		 * @param {Int} width The width of the canvas
		 * @param {Int} height The height of the canvas
		 * @param {Int} frameRate The frame rate of the game
		 * @constructor
		 */
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
				
				//--Load up input class
				this.input = new ex.util.Input();
				
				//--Load new image repository
				this.imageRepository = new ex.display.ImageRepository();
				
				this.collisionManager = new ex.util.CollisionManager();
				
				//--Load new camera
				this.camera = new ex.display.Camera(
						new ex.base.Point(0,0),
						this.width,
						this.height);
				
				//--Setup update interval
				_gameInterval = setInterval(ex.bind(this, this.update), (1 / frameRate) * 1000);
			} else {
				ex.Debug.log("Your browser does not support canvas!");
			}
		},
		
		enableDebugging: function() {
			this.debug = true;
			
			ex.Debug.enable();
		},
		
		setupCanvas: function (bgColor, canvas) {
			this.renderer = new ex.display.Renderer(this.width, this.height, bgColor, canvas);
			
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
			
			//--Step collision manager
			if(this.collisionManager != null) {
				this.collisionManager.update(dt);
			}
			
			//--Step camera
			this.camera.update(dt);
			
			//--Step renderer
			if(this.renderer != null) {
				this.renderer.update(dt, this.camera);
			}
			
			this.onUpdate(dt);
			
			this.input.update(dt);
			
			ex.Debug.benchmarkEngine(dt);
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
			if(component instanceof ex.base.Component == false) {
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
});
