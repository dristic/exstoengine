ex.using([
  "ex.display.Sprite"
], function () {
	ex.define("ex.display.AnimatedSprite", ex.display.Sprite, {
		constructor: function(position, frameWidth, frameHeight, frameRate, img) {
			this.timer = (1 / frameRate);
			this.frameRate = frameRate;
			this.type = "Sprite";
			
			//--Animation definitions
			this.animations = {};
			this.curAnimation = [];
			this.curFrame = 0;
			this.playing = true;
			
			this._super("constructor", [position, img]);
			
			this.renderingRect = {
				x		: 0, 
				y		: 0, 
				width	: frameWidth, 
				height	: frameHeight
			};
			
			this.width = frameWidth;
			this.height = frameHeight;
		},
		
		_recalcDimensions: function () {
			// Overridden because we already have the dimensions
		},
		
		createAnimation: function(name, frames) {
			this.animations[name] = frames;
		},
		
		play: function(name, override) {
			if(override == null || override == false)
			{
				if(this.curAnimation == this.animations[name] && this.playing == true) return;
			}
			
			this.curAnimation = this.animations[name];
			this.curFrame = 0;
			this.playing = true;	
		},
		
		stop: function() {
			this.playing = false;
		},
		
		resume: function() {
			this.playing = true;
		},
		
		update: function(dt) {
			//--Ensure we are playing and frameRate > 0
			if(this.playing == true && this.frameRate > 0) {
				// Check for frame skipping due to inactive tab
				if(dt > (1 / this.frameRate)) {
					var skips = Math.floor(dt / (1 / this.frameRate));
					while(skips--) {
						var index = array_index_of(this.curAnimation, this.curFrame) + 1;
						if(index > this.curAnimation.length - 1) index = 0;
						this.curFrame = this.curAnimation[index];
					}
					dt = dt % (1 / this.frameRate);
				}
				this.timer -= dt;
				//--If it is time to go to the next frame
				if(this.timer < 0) {
					this.timer += (1 / this.frameRate);
					//--Ensure image is available
					if(this.img.width > 0 && this.img.height > 0) {
						//--Go to correct frame
						var index = array_index_of(this.curAnimation, this.curFrame) + 1;
						if(index > this.curAnimation.length - 1) index = 0;
						this.curFrame = this.curAnimation[index];
						
						this.goToFrame(this.curFrame);
					}
				}
			}
			
			this._super("update", [dt]);
		},
		
		render: function (context, camX, camY) {
			context.drawImage(this.img, 
							  this.renderingRect.x, 
							  this.renderingRect.y,
							  this.renderingRect.width,
							  this.renderingRect.height,
							  this.position.x - (camX * this.scrollFactorX), 
							  this.position.y - (camY * this.scrollFactorY),
							  this.renderingRect.width,
							  this.renderingRect.height);
		},
		
		goToFrame: function(frame) {
			var xNumFrames = this.img.width / this.renderingRect.width;
			
			var xFrame = frame % xNumFrames;
			var yFrame = Math.floor(frame / xNumFrames);
			
			this.renderingRect.x = xFrame * this.renderingRect.width;
			this.renderingRect.y = yFrame * this.renderingRect.height;
		},
		
		goToNextFrame: function() {
			//--Slide to the right to the next frame
			this.renderingRect.x += this.renderingRect.width;
			
			//--If that frame is outside the bounds, try to go down a row
			if((this.renderingRect.x + this.renderingRect.width) > this.img.width)
			{
				//--Reset column position
				this.renderingRect.x = 0;
				
				//--Move down to next row
				this.renderingRect.y += this.renderingRect.height;
				
				//--If that frame is outside bounds, return to the beginning
				if((this.renderingRect.y + this.renderingRect.height) > this.img.height)
				{
					this.renderingRect.y = 0;
				}
			}
		},
		
		numFrames: function () {
			var xNumFrames = this.img.width / this.renderingRect.width;
			var yNumFrames = this.img.height / this.renderingRect.height;
			
			return xNumFrames * yNumFrames;
		}
	});
	
	function array_contains(array, value) {
		var i = array.length;
		while(i--) {
			if(array[i] == value) {
				return true;
			}
		}
		
		return false;
	}
	
	function array_index_of(array, value) {
		var i = array.length;
		while(i--) {
			if(array[i] == value) {
				return i;
			}
		}
		
		return i;
	}
	
});
