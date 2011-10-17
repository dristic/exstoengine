
(function() {
	ex.define("ex.base.Component", {
		/**
		 * Interface for engine components.
		 * @name ex.base.Component
		 * @constructor
		 */
		constructor: function() {
			
		},
		
		/**
		 * Update loop
		 * @function
		 * @name update
		 * @memberOf ex.base.Component
		 * @param {Number} dt timestep between frames
		 */
		update: function(dt) {
			
		},
		
		/**
		 * Component name
		 * @name name
		 * @memberOf ex.base.Component
		 */
		name: "Component"
	});
}());
