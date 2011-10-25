ex.using([
  'ex.display.Sprite'
], function() {	
	ex.define("ex.display.ui.StatusBar", {
		constructor: function(targetEntity, statSelector, options) {
			this.target = targetEntity;
			this.selector = statSelector;
			
			this.options = {
				position: new ex.base.Vector(50,50),
				color: '#FFFF00',
				font: '40pt Calibri'
			};
			
			if(options != null){
				ex.extend(this.options, options);
			}
		},
		
		_setStyle: function(context) {
			context.font = this.options.font;
			context.fillStyle = this.options.color;
		},
		
		update: function(dt) {
			
		},
		
		render: function(context, camX, camY, camWidth, camHeight) {
			context.save();
			this._setStyle(context);
			context.fillText(
					this.target[this.selector], 
					this.options.position.x, 
					this.options.position.y);
			context.restore();
		}
	});
});