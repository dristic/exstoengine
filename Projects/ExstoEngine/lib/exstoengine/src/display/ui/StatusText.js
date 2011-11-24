ex.using([
  'ex.display.Renderable',
  'ex.display.Text'
], function() {	
	ex.define("ex.display.ui.StatusText", ex.display.Renderable, {
		constructor: function(targetEntity, statSelector, options) {
			this.target = targetEntity;
			this.selector = statSelector;
			
			this.text = "";
			
			this.options = {
				position: new ex.base.Vector(50,50),
				color: '#FFFF00',
				font: '40pt Calibri',
				displayFormat: 'absolute',
				maxSelector: null,
				textBefore: null,
				textAfter: null
			};
			ex.extend(this.options, options);
			
			this.items = [
			  new ex.display.Text('Loading...', this.options)           
      ];
			
			this._super("constructor", [true, 1.0]);
		},
		
		update: function(dt) {
			// Show text in proper format
			if(this.options.displayFormat == 'percentage') {
				this.items[0].text = ex.toInt(this.target[this.selector] / this.target[this.options.maxSelector] * 100);
				this.items[0].text += '%';
			} else if (this.options.displayFormat == 'absolute') {
				this.items[0].text = this.target[this.selector];
			}
			
			// Add text before and after value
			if(this.options.textBefore != null){
				this.items[0].text = this.options.textBefore + this.items[0].text;
			}
			if(this.options.textAfter != null) {
				this.items[0].text = this.items[0].text + this.options.textAfter;
			}
		}
	});
});