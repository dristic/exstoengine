Ext.define('Simplex.view.menu.ItemPanel', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.itempanel',
	
	requires: [
       'Simplex.view.menu.ItemList'
	],
	
	title: 'Items',
	margin: '0 0 10 0',
	
	items: [{
		xtype: 'toolbar',
		items: [{
		    xtype: 'button',
		    text: 'Add',
		    icon: 'resources/icons/16x16/Plus.png'
		}, {
		    xtype: 'button',
		    text: 'Remove',
		    icon: 'resources/icons/16x16/Minus.png'
		}]
	}, {
		xtype: 'itemlist'
	}]
});