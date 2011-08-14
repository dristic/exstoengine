ex.using([
   "ex.simplex.Layer"
], function () {
	ex.define("ex.simplex.TextLayer", ex.simplex.Layer, {
		constructor: function($name, $frame, $text, $options){
			this._super("constructor", [$name, $frame]);
			this.text = $text;
			
			var defaultOptions = {
				font: "40pt Calibri",
				color: "rgb(255, 255, 0)",
				x: 50,
				y: 40
			};
			
			defaultOptions.extend($options);
			this.options = defaultOptions.clone();
		},
		
		render: function($context, $camX, $camY){
			var x = this.options.x;
		    var y = this.options.y;
		    $context.font = this.options.font;
		    $context.fillStyle = this.options.color; // text color
		    $context.fillText(this.text, x, y);
		}
	});
});