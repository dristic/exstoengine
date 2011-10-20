(function () {
	ex.define("ex.util.Logger", {
		statics: {
			BROWSER: 0,
			DOM: 1,
			MAX_LENGTH: 300
		},
		
		constructor: function(loggingType) {
			this.loggingType = loggingType;
			this.textLog = "--Logger Enabled \n";
		},
		
		enableDOM: function (loggingElement) {
			this.loggingElement = loggingElement;
			this.loggingType = ex.util.Logger.DOM;
		},
		
		log: function(message) {
			this.textLog += "- " + message + "<br />";
			
			if(this.loggingType == ex.util.Logger.BROWSER) {
				console.log(message);
			} else if(this.loggingType == ex.util.Logger.DOM) {
				this.textLog = this.textLog.substring(this.textLog.length - ex.util.Logger.MAX_LENGTH, this.textLog.length);
				this.loggingElement.innerHTML = this.textLog;
			}
		}
	});
}());
