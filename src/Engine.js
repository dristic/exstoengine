ex.using([
          "ex.base.Component",
          "ex.base.Point",
          "ex.util.Debug",
          "ex.util.AssetManager",
          "ex.util.Input",
          "ex.display.ImageRepository",
          "ex.display.Renderable",
          "ex.util.CollisionManager",
          "ex.display.Camera",
          "ex.display.rendering.Renderer"
          ],
	function () {
  
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame; 
  
  var MAX_FRAME_TIME = 5;
	
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
		constructor: function (width, height, frameRate, bgColor, options) {
			//--Fail if canvas is not supported
			if(!document.createElement("canvas").getContext) {
			  ex.Debug.log("Your browser does not support canvas!");
			  return;
			}
			
			//--Public
			this.frameRate = frameRate || 50;
			this.deltaTime = 1 / this.frameRate;
			this.width = width;
			this.height = height;
			this.fullscreen = false;
			this.fullscreenType = false;
			this.renderingContext = ex.display.rendering.Renderer.CANVAS2D;
			this.renderingParams = {canvas: null};
			
			this.loadingScreen = null;
			this.currentWorld = null;
			
			this.lastTime = (new Date()).getTime();
			this.components = [];
			this.debug = false;
			
			ex.extend(this, options);
			
			//--Load collision manager
			this.collisionManager = new ex.util.CollisionManager();
			
			//--Load new camera
			this.camera = new ex.display.Camera(
					new ex.base.Point(0,0),
					this.width,
					this.height);
			
			//--Load renderer
			this.renderer = new ex.display.rendering.Renderer(this);
			
			// Switch input to focus on the main game element.
			ex.Input.changeInputTarget(this.renderer.getRenderingElement());
			
			if(this.fullscreen) {
        this._setupFullscreenViewport();
      }
			
			//--Setup update interval
			var _gameInterval = setInterval(ex.bind(this, this.update), (1 / frameRate) * 1000);
		},
		
		_setupFullscreenViewport: function() {
		  this._resizeViewport();
		  ex.event.listen('resize', window, ex.bind(this, this._resizeViewport), true);
		},
		
		_resizeViewport: function() {
		  this.renderer._resizeViewport();
		  this.camera.width = this.width;
		  this.camera.height = this.height;
		},
		
		enableDebugging: function(debugType, loggingLevel) {
			this.debug = true;
			ex.Debug.enable(debugType, loggingLevel);
		},
		
		pause: function(world) {
		  var worldToPause = world;
		  if(!world) {
		    worldToPause = this.currentWorld;
		  }
		  
		  if(worldToPause.active) {
		    worldToPause.active = false;
		  }
		},
		
		unpause: function(world) {
		  var worldToUnpause = world;
		  if(!world) {
		    worldToUnpause = this.currentWorld;
		  }
		  
		  if(!worldToUnpause.active) {
		    worldToUnpause.active = true;
		  }
		},
		
		update: function () {
			//--Calculate delta time
			var newTime = (new Date()).getTime();
			var dt = newTime - this.lastTime;
			dt /= 1000;
			var frameTime = dt;
			this.lastTime = newTime;
			
			// Limit frame time to avoid spiral of death.
			if(frameTime > MAX_FRAME_TIME) frameTime = MAX_FRAME_TIME;
			
			while(frameTime > 0) {
			  var deltaTime = Math.min(frameTime, this.deltaTime);
			  this.integrate(deltaTime);
			  frameTime -= this.deltaTime;
			}
			
			this.render(dt);
			
			if(this.debug){
				ex.Debug.benchmarkEngine(dt);
			}	
		},
		
		integrate: function (dt) {
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
      
      this.onUpdate(dt);
      
      ex.Input.update(dt);
      
      //--Step camera
      this.camera.update(dt);
		},
		
		render: function (dt) {
      var that = this;
      //--Step renderer
      if(this.renderer != null) {
        that.renderer.update(dt, that.camera);
        /*requestAnimationFrame(function () {
          
        });*/
      }
		},
		
		onUpdate: function() {
			
		},
		
		openWorld: function(world) {
			if(this.currentWorld != null) {
				this.currentWorld.destroy();
			}
			
			this.currentWorld = new world(this.renderer, this.collisionManager);
		},
		
		loadScene: function(sceneName, callback, world) {
		  if(!world) {
		    world = this.currentWorld;
		  }
			this.unloadScene(world);

      world.addObject(this.loadingScreen);
      
			var that = this;
			var sceneNamespace = "game.levels." + sceneName;
			  
			ex.event.listenOnce('loadStart', ex.Assets._eventHandler, function() {
			  console.log('Began loading assets for scene "' + sceneName + '".');
			}, this);
			
			// Loads level code and assets
			ex.using([sceneNamespace], function() {
				var scene = new game.levels[sceneName](that);
				ex.event.listenOnce('loadEnd', ex.Assets._eventHandler, function() {
					var objects = scene.getObjects();
					console.log(sceneName, objects);
					world.addObjects(objects);
					world.removeObject(that.loadingScreen);

					scene.finalSetup();
					
					if(callback) {
					  callback();
					}
				}, this);
				ex.Assets.loadBulk(scene.getAssets());
			});
		},
		
		unloadScene: function(world) {
		  if(!world) {
		    world = this.currentWorld;
		  }
			world.removeAllObjects();
			
			// Reset camera position
      this.camera.moveTo(0, 0);
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
