Ext.define('Simplex.view.menu.TileView', {
	extend: "Ext.view.View",
	alias : 'widget.tileview',
	requires: [
   	    'Ext.data.Store'
   	],
   	
   	title: 'Toolbox',
   	width: 250,
   	tpl: [
   	    '<tpl for=".">',
   	    	'<div class="tile">',
   	    		'<img src="resources/icons/48x48/{fileName}" />',
   	    	'</div>',
   	    '</tpl>'
   	],
   	
   	itemSelector: 'div.tile',
   	singleSelect: true,
   	multiSelect: false,
   	cls: 'x-image-view',
   	autoScroll: true,
   	
   	initComponent: function() {
   		this.store = Ext.create('Ext.data.Store', {
   			autoLoad: true,
   			fields	: ['fileName'],
   			data	: [
   			    {fileName: 'Save.png' },
   			    {fileName: 'Trash.png' }
   			]
   		});
   		this.callParent();
   	}
});