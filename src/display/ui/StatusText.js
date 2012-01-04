ex.using([
  'ex.display.Renderable',
  'ex.display.Text'
], function() {	
	ex.define("ex.display.ui.StatusText", ex.display.Renderable, {
		constructor: function(options) {
			this.options = {
				position: new ex.base.Vector(50,50),
				update: 'manual',
        updateOptions: {
          target: null,
          currentSelector: '',
          maxSelector: ''
        },
        displayFormat: 'absolute',
        text: {
          color: '#FFFFFF',
          font: '12pt Calibri',
          prefix: "",
          suffix: ""
        }
			};
			
			ex.extend(this.options, options);
			this.options.text.position = this.options.position;
			
			this.items = [
			  new ex.display.Text('Loading...', this.options.text)
      ];
			
			this._super("constructor", [true, 1.0]);
		},
		
		update: function (dt) {
		  if(this.options.update == 'auto') {
		    var options = this.options.updateOptions,
		        current = options.target[options.currentSelector],
		        max = options.target[options.maxSelector],
		        text = "";
		    
		    // Show text in proper format
	      if(this.options.displayFormat == 'percentage') {
	        text = ex.toInt(current / max * 100);
	        text += '%';
	      } else if (this.options.displayFormat == 'absolute') {
	        text = current;
	      }
	      
	      this.setText(text);
		  }
		},
		
		setText: function (text) {
		  text = this.options.text.prefix + text + this.options.text.suffix;
		  
		  this.items[0].text = text;
		}
	});
});