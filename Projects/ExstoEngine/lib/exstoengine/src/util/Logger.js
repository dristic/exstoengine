(function () {
	ex.define("ex.util.Logger", {
		statics: {
			BROWSER: 0,
			DOM: 1,
			MAX_LENGTH: 300,
			LEVEL: {
				ALL: 5,
				DEBUG: 4,
				INFO: 3,
				ERROR: 2,
				NONE: 1
			}
		},
		
		constructor: function(loggingType, level) {
			this.loggingType = loggingType;
			this.loggingLevel = level || 3;
			this.defaultLoggingLevel = 4;
			this.textLog = "--Logger Enabled \n";
			this.logs = [];
			
			for(var i = 0; i < 6; i++) {
				this.logs[i] = [];
			}
		},
		
		enableDOM: function (loggingElement) {
			this.loggingElement = this.defaultLoggingLevel;
			this.loggingType = ex.util.Logger.DOM;
		},
		
		log: function(message, level) {
			level = level || 4;
			this.logs[level].push({
				message: message,
				date: new Date().getTime()
			});
			
			if(this.loggingLevel >= level) {
				this.textLog += "- " + message + "<br />";
				if(this.loggingType == ex.util.Logger.BROWSER) {
					console.log(message);
				} else if(this.loggingType == ex.util.Logger.DOM) {
					this.textLog = this.textLog.substring(this.textLog.length - ex.util.Logger.MAX_LENGTH, this.textLog.length);
					this.loggingElement.innerHTML = this.textLog;
				}
			}
		}
	});
}());
