ex.using([ 
    "ex.event.EventTarget"
], function() {
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
		 * 		to the entity.
		 * 
		 * @property {String} name
		 * @property {String} type
		 * 		Internal use only! Do not change!
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
		constructor : function(name, position, sprite, collides, anchored) {
			// Referencing data
			this.name = name;
			this.type = "Entity";
			// Physical data
			this.position = position;
			this.width = sprite.width;
			this.height = sprite.height;
			this.velocity = new ex.base.Vector(0,0);
			this.collides = collides;
			this.anchored = anchored;
			this.mass = 1;
			// Display data
			this.sprite = sprite;
			this.sprite.position = this.position;	// pointer to this.position
			
			if(sprite.width == 0 && sprite.height == 0) {
				ex.event.listen(sprite.img, 'load', function () {
					this.width = sprite.width;
					this.height = sprite.height;
            	}, this);
			}
			
			this._super('constructor', []);
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
			this.dispatchEvent(target.name, data);
		},

		/**
		 * Checks properties and determines if entity is visible.
		 * 
		 * @function
		 * @name isVisible
		 * @memberOf ex.world.Entity
		 * 
		 * @returns {Boolean}
		 */
		isVisible : function() {
			return this.visible;
		},

		/**
		 * Supplies a canvas context and camera offset to each item and calls
		 * their render functions
		 * 
		 * @param {Context} context canvas context to draw with
		 * @param {Number} camX camera offset on x
		 * @param {Number} camY camera offset on y
		 */
		render : function(context, camX, camY) {
			if (!this.isVisible()) // Don't render if it won't be seen
				return;

			// Render code
		}
	});
});