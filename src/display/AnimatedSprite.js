ex.using([
  "ex.display.Renderable",
  "ex.base.Rectangle",
  "ex.base.Point"
], function () {
	ex.define("ex.display.AnimatedSprite", ex.display.Renderable, {
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
		 * @property {Number[]} currentAnimation The frames of the selected
		 * 		animation.
		 * @property {Number} currentFrame the current frame in the animation.
		 * 		Initializes to 0.
		 * @property {Boolean} playing Controls animation playback (on/off).
		 * @property {ex.base.Rectangle} renderingRect Frame dimensions used
		 * 		in rendering from the sprite image.
		 * @constructor
		 */
		constructor: function(spriteSheets) {
		  this._super("constructor", [true, 1.0, ex.Vector(0,0), 1, 1]);
		  this.type = "AnimatedSprite";

		  this.position = new ex.Vector(0,0);
		  
			this.spriteSheets = this._prepareSpriteSheets(spriteSheets);
			this.animations = {};
			this.currentAnimation = null;
			this.currentFrame = 0;
			this.playing = false;
			
			this.timer = 0; // will be (1 / frameRate)
		},
		
		_prepareSpriteSheets: function(spriteSheets) {
		  if(ex.isArray(spriteSheets)) {
		    return spriteSheets;
		  } else if (spriteSheets instanceof ex.display.SpriteSheet) {
		    return [spriteSheets];
		  } else {
		    ex.Debug.log("AnimatedSprite received spriteSheets in wrong format.", 'ERROR');
		    return [];
		  }
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
		createAnimation: function(name, sheetNumber, frames) {		  
	    this.animations[name] = {
	      sheet: this.spriteSheets[sheetNumber],
	      frames: frames
	    };
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
			if(override == null || override == false) {
				if(this.currentAnimation == this.animations[name] && this.playing == true) {
				  return;
				}
			}
			
			this.currentAnimation = this.animations[name];
			this.currentFrame = 0;
			this.timer = (1 / this.animations[name].sheet.frameRate);
			
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
		  var frameRate = this.currentAnimation.sheet.frameRate;
			//--Ensure we are playing and frameRate > 0
			if(this.playing == true && frameRate > 0) {
				// Check for frame skipping due to inactive tab
				if(dt > (1 / frameRate)) {
					var skips = Math.floor(dt / (1 / frameRate));
					while(skips--) {
						var index = array_index_of(this.currentAnimation.frames, this.currentFrame) + 1;
						if(index > this.currentAnimation.frames.length - 1) index = 0;
						this.currentFrame = this.currentAnimation.frames[index];
					}
					dt = dt % (1 / this.frameRate);
				}
				this.timer -= dt;
				//--If it is time to go to the next frame
				if(this.timer < 0) {
					this.timer += (1 / frameRate);
					//--Ensure image is available
					if(this.currentAnimation.sheet.isReady()) {
						//--Go to correct frame
						var index = array_index_of(this.currentAnimation.frames, this.currentFrame) + 1;
						if(index > this.currentAnimation.frames.length - 1) index = 0;
						this.currentFrame = this.currentAnimation.frames[index];
						
						this.goToFrame(this.currentFrame);
					}
				}
			}
		},
		
		/**
		 * Moves the rendering rectangle to a specific frame.
		 * @function
		 * @name goToFrame
		 * @memberOf ex.display.AnimatedSprite
		 * @param {Number} frame number of the frame to move to
		 */
		goToFrame: function(frame) {
		  var image = this.currentAnimation.sheet.image,
		      renderingRect = this.currentAnimation.sheet.renderingRect;
			var xNumFrames = image.width / renderingRect.width;
			
			var xFrame = frame % xNumFrames;
			var yFrame = Math.floor(frame / xNumFrames);
			
			renderingRect.position.x = xFrame * renderingRect.width;
			renderingRect.position.y = yFrame * renderingRect.height;
		},
		
		/**
		 * Moves the rendering rectangle forward one frame.
		 * @function
		 * @name goToNextFrame
		 * @memberOf ex.display.AnimatedSprite
		 */
		goToNextFrame: function() {
		  var image = this.currentAnimation.sheet.image,
		      renderingRect = this.currentAnimation.sheet.renderingRect;
			
		  //--Slide to the right to the next frame
			renderingRect.position.x += renderingRect.width;
			
			//--If that frame is outside the bounds, try to go down a row
			if((renderingRect.position.x + renderingRect.width) > image.width) {
				renderingRect.position.x = 0; //--Reset column position
				renderingRect.position.y += renderingRect.height; //--Move down to next row
				
				//--If that frame is outside bounds, return to the beginning
				if((renderingRect.position.y + renderingRect.height) > image.height) {
					renderingRect.position.y = 0;
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
		  var sheet = this.currentAnimation.sheet;
			var xNumFrames = sheet.image.width / sheet.renderingRect.width;
			var yNumFrames = sheet.image.height / sheet.renderingRect.height;
			
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
