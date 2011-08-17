Ext.define('Simplex.view.game.Game', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.game',
	bodyCls: 'game-panel',
	
	requires: [
       'Simplex.view.game.GameDDProxy'
    ],
	
	border: 0,
	
	html: '<canvas id="game"></canvas>',
	
	initEvents: function () {
		this.dd = Ext.create('Simplex.view.game.GameDDProxy', 'game', 'game', {
			
		});
		
		this.callParent(arguments);
	}
});