(function() {
	ex.define("ex.display.Renderable", {
		/**
		 * An interface for objects to use when they need to be
		 * rendered to the screen.
		 * 
		 * @name ex.display.Renderable
		 * @constructor
		 */
		constructor: function(visible, opacity) {
			this.visible = visible;
			this.opacity = opacity;
		},
		
		/**
		 * Checks properties and determines if renderable is visible
		 * 
		 * @function
		 * @name isVisible
		 * @memberOf ex.display.Renderable
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
		 * Toggles visibility of the renderable.
		 * 
		 * @function
		 * @name toggleVisibility
		 * @memberOf ex.display.Renderable
		 */
		toggleVisibility : function() {
			if (this.visible)
				this.hide();
			else
				this.show();
		},

		/**
		 * Sets visible property to true, does not affect opacity.
		 * 
		 * @function
		 * @name show
		 * @memberOf ex.display.Renderable
		 */
		show : function() {
			this.visible = true;
		},

		/**
		 * Sets visible property to false, does not affect opacity.
		 * 
		 * @function
		 * @name hide
		 * @memberOf ex.display.Renderable
		 */
		hide : function() {
			this.visible = false;
		},
		
		update: function(dt) {
			
		},
		
		render2dCanvas: function(context, camX, camY) {
			
		}
	});
}());
