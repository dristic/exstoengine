ex.using([
   'ex.world.Entity',
   'ex.display.AnimatedSprite'
], function () {
	ex.define('entity.Teleporter', ex.world.Entity, {
		constructor: function (name, position, sprite, collides) {
			this._super("constructor", 
					[name, 
					 position,
					 sprite,
					 collides]);
			this.sprite.createAnimation('Teleport', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
			this.sprite.play('Teleport');
			this.triggered = false;
		}
	});
});