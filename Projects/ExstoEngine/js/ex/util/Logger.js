(function () {
	ex.namespace("ex.util");
	
	var Logger = new ex.Class({
		constructor: function() {
			this.textLog = "--Logger Enabled \n";
		},
		
		log: function(message) {
			this.textLog += "- " + message + "<br />";
		}
	});
	
	window.ex.util.Logger = Logger;
	
}());
