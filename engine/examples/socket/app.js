Ext.Loader.setConfig({ enabled: true });

Ext.application({
    name: 'ExSocket',
    
    controllers: [
      'Main'
    ],
    
    launch: function () {
    	Ext.create('ExSocket.view.Viewport');
    }
});