ex.using([
   'ex.world.Entity',
   'ex.display.Sprite'
], function () {
	ex.define('entity.Paddle', ex.world.Entity, {
		constructor: function (name, position, sprite, collides, input) {
			this._super("constructor", 
					[name, 
					 position, 
					 sprite,
					 collides]);
			this.input = input;
			this.speed = 10;
		},
		
		onCollide: function(target, data){
			if(target.name == "Ball"){

			} else if (target.type == "SpriteMap") {

			}
		},
		
		update: function(dt) {
			if(this.input.isKeyDown(ex.util.Key.A)) {
				this.velocity.x -= this.speed;
			}
			if(this.input.isKeyDown(ex.util.Key.D)) {
				this.velocity.x += this.speed;
			}
			
			// Apply the velocity and set the positions for the camera to follow
			this.updatePosition(this.velocity, dt);
			
			if(this.position.x < 0) {
				this.setPosition(0, this.position.y);
			} else if(this.position.x > 700) {
				this.setPosition(700, this.position.y);
			}
			
			// Scale down the velocity
			this.velocity.scale(0.95);
			
			this._super("update", [dt]);
		},
		
		render: function(context, camX, camY){
			this.sprite.render(context, camX, camY);
		}
	});
});