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
  "ex.plugins.Particle2"
], function () {
	ex.namespace("ex.plugins");
	
	function vary(n) {
		return (Math.random() * n / 2) - n;
	};
	
	// (x,y) to (r,theta)
	function cartesianToPolar(x,y){
		var theta = Math.atan(y/x);
		var r = Math.sqrt(x*x + y*y);
		return {
			r: r, 
			theta: theta
		};
	}
	
	// (r,theta) to (x,y)
	function polarToCartesian(r,theta) {
		var x = r * Math.cos(theta);
		var y = r * Math.sin(theta);
		return {
			x: x,
			y: y
		};
	}
	
	function varyVector(vector, angleVariance, magnitudeVariance) {
		var polarCoords = cartesianToPolar(vector.x, vector.y);
		polarCoords.r += vary(magnitudeVariance);
		polarCoords.theta += vary(angleVariance);
		var adjustedCoords = polarToCartesian(polarCoords.r, polarCoords.theta);
		return new ex.base.Vector(adjustedCoords.x, adjustedCoords.y);
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
				position: new ex.base.Vector(300, 300),		// position of emitter
				baseVector: new ex.base.Vector(150, 150),	// v0 and theta
				angleVariance: Math.PI / 8,					// theta variance (radians)
				magnitudeVariance: 0.2,						// v0 variance (0.0 - 1.0)
				spawnSpeed: 1,								// max spawn per time step
				maxParticles: 500,							// particle cap
				sizeVariance: 5,							// randomness of size
				lifeVariance: 20,							// randomness of lifespan
				active: true								// is emitter emitting?
			};
			defaults.extend(emitterOptions);
			this.options = defaults;
			/* Set particle default options and extend new options */
			var particleDefaults = {
				position: this.options.position.clone(),
				vector: new ex.base.Vector(0, -100),
				age: 0,
				lifespan: 2,
				size: 15,
				alpha: 1,
				color: '#cef',
				onDraw: function(particle) {
					var y = -this.age * 100;
					y = Math.floor(y);
					particle.size *= 0.98;
					particle.color = 'rgb(255, ' + (y + 255) + ', 68)';
					particle.alpha = 0.5 - (particle.age / particle.lifespan * 0.4);
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
			var index = this.particles.length;
			while(index--) {
				if(this.particles[index].age > this.particles[index].lifespan) {
					this.particles.splice(index, 1);
				} else {
					this.particles[index].update(dt);
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
			var optionsWithVariance = {};
			optionsWithVariance.extend(this.particleOptions.clone());
			//optionsWithVariance.lifespan += vary(this.options.lifeVariance);
			optionsWithVariance.vector = varyVector(optionsWithVariance.vector, this.options.angleVariance, this.options.magnitudeVariance);
			optionsWithVariance.size += vary(this.options.sizeVariance);
			this.particles.push(new ex.plugins.Particle2(optionsWithVariance));
		},
		
		render: function(context, camX, camY) {
			var index = this.particles.length;
			while(index--) {
				this.particles[index].render(context, camX, camY);
			}
		}
	});
	window.ex.plugins.Emitter2 = Emitter;
});