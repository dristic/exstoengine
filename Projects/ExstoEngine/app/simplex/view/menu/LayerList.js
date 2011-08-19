Ext.define('Simplex.view.menu.LayerList', {
	extend: "Ext.view.View",
	alias : 'widget.layerlist',
	requires: [
   	    'Ext.data.Store'
   	],
   	
   	width: 250,
   	tpl: [
   	    '<tpl for=".">',
   	    	'<div class="tile">',
   	    		'<input type="checkbox" name="{name}" />{name}',
   	    	'</div>',
   	    '</tpl>'
   	],
   	
   	itemSelector: 'div.tile',
   	singleSelect: true,
   	multiSelect: false,
   	cls: 'x-layer-list',
   	autoScroll: true,
   	
   	initComponent: function() {
   		this.store = Ext.create('Ext.data.Store', {
   			autoLoad: true,
   			fields	: ['name'],
   			data	: [
   			    {name: 'Layer 1' },
   			    {name: 'Layer 2' }
   			]
   		});
   		this.callParent();
   	}
});