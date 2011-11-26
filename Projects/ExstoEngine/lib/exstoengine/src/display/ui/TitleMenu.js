ex.using([
  'ex.display.Sprite',
  'ex.base.Component',
  'ex.event.EventTarget',
  'ex.display.Text'
], function() {	
	ex.define("ex.display.ui.TitleMenu", ex.base.Component, {
		/**
		 * Creates a title menu with background, logo, selection options,
		 * and input bindings.
		 * @name ex.display.ui.TitleMenu
		 * @param {Object} selections a selection object (text, action pair)
		 * @param {Number} defaultSelection starting selection index (0 based)
		 * @param {Image} bgImage image to use as the background
		 * @param {Image} logoImage image to use as the logo
		 * @param {ex.Input} input the input component of the engine.
		 * 
		 * @property {Object[]} selections The array of selections
		 * 		available on the menu.
		 * @property {Number} currentSelection The array index of
		 * 		the current selection.
		 * @property {ex.util.Input} listening input component.
		 * @property {Object} settings for orientation and selection events.
		 * 
		 * @constructor
		 */
		constructor: function(
				selections, defaultSelection, bgImage, logoImage, input) {
			this.selections = selections;
			this.currentSelection = defaultSelection;
			this.input = input;
			
			this.options = {
				background: new ex.display.Sprite(new ex.base.Vector(0, 0), bgImage),
				logo: new ex.display.Sprite(new ex.base.Vector(300, 100), logoImage),
				menu: {
					x: 100,
					y: 320,
					actionKey: ex.util.Key.Enter
				},
				selection: {
					width: 150,
					height: 70
				},
			};
			
			this.items = [
        this.options.background,
        this.options.logo
      ];
			
			// Add each selection as a renderable text item
			var i = 0,
			    ln = this.selections.length,
			    selection,
			    yPos = this.options.menu.y;
			
			for(; i < ln; i++) {
			  selection = this.selections[i];
			  this.items.push(new ex.display.Text(selection.text,
    	      {
    			    position: new ex.base.Vector(this.options.menu.x, yPos),
    	        maxWidth: null,
    	        color: i == defaultSelection ? '#FF0000' : '#00FF00',
    	        font: '32pt Arial',
    	        textAlign: 'left',
    	        prefix: '',
    	        suffix: ''
    			  }));
			  this.selections[i] = this.items[this.items.length - 1];
			  this.selections[i].action = selection.action;
			  yPos += 50;
			}
		},
		
		/**
		 * Moves the selection up by one if possible.
		 * @function
		 * @name moveUpMenu
		 * @memberOf ex.display.ui.TitleMenu
		 */
		moveUpMenu: function() {
			if(this.currentSelection != 0) {
			  this.selections[this.currentSelection].options.color = '#00FF00';
				this.currentSelection--;
				this.selections[this.currentSelection].options.color = '#FF0000';
			}
		},
		
		/**
		 * Moves the selection down by one if possible.
		 * @function
		 * @name moveDownMenu
		 * @memberOf ex.display.ui.TitleMenu
		 */
		moveDownMenu: function() {
			if(this.currentSelection < (this.selections.length - 1)) {
			  this.selections[this.currentSelection].options.color = '#00FF00';
				this.currentSelection++;
				this.selections[this.currentSelection].options.color = '#FF0000';
			}
		},
		
		/**
		 * The update loop where user input is checked
		 * @function
		 * @name update
		 * @memberOf ex.display.ui.TitleMenu
		 * @param {Number} dt timestep
		 */
		update: function(dt){
			if(this.input.isKeyPressed(this.options.menu.actionKey)) {
				this.selections[this.currentSelection].action();
			}
			
			if(this.input.isKeyPressed(ex.util.Key.Up)) {
				this.moveUpMenu();
			}
			
			if(this.input.isKeyPressed(ex.util.Key.Down)) {
				this.moveDownMenu();
			}
			
			if(this.input.mouseDown) {
				var index = this.selections.length;
				while(index--) {
					if(this.input.mouseX > (this.options.menu.x - this.options.selection.width) &&
							this.input.mouseX < (this.options.menu.x + this.options.selection.width) &&
							this.input.mouseY > (this.options.menu.y + (this.options.selection.height * (index - 1))) &&
							this.input.mouseY < (this.options.menu.y + (this.options.selection.height * (index)))) {
						this.selections[index].action();
					}
				}
			}
		}
	});
});