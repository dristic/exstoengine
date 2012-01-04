ex.using([
  'ex.base.GlobalComponent',
  'ex.util.Logger'
], function() {
	// Local private
	var timeLog = {};
	
	ex.define("ex.util.Debug", ex.base.GlobalComponent, {
		__alias: 'ex.Debug',
	  
		__statics: {
			componentName: 'Debug',
			
			DOM: 0,
			BROWSER: 1,
			
			_enabled: false,
			_loggingLevel: 5,
			logTime: 3,
			logger: new ex.util.Logger(ex.util.Logger.BROWSER),
			
			enable: function (loggingType, loggingLevel) {
				ex.util.Debug._enabled = true;
				ex.util.Debug._createDebugWindow();
				
				if(loggingType == ex.util.Debug.DOM) {
				  ex.util.Debug.logger.enableDOM(ex.util.Debug.loggerElement);
				  this.domElement.style.display = 'inherit';
				}
				
				ex.util.Debug.logger.loggingType = loggingType;
				ex.util.Debug.logger.loggingLevel = loggingLevel;
			},
			
			// Time tracking
			time: function (name, instant) {
				var time = timeLog[name];
				if(time == null) {
					time = {
						currentTime: null,
						timer: new Date(),
						log: []
					};
					timeLog[name] = time;
				}
				
				if(time.currentTime == null) {
					time.currentTime = new Date();
				} else {
					var endTime = new Date(),
						ms = endTime - time.currentTime;
					
					time.log.push(ms);
					if(time.log.length > 5) {
						time.log.pop();
					}
					
					if(endTime - time.timer > ex.util.Debug.logTime * 1000 || instant == true) {
						ex.util.Debug.log('Time[' + name + ']: ' + ex.Array.average(time.log) + 'ms', ex.util.Logger.LEVEL.DEBUG);
						time.timer = endTime;
					}
					
					time.currentTime = null;
				}
			},
			
			log: function (message, loggingLevel) {
			  ex.util.Debug.logger.log(message, ex.util.Logger.LEVEL[loggingLevel]);
			},
			
			benchmarkEngine: function (dt) {
				if(this._enabled == false){
					return;
				}
				
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
				
				debug.domElement.style.display = 'none';
				document.body.appendChild(debug.domElement);
			}
		}
	});
});
