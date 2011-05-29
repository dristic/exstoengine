(function (window) {
	"use strict";
	
	var _includeTypes = {
		Inline: "Inline",
		Ajax: "Ajax"
	};
	
	/**
	 * The main namespace for all engine classes and global functions.
	 * 
	 */
	var _ex = {
		bind: function (func, object) {
			return function() {
				return func.apply(object, arguments);
			};
		},
		
		//--Namespaces
		Base: {},
		Display: {},
		Util: {},
		World: {},
		
		includeTypes: {
			Inline: "Inline",
			Ajax: "Ajax"
		},
		includeType: _includeTypes.Inline,
		
		//--Includes an external JS file
		include: function (fileName) {
			//--If were passing in a list of includes, iterate through them
			if(typeof fileName == "object") {
				for(var i = 0; i < fileName.length; i++) {
					_ex.include(fileName[i]);
				}
			} else if(this.includeType == this.includeTypes.Ajax) {
				toLoad++;
				if(isLast == true) {
					last = true;
				}
				//--Use ajax call to grab file and append it to the document
				var xmlhttp;
				
				if(window.XMLHttpRequest) {
					//--If XML Http request is available (FF, Chrome, IE 8+)
					xmlhttp = new XMLHttpRequest();
				} else {
					//--If http request is not available (IE 6, 7)
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				}
				
				xmlhttp.onreadystatechange = function () {
					//--If the request was successful
					if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var oHead = document.getElementsByTagName('HEAD').item(0);
						var oScript = document.createElement( "script" );
						oScript.language = "javascript";
						oScript.type = "text/javascript";
						oScript.defer = true;
						oScript.text = xmlhttp.responseText;
						oHead.appendChild( oScript );
					}
				};
				
				xmlhttp.open("GET", fileName);
				xmlhttp.send();
			} else if(this.includeType == this.includeTypes.Inline) {
				//--Append script tag to header
				if(document.getElementById(fileName) == null) {
					document.write('<script type="text/javascript" src="' + fileName + '"></script>');
				}	
			}
		}
	};
	
	/**
	 * Include files
	 */
	//--External libraries
	_ex.include("js/exstoengine/util/Stats.js");
	
	//--Include:
	//--Is defined? do nothing
	//--Is not defined? load based on '.'
	//--Use modules[] to keep track
	
	//--Engine files
	_ex.include([
						//--Base
						"js/exstoengine/base/Helpers.js",
						"js/exstoengine/base/Class.js",
			 			"js/exstoengine/base/Component.js",
			 			"js/exstoengine/base/Vector.js",
			 			"js/exstoengine/base/Point.js",
			 			"js/exstoengine/base/Rectangle.js",
			 			
			 			//--Util
					    "js/exstoengine/util/Debug.js",
						"js/exstoengine/util/Key.js",
						"js/exstoengine/util/Input.js",
						"js/exstoengine/util/Logger.js",
						
						//--Display
						"js/exstoengine/world/TileMap.js",
						"js/exstoengine/display/Camera.js",
						"js/exstoengine/display/ImageRepository.js",
						"js/exstoengine/display/SpriteMap.js",
						"js/exstoengine/display/Sprite.js",
						"js/exstoengine/display/AnimatedSprite.js",
						"js/exstoengine/display/Emitter.js",
						"js/exstoengine/display/Particle.js",
						"js/exstoengine/display/Renderer.js",
						
						//--World
						"js/exstoengine/world/World.js",
						"js/exstoengine/world/CollisionMap.js",
						
						"js/exstoengine/base/Engine.js"
						 ]);
	//--
	
	//--Expose the engine
	window.ex = window.ExstoEngine = _ex;
	
})(window);