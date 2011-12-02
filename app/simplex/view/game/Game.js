Ext.define('Simplex.view.game.Game', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.game',
	bodyCls: 'game-panel',
	
	requires: [
       'Simplex.view.game.GameDDProxy'
    ],
	
	border: 0,
	
	html: '<canvas id="game"></canvas>'
});