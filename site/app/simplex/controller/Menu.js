Ext.define('Simplex.controller.Menu', {
	extend : 'Ext.app.Controller',

	views : [ 'menu.Panel', 'menu.TileView', 'menu.LayerPanel',
			'menu.ItemPanel' ],

	refs : [ {
		ref : 'layerList',
		selector : 'layerlist'
	}, {
		ref : 'itemList',
		selector : 'itemlist'
	} ],

	init : function() {
		this.control({
			'layerpanel > toolbar button[text="Add"]' : {
				click : this.onAddLayer
			},

			'layerpanel > toolbar button[text="Remove"]' : {
				click : this.onRemoveLayer
			},

			'itempanel > toolbar button[text="Add"]' : {
				click : this.onAddItem
			},

			'itempanel > toolbar button[text="Remove"]' : {
				click : this.onRemoveItem
			},

			"layerlist" : {
				itemclick : function(view, record, item, index, e, eOpts) {
					if (e.target.type == 'checkbox') {
						this.onLayerCheckboxClick(e.target);
					}
				},

				selectionchange : this.onLayerSelectionChange
			},

			"itemlist" : {
				itemclick : function(view, record, item, index, e, eOpts) {
					if (e.target.type == 'checkbox') {
						this.onItemCheckboxClick(e.target);
					}
				},

				selectionchange : this.onItemSelectionChange,
			}
		});
	},

	/**
	 * Sets the active layer to the current selection
	 * 
	 * @param e
	 */
	onLayerSelectionChange : function() {
		var editor = this.getController('Game');
		var records = this.getLayerList().getSelectionModel().getSelection();
		if(records.length == 1){
			editor.setActiveLayer(records[0].get('layerId'));
		}
	},

	/**
	 * Enables and disables visiblity of the layer associated with the checkbox
	 * based on its value.
	 * 
	 * @param checkbox
	 */
	onLayerCheckboxClick : function(checkbox) {
		var editor = this.getController('Game');
		if (checkbox.checked) {
			editor.showLayer(checkbox.name);
		} else {
			editor.hideLayer(checkbox.name);
		}
	},

	/**
	 * Sets active item to the new selection
	 */
	onItemSelectionChange : function() {
		var editor = this.getController('Game');
		var records = this.getItemList().getSelectionModel().getSelection();
		if(records.length == 1){
			editor.setActiveItem(records[0].get('itemId'));
		}
	},

	/**
	 * Toggles visibility of item based on the checkbox value
	 * 
	 * @param checkbox
	 */
	onItemCheckboxClick : function(checkbox) {
		var editor = this.getController('Game');
		if (checkbox.checked)
			editor.showItem(checkbox.name);
		else
			editor.hideItem(checkbox.name);
	},

	/**
	 * Adds a new layer to the map
	 */
	onAddLayer : function() {
		var editor = this.getController('Game');
		editor.addLayer("new Layer!");
	},

	/**
	 * Removes the selected layer from the map
	 */
	onRemoveLayer : function() {
		var editor = this.getController('Game');
		editor.removeActiveLayer();
	},

	/**
	 * Adds an item to the layer
	 */
	onAddItem : function() {
		alert("add item clicked");
	},

	/**
	 * Removes the selected item from the layer
	 */
	onRemoveItem : function() {
		var editor = this.getController('Game');
		editor.removeActiveItem();
	}
});