/**
 * 
 * @class ex.simplex.Entity
 * @param name
 *            {String}: name of entity
 * @param position
 *            {ex.base.Point}: position of entity
 * @param actions
 *            {Object}: contains properties that perform actions
 * @param bindings
 *            {Object}: associative array that binds inputs to actions
 */
ex.using([ 
    "ex.event.EventTarget"
], function() {
	ex.define("ex.simplex.Entity", ex.event.EventTarget, {

		/**
		 * 
		 * @param name
		 *            {String}: name of entity (used mostly in IDE)
		 * @param position
		 *            {ex.base.Point}: original position of entity
		 * @constructor
		 */
		constructor : function(name, position, sprite, collides) {
			// Referencing data
			this.name = name;
			this.type = "Entity";
			// Physical data
			this.position = position;
			this.width = sprite.width;
			this.height = sprite.height;
			this.velocity = new ex.base.Vector(0,0);
			this.collides = collides;
			// Display data
			this.sprite = sprite;
			this.sprite.position = this.position;	// pointer to this.position
			
			if(sprite.width == 0 && sprite.height == 0) {
				ex.event.listen(sprite.img, 'load', function () {
					this.width = sprite.width;
					this.height = sprite.height;
            	}, this);
			}
		},

		/**
		 * performs actions every time period dt
		 * 
		 * @param dt
		 *            {Number}: delta time, length of each time cycle
		 */
		update : function(dt) {
			this.updatePosition(this.velocity, dt);
			this.sprite.update(dt);
		},
		
		/**
		 * Adds a time scaled vector to the entity's position.
		 * This must be used to update the entity's position or the entity will
		 * become out of sync with its sprite.
		 * 
		 * If you want to set the absolute position, see setPosition(newX, newY)
		 * 
		 * @see ex.simplex.Entity.setPosition
		 * 
		 * @param {ex.base.Vector} vector
		 * @param {Number} dt
		 */
		updatePosition: function(vector, dt) {
			this.position.addScaled(vector, dt);
		},
		
		/**
		 * Sets the absolute position of the entity with x,y values.
		 * 
		 * @param newX
		 * @param newY
		 */
		setPosition: function(newX, newY) {
			this.position.x = newX;
			this.position.y = newY;
		},
		
		onCollide: function(target) {
			
		},

		/**
		 * checks properties and determines if layer is visible
		 * 
		 * @returns {Boolean}
		 */
		isVisible : function() {
			if (this.visible && this.opacity > 0.0) {
				return true;
			} else {
				return false;
			}
		},

		/**
		 * Supplies a canvas context and camera offset to each item and calls
		 * their render functions
		 * 
		 * @param $context
		 *            {Context}: canvas context to draw with
		 * @param $camX
		 *            {Number}: camera offset on x
		 * @param $camY
		 *            {Number}: camera offset on y
		 */
		render : function($context, $camX, $camY) {
			if (!this.isVisible()) // Don't render if it won't be seen
				return;

			// Render code
		}
	});
});