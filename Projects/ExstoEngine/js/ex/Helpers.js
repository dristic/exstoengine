///**
//		 * Adds script tag to DOM
//		 * @param fileName {String} script tag's src parameter
//		 */
//		ajaxScript: function (fileName) {
//			//--Use ajax call to grab a script and append it to the document
//			var xmlhttp;
//			
//			if(window.XMLHttpRequest) {
//				//--If XML Http request is available (FF, Chrome, IE 8+)
//				xmlhttp = new XMLHttpRequest();
//			} else {
//				//--If http request is not available (IE 6, 7)
//				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//			}
//			
//			xmlhttp.onreadystatechange = function () {
//				//--If the request was successful
//				if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//					// Create a script tag and add it to the html
//					var head = document.getElementsByTagName("head").item(0);
//					var script = document.createElement("script");
//					script.language = "javascript";
//					script.type = "text/javascript";
//					script.defer = true;
//					script.text = xmlhttp.responseText;
//					head.appendChild(script);
//					
//					ex._scriptsLoaded++;
//					if(ex._scriptsLoaded == ex._scriptsToLoad) {
//						ex._isReady = true;
//						ex._fire("ready");
//					}
//				}
//			};
//			
//			xmlhttp.open("GET", ex.config.baseUrl + fileName);
//			xmlhttp.send();
//		}