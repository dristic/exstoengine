Ext.define('Simplex.controller.Menu', {
	extend: 'Ext.app.Controller',
	
	views: [
        'menu.Panel',
        'menu.TileView',
        'menu.LayerPanel'
    ],
    
    refs: [
       { ref: 'layerList', selector: 'layerlist' }
    ],
    
	init: function () {
		this.activeLayer = null;	// keeps track of which layer is active
		this.control({			
			"layerlist": {
				itemclick: function(view, record, item, index, e, eOpts){
					if(e.target.type == 'checkbox') {
						this.onCheckboxClick(e.target);
					}
				},
				
				selectionchange: this.onSelectionChange
			}
		});
	},
	
	/**
	 * Sets the active layer to the current selection
	 * @param e
	 */
	onSelectionChange: function (e) {
//		var editor = this.getController('Game');
//		var records = this.getLayerList().getSelectionModel().getSelection();
//		var index = 0;
//		for(index; index < records.length; index++){
//			editor.toggleLayer(records[index].get('layerId'));
//		}
	},
	
	/**
	 * Enables and disables visiblity of the layer associated with
	 * the checkbox based on its value.
	 * @param checkbox
	 */
	onCheckboxClick: function (checkbox) {
		var editor = this.getController('Game');
		if(checkbox.checked){
			editor.showLayer(checkbox.name);
		} else {
			editor.hideLayer(checkbox.name);
		}
	}
});