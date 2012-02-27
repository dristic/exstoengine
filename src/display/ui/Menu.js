ex.using([
  'ex.display.Sprite',
  'ex.event.EventTarget',
  'ex.display.Text',
  'ex.display.Renderable'
], function() { 
  ex.define("ex.display.ui.Menu", {
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
        controller: null,
        controls: {
          up: 'up',
          down: 'down',
          activate: 'activate',
          click: 'click'
        }
      };
      
      this.enabled = true;
      
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
      this._addInputBindings();
    },
    
    addItem: function (item, action) {
      this.options.items.push({
        item: item,
        action: action
      });
      this.items.push(item);
    },
    
    removeItem: function (item) {
      ex.Array.remove(this.items, item);
      
      var i = 0,
          ln = this.options.items.length;
      for(; i != ln; i++) {
        if(this.options.items[i].item == item) {
          this.options.items.splice(i, 1);
        }
      }
    },
    
    enable: function () {
      this.enabled = true;
    },
    
    disable: function () {
      this.enabled = false;
    },
    
    _addInputBindings: function () {
      if(this.options.controller) {
        if(this.options.controls.up) 
          this.options.controller.bindAction('pressed', this.options.controls.up, ex.bind(this, this.moveUpMenu));
        if(this.options.controls.down) 
          this.options.controller.bindAction('pressed', this.options.controls.down, ex.bind(this, this.moveDownMenu));
        if(this.options.controls.activate)
          this.options.controller.bindAction('pressed', this.options.controls.activate, ex.bind(this, this.activateCurrentSelection));
        if(this.options.controls.click)
          this.options.controller.bindAction('pressed', this.options.controls.click, ex.bind(this, this.onClick));
      }
    },
    
    _removeInputBindings: function() {
      if(this.options.controller) {
        if(this.options.controls.up) 
          this.options.controller.unbindAction('pressed', this.options.controls.up, ex.bind(this, this.moveUpMenu));
        if(this.options.controls.down) 
          this.options.controller.unbindAction('pressed', this.options.controls.down, ex.bind(this, this.moveDownMenu));
        if(this.options.controls.activate)
          this.options.controller.unbindAction('pressed', this.options.controls.activate, ex.bind(this, this.activateCurrentSelection));
        if(this.options.controls.click)
          this.options.controller.unbindAction('pressed', this.options.controls.click, ex.bind(this, this.onClick));
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
      if(this.enabled) {
        var selection = this.options.items[this.currentSelection];
        
        if(selection.action) {
          selection.action(selection.item);
        }
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
      if(this.enabled) {
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
    }
  });
});