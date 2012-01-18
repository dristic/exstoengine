ex.using([
  'ex.display.Sprite',
  'ex.event.EventTarget',
  'ex.display.Text',
  'ex.display.Renderable'
], function() { 
  ex.define("ex.display.ui.Menu", ex.display.Renderable, {
    constructor: function(options) {
      this.defaults = {
        items: [{
          item: null,
          action: null
        }],
        position: 'center',
        onOver: function (item) {},
        onOut: function (item) {},
        defaultSelection: 0,
        controller: ex.Input.getController(0),
        controls: {
          moveUp: 'up',
          moveDown: 'down',
          activate: 'use',
          click: 'click'
        }
      };
      
      this.options = {};
      ex.extend(this.options, this.defaults);
      ex.extend(this.options, options);
      
      this.currentSelection = this.options.defaultSelection;
      
      // Add each item's item to this object so it draws.
      this.items = [];
      var i = 0,
          ln = this.options.items.length,
          item;
      for(; i < ln; i++) {
        item = this.options.items[i].item;
        if(item instanceof ex.display.Renderable == false) {
          this._throwNotRenderableError(item);
        }
        this.items.push(item);
      }
      
      this._calculateOffset();
      
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
          selector: this.options.controls.click,
          action: ex.bind(this, this.onClick)
        }
      ];
      this._addInputBindings();
    },
    
    _addInputBindings: function() {
      var index = this.bindings.length;
      while(index--) {
        this.options.controller.bindAction(
          'pressed',
          this.bindings[index].selector, 
          this.bindings[index].action);
      }
    },
    
    _removeInputBindings: function() {
      var index = this.bindings.length;
      while(index--) {
        this.options.controller.unbindAction(
          'pressed',
          this.bindings[index].selector, 
          this.bindings[index].action);
      }
    },
    
    /**
     * Calculates viewable browser window width and height,
     * then calculates the required offset on the menu
     */
    _calculateOffset: function() {
      
    },
    
    /**
     * Moves the selection up by one if possible.
     * @function
     * @name moveUpMenu
     * @memberOf ex.display.ui.TitleMenu
     */
    moveUpMenu: function() {
      if(this.currentSelection != 0) {
        this.options.onOut(this.options.items[this.currentSelection].item);
        this.currentSelection--;
        this.options.onOver(this.options.items[this.currentSelection].item);
      }
    },
    
    /**
     * Moves the selection down by one if possible.
     * @function
     * @name moveDownMenu
     * @memberOf ex.display.ui.TitleMenu
     */
    moveDownMenu: function() {
      if(this.currentSelection < (this.options.items.length - 1)) {
        this.options.onOut(this.options.items[this.currentSelection].item);
        this.currentSelection++;
        this.options.onOver(this.options.items[this.currentSelection].item);
      }
    },
    
    onClick: function () {
      if(this.items[this.currentSelection].containsPoint(ex.Input.mouse.x, ex.Input.mouse.y)) {
        this.activateCurrentSelection();
      }
    },
    
    activateCurrentSelection: function() {
      this.options.items[this.currentSelection].action();
    },
    
    /**
     * The update loop where user input is checked
     * @function
     * @name update
     * @memberOf ex.display.ui.TitleMenu
     * @param {Number} dt timestep
     */
    update: function(dt) {
      var i = 0,
          ln = this.options.items.length,
          item,
          found = false;
      for(; i < ln; i++) {
        item = this.options.items[i].item;
        if(item.containsPoint(ex.Input.mouse.x, ex.Input.mouse.y)) {
          found = true;
          ex.Input.changeCursor(ex.Input.CURSOR.POINTER);
          this.options.onOut(this.options.items[this.currentSelection].item);
          this.currentSelection = i;
          this.options.onOver(this.options.items[this.currentSelection].item);
        }
      }
      
      // Change the cursor back if we need to.
      if(found == false && ex.Input.getCursorType() == ex.Input.CURSOR.POINTER) {
        ex.Input.changeCursor(ex.Input.CURSOR.AUTO);
      }
    },
    
    _throwNotRenderableError: function (item) {
      ex.Debug.log(
          "Menu item passed in does not extend Renderable: " + item,
          'ERROR');
    },
    
    destroy: function () {
      ex.Input.changeCursor(ex.Input.CURSOR.AUTO);
      
      this._super('destroy');
    }
  });
});