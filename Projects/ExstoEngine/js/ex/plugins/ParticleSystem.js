/**
 * Note: While rebuilding the emitter class I realized that
 * the particle class was inseparable so I am rebuilding both.
 * Reasons include:
 *  - Simplifying particle class
 *  - Placing all variance calculations in Emitter
 * 			(Nic)
 */

/* Requirements:
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

ex.using([
  "ex.base.Vector",
], function () {
	ex.namespace("ex.display");
	
	function vary(n) {
		return (Math.random() * n << 1) - n;
	};
	
	function varyVector(vector, angleVariance, magnitudeVariance) {
		var variedVector = vector;
		//TODO: scalar addition on vector with vary(magnitudeVariance)
		//vector.scale(vary(magnitudeVariance));
		//TODO: change angle of vector w/ rotate(degrees) function or similar
		//vector.rotate(vary(angleVariance));
		return variedVector;
	};
	
	function extend(object, extend) {
		for(var param in extend) {
			object[param] = extend[param];
		}
	};
	
	/*
	 * Emitter Class
	 */
	var Emitter = new ex.Class({
		constructor: function(emitterOptions, particleOptions) {
			/* Set Emitter default options and extend new options */
			var defaults = {
				position: new ex.base.Vector(0,0),			// position of emitter
				baseVector: new ex.base.Vector(150, 150),	// v0 and theta
				angleVariance: 30,							// theta variance (0 - 360)
				magnitudeVariance: 0.20,					// v0 variance (0.0 - 1.0)
				spawnSpeed: 4,								// max spawn per time step
				maxParticles: 500,							// particle cap
				sizeVariance: 5,							// randomness of size
				lifeVariance: 50,							// randomness of lifespan
				active: true								// is emitter emitting?
				
			};
			defaults.extend(options);
			this.options = defaults;
			/* Set particle default options and extend new options */
			var particleDefaults = {
				position: this.options.position,
				vector: new ex.base.Vector(0,0),
				age: 0,
				lifespan: 0,
				size: 0,
				alpha: 1,
				color: '#cef',
				onDraw: function(particle) {
					var y = -this.age * 3;
					particle.size *= 0.98;
					particle.color = 'rgb(255, ' + (y + 255) + ', 68)';
					particle.alpha = 0.5 - (particle.age / particle.life * 0.4);
			    }
			};
			particleDefaults.extend(particleOptions);
			this.particleOptions = particleDefaults;
			
			this.particles = [];
			this.active = true;
		},
		
		/**
		 * Two implementations for updating can be used, one favors accuracy, the other speed.
		 * 
		 * Accuracy (3 passes):
		 *  - remove dead particles
		 *  - spawn new particles
		 *  - update all particles
		 *  
		 * Speed (2 passes):
		 *  - update all particles, dead particles are removed
		 *  - spawn new particles (they miss their first time step)
		 *  
		 *  Below is the Speed implementation.
		 * @param dt
		 */
		update: function(dt) {			
			// Update each live particle, remove dead ones
			var particle = null;
			for(var index in this.particles) {
				particle = this.particles[index];
				if(particle.age > particle.lifespan) {
					this.particles.splice(index, 1);
				} else {
					particle.update(dt);
				}
			}
			
			// spawn new particles
			for(var birthCount = 0; birthCount < this.options.spawnSpeed; birthCount++) {
				if(this.particles.length >= this.options.maxParticles || this.active == false) {
					// Do nothing, no room or emitter inactive
				} else {
					this.spawnParticle();
				}
			}
		},
		
		spawnParticle: function() {
			var optionsWithVariance = this.particleOptions;
			optionsWithVariance.lifespan += vary(this.options.lifeVariance);
			optionsWithVariance.vector = varyVector(optionsWithVariance.vector);
			optionsWithVariance.size += vary(this.options.sizeVariance);
			this.particles.push(new ex.display.Particle(optionsWithVariance));
		},
		
		render: function(context, camX, camY) {
			for(var index in this.particles) {
				particles[index].render(context, camX, camY);
			}
		}
	});
	
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
			this.birth();
		},
		
		// Performs on every time step
		update: function(dt) {
			if(this.age >= this.lifespan){
				this.die();
			}
			this.position.add(this.vector);
			this.age();
		},
		
		// Perform on birth event
		birth: function() {
			//TODO: consider a different name for this function
		},
		
		// Age the particle in some way
		age: function() {
			this.alpha -= 1.0/life;	//evenly reduces alpha over lifespan
			this.age++;
		},
		
		// Perform on death event
		die: function() {
			this.active = false;
		},
		
		render: function(context, camX, camY) {
			//TODO: write rendering code (copy?)
		}
	});
	
	window.ex.display.Emitter = Emitter;
	window.ex.display.Particle = Particle;
});