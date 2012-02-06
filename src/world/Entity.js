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
     * 
     * @constructor
     */
    constructor : function (name, items) {
      this._super('constructor', []);
      
      // Referencing data
      this.name = name;
      this.type = "Entity";
      
      this.items = items || [];
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
    update : function (dt) {
      
    },
    
    destroy: function () {
      delete this.items;
    }
  });
});