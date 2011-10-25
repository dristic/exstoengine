ex.using([

], function () {
	ex.define('ex.novus.NovusClient', {
		constructor: function (url) {
			this.url = url;
			this.socket = io.connect('http://localhost:8080');
		},
		
		login: function (name) {
			this.socket.emit('login', { name: name });
		},
		
		createRoom: function(name) {
			this.socket.emit('createRoom', { name: name });
		}
	});
});