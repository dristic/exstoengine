(function () {
	
	function extend(object, extend) {
		for(var param in extend) {
			object[param] = extend[param];
		}
	}
	
	var Emitter = new ExstoEngine.Base.Class(null, {
		constructor: function(options) {
			var defaults = {
				position: new ExstoEngine.Base.Vector(150, 150),
			    velocity: new ExstoEngine.Base.Vector(0, -3),
			    xVariance: 20,
			    yVariance: 5,
			    spawnSpeed: 4,
			    generations: 100000,
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
			    onDraw: function(p) {
			      var y = -this.age * 3;
			      p.size *= 0.98;
			      p.color = 'rgb(255, ' + (y + 255) + ', 68)';
			      p.alpha = 0.5 - (p.age / p.life * 0.4);
			    }
		   };
		   
		   extend(defaults, options);
		   
		   this.options = defaults;
		   
		   this.particles = [];
		},
		
		update: function(dt) {
  
	    // Check to see if we've reached the max # of generation cycles
	    if(this.options.generations != -1 && this.age <= this.options.generations) {
	      if(this.particles.length == 0 && this.options.generations <= this.age) this.active = false;
	      this.age++;
	    }
	  
	    // Update any existing particles; check for dead particles
	    for(var i in this.particles) {
	      var particle = this.particles[i];
	      if(particle.active === false) {
	        this.particles.splice(i, 1); 
	      } else {
	        particle.update(dt); 
	      }
	    }
	  
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
	
	window.ExstoEngine.Display.Emitter = Emitter;
	
}());