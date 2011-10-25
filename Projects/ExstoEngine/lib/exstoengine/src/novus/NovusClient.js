ex.using([

], function () {
	ex.define('ex.novus.NovusClient', {
		constructor: function (url) {
			this.url = url;
			this.socket = io.connect('http://localhost:8080');
			
			var that = this;
			this.socket.on('login', function (data) {
				that.callback(data.success);
			});
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
		}
	});
});