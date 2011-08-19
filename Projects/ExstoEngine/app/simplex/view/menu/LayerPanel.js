Ext.define('Simplex.view.menu.LayerPanel', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.layerpanel',
	
	requires: [
       'Simplex.view.menu.LayerList'
	],
	
	title: 'Layers',
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
		xtype: 'layerlist'
	}]
});