(function () {
	
	function vary(n) {
		return (Math.random() * n << 1) - n;
	};
	
	function extend(object, extend) {
		for(var param in extend) {
			object[param] = extend[param];
		}
	}
	
	var Particle = new ExstoEngine.Base.Class(null, {
		constructor: function(options) {
			var defaults = {
				position: new ExstoEngine.Base.Vector(0, 0),
				velocity: new ExstoEngine.Base.Vector(0, 0),
				xVariance: 0,
				yVariance: 0,
				direction: new ExstoEngine.Base.Vector(0, 0),
				directionVariance: 0,
				age: 0,
				life: 0,
				lifeVariance: 0,
				size: 0,
				sizeVariance: 0,
				active: true,
				alpha: 1,
				color: "#cef"
			};
			extend(defaults, options);
			
			defaults.direction = options.direction + vary(options.directionVariance);
			defaults.position = options.position.clone().add(defaults.position);
			defaults.velocity = options.velocity.clone().rotate(defaults.direction * Math.PI / 180);
			defaults.life = options.life + vary(options.lifeVariance);
			defaults.size = options.size + vary(options.sizeVariance);
			
			extend(this, defaults);
		},
		
		update: function(dt) {
			if(this.age >= this.life) this.active = false;
			this.position.add(this.velocity);
			this.alpha -= 0.1;
			this.age++;
		},
		
		render: function(context, camX, camY) {
			if(typeof this.onDraw === "function") this.onDraw(this);
			
			context.save();
			
			context.fillStyle = this.color;
			try {
				context.globalAlpha = this.alpha;
			} catch(e) {
				
			}
			context.translate(this.position.x - (camX * this.scrollFactorX), this.position.y - (camY * this.scrollFactorY));
			
			context.beginPath();
	        context.arc(0, 0, this.size/2, 0, Math.PI/180, true);
	        context.closePath();
	        context.fill();
	        
	        context.restore();
		}
	});
	
	window.ExstoEngine.Display.Particle = Particle;
	
}());