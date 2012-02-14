ex.using([
  'ex.base.Vector'
], function () {
	ex.define("ex.display.Renderable", {
		/**
		 * An interface for objects to use when they need to be
		 * rendered to the screen.
		 * 
		 * @name ex.display.Renderable
		 * @constructor
		 */
		constructor: function(visible, alpha, position, width, height) {
			this.visible = visible;
			this.alpha = alpha;
			position = position || new ex.Vector(0, 0);
			width = width || 0;
			height = height || 0;
			this.position = this.position || position;
			this.width = this.width || width;
			this.height = this.height || height;
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
			if (this.visible && this.alpha > 0.0) {
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
		 * Sets visible property to true, does not affect alpha.
		 * 
		 * @function
		 * @name show
		 * @memberOf ex.display.Renderable
		 */
		show : function() {
			this.visible = true;
		},

		/**
		 * Sets visible property to false, does not affect alpha.
		 * 
		 * @function
		 * @name hide
		 * @memberOf ex.display.Renderable
		 */
		hide : function() {
			this.visible = false;
		},
		
		containsPoint: function (x, y) {
		  if(x < (this.position.x + this.width) &&
		     x > this.position.x &&
		     y < (this.position.y + this.height) &&
		     y > this.position.y) {
		    return true;
		  } else {
		    return false;
		  }
		},
		
		update: function(dt) {
			
		},
		
		destroy: function () {
		  
		}
	});
});