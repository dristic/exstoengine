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
				selections, defaultSelection, bgImage, logoImage, options) {
			this.selections = selections;
			this.currentSelection = defaultSelection;
			
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
				controls: {
				  moveUp: 'up',
				  moveDown: 'down',
				  activate: 'use',
				  updateSelection: 'move'
				}
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
			
			ex.extend(this.options, options);
			
			this.controller = ex.Input.getController(0);
			this.bindings = [
        {
          selector: this.options.controls.moveUp,
          action: ex.bind(this, this.moveUpMenu)
        }, {
          selector: this.options.controls.moveDown,
          action: ex.bind(this, this.moveDownMenu)
        }, {
          selector: this.options.controls.activate,
          action: ex.bind(this, this.activateCurrentSelection)
        }, {
          selector: this.options.controls.updateSelection,
          action: ex.bind(this, this.onMouseMove)
        }
      ];
			this._addInputBindings();
		},
		
		_addInputBindings: function() {
		  var index = this.bindings.length;
		  while(index--) {
		    this.controller.on(
	        this.bindings[index].selector, 
	        this.bindings[index].action);
		  }
		},
		
		_removeInputBindings: function() {
		  var index = this.bindings.length;
      while(index--) {
        this.controller.removeAction(
          this.bindings[index].selector, 
          this.bindings[index].action);
      }
		},
		
		onMouseMove: function(dt, data) {
		  if(data){
		    var index = this.selections.length;
        while(index--){
          if(data.position.x > (this.options.menu.x - this.options.selection.width) &&
              data.position.x < (this.options.menu.x + this.options.selection.width) &&
              data.position.y > (this.options.menu.y + (this.options.selection.height * (index - 1))) &&
              data.position.y < (this.options.menu.y + (this.options.selection.height * (index)))){
            this.selections[this.currentSelection].options.color = '#00FF00';
            this.currentSelection = index;
            this.selections[this.currentSelection].options.color = '#FF0000';
          }
        }
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
		
		activateCurrentSelection: function() {
		  this.selections[this.currentSelection].action();
		},
		
		/**
		 * The update loop where user input is checked
		 * @function
		 * @name update
		 * @memberOf ex.display.ui.TitleMenu
		 * @param {Number} dt timestep
		 */
		update: function(dt) {
		  
		}
	});
});