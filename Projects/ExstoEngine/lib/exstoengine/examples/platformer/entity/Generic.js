ex.using([
   'ex.simplex.Entity',
   'ex.display.AnimatedSprite'
], function () {
	ex.define('entity.Generic', ex.simplex.Entity, {
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
			if(target.name == "Player"){
				//console.log("OMG YOU GOT BLOW'D UP!");
			}
		},
		
		render: function(context, camX, camY){
			this.sprite.render(context, camX, camY);
		}
	});
});