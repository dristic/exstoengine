ex.using([
   'ex.world.Entity',
   'ex.display.Sprite'
], function () {
	ex.define('game.entities.Player', ex.world.Entity, {
		constructor: function (name, position, sprite, collides, input) {
			this._super("constructor", 
					[name, 
					 position, 
					 sprite,
					 collides]);
			this.input = input;
			this.speed = 30;
			this.maxSpeed = 200;
			this.score = 0;
			this.jumping = false;
		},
		
		onCollide: function (target, data, dt) {
			if(target.type == "TileMap" && data.pen.y > 0) {
				this.jumping = false;
			}
		},
		
		jump: function(){
			if(this.jumping == false) {
				this.velocity.y -= this.speed * 30;
				this.jumping = true;
			}
		},
		
		moveLeft: function() {
			this.velocity.x -= this.speed;
		},
		
		moveRight: function() {
			this.velocity.x += this.speed;
		},
		
		update: function(dt) {
			if(this.input.isKeyPressed(ex.util.Key.Spacebar)) {
				this.jump();
			}
			if(this.input.isKeyDown(ex.util.Key.W)) {
				//this.velocity.y -= this.speed;
			}
			if(this.input.isKeyDown(ex.util.Key.S)) {
				this.velocity.y += this.speed;
			}
			if(this.input.isKeyDown(ex.util.Key.A)) {
				this.moveLeft();
			}
			if(this.input.isKeyDown(ex.util.Key.D)) {
				this.moveRight();
			}
			
			// Move Right
			if(this.input.dragging && this.input.mouseX > 600){
				this.moveRight();
			}
			// Move left
			if(this.input.dragging && this.input.mouseX < 200){
				this.moveLeft();
			}
			// Jump
			if(this.input.mouseDown && this.input.mouseY > 400){
				this.jump();
			}
			
			// Gravity
			this.velocity.y += this.speed;
			
			// Trim speed if past max speed
			if(this.velocity.x < -this.maxSpeed) {
				this.velocity.x = -this.maxSpeed;
			} else if(this.velocity.x > this.maxSpeed) {
				this.velocity.x = this.maxSpeed;
			}
			if(this.velocity.y < -this.maxSpeed) {
				//this.velocity.y = -this.maxSpeed;
			} else if (this.velocity.y > this.maxSpeed) {
				this.velocity.y = this.maxSpeed;
			}
			
			// Apply the velocity and set the positions for the camera to follow
			this.updatePosition(this.velocity, dt);
			
			// Scale down the velocity
			this.velocity.addScaled(this.velocity, -5 * dt);
			
			this._super("update", [dt]);
			
			if(this.velocity.x < 0.5 && this.velocity.x > -0.5)
				this.velocity.x = 0;
		}
	});
	
	function getOffset(a, b){	
		return {
			x: a.position.x - b.position.x,
			y: a.position.y - b.position.y };
	};
});