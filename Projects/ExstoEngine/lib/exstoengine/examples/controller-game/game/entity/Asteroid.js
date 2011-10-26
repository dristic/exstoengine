ex.using([
   'ex.world.Entity',
   'ex.display.Sprite'
], function () {
	ex.define('entity.Asteroid', ex.world.Entity, {
		constructor: function (name, position, sprite, collides) {
			this._super("constructor", 
					[name,
					 position,
					 sprite,
					 collides]);
		}
	});
});