ex.using([
   'ex.event.EventTarget'
], function () {
  ex.define("ex.world.Entity", ex.event.EventTarget, {

    /**
     * The base class for all interactive game objects such as players,
     * NPCs, and triggers.
     * 
     * @name ex.world.Entity
     * 
     * @param {String} name name of entity (used mostly in IDE)
     * @param {ex.base.Vector} position original position of entity
     * @param {ex.base.Sprite} sprite display object
     * @param {Boolean} collides whether collision should be added
     *    to the entity.
     * 
     * @property {String} name
     * @property {String} type
     *    Internal use only! Do not change!
     * @property {ex.base.Vector} position
     * @property {ex.base.Vector} velocity
     * @property {Number} width
     * @property {Number} height
     * @property {Boolean} collides
     * @property {Boolean} anchored if true, entity will be unable to move
     * @property {Number} mass used in physics engine
     * @property {ex.display.Sprite} sprite
     * @constructor
     */
    constructor : function(name, position, width, height, sprite, collides, anchored) {
      this._super('constructor', []);
      
      // Referencing data
      this.name = name;
      this.type = "Entity";
      
      // Physical data
      this.position = position;
      this.scrollFactor = new ex.base.Vector(1,1);
      this.width = width;
      this.height = height;
      this.velocity = new ex.base.Vector(0,0);
      this.collides = collides;
      this.anchored = anchored;
      this.mass = 1;
      this.elasticity = 0;
      
      // Display data
      this.sprite = sprite;
      this.sprite.scrollFactor = this.scrollFactor; // pointer to this.scrollFactor
      this.sprite.position = this.position; // pointer to this.position
      this.visible = true;
      this.items = [this.sprite];
    },

    /**
     * performs actions every time period dt
     * 
     * @function
     * @name update
     * @memberOf ex.world.Entity
     * 
     * @param {Number} dt delta time, length of each time cycle
     */
    update : function(dt) {
      this.sprite.update(dt);
      if(!this.anchored){
        this.updatePosition(this.velocity, dt);
      }
    },
    
    /**
     * Adds a time scaled vector to the entity's position.
     * This must be used to update the entity's position or the entity will
     * become out of sync with its sprite.
     * 
     * If you want to set the absolute position, see setPosition(newX, newY)
     * @see ex.world.Entity.setPosition
     * 
     * @function
     * @name updatePosition
     * @memberOf ex.world.Entity
     * 
     * @param {ex.base.Vector} vector
     * @param {Number} dt
     */
    updatePosition: function(vector, dt) {
      if(!this.anchored){
        this.position.addScaled(vector, dt);
      }
    },  
    
    /**
     * Sets the absolute position of the entity with x,y values.
     * 
     * @function
     * @name setPosition
     * @memberOf ex.world.Entity
     * 
     * @param {Number} newX
     * @param {Number} newY
     */
    setPosition: function(newX, newY) {
      if(!this.anchored){
        this.position.x = newX;
        this.position.y = newY;
      }
    },
    
    /**
     * Called every time a collision is found with the entity.
     * 
     * @function
     * @name onCollide
     * @memberOf ex.world.Entity
     * 
     * @param {Entity} target the collision target
     */
    onCollide: function(target, data) {
      
    },
    
    destroy: function () {
      delete this.position;
      delete this.scrollFactor;
      delete this.velocity;
      delete this.sprite;
      delete this.items;
    }
  });
});