ex.using([

], function () {
	ex.define('ex.novus.NovusClient', {
		constructor: function (url) {
			this.url = url;
			this.socket = io.connect(url);
			this.listeners = {};
			
			var that = this;
			
			this.socket.on('login', function (data) {
				that.callback(data.success);
			});
			
			this.socket.on('roomMessage', function(data) {
				var callbacks = this.listeners[data.type] || [];
				callbacks.forEach(function (callback, index, array) {
					callback(data.message);
				});
			});
		},
		
		on: function(message, callback) {
			if(typeof this.listeners[message] == "undefined") {
				this.listeners[message] = [];
			}
			
			this.listeners[message].push(callback);
		},
		
		login: function (name, password, callback) {
			this.callback = callback;
			this.socket.emit('login', { name: name, password: password });
		},
		
		createRoom: function(name) {
			this.socket.emit('createRoom', { name: name });
		},
		
		joinRoom: function(name) {
			this.socket.emit('joinRoom', { name: name });
		},
		
		leaveRoom: function() {
			this.socket.emit('leaveRoom', {});
		},
		
		message: function(type, message) {
			this.socket.emit('roomMessage', { type: type, message: message });
		},
		
		messageTo: function (name, type, message) {
			this.socket.emit('roomMessageTo', { name: name, type: type, message: message });
		}
	});
});