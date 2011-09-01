Ext.define('Simplex.controller.Menu', {
	extend: 'Ext.app.Controller',
	
	views: [
        'menu.Panel',
        'menu.TileView',
        'menu.LayerPanel',
        'menu.ItemPanel'
    ],
    
    refs: [
       { ref: 'layerList', selector: 'layerlist' },
       { ref: 'itemList', selector: 'itemlist' }
    ],
    
	init: function () {
		this.control({			
			"layerlist": {
				itemclick: function(view, record, item, index, e, eOpts){
					if(e.target.type == 'checkbox') {
						this.onLayerCheckboxClick(e.target);
					}
				},
				
				selectionchange: this.onLayerSelectionChange
			},
			
			"itemlist": {
				itemclick: function(view, record, item, index, e, eOpts){
					if(e.target.type == 'checkbox') {
						this.onItemCheckboxClick(e.target);
					}
				},
				
				selectionchange: this.onItemSelectionChange,
			}
		});
	},
	
	/**
	 * Sets the active layer to the current selection
	 * @param e
	 */
	onLayerSelectionChange: function () {
		var editor = this.getController('Game');
		var records = this.getLayerList().getSelectionModel().getSelection();
		editor.setActiveLayer(records[0].get('layerId'));
	},
	
	/**
	 * Enables and disables visiblity of the layer associated with
	 * the checkbox based on its value.
	 * @param checkbox
	 */
	onLayerCheckboxClick: function (checkbox) {
		var editor = this.getController('Game');
		if(checkbox.checked){
			editor.showLayer(checkbox.name);
		} else {
			editor.hideLayer(checkbox.name);
		}
	},
	
	onItemSelectionChange: function() {
		var editor = this.getController('Game');
		var records = this.getItemList().getSelectionModel().getSelection();
		editor.setActiveItem(records[0].get('itemId'));
	},
	
	onItemCheckboxClick: function(checkbox){
		var editor = this.getController('Game');
		if(checkbox.checked)
			editor.showItem(checkbox.name);
		else
			editor.hideItem(checkbox.name);
	}
});