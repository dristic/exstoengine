ex.using([
  'ex.base.WorldComponent',
  'ex.event.EventTarget'
], function() {
  ex.define("ex.world.World", ex.event.EventTarget, {
    
    /**
     * The world object contains all the relevant game data such as
     * levels, menus, and entities.
     * 
     * @name ex.world.World
     * 
     * @param {ex.display.Renderer} renderer the renderer to call
     *    to render each frame
     * @param {ex.util.CollisionManager} collisionManager the collision
     *    manager to use on the world
     * 
     * @property {ex.display.Renderer} renderer
     * @property {ex.simplex.Map[]} levels all levels in the world
     * @property {Object[]} objects all objects in the current scene
     * @property {Object[]} globalobjects all objects that persist 
     *    between scenes
     * 
     * @constructor
     */
    constructor: function(name, renderer, options) {
      this.name = name;
      this.active = true;
      this.renderer = renderer;
      this.components = [];
      this.objects = [];
      this.globalObjects = [];
      this.objectsToRemove = [];
      
      this.options = options;
      this.options.componentConfig = this.options.componentConfig || [];
      
      var i = 0,
          ln = options.components.length,
          component;
      for(; i != ln; i++) {
        component = new options.components[i](this.renderer, this.options.componentConfig[i]);
        if(component instanceof ex.base.WorldComponent) {
          this.components.push(component);
        } else {
          ex.Debug.log('Component must be an instance of ex.base.WorldComponent: ' + component, 'ERROR');
        }
      }
      
      this._super('constructor');
    },
    
    /**
     * Updates all levels and objects.
     * 
     * @function
     * @name update
     * @memberOf ex.world.World
     * 
     * @param {Number} dt timestep
     */
    update: function (dt) {
      if(this.active == false) {
        return;
      }
      
      // Remove old objects
      var n = this.objectsToRemove.length;
      while(n--) {
        this._removeObject(this.objectsToRemove.pop());
      }
      
      // update objects
      var i = 0,
          ln = this.objects.length;
      for(; i != ln; i++) {
        this.objects[i].update(dt);
      }
      
      //--Step components
      i = 0;
      ln = this.components.length;
      for(; i != ln; i++) {
        this.components[i].update(dt);
      }
    },
    
    /**
     * Called after the engine has drawn the game to the screen
     * for any debug drawing of entities, collision objects,
     * triggers, etc.
     */
    debug: function (dt, camera) {
      i = 0;
      ln = this.components.length;
      for(; i != ln; i++) {
        this.components[i].debug(dt, camera);
      }
    },
    
    /**
     * Adds an object to the world by direct reference.
     * 
     * @function
     * @name addObject
     * @memberOf ex.world.World
     * 
     * @param {Object} object
     */
    addObject: function(object, recursive) {
      if(!recursive) {
        this.objects.push(object);
      }
      
      if(object instanceof ex.display.Renderable) {
        this.renderer.addRenderable(object);
      }
      
      var i = 0,
          ln = this.components.length;
      for(; i != ln; i++) {
        this.components[i].addObject(object);
      }
      
      if(object.items) {
        i = 0;
        ln = object.items.length;
        for(; i != ln; i++) {
          this.addObject(object.items[i], true);
        }
      }
    },
    
    /**
     * Adds a list of objects to the world using the addObject function
     * on each item in the list.
     * 
     * @function
     * @name addObjects
     * @memberOf ex.world.World
     * 
     * @param {Object[]} objects
     */
    addObjects: function(objects) {
      var index = objects.length;
      while(index--){
        this.addObject(objects[index]);
      }
    },
    
    /**
     * Removes an object from the world by direct reference.
     * 
     * @function
     * @name removeObject
     * @memberOf ex.world.World
     * 
     * @param {Object} object
     */
    removeObject: function(object) {
      // Tag the object for removal on the next update loop.
      this.objectsToRemove.push(object);
    },
    
    _removeObject: function (object, recursive) {
      if(!recursive) ex.Array.remove(this.objects, object);
      
      // Remove object from renderer and collisionManager
      if(object instanceof ex.display.Renderable) {
        this.renderer.removeRenderable(object);
      }
      
      var i = 0,
          ln = this.components.length;
      for(; i != ln; i++) {
        this.components[i].removeObject(object);
      }
      
      if(object.items) {
        i = 0;
        ln = object.items.length;
        for(; i != ln; i++) {
          this._removeObject(object.items[i], true);
        }
      }
      
      if(object.destroy) {
        object.destroy();
      }
    },
    
    /**
     * Removes all objects from the world. Generally only called
     * during scene desctruction.
     * 
     * @function
     * @name removeAllObjects
     * @memberOf ex.world.World
     * 
     */
    removeAllObjects: function() {
      var index = this.objects.length;
      while(index--) {
        this._removeObject(this.objects[index]);
      }
    },
    
    show: function() {
      var that = this;
      
      function addRenderable(object) {
        if(object instanceof ex.display.Renderable) {
          that.renderer.addRenderable(object);
        }
        
        if(object.items) {
          ex.Array.each(object.items, addRenderable);
        }
      }
      
      ex.Array.each(this.objects, addRenderable);
      
      this.hidden = false;
      
      this.dispatchEvent('show');
    },
    
    hide: function() {
      var that = this;
      
      function removeRenderable(object) {
        if(object instanceof ex.display.Renderable) {
          that.renderer.removeRenderable(object);
        }
        
        if(object.items) {
          ex.Array.each(object.items, removeRenderable);
        }
      }
      
      ex.Array.each(this.objects, removeRenderable);
      
      this.hidden = true;
      
      this.dispatchEvent('hide');
    },
    
    pause: function () {
      this.active = false;
      
      this.dispatchEvent('pause');
    },
    
    unpause: function () {
      this.active = true;
      
      this.dispatchEvent('unpause');
    },
    
    getObject: function(name) {
      var index = this.objects.length;
      while(index--){
        if(this.objects[index].name === name){
          return this.objects[index];
        }
      }
      return null;
    },
    
    destroy: function() {
      var i = 0,
          ln = this.components.length;
      for(; i != ln; i++) {
        this.components[i].destroy();
      }
      
      this.active = false;
      this.removeAllObjects();
      delete this.renderer;
      delete this.objects;
      delete this.globalObjects;
      delete this.objectsToRemove;
    }
  });
});