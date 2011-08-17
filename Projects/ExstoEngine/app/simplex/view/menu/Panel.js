Ext.define('Simplex.view.menu.Panel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.menu',
	requires: [
	    'Simplex.view.menu.TileView',
	    'Ext.layout.container.Border'
	],
	
	views: ['menu.tileview'],
	
	layout: 'fit',
	title: 'Toolbox',
	width: 250,
	
	initComponent: function() {
		this.callParent(arguments);
	}

});