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
	    
	    // Set both group and colliding groups to all (1 1 1 1)
	    this.collisionBit = ~0;
	    this.collisionBitMask = ~0;
	  },
	  
	  setCollisionGroup: function (group) {
	    // If null is passed, set to all (1 1 1 1)
	    // Else bit shift 1 by the group
	    this.collisionBit = ex.isNull(group) ? ~0 : (1 << group);
	  },
	  
	  setCollidableGroups: function (groups) {
	    this.collisionBitMask = 0;
	    
	    // Start with 0 0 0 0 and OR each bit shifted group into the bit mask.
	    var i = 0,
	        ln = groups.length;
	    for(; i != ln; i++) {
	      this.collisionBitMask = this.collisionBitMask | (1 << groups[i]);
	    }
	  },
	  
	  setAllCollidableGroups: function () {
	    this.collisionMaskBit = ~0;
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