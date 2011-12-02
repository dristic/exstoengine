Ext.define('ExSocket.controller.Main', {
	extend: 'Ext.app.Controller',
	
	views: [
        'Viewport',
        'Header',
        'login.Login',
        'room.List',
        'game.Panel'
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
        			formContainer.destroy();
        			login(form.getValues(), this.afterLogin, this);
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
		this.getContentPanel().down('#join-button').addListener('click', this.joinRoom, this);
	},
	
	joinRoom: function () {
    	var selection = this.getContentPanel().down('room-list').getSelectionModel().getSelection()[0];
    	joinRoom(selection.data.name, this.afterJoinRoom, this);
    },
	
	afterJoinRoom: function () {
		var gridPanel = this.getContentPanel().down('room-list');
		
		gridPanel.getEl().fadeOut({
			duration: 200,
			callback: function () {
				//var viewport = this.getViewport();
				//viewport.removeAll();
				//viewport.destroy();
				//Ext.select('.x-box-inner').destroy();
				
				this.getContentPanel().add({
					xtype: 'game-panel'
				});
				startGame(Ext.get('game-canvas').dom);
			},
			scope: this
		});
	}
});