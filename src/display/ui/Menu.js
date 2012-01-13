ex.using([
  'ex.display.Sprite',
  'ex.base.Component',
  'ex.event.EventTarget',
  'ex.display.Text'
], function() { 
  ex.define("ex.display.ui.Menu", ex.base.Component, {
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
        controls: {
          moveUp: 'up',
          moveDown: 'down',
          activate: 'use'
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
        }
      ];
      this._addInputBindings();
    },
    
    _addInputBindings: function() {
      var index = this.bindings.length;
      while(index--) {
        this.controller.bindAction(
          'pressed',
          this.bindings[index].selector, 
          this.bindings[index].action);
      }
    },
    
    _removeInputBindings: function() {
      var index = this.bindings.length;
      while(index--) {
        this.controller.unbindAction(
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
    
    activateCurrentSelection: function(dt, data) {
      
      // if mouse or touch event
      if(data != null) {
        console.log("mouse event");
        if(this._isPointerOnCurrentSelection(data.position)) {
          this.options.items[this.currentSelection].action();
        }
      } else { // if key event
        console.log("key event");
        this.options.items[this.currentSelection].action();
      }
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
    
    _isPointerOnCurrentSelection: function(position) {
      var selection = this.options.items[this.currentSelection];
      console.log("Mouse", position.x, position.y, 
          "Selection", selection.item.position.x, selection.item.position.y);
      if(position.x > selection.item.position.x
          && position.x < selection.item.position.x + selection.item.width
          && position.y > selection.item.position.y
          && position.y < selection.item.position.y + selection.item.height) {
        return true;
      } else {
        return false;
      }
    },
    
    _throwNotRenderableError: function (item) {
      ex.Debug.log(
          "Menu item passed in does not extend Renderable: " + item,
          'ERROR');
    }
  });
});