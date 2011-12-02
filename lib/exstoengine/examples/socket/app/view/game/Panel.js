Ext.define('ExSocket.view.game.Panel', {
	extend: 'Ext.panel.Panel',
	xtype: 'game-panel',
		
	title: 'ExSocket Game',
	width: 800,
	height: 600,
	
	html: '<canvas width="800" height="600" id="game-canvas"></canvas>'
});