ex.using([
  "ex.base.Vector"
], function () {
	ex.define("ex.display.Sprite", {
		/**
		 * Sprite object that contains a single image to draw on the canvas.
		 * @name ex.display.Sprite
		 * 
		 * @param {Number} x The sprite's x position.
		 * @param {Number} y The sprite's y position.
		 * @param {Image} img The img to use to render the sprite.
		 * @param {String} name The sprite's name.
		 * @constructor
		 */
        constructor: function (x, y, img, name) {
        	this.name = name;
        	this.type = "Sprite";
            this.position = new ex.base.Vector(x, y);
            this.velocity = new ex.base.Vector(0, 0);
            this.img = img || new Image();
            this.visible = true;
            this.width = this.img.width;
            this.height = this.img.height;

            this.halfWidth = function () {
                return this.img.width >> 1;
            };

            this.halfHeight = function () {
                return this.img.height >> 1;
            };

            this.rotation = 0;
            this.rotationEnabled = false;
            this.rotationCanvas = document.createElement("canvas");

            this.scrollFactorX = 1;
            this.scrollFactorY = 1;

            //--Set rotation canvas the size of the image
            this.rotationCanvas.width = this.img.width;
            this.rotationCanvas.height = this.img.height;
        },

        update: function (dt) {
            if (this.width == 0) {
                this.width = this.img.width;
                this.height = this.img.height;
            }

            if (typeof this.onUpdate === "function") this.onUpdate(dt);
        },

        render: function (context, camX, camY) {
            if (!this.visible){
            	return;
            }
            
            if (this.rotationEnabled == false) {
                context.drawImage(this.img, this.position.x - (camX * this.scrollFactorX), this.position.y - (camY * this.scrollFactorY));
            } else {
                var rContext = this.rotationCanvas.getContext("2d");

                //--Ensure width and height are not 0 to avoid INVALID_STATE_ERR
                this.rotationCanvas.width = this.img.width || 1;
                this.rotationCanvas.height = this.img.height || 1;

                rContext.save();
                rContext.translate(this.halfWidth(), this.halfHeight());
                rContext.rotate(this.rotation);
                rContext.translate(-this.halfWidth(), -this.halfHeight());
                rContext.drawImage(this.img, 0, 0);
                rContext.restore();

                context.drawImage(this.rotationCanvas, this.position.x - (camX * this.scrollFactorX), this.position.y - (camY * this.scrollFactorY));
            }
        },

        handleCollision: function (collision) {
            if (collision.y == true) {
                this.velocity.y = 0;
                this.position.y = collision.position.y;
            }
            if (collision.x == true) {
                this.velocity.x = 0;
                this.position.x = collision.position.x;
            }
        },

        getBounds: function () {
            return new ExstoEngine.Base.Rectangle(this.position.x, this.position.y, this.width, this.height);
        }
    });

});