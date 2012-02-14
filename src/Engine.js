ex.using([
  "ex.base.Component",
  "ex.base.Point",
  "ex.util.Debug",
  "ex.util.AssetManager",
  "ex.util.Input",
  "ex.display.ImageRepository",
  "ex.display.Renderable",
  "ex.display.Camera",
  "ex.display.rendering.Renderer",
  "ex.world.World"
], function () {
  
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
		constructor: function (options) {
			//--Fail if canvas is not supported
			if(!document.createElement("canvas").getContext) {
			  ex.Debug.log("Your browser does not support canvas!");
			  return;
			}
			
			this.defaults = {
		    rendering: {
		      width: 500,
		      height: 500,
		      frameRate: 60,
		      bgColor: '#000',
		      fullscreen: false,
		      fullscreenType: 'resize',
		      context: ex.display.rendering.Renderer.CANVAS2D,
		      params: { canvas: null }
		    },
		    loadingScreen: null,
		    debug: {
		      enabled: false,
		      type: ex.Debug.DOM,
		      level: ex.util.Logger.LEVEL.ALL
		    },
		    components: [],
			  world: {
			    components: []
			  }  
			};
			
			this.options = ex.extend({}, this.defaults, true);
			ex.extend(this.options, options, true);
			
			//--Public
			this.deltaTime = 1 / this.options.rendering.frameRate;
			this.currentWorld = null;
			this.worlds = [];
			this.worldsToRemove = [];
			this.lastTime = (new Date()).getTime();
			
			// Debugging
			if(this.options.debug.enabled) {
			  this.enableDebugging(this.options.debug.type, this.options.debug.level);
			}
			
			// Components
			this.components = [];
			var i = 0,
			    ln = this.options.components.length;
			for(; i != ln; i++) {
			  this.loadComponent(new this.options.components[i]());
			}
			
			//--Load new camera
			this.camera = new ex.display.Camera(
					new ex.base.Point(0,0),
					this.options.rendering.width,
					this.options.rendering.height);
			
			//--Load renderer
			this.renderer = new ex.display.rendering.Renderer(this.options.rendering);
			
			// Switch input to focus on the main game element.
			ex.Input.changeInputTarget(this.renderer.getRenderingElement());
			
			if(this.fullscreen) {
        this._setupFullscreenViewport();
      }
			
			//--Setup update interval
			var _gameInterval = setInterval(ex.bind(this, this.update), (1 / this.options.rendering.frameRate) * 1000);
		},
		
		_setupFullscreenViewport: function() {
		  this._resizeViewport();
		  ex.event.listen('resize', window, ex.bind(this, this._resizeViewport), true);
		},
		
		_resizeViewport: function() {
		  this.renderer._resizeViewport();
		  this.camera.width = this.renderer.width;
		  this.camera.height = this.renderer.height;
		},
		
		enableDebugging: function(debugType, loggingLevel) {
			this.options.debug = true;
			ex.Debug.enable(debugType, loggingLevel);
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
		  // Garbage collect old worlds for stability.
		  var i = 0,
		      ln = this.worldsToRemove.length;
		  for(; i < ln; i++) {
		    this._removeWorld(this.worldsToRemove.pop());
		  }
		  
		  //--Step components
      i = this.components.length;
      while(i--) {
        this.components[i].update(dt);
      }
      
      //--Step world 
      i = 0;
      ln = this.worlds.length;
      for(; i < ln; i++) {
        this.worlds[i].update(dt);
      }
      
      ex.Input.update(dt);
      
      if(this.onUpdate) {
        this.onUpdate(dt);
      }
		},
		
		render: function (dt) {
      var that = this;
      
      ex.Debug.time('render');
      
      //--Step camera
      this.camera.update(dt);
      
      //--Step renderer
      if(this.renderer != null) {
        that.renderer.update(dt, that.camera);
        
        // Use request animation frame to vsync drawing calls.
        /*requestAnimationFrame(function () {
          
        });*/
      }
      
      ex.Debug.time('render');
      
      var i = 0,
          ln = this.worlds.length;
      for(; i < ln; i++) {
        this.worlds[i].debug(dt, this.camera);
      }
		},
		
		onUpdate: function() {
			
		},
		
		addWorld: function (name, scene, setToCurrentWorld, sceneCallback) {
		  // Default values
		  name = name || "DefaultWorldName";
		  if(!setToCurrentWorld && setToCurrentWorld != false) setToCurrentWorld = true;
		  
		  var world = new ex.world.World(name, this.renderer, this.options.world);
		  
		  // Check for removing current world.
		  if(setToCurrentWorld == true) {
		    if(this.currentWorld) {
		      this.removeWorld(this.currentWorld);
		    }
		    this.currentWorld = world;
		    
		    // Reset camera position
	      this.camera.reset();
		  }
		  
		  // Check for loading a scene into the world.
		  if(scene) {
		    this.loadScene(scene, world, sceneCallback);
		  }
		  
		  this.worlds.push(world);
		  
		  return world;
		},
		
		getWorld: function (name) {
		  return ex.Array.find(this.worlds, function (world) {
		    if(world.name == name) return true;
		  });
		},
		
		removeWorld: function (world) {
		  // Safe remove world in case we are removing the world on an update function.
		  this.worldsToRemove.push(world);
		},
		
		_removeWorld: function (world) {
		  if(this.currentWorld == world) {
		    this.currentWorld = null;
		  }
		  
		  ex.Array.remove(this.worlds, world);
		  
		  world.destroy();
		},
		
		/**
		 * Loads assets for multiple scenes silently (no loading screen)
		 */
		preloadScenes: function(sceneNames) {
		  if(!ex.isArray(sceneNames)) {
		    ex.Debug.log("Cannot preload scenes because argument is not an array", 'ERROR');
		  }
		  
		  var index = sceneNames.length;
		  while(index--) {
		    this.preloadScene(sceneNames[index]);
		  }
		},
		
		/**
		 * Loads assets for a scene silently (no loading screen)
		 */
		preloadScene: function(sceneName) {
		  if(game.levels[sceneName] && game.levels[sceneName].assetsLoaded) {
		    ex.Debug.log('Preloading scene "' + sceneName + '": already preloaded, skipped.', 'INFO');
		  } else {
		    ex.Debug.log('Preloading scene "' + sceneName + '"...', 'INFO');
		    ex.event.listenOnce('loadEnd', ex.Assets._eventHandler, function() {
		      ex.Debug.log('Preloading scene "' + sceneName + '" complete.', 'INFO');
		    });
		    this._loadSceneAssets(sceneName);
		  }
		},
		
		/**
		 * Wrapper function for scene loading, will load assets before code
		 * if assets have not already been preloaded.
		 */
		loadScene: function(sceneName, world, callback) {
		  var that = this;
		  //this.options.loadingScreen.reset();
      world.addObject(this.options.loadingScreen);
      
      // Load assets if not already loaded
			if(!game.levels[sceneName] || !game.levels[sceneName].assetsLoaded) {
			  ex.event.listenOnce('loadStart', ex.Assets._eventHandler, function() {
			    ex.Debug.log('Loading assets for scene "' + sceneName + '"...', 'INFO');
			  });
			  ex.event.listenOnce('loadEnd', ex.Assets._eventHandler, function() {
          ex.Debug.log('Loading assets for scene "' + sceneName + '" complete.', 'INFO');
			    world.removeObject(that.options.loadingScreen);
          ex.Debug.log('Loading objects for scene "' + sceneName + '"...', 'INFO');
		      that._loadScene(sceneName, world, callback);
		      ex.Debug.log('Loading objects for scene "' + sceneName + '" complete.', 'INFO');
			  });
			  this._loadSceneAssets(sceneName);
			} else {
			  world.removeObject(this.options.loadingScreen);
			  ex.Debug.log('Loading objects for scene "' + sceneName + '"...', 'INFO');
	      this._loadScene(sceneName, world, callback);
	      ex.Debug.log('Loading objects for scene "' + sceneName + '" complete.', 'INFO');
			}
		},
		
		/**
		 * Loads scene assets
		 */
		_loadSceneAssets: function(sceneName) {
		  var that = this;
      var sceneNamespace = "game.levels." + sceneName;
      
      ex.using([sceneNamespace], function() {
        ex.event.listenOnce('loadEnd', ex.Assets._eventHandler, function() {
          game.levels[sceneName].assetsLoaded = true;
        });
        var scene = new game.levels[sceneName]();
        ex.Assets.loadBulk(scene.getAssets());
      });
		},
		
		/**
		 * Loads scene code
		 */
		_loadScene: function(sceneName, world, callback) {
		  var that = this;
      var sceneNamespace = "game.levels." + sceneName;
      
      ex.using([sceneNamespace], function() {
        var scene = new game.levels[sceneName](that, world);
        var objects = scene.getObjects();
          
        world.addObjects(objects);
        scene.finalSetup();
          
        if(callback) {
          callback(world);
        }
      });
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
		},
			
		unloadComponent: function (component) {
		  this.components.splice(this.components.indexOf(component), 1);
		}
	});
});
