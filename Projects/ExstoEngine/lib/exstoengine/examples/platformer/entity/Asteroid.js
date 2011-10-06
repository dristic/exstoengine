ex.using([
   'ex.simplex.Entity',
   'ex.display.Sprite'
], function () {
	ex.define('entity.Asteroid', ex.simplex.Entity, {
		constructor: function (name, position, sprite, collides) {
			this._super("constructor", 
					[name,
					 position,
					 sprite,
					 collides]);
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