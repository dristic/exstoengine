ex.using([
    "ex.util.CollisionManager"
], function() {
  ex.define("ex.world.World", {
    
    /**
     * The world object cotains all the relevant game data such as
     * levels, menus, and entities.
     * 
     * @name ex.world.World
     * 
     * @param {ex.display.Renderer} renderer the renderer to call
     *    to render each frame
     * @param {ex.util.CollisionManager} collisionManager the collision
     *    manager to use on the world
     * 
     * @proeprty {ex.display.Renderer} renderer
     * @property {ex.simplex.Map[]} levels all levels in the world
     * @property {Object[]} objects all objects in the current scene
     * @property {Object[]} globalobjects all objects that persist 
     *    between scenes
     * 
     * @constructor
     */
    constructor: function(renderer, collisionManager) {
      this.active = true;
      this.renderer = renderer;
      this.collisionManager = collisionManager;
      this.objects = [];
      this.globalObjects = [];
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
    update: function(dt) {
      if(!this.active) {
        return;
      }
      // update objects
      var i = this.objects.length;
      while(i--) {
        this.objects[i].update(dt);
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
    addObject: function(object) {
      this.objects.push(object);
      
      if(object instanceof ex.display.Renderable || object.items != null) {
        this.renderer.addRenderable(object);
      }
      
      if(this.collisionManager){
        if(object.collides) {
          this.collisionManager.addCollidable(object);
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
      // Remove object from world
      var index = this.objects.length;
      while(index--) {
        if(this.objects[index] === object){
          this.objects.splice(index, 1);
        }
      }
      
      // Remove object from renderer and collisionManager
      if(object instanceof ex.display.Renderable || object.items != null) {
        this.renderer.removeRenderable(object);
      }
      
      if(this.collisionManager){
        if(object.collides) {
          this.collisionManager.removeCollidable(object);
        }
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
        this.removeObject(this.objects[index]);
      }
    },
    
    show: function() {
      var index = this.objects.length;
      while(index--) {
        if(this.objects[index] instanceof ex.display.Renderable 
            || this.objects[index].items != null) {
          this.renderer.addRenderable(this.objects[index]);
        }
      }
      this.active = true;
    },
    
    hide: function() {
      var index = this.objects.length;
      while(index--) {
        if(this.objects[index] instanceof ex.display.Renderable 
            || this.objects[index].items != null) {
          this.renderer.removeRenderable(this.objects[index]);
        }
      }
      this.active = false;
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
      
    }
  });
});