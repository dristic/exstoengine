Ext.define('Simplex.view.menu.ItemList', {
	extend: "Ext.view.View",
	alias : 'widget.itemlist',
	requires: [
   	    'Ext.data.Store'
   	],
   	
   	width: 250,
   	tpl: [
   	    '<tpl for=".">',
   	    	'<div class="item">',
   	    		'<input type="checkbox" name={itemId} checked=true/>{name}',
   	    	'</div>',
   	    '</tpl>'
   	],
   	
   	itemSelector: 'div.item',
   	singleSelect: true,
   	multiSelect: false,
   	cls: 'x-layer-list',
   	autoScroll: true,
   	
   	initComponent: function() {
   		this.store = Ext.create('Ext.data.Store', {
   			autoLoad: true,
   			fields	: ['itemId', 'name', 'visible'],
   			data	: [
   			    {itemId: 0, name: 'No items...', visible: true},
   			]
   		});
   		this.callParent();
   	}
});