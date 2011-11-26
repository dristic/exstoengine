ex.using([
  "ex.display.Sprite",
  "ex.base.Rectangle",
  "ex.base.Point"
], function () {
	ex.define("ex.display.AnimatedSprite", ex.display.Sprite, {
		/**
		 * An extension of ex.display.Sprite that is able to animate sprites by
		 * stepping through a tileset.
		 * 
		 * @name ex.display.AnimatedSprite
		 * @extends ex.display.Sprite
		 *  
		 * @param {ex.base.Vector} position position of the animated sprite
		 * @param {Number} frameWidth width of frame (tile width in image)
		 * @param {Number} frameHeight height of frame (tile height in image)
		 * @param {Number} frameRate number of timesteps before advancing a frame
		 * @param {Image} img spriteset
		 * 
		 * @property {Number} timer Animation timer, inverse of framerate.
		 * @property {Number} frameRate Number of frames to wait per
		 * 		sprite tile.
		 * @property {Object} Associative array of animations (name : frames).
		 * @property {Number[]} curAnimation The frames of the selected
		 * 		animation.
		 * @property {Number} curFrame the current frame in the animation.
		 * 		Initializes to 0.
		 * @property {Boolean} playing Controls animation playback (on/off).
		 * @property {ex.base.Rectangle} renderingRect Frame dimensions used
		 * 		in rendering from the sprite image.
		 * @property {Number} width
		 * @property {Number} height
		 * @constructor
		 */
		constructor: function(position, frameWidth, frameHeight, frameRate, img) {
		  this._super("constructor", [position, img]);
		  
		  this.type = "AnimatedSprite";
		  
			this.timer = (1 / frameRate);
			this.frameRate = frameRate;

			this.animations = {};
			this.curAnimation = [];
			this.curFrame = 0;
			this.playing = true;
			
			this.renderingRect = new ex.base.Rectangle(
					new ex.base.Point(0,0),
					frameWidth,
					frameHeight);
			
			this.width = frameWidth;
			this.height = frameHeight;
		},
		
		_recalcDimensions: function () {
			// Overridden because we already have the dimensions
		},
		
		/**
		 * Creates a named animation with an array of frame numbers.
		 * @function
		 * @name createAnimation
		 * @memberOf ex.display.AnimatedSprite
		 * @param {String} name name of the animation
		 * @param {Number[]} frames array of frame numbers to be played
		 * in order 
		 */
		createAnimation: function(name, frames) {
			this.animations[name] = frames;
		},
		
		/**
		 * Starts playing an animation.
		 * @function
		 * @name play
		 * @memberOf ex.display.AnimatedSprite
		 * @param {String} name name of animation to play
		 * @param {Boolean} [override] if true and the animation 
		 * is already playing this will reset it to frame 1 instead 
		 * of allowing it to continue
		 */
		play: function(name, override) {
			if(override == null || override == false)
			{
				if(this.curAnimation == this.animations[name] && this.playing == true) return;
			}
			
			this.curAnimation = this.animations[name];
			this.curFrame = 0;
			this.playing = true;	
		},
		
		/**
		 * Stops the current animation.
		 * @function
		 * @name stop
		 * @memberOf ex.display.AnimatedSprite
		 */
		stop: function() {
			this.playing = false;
		},
		
		/**
		 * Resumes play of the current animation.
		 * @function
		 * @name resume
		 * @memberOf ex.display.AnimatedSprite
		 */
		resume: function() {
			this.playing = true;
		},
		
		/**
		 * If the animation is playing, this checks if it is time to advance
		 * to the next frame.
		 * @function
		 * @name update
		 * @memberOf ex.display.AnimatedSprite
		 * @param {Number} dt timestep
		 */
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
		
		/**
		 * Moves the rendering rectangle to a specific frame.
		 * @function
		 * @name goToFrame
		 * @memberOf ex.display.AnimatedSprite
		 * @param {Number} frame number of the frame to move to
		 */
		goToFrame: function(frame) {
			var xNumFrames = this.img.width / this.renderingRect.width;
			
			var xFrame = frame % xNumFrames;
			var yFrame = Math.floor(frame / xNumFrames);
			
			this.renderingRect.position.x = xFrame * this.renderingRect.width;
			this.renderingRect.position.y = yFrame * this.renderingRect.height;
		},
		
		/**
		 * Moves the rendering rectangle forward one frame.
		 * @function
		 * @name goToNextFrame
		 * @memberOf ex.display.AnimatedSprite
		 */
		goToNextFrame: function() {
			//--Slide to the right to the next frame
			this.renderingRect.position.x += this.renderingRect.width;
			
			//--If that frame is outside the bounds, try to go down a row
			if((this.renderingRect.position.x + this.renderingRect.width) > this.img.width)
			{
				//--Reset column position
				this.renderingRect.position.x = 0;
				
				//--Move down to next row
				this.renderingRect.position.y += this.renderingRect.height;
				
				//--If that frame is outside bounds, return to the beginning
				if((this.renderingRect.position.y + this.renderingRect.height) > this.img.height)
				{
					this.renderingRect.position.y = 0;
				}
			}
		},
		
		/**
		 * Counts the number of frames in the image.
		 * @function
		 * @name numFrames
		 * @memberOf ex.display.AnimatedSprite
		 * @returns {Number} number of frames in the image
		 */
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
