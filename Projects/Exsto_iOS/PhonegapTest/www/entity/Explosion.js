ex.using([
   'ex.world.Entity',
   'ex.display.AnimatedSprite'
], function () {
	ex.define('entity.Explosion', ex.world.Entity, {
		constructor: function (name, position, sprite, collides) {
			this._super("constructor", 
					[name,
					 position,
					 sprite,
					 collides]);
			this.sprite.createAnimation('Explode', [0, 1, 2, 3]);
			this.sprite.play('Explode');
			this.speed = 10;
		},
		
		update: function(dt) {
			this._super("update", [dt]);
		},
		
		onCollide: function(target) {

		},
		
		render: function(context, camX, camY){
			this.sprite.render(context, camX, camY);
		}
	});
});