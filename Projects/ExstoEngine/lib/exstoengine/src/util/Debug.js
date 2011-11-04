ex.using([
  'ex.base.GlobalComponent',
  'ex.util.Logger'
], function() {
	// Local private
	var times = {};
	
	ex.define("ex.util.Debug", ex.base.GlobalComponent, {
		statics: {
			componentName: 'Debug',
			
			_enabled: false,
			_loggingLevel: 5,
			logger: new ex.util.Logger(ex.util.Logger.BROWSER),
			
			enable: function (loggingLevel) {
				ex.util.Debug._enabled = true;
				ex.util.Debug._createDebugWindow();
				ex.util.Debug.logger.enableDOM(ex.util.Debug.loggerElement);
				
				ex.util.Debug.logger.loggingLevel = loggingLevel;
			},
			
			// Time tracking
			time: function (name) {
				if(times[name] == null) {
					times[name] = new Date();
				} else {
					var endTime = new Date(),
						ms = endTime - times[name];
					
					ex.util.Debug.log('Time: ' + name + ' ' + ms + 'ms');
					times[name] = null;
				}
			},
			
			log: function (message) {
				ex.util.Debug.logger.log(message);
			},
			
			benchmarkEngine: function (dt) {
				var debug = ex.util.Debug;
				
				debug.logged.push(dt);
				if(debug.logged.length > 20) {
					debug.logged.shift();
				}
				var ms = ex.Array.average(debug.logged);
				
				var fps = Math.floor(1 / ms);
				
				debug.benchmarkElement.innerHTML = "<b>" + fps + " fps </b>";
				debug.benchmarkElement.innerHTML += " | " + Math.floor(ms * 1000) + " ms";
			},
			
			_createDebugWindow: function () {
				var debug = ex.util.Debug;
				debug.domElement = document.createElement("div");
				debug.domElement.id = "debug";
				debug.domElement.style.backgroundColor = "#222526";
				debug.domElement.style.opacity = "0.9";
				debug.domElement.style.border = "1px solid #ffbb6e";
				debug.domElement.style.color = "#f28d00";
				debug.domElement.style.fontSize = "10pt";
				debug.domElement.style.position = "fixed";
				debug.domElement.style.bottom = "5px";
				debug.domElement.style.right = "5px";
				debug.domElement.style.padding = "5px";
				
				debug.benchmarkElement = document.createElement('div');
				debug.domElement.appendChild(debug.benchmarkElement);
				
				debug.logged = [];
				
				//--Create logger box
				debug.loggerElement = document.createElement("div");
				debug.loggerElement.style.backgroundColor = "#111111";
				debug.loggerElement.style.padding = "5px";
				debug.loggerElement.style.color = "#FFFFFF";
				debug.loggerElement.style.maxHeight = "150px";
				debug.loggerElement.style.maxWidth = "200px";
				debug.loggerElement.style.overflow = "auto";
				
				debug.writeLog = document.createElement("input");
				debug.writeLog.type = "checkbox";
				debug.writeLog.name = "writeLog";
				debug.writeLog.value = "logger";
				debug.writeLog.checked = "checked";
				debug.writeLog.id = "writeLog";
				debug.domElement.appendChild(debug.writeLog);
				debug.domElement.appendChild(debug.loggerElement);
				
				document.body.appendChild(debug.domElement);
			}
		}
	});
	
	// Alias the debugger
	ex.Debug = ex.util.Debug;
});
