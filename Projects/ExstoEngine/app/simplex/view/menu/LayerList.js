Ext.define('Simplex.view.menu.LayerList', {
	extend: "Ext.view.View",
	alias : 'widget.layerlist',
	requires: [
   	    'Ext.data.Store'
   	],
   	
   	width: 250,
   	tpl: [
   	    '<tpl for=".">',
   	    	'<div class="layer">',
   	    		'<input type="checkbox" name={layerId} />{name}',
   	    	'</div>',
   	    '</tpl>'
   	],
   	
   	itemSelector: 'div.layer',
   	singleSelect: true,
   	multiSelect: false,
   	cls: 'x-layer-list',
   	autoScroll: true,
   	
   	initComponent: function() {
   		this.store = Ext.create('Ext.data.Store', {
   			autoLoad: true,
   			fields	: ['name', 'layerId'],
   			data	: [
   			    {name: 'Layer 1' , layerId: 0},
   			    {name: 'Layer 2' , layerId: 1},
   			    {name: 'Layer 3' , layerId: 2}
   			]
   		});
   		this.callParent();
   	}
});