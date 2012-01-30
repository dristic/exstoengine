/**
 * Interface for objects that wish to implement collision.
 * 
 * @class ex.util.Collidable
 */
(function() {
	ex.define("ex.physics.Collidable", {
	  constructor: function (type) {
	    this.type = type;
	  },
	  
	  update: function (dt) {
	    // Never should be used, just there for world.
	  },
	  
		integrate: function (dt) {
		  
		},
		
		destroy: function () {
		  
		}
	});
}());