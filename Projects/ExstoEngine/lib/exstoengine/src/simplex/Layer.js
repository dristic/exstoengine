/**
 * @class The collection of all items at a certain z-index in a map.
 * 
 * @param name
 *            {String}: the name of the layer (mostly for labeling in the IDE)
 * @param items
 *            {Array}: an array of all items in the layer
 * @param visible
 *            {Boolean}: allows rendering if true
 * @param opacity
 *            {Number}: ranges from 0.0 - 1.0, this is the transparency of the
 *            layer
 * @param position
 *            {ex.base.Point}: the starting location of the layer, used for
 *            rendering
 * @param scrollFactor
 *            {ex.base.Vector}: the multiplier for the amount of scroll per
 *            pixel moved by the camera, can be used to simulate depth of field.
 */
ex.using([ 'ex.base.Point', 'ex.base.Vector' ], function() {
	ex.define("ex.simplex.Layer", {

		/**
		 * creates a new layer with base attributes
		 * 
		 * @param $name
		 *            {String}: name of the layer (mostly for IDE purposes)
		 * @param $origin
		 *            {ex.base.Point}: origin of the layer, defaults to (0,0) if
		 *            not supplied
		 * @param $scrollFactor
		 *            {ex.base.Vector}: a multiplier that affects the scroll
		 *            rate relative to the camera
		 * @constructor
		 */
		constructor : function($name, $origin, $scrollFactor) {
			this.name = $name;
			this.items = [];
			this.visible = true;
			this.opacity = 1.0;

			if ($origin == null) {
				this.position = new ex.base.Point(0, 0);
			} else {
				this.position = $origin;
			}

			if ($scrollFactor == null) {
				this.scrollFactor = new ex.base.Vector(1, 1);
			} else {
				this.scrollFactor = $scrollFactor;
			}
		},

		/**
		 * adds an item to the layer, could be anything really...
		 * 
		 * @param $item
		 *            {Object}: something that belongs in the layer
		 */
		addItem : function($item) {
			$item.visible = this.visible;
			$item.opacity = this.opacity;
			this.items.push($item);
		},

		/**
		 * performs actions every time period dt
		 * 
		 * @param $dt
		 *            {Number}: delta time, length of each time cycle
		 */
		update : function($dt) {

		},

		/**
		 * checks properties and determines if layer is visible
		 * 
		 * @returns {Boolean}
		 */
		isVisible : function() {
			if (this.visible && this.opacity > 0.0) {
				return true;
			} else {
				return false;
			}
		},

		/**
		 * toggles visibility of the layer
		 */
		toggleVisibility: function() {
			if(this.visible)
				this.hide();
			else
				this.show();
		},
		
		/**
		 * sets visible property to true, does not affect opacity.
		 */
		show : function() {
			this.visible = true;
		},

		/**
		 * sets visible property to false, does not affect opacity.
		 */
		hide : function() {
			this.visible = false;
		},

		/**
		 * Supplies a canvas context and camera offset to each item and calls
		 * their render functions
		 * 
		 * @param $context
		 *            {Context}: canvas context to draw with
		 * @param $camX
		 *            {Number}: camera offset on x
		 * @param $camY
		 *            {Number}: camera offset on y
		 */
		render : function($context, $camX, $camY) {
			if (!this.isVisible()) // Don't render if it won't be seen
				return;

			var count = this.items.length;
			while (count--) {
				this.items[count].render($context, $camX * this.scrollFactor.x, $camY * this.scrollFactor.y);
			}
		}
	});
});