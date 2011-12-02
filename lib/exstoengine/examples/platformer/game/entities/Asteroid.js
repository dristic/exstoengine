ex.using([
   'ex.world.Entity',
   'ex.display.Sprite'
], function () {
	ex.define('game.entities.Asteroid', ex.world.Entity, {
		constructor: function (name, position, sprite, collides) {
			this._super("constructor", 
					[name,
					 position,
					 sprite,
					 collides]);
		}
	});
});