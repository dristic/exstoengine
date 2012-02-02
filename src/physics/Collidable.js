/**
 * Interface for objects that wish to implement collision.
 * 
 * @class ex.util.Collidable
 */
(function() {
	ex.define("ex.physics.Collidable", {
	  constructor: function (type, data) {
	    this.type = type;
	    this.data = data;
	  },
	  
	  update: function (dt) {
	    // Never should be used, just there for world.
	  },
	  
		integrate: function (dt) {
		  
		},
		
		onCollide: function (target, data, dt) {
		  
		},
		
		destroy: function () {
		  
		}
	});
}());