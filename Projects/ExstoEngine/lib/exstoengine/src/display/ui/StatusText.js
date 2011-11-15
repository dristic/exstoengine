ex.using([
  'ex.display.Sprite',
  'ex.display.Renderable'
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
			
			if(options != null){
				ex.extend(this.options, options);
			}
			
			this._super("constructor", [true, 1.0]);
		},
		
		_setStyle: function(context) {
			context.font = this.options.font;
			context.fillStyle = this.options.color;
		},
		
		update: function(dt) {
			// Show text in proper format
			if(this.options.displayFormat == 'percentage') {
				this.text = ex.toInt(this.target[this.selector] / this.target[this.options.maxSelector] * 100);
				this.text += '%';
			} else if (this.options.displayFormat == 'absolute') {
				this.text = this.target[this.selector];
			}
			
			// Add text before and after value
			if(this.options.textBefore != null){
				this.text = this.options.textBefore + this.text;
			}
			if(this.options.textAfter != null) {
				this.text = this.text + this.options.textAfter;
			}
			
		},
		
		setupDom: function (el) {
		  var thisEl = document.createElement('div');
		  thisEl.innerHTML = this.text;
		  thisEl.style.position = 'absolute';
		  thisEl.style.left = this.options.position.x + 'px';
		  thisEl.style.top = this.options.position.y + 'px';
		  thisEl.style.font = this.options.font;
		  thisEl.style.color = this.options.color;
		  
		  this.rendering = {
	      el: thisEl
		  };
		  
		  el.appendChild(this.rendering.el);
		},
		
		renderDom: function (el, camX, camY, camWidth, camHeight) {
		  this.rendering.el.innerHTML = this.text;
		  this.rendering.el.style.left = this.options.position.x + 'px';
      this.rendering.el.style.top = this.options.position.y + 'px';
		},
		
		destroyDom: function (el) {
		  el.removeChild(this.rendering.el);
		  this.rendering = null;
		},
		
		render2dCanvas: function(context, camX, camY, camWidth, camHeight) {
			if(!this.isVisible()){
				return;
			}
				
			context.save();
			this._setStyle(context);
			context.fillText(
					this.text, 
					this.options.position.x, 
					this.options.position.y);
			context.restore();
		}
	});
});