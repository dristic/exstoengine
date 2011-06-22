ex.using([
  "ex.base.Vector",
], function () {
	ex.namespace("ex.plugins");
	
	/*
	 * Particle Class
	 */
	var Particle = new ex.Class({
		constructor: function (options) {
			var defaults = {
				position: new ex.base.Vector(0,0),
				vector: new ex.base.Vector(0,0),
				age: 0,
				lifespan: 0,
				size: 0,
				alpha: 1,
				color: "#cef"
			};
			defaults.extend(options);
			this.extend(defaults);
			
			// Execute birth event
			this.onBirth();
		},
		
		// Performs on every time step
		update: function(dt) {
			if(this.age >= this.lifespan){
				this.onDeath();
			} else {
				this.position.add(this.vector);
				this.mature();
			}
		},
		
		// Perform on birth event
		onBirth: function() {
			//TODO: consider a different name for this function
		},
		
		// Age the particle in some way
		mature: function() {
			this.alpha -= 1.0/this.lifespan;	//evenly reduces alpha over lifespan
			this.age++;
		},
		
		// Perform on death event
		onDeath: function() {
			this.active = false;
		},
		
		render: function(context, camX, camY) {
			// Copied from old Particle class...consider revision.
			if(typeof this.onDraw === "function") this.onDraw(this);
			context.save();
			context.fillStyle = this.color;
			try {
				context.globalAlpha = this.alpha;
			} catch(e) { }
			context.translate(this.position.x - (camX * this.scrollFactorX), this.position.y - (camY * this.scrollFactorY));
			
			context.beginPath();
	        context.arc(0, 0, Math.abs(this.size/2), 0, Math.PI/180, true);
	        context.closePath();
	        context.fill();
	        
	        context.restore();
		}
	});
	window.ex.plugins.Particle2 = Particle;
});