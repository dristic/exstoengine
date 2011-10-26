Ext.onReady(function () {
	var loginPanel = Ext.create('Ext.form.Panel', {
	    title: 'Login',
	    bodyPadding: 5,
	    id: 'login-form',

	    // Fields will be arranged vertically, stretched to full width
	    layout: 'anchor',
	    defaults: {
	        anchor: '100%'
	    },

	    // The fields
	    defaultType: 'textfield',
	    items: [{
	        fieldLabel: 'User Name',
	        name: 'username',
	        allowBlank: false
	    },{
	        fieldLabel: 'Password',
	        name: 'password',
	        inputType: 'password',
	        allowBlank: false
	    }],

	    // Reset and Submit buttons
	    buttons: [{
	        text: 'Reset',
	        handler: function() {
	            this.up('form').getForm().reset();
	        }
	    }, {
	        text: 'Submit',
	        handler: function() {
	            var form = this.up('form').getForm();
	            if (form.isValid()) {
	            	Ext.get('login-form').fadeOut({
	            		duration: 500
	            	});
	            	setTimeout(function () {
	            		var viewport = Ext.getCmp('viewport');
	            		viewport.removeAll();
	            		viewport.destroy();
	            		Ext.select('.x-box-inner').destroy();
	            	}, 500);
	                login(form.getValues());
	            }
	        }
	    }]
	});
	
	Ext.create('Ext.container.Viewport', {
		id: 'viewport',
		layout: {
			type: 'vbox',
			align: 'center',
			pack: 'center'
		},
		items: [
	        loginPanel
        ]
	});
	
});

var client;

function login(data) {
	ex.using([
	      "ex.novus.NovusClient"
	  ], function () {
		client = new ex.novus.NovusClient('http://localhost:8080');
		client.login(data.username, data.password, function (success) {
			if(success == true) {
				client.createRoom('AwesomeRoom');
				startGame();
			}
		});
	});
};

function startGame() {
	ex.using([
          "ex.Engine",
          "ex.display.AnimatedSprite",
          "ex.world.World",
          "ex.world.CollisionMap",
          "ex.display.SpriteMap",
          "ex.display.Emitter",
          "ex.plugins.Emitter2",
          "ex.sound.Sound"
          	], 
  	function () {
		//--Startup new engine
		var _engine = new ex.Engine(800, 500, 40);
		
		//--Setup rendering
		_engine.setupCanvas("#000000");
		_engine.enableDebugging();
		
		//--Setup input
		_engine.input.listenOn(_engine.renderer.canvas);
		
		//--Open base world
		_engine.openWorld(ex.world.World);
		
		_engine.onUpdate = function () {
			if(_engine.input.isKeyDown(ex.util.Key.Spacebar)) {
				client.message('testing!');
			}
		};
	});
};