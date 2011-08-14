(function () {
	ex.define("ex.util.Logger", {
		constructor: function() {
			this.textLog = "--Logger Enabled \n";
		},
		
		log: function(message) {
			this.textLog += "- " + message + "<br />";
		}
	});
}());
