ex.using([
   'ex.world.Entity',
   'ex.display.Sprite'
], function () {
	ex.define('entity.MovingPlatform', ex.world.Entity, {
		constructor: function (name, startPosition, endPosition, speed, sprite) {
			this.startPosition = startPosition;
			this.endPosition = endPosition;
			this.moving = true;
			this._super("constructor", 
					[name,`
					 startPosition,
					 sprite,
					 true,
					 true]);
			
			this.mass = 0;
			this._setupVector(speed);
		},
		
		_setupVector: function(speed){
			// Calculate the vector endPosition - startPosition
			var velocity = this.endPosition.subtract(this.startPosition);
			// Get its magnitude
			var length = velocity.length();
			// Scale the vector by the ration speed / magnitude
			velocity.scale(speed/length);
			// Set the result to the platform's velocity
			this.velocity = velocity;
		},
		
		update: function(dt) {
			if(this.moving){
				// Overrides anchoring
				this.position.addScaled(this.velocity, dt);
			}
			this._super("update", [dt]);
		},
		
		start: function(){
			this.moving = true;
		},
		
		stop: function(){
			this.moving = false;
		}
	});
});