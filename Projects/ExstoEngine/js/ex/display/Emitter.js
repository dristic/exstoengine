ex.using([
  "ex.base.Vector"
], function () {
	
	var Emitter = new ex.Class({
		constructor: function(options) {
			var defaults = {
				position: new ex.base.Vector(150, 150),
			    velocity: new ex.base.Vector(0, -3),
			    xVariance: 20,
			    yVariance: 5,
			    spawnSpeed: 4,
			    time: 100000,
			    maxParticles: 500,
			    size: 20,
			    sizeVariance: 5,
			    life: 30,
			    lifeVariance: 10,    
			    direction: 0,
			    directionVariance: 15,
			    color: '#cef',
			    opacity: 1,
			    scrollFactorX: 1,
			    scrollFactorY: 1,
			    onDraw: function(particle) {
			      var y = -this.age * 3;
			      particle.size *= 0.98;
			      particle.color = 'rgb(255, ' + (y + 255) + ', 68)';
			      particle.alpha = 0.5 - (particle.age / particle.life * 0.4);
			    }
		   };
		   
		   defaults.extend(options);
		   
		   this.options = defaults;
		   
		   this.particles = [];
		   
		   this.active = true;
		},
		
		update: function(dt) {
			// Subtract time and check for active
			this.options.time -= dt;
			if(this.options.time <= 0) {
				this.active = false;
			}
			
			// Update existing and remove dead particle
			var i = this.particles.length;
			while(i--) {
				var particle = this.particles[i];
				
				if(particle.active == false) {
					this.particles.splice(i, 1);
				} else {
					particle.update(dt);
				}
			}
  
	    // Check to see if we've reached the max # of generation cycles
	    //if(this.options.generations != -1 && this.age <= this.options.generations) {
	      //if(this.particles.length == 0 && this.options.generations <= this.age) this.active = false;
	      //this.age++;
	    //}
	  
	    // Generate # (spawnSpeed) of particles for this update iteration
	    // as long as we haven't reached the max # of particles
	    for(var spawned = 0; spawned < this.options.spawnSpeed; spawned++) {
	      if(this.particles.length >= this.options.maxParticles || this.options.generations <= this.age) {
	        return; 
	      }
	      this.particles.push(new ExstoEngine.Display.Particle(this.options));
	    }
	  },
  
	  render: function(context, camX, camY) {
	    for(var i in this.particles) {
	      this.particles[i].render(context, camX, camY);
	    }
	  }
	});
	
	window.ex.display.Emitter = Emitter;
	
});