ex.using([ 
    "ex.event.EventTarget" 
], function () {
	ex.define("ex.simplex.Entity", ex.event.EventTarget, {
		constructor: function($name, $position){
			this.name = $name;
			this.position = $position;
			this.actions = {};
			this.bindings = {};
		},
		
		update: function($dt){
			
		},
		
		isVisible: function(){
			if(this.visible && this.opacity > 0.0){
				return true;
			} else {
				return false;
			}
		},
		
		render: function($context, $camX, $camY){
			if(!this.isVisible())	// Don't render if it won't be seen
				return;
		
			// Render code
		}
	});
});