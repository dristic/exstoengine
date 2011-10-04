ex.using([
   'ex.simplex.Entity',
   'ex.display.AnimatedSprite'
], function () {
	ex.define('entity.Teleporter', ex.simplex.Entity, {
		constructor: function (name, position, sprite, collides) {
			this._super("constructor", 
					[name, 
					 position,
					 sprite,
					 collides]);
			this.sprite.createAnimation('Teleport', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
			this.sprite.play('Teleport');
			this.triggered = false;
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