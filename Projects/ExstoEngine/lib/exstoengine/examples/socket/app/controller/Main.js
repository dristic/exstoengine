Ext.define('ExSocket.controller.Main', {
	extend: 'Ext.app.Controller',
	
	views: [
        'Viewport',
        'Header',
        'login.Login',
        'room.List'
	],
	
	stores: [
        'Rooms'
	],
	
	refs: [
       { ref: 'viewport', selector: 'viewport' },
       { ref: 'contentPanel', selector: '#content-panel' }
    ],
	
	init: function () {
		var that = this;
		this.control({
			'viewport': {
				afterrender: function () {
					that.getContentPanel().add({
						xtype: 'login-form'
					});
					that.getContentPanel().down('#login-button').addListener('click', that.login, that);
				}
			}
		});
	},
	
	login: function () {
		var form = this.getViewport().down('form').getForm();
        if (form.isValid()) {
        	var formContainer = this.getViewport().down('login-form');
        	
        	formContainer.getEl().fadeOut({
        		duration: 200,
        		callback: function () {
        			login(form.getValues(), this.afterLogin, this);
        			formContainer.destroy();
        		},
        		scope: this
        	});
        }
	},
	
	afterLogin: function (roomList) {
		var store = Ext.create('ExSocket.store.Rooms');
		store.loadData(roomList);
		
		this.getContentPanel().add({
			xtype: 'room-list',
			store: store
		});
	}
});