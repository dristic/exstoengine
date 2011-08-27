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
   	    		'<input type="checkbox" name={layerId} checked=true/>{name}',
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
   			fields	: ['layerId', 'name', 'visible'],
   			data	: [
   			    {layerId: 0, name: 'No map loaded...', visible: true},
   			]
   		});
   		this.callParent();
   	}
});