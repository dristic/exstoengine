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
//			"layerlist": {
//				// Set active layer
//				selectionchange: this.onSelectionChange
//			},
			
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
	
	onSelectionChange: function (e) {
		var editor = this.getController('Game');
		var records = this.getLayerList().getSelectionModel().getSelection();
		var index = 0;
		for(index; index < records.length; index++){
			editor.toggleLayer(records[index].get('layerId'));
		}
	},
	
	onCheckboxClick: function (checkbox) {
		var editor = this.getController('Game');
		if(checkbox.checked){
			editor.showLayer(checkbox.name);
		} else {
			editor.hideLayer(checkbox.name);
		}
	}
});