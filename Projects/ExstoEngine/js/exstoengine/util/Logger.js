(function () {

	var Logger = new ExstoEngine.Base.Class(null, {
		constructor: function() {
			this.textLog = "--Logger Enabled \n";
		},
		
		log: function(message) {
			this.textLog += "- " + message + "<br />";
		}
	});
	
	window.ExstoEngine.Util.Logger = Logger;
	
}());
