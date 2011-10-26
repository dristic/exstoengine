ex.using([

], function () {
	ex.define('ex.novus.NovusClient', {
		/**
		 * The client object to connect to a Novus node.js server.
		 * 
		 * @name ex.novus.NovusClient
		 * 
		 * @param {String} url The url to connect to.
		 * 
		 * @property {String} url The url of the server connected to.
		 * @property {Object} socket The socket.io socket connection.
		 * 
		 * @constructor
		 */
		constructor: function (url) {
			this.url = url;
			this.socket = io.connect(url);
			this.listeners = {};
			
			var that = this;
			
			this.socket.on('login', function (data) {
				that.callback(data.success);
			});
			
			this.socket.on('roomMessage', ex.bind(this, function(data) {
				var callbacks = this.listeners[data.type] || [];
				callbacks.forEach(function (callback, index, array) {
					callback(data.message);
				});
			}));
		},
		
		/**
		 * Allows a client to listen for a certain room message type and call a function
		 * when it receives that message.
		 * 
		 * @param {String} type The type to listen for.
		 * @param {Function} callback The function to call when we receive that message.
		 */
		on: function(message, callback) {
			if(typeof this.listeners[message] == "undefined") {
				this.listeners[message] = [];
			}
			
			this.listeners[message].push(callback);
		},
		
		/**
		 * Logs a user into the novus server using the given credentials.
		 * 
		 * Callback: void ({Boolean} success)
		 * 
		 * @param {String} name The user name to login as.
		 * @param {String} password The user's password.
		 * @param {Function} callback What to call upon logging in.
		 */
		login: function (name, password, callback) {
			this.callback = callback;
			this.socket.emit('login', { name: name, password: password });
		},
		
		/**
		 * Creates and joins a room on the server.
		 * 
		 * @param {String} name The name of the room. Must be unique.
		 */
		createRoom: function(name) {
			this.socket.emit('createRoom', { name: name });
		},
		
		/**
		 * Joins a room on the server.
		 * 
		 * @param {String} The name of the room to join.
		 */
		joinRoom: function(name) {
			this.socket.emit('joinRoom', { name: name });
		},
		
		/**
		 * Leaves the current room if the client is currently in one.
		 */
		leaveRoom: function() {
			this.socket.emit('leaveRoom', {});
		},
		
		/**
		 * Sends a message to every user in the same room.
		 * 
		 * @param {String} type The type of the message to send. This is the type that NovusClient.on looks for.
		 * @param {Object} message The data message to send.
		 */
		message: function(type, message) {
			this.socket.emit('roomMessage', { type: type, message: message });
		},
		
		/**
		 * Sends a message to the given username.
		 * 
		 * @param {String} name The user to send the message to.
		 * @param {Type} type The type of the message to send.
		 * @param {Object} message The data message to send.
		 */
		messageTo: function (name, type, message) {
			this.socket.emit('roomMessageTo', { name: name, type: type, message: message });
		}
	});
});