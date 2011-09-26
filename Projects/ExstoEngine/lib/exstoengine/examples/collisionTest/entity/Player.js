ex.using([
   'ex.display.AnimatedSprite'
], function () {
	ex.define('entity.Player', ex.display.AnimatedSprite, {
		constructor: function (image, input) {
			this._super('constructor', [50, 150, 41, 47, 7, image]);
			this.createAnimation('Stand', [5]);
			this.createAnimation('Walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
			this.play('Walk');
			this.input = input;
			this.speed = 10;
		},
		
		onUpdate: function(dt) {
			if(this.input.isKeyPressed(ex.util.Key.Spacebar)) {
				//--Jump
				this.velocity.y -= this.speed * 75;
			}
			if(this.input.isKeyDown(ex.util.Key.S)) {
				//--Crouch
				this.velocity.y += this.speed;
			}
			if(this.input.isKeyDown(ex.util.Key.A)) {
				this.velocity.x -= this.speed;
			}
			if(this.input.isKeyDown(ex.util.Key.D)) {
				this.velocity.x += this.speed;
			}
			if(this.input.isKeyPressed(ex.util.Key.J)) {
				laser.play();
			}
			
			if(this.velocity.x < 0.5 && this.velocity.x > -0.5){
				this.play("Stand");
			} else {
				this.play("Walk");
			}
			
			// Gravity
			this.velocity.y += this.speed;
			
			// Apply the velocity and set the positions for the camera to follow
			this.position.addScaled(this.velocity, dt);
			
			this.x = this.position.x;
			this.y = this.position.y;
			
			// Scale down the velocity
			this.velocity.scale(0.95);
		}
	});
});