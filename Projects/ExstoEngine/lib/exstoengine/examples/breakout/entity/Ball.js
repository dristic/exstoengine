ex.using([
   'ex.simplex.Entity',
   'ex.display.Sprite'
], function () {
	ex.define('entity.Ball', ex.simplex.Entity, {
		constructor: function (name, position, sprite, collides) {
			this._super("constructor", 
					[name, 
					 position,
					 sprite,
					 collides]);
			this.speed = 100;
		},
		
		update: function(dt) {
			// Apply the velocity
			this.updatePosition(this.velocity, dt);
			
			if(this.position.x < 0) {
				this.setPosition(0, this.position.y);
				this.velocity.x = -this.velocity.x;
			} else if(this.position.x > 775) {
				this.setPosition(775, this.position.y);
				this.velocity.x = -this.velocity.x;
			}
			
			this._super("update", [dt]);
		},
		
		onCollide: function(target, data) {
			if(target.name == "Paddle"){
				resolveBallPaddleCollision(this);
			} else if (target.type == "SpriteMap") {
				resolveBallTileCollision(this, target, data);
			}
		},
		
		render: function(context, camX, camY){
			this.sprite.render(context, camX, camY);
		}
	});
	
	function resolveBallTileCollision(ball, tileMap, data) {
		var tileX = data.tile.position.x,
			tileY = data.tile.position.y;
		
		tileMap.getTile(tileX, tileY).setValue(0);
		
		if(tileY < ball.position.y) {
			ball.velocity.y = ball.speed;
		} else {
			ball.velocity.x = -ball.velocity.x;
		}
		
		if(ball.velocity.y < 0) {
			ball.velocity.y--;
		} else {
			ball.velocity.y++;
		}
		
		if(ball.velocity.x < 0) {
			ball.velocity.x--;
		} else {
			ball.velocity.x++;
		}
	};
	
	function resolveBallPaddleCollision(ball) {
		ball.velocity.y = -ball.velocity.y;
	};
});