ex.using([
  'ex.base.Component'
], function() {
	function average(array) {
		var ret = 0;
		
		var i = array.length;
		while(i--) {
			ret += array[i];
		}
		
		ret = ret / array.length;
		
		return ret;
	}
	
	ex.define("ex.util.Debug", ex.base.Component, {
		constructor: function() {
			this.domElement = document.createElement("div");
			this.domElement.style.backgroundColor = "#222526";
			this.domElement.style.opacity = "0.9";
			this.domElement.style.border = "1px solid #ffbb6e";
			this.domElement.style.color = "#f28d00";
			this.domElement.style.fontSize = "10pt";
			this.domElement.style.position = "fixed";
			this.domElement.style.bottom = "5px";
			this.domElement.style.right = "5px";
			this.domElement.style.padding = "5px";
			
			this.logged = [];
			
			this.name = "Debug";
			this.renderer = null;
			
			//--Create logger box
			this.logger = null;
			this.loggerElement = document.createElement("div");
			this.loggerElement.style.backgroundColor = "#111111";
			this.loggerElement.style.padding = "5px";
			this.loggerElement.style.color = "#FFFFFF";
			this.loggerElement.style.maxHeight = "150px";
			this.loggerElement.style.maxWidth = "200px";
			this.loggerElement.style.overflow = "auto";
			
			this.writeLog = document.createElement("input");
			this.writeLog.type = "checkbox";
			this.writeLog.name = "writeLog";
			this.writeLog.value = "checked";
			this.writeLog.id = "writeLog";
			this.loggerElement.appendChild(this.writeLog);
			
			document.body.appendChild(this.domElement);
		},
		
		update: function(dt) {
			this._super("update", [dt]);
			
			this.logged.push(dt);
			if(this.logged.length > 20) {
				this.logged.shift();
			}
			var ms = average(this.logged);
			
			var fps = Math.floor(1 / ms);
			
			this.domElement.innerHTML = "<b>" + fps + " fps </b>";
			this.domElement.innerHTML += " | " + Math.floor(ms * 1000) + " ms";
			
			if(this.renderer != null) {
				this.domElement.innerHTML += " | " + this.renderer.renderables.length + " sprites";
			}
			
			if(this.logger != null) {
				this.domElement.innerHTML += " | Console ";
				this.domElement.appendChild(this.writeLog);
				
				if(this.writeLog.checked == true) {
					this.loggerElement.innerHTML = this.logger.textLog;
					this.domElement.appendChild(this.loggerElement);
					this.loggerElement.scrollTop = this.loggerElement.scrollHeight;
				}
			}
		}
	});
});
