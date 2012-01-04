ex.using([
  "ex.base.Vector",
  "ex.display.Particle"
], function () {
	/*
	 * Requirements:
	 * - Support for animated sprites as particles
	 * - drawing objects as particles
	 * - variance in all directions (angle or cartesian)
	 * - variance in age/size
	 * - spawn rate
	 * - initial velocity
	 * - degree of randomness
	 * - simulation and render phases
	 * - emitters on points, lines, and maybe polys? (lines could be used for rain effects)
	 */
	
	
	ex.define("ex.display.Emitter", {
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
			
			// Generate new particles
			for(var spawned = 0; spawned < this.options.spawnSpeed; spawned++) {
				if(this.particles.length >= this.options.maxParticles || this.options.time <= 0) {
					// Do nothing
				} else {
					this.particles.push(new ex.display.Particle(this.options));
				}
			}
		},
  
		render2dCanvas: function(context, camX, camY) {
			for(var i = 0; i < this.particles.length; i++) {
				this.particles[i].render(context, camX, camY);
			}
		}
	});	
});