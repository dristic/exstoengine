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
ex.using([ "ex.event.EventTarget" ], function() {
	ex.define("ex.simplex.Entity", ex.event.EventTarget, {

		/**
		 * 
		 * @param $name
		 *            {String}: name of entity (used mostly in IDE)
		 * @param $position
		 *            {ex.base.Point}: original position of entity
		 * @constructor
		 */
		constructor : function($name, $position) {
			this.name = $name;
			this.position = $position;
			this.actions = {};
			this.bindings = {};
		},

		/**
		 * performs actions every time period dt
		 * 
		 * @param $dt
		 *            {Number}: delta time, length of each time cycle
		 */
		update : function($dt) {

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