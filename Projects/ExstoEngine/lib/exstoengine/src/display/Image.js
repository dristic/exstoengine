ex.using([ 
    'ex.base.Point', 
    'ex.base.Vector',
    'ex.display.Renderable'
], function() {
	ex.define("ex.display.Image", ex.display.Renderable, {
		/**
		 * Container class for HTML Images with additional position,
		 * size, and name data.
		 * 
		 * @name ex.display.Image
		 * 
		 * @param {Image} image
		 * @param {ex.base.Point} position
		 * @param {ex.base.Vector} size width and height
		 * @param {String} name 
		 * 
		 * @property {ex.base.Point} position
		 * @property {ex.base.Vector} size width and height
		 * @property {Image} image
		 * 
		 * @constructor
		 */
		constructor : function(image, position, size, name) {
			this.name = name;
			this.position = position || new ex.base.Point(0, 0);
			this.width = image.naturalWidth;
			this.height = image.naturalHeight;
			this.image = image;
			this.size = size || new ex.base.Vector(this.width, this.height);
			this.scrollFactor = new ex.base.Vector(0,0);
			
			// If the image is not loaded reset size when it loads
			if(this.image.complete == false) {
				ex.event.listenOnce(this.image, 'load', this.autoSize, this);
			}
			
			this._super("constructor", [true, 1.0]);
		},
		
		/**
		 * Auto sizes this object's width and height to the image supplied, and removes
		 * any event listeners on the image for loading
		 * 
		 * @function
		 * @name autoSize
		 * @memberOf ex.display.Image
		 */
		autoSize: function () {
			this.width = this.image.naturalWidth;
			this.height = this.image.naturalHeight;
			
			if(this.rendering && this.rendering.el) {
			  this.rendering.el.style.width = this.width + 'px';
			  this.rendering.el.style.height = this.height + 'px';
			}
		},

		/**
		 * Retrieves an axis aligned bounding box (AABB) surrounding
		 * 		the image.
		 * 
		 * @function
		 * @name getBounds
		 * @nemberOf ex.display.Image
		 * 
		 * @returns {ex.base.Rectangle} 
		 */
		getBounds: function() {
			return new ex.base.Rectangle(
					this.position,
					this.size.x,
					this.size.y);
		},
		
		/**
		 * performs actions every time period dt
		 * 
		 * @function
		 * @name update
		 * @memberOf ex.display.Image
		 * 
		 * @param {Number} dt length of current time cycle
		 */
		update : function(dt) {

		},
		
		setupDom: function (el) {
		  var thisEl = this.image;
      thisEl.style.position = 'absolute';
      thisEl.style.width = this.width + 'px';
      thisEl.style.height = this.height + 'px';
      thisEl.style.left = this.position.x + 'px';
      thisEl.style.top = this.position.y + 'px';
      
      this.rendering = {
        el: thisEl
      };
      
      el.appendChild(this.rendering.el);
		},
		
		renderDom: function (el, camX, camY, camWidth, camHeight) {
		  if(!this.isVisible()){
        return;
      }
      
      // Position of the sprite in the viewport
      var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
          viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
            
      // Do nothing if sprite is out of the viewport
      if((viewPortX + this.width) < 0
          && viewPortX > camWidth
          && (viewPortY + this.height) < 0
          && viewPortY > camHeight) {
        return;
      } else {
        this.rendering.el.style.left = viewPortX + 'px';
        this.rendering.el.style.top = viewPortY + 'px';
      }
		},
		
		destroyDom: function (el) {
		  el.removeChild(this.rendering.el);
		  this.rendering = null;
		},

		/**
		 * Supplies a canvas context and camera offset to each item and calls
		 * their render functions
		 * 
		 * @function
		 * @name render
		 * @memberOf ex.display.Image
		 * 
		 * @param {Context} context canvas context to draw with
		 * @param {Number} camX camera offset on x
		 * @param {Number} camY camera offset on y
		 * @param {Number} camWidth viewport width
		 * @param {Number} camHeight viewport height
		 */
		render2dCanvas: function(context, camX, camY, camWidth, camHeight) {
			if(!this.isVisible()){
				return;
			}
			
			// Position of the sprite in the viewport
			var viewPortX = ex.toInt(this.position.x - (camX * this.scrollFactor.x)),
				viewPortY = ex.toInt(this.position.y - (camY * this.scrollFactor.y));
						
			// Do nothing if sprite is out of the viewport
			if((viewPortX + this.width) < 0
					&& viewPortX > camWidth
					&& (viewPortY + this.height) < 0
					&& viewPortY > camHeight) {
				return;
			}
			
			if (this.image == null) {
				context.fillStyle = '#888888';
				context.fillRect(
						this.position.x, this.position.y,
						this.size.x, this.size.y
				);
			} else {
				context.drawImage(
						this.image, 
						viewPortX, viewPortY, 
						this.size.x, this.size.y
				);
			}
		}
	});
});