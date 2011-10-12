ex.using([
   'ex.simplex.Entity',
   'ex.display.AnimatedSprite'
], function () {
	ex.define('entity.Player', ex.simplex.Entity, {
		constructor: function (name, position, sprite, collides, input) {
			this._super("constructor", 
					[name, 
					 position, 
					 sprite,
					 collides]);
			this.sprite.createAnimation('Stand', [5]);
			this.sprite.createAnimation('Walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
			this.sprite.play('Walk');
			this.input = input;
			this.speed = 10;
		},
		
		onCollide: function(target, data, dt){

		},
		
		update: function(dt) {
			if(this.input.isKeyPressed(ex.util.Key.Spacebar)) {
				//--Jump
				this.velocity.y -= this.speed * 60;
			}
			if(this.input.isKeyDown(ex.util.Key.W)) {
				//this.velocity.y -= this.speed;
			}
			if(this.input.isKeyDown(ex.util.Key.S)) {
				this.velocity.y += this.speed;
			}
			if(this.input.isKeyDown(ex.util.Key.A)) {
				this.velocity.x -= this.speed;
			}
			if(this.input.isKeyDown(ex.util.Key.D)) {
				this.velocity.x += this.speed;
			}
			
			if(this.velocity.x < 0.5 && this.velocity.x > -0.5){
				this.sprite.play("Stand");
			} else {
				this.sprite.play("Walk");
			}
			
			// Gravity
			this.velocity.y += this.speed;
			
			// Apply the velocity and set the positions for the camera to follow
			this.updatePosition(this.velocity, dt);
			
			// Scale down the velocity
			this.velocity.scale(0.95);
			
			this._super("update", [dt]);
		},
		
		render: function(context, camX, camY){
			this.sprite.render(context, camX, camY);
		}
	});
	
	function getOffset(a, b){	
		return {
			x: a.position.x - b.position.x,
			y: a.position.y - b.position.y };
	};
});