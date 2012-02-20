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
		  this.type = "AnimatedSprite";
		  
		  this.scrollFactor = { x: 1, y: 1 };
		  
			this.spriteSheets = this._prepareSpriteSheets(spriteSheets);
			this.animations = {};
			this.currentAnimation = null;
			this.currentAnimationName = null;
			this.currentIndex = 0;
			this.currentFrame = 0;
			this.playing = false;
			this.playQueue = [];
			this.scaled = false;
			
			this.timer = 0; // will be (1 / frameRate)
			
			this._super("constructor", 
			    [true, 
			     1.0, 
			     ex.Vector(0,0), 
			     this.spriteSheets[0].renderingRect.width, 
			     this.spriteSheets[0].renderingRect.height]);
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
//	    if(!this.currentAnimation) {
//	      this.currentAnimation = this.animations[name];
//	      this.currentAnimationName = name;
//	    }
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
		play: function(name, loop, override) {
		  if(override == true) {
		    this.playQueue = [];
		    if(this.currentAnimation) {
  		    this._queue({ 
  		      name: this.currentAnimationName, 
  		      loop: this.currentAnimation.loop });
		    }
		  } else if(this.currentAnimationName == name) {
		    // Do nothing if animation is already playing and we're not overriding
		    return;
		  } else {  // if we're not overriding and this is new, queue it
		    this._queue({ name: name, loop: loop });
		  }
		  
		  this.currentAnimation = this.animations[name];
		  this.currentAnimationName = name;
		  this.currentAnimation.loop = loop;
		  
		  if(this.scaled == false) {
		    this.width = this.currentAnimation.sheet.renderingRect.width;
		    this.height = this.currentAnimation.sheet.renderingRect.height;
		  }
		  
		  this.currentFrame = 0;
		  this.currentIndex = 0;
		  this.timer = (1 / this.animations[name].sheet.frameRate);
		  this.playing = true;
		},
		
		/**
		 * Puts a function into the play queue.
		 * @param {String} name The name of the animation to play.
		 */
		_queue: function (name) {
		  this.playQueue.push(name);
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
		
		_animationComplete: function() {
		  return (this.currentIndex > this.currentAnimation.frames.length - 1);
		},
		
		_goToNextAnimation: function() {
		  if(this.playQueue.length > 0) {
		    var next = this.playQueue.shift();
		    this.currentAnimation = this.animations[next.name];
		    this.currentAnimationName = next.name;
		    this.currentAnimation.loop = next.loop;
		    this.currentFrame = 0;
	      this.timer = (1 / this.animations[next.name].sheet.frameRate);
	      this.playing = true;
		  } else if(this.currentAnimation.loop == false) {
		    this.stop();
		  }
		  
		  this.currentIndex = 0;
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
		  if(this.currentAnimation == null) {
		    return;
		  }
		  
		  // Get framerate && check for playing
      var frameRate = this.currentAnimation.sheet.frameRate;
		  if(!this.playing || frameRate == 0) {
		    return;
		  }
		  
		  // Decrement and check timer
		  this.timer -= dt;
		  if(this.timer >= 0) {
		    return;
		  }
		  
		  // If spritesheet is ready, play it
		  if(this.currentAnimation.sheet.isReady()) {
		    this.currentIndex++;
		    if(this._animationComplete()) {
		      this._goToNextAnimation();
		    }
		    this.currentFrame = this.currentAnimation.frames[this.currentIndex];
		    this.goToFrame(this.currentFrame);
		  }
		  this.timer += (1 / this.currentAnimation.sheet.frameRate);
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
			
			renderingRect.x = xFrame * renderingRect.width;
			renderingRect.y = yFrame * renderingRect.height;
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
});
