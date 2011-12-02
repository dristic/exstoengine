function ready() {
		$("#debug").output();
		
		var _canvas = document.getElementById('canvas');
		var _canvasContext = null;
		var _canvasBuffer = null;
		var _bufferContext = null;
		var _gameTimer = null;
		var x = 10;
		var y = 10;
		var _frameRate = 50;
		
		var renderables = new Array();
		var ship = null;
		var base1 = null;
		var base2 = null;
		var nebula = null;
		var stars = null;
		var stars2 = null;
		var speed = 5;
		
		var left = false;
		var right = false;
		var up = false;
		var down = false;
		
		var valid = false;
		
		var _stats = new Stats();
		_stats.domElement.style.position = "fixed";
		_stats.domElement.style.left = "0px";
		_stats.domElement.style.top = "0px";
		$("body").append(_stats.domElement);
		
		ImageRepository.loadImage("Ship", "assets/units/ship1.png");
		ImageRepository.loadImage("Base", "assets/units/base2.png");
		ImageRepository.loadImage("Nebula", "assets/world/bg.png");
		
		//--If canvas is supported
		if (_canvas && _canvas.getContext) {
		    //check whether browser support getting canvas context
		    _canvasContext = _canvas.getContext('2d');
		    _canvas.width = document.width;
		    _canvas.height = document.height + 17;
		    _canvas.style.position = "fixed";
		    _canvas.style.top = "0px";
		    _canvas.style.left = "0px";
		    _canvas.style.zIndex = "1";
		    
		    //--Create buffer
		    _canvasBuffer = document.createElement('canvas');
			_canvasBuffer.width = _canvas.width;
			_canvasBuffer.height = _canvas.height;
			_bufferContext = _canvasBuffer.getContext('2d');
			
			//--Load image
			ship = new BSprite(10, 10, ImageRepository.img.Ship);
			ship.rotationEnabled = true;
			base1 = new BSprite(100, 100, ImageRepository.img.Base);
			base2 = new BSprite(300, 150, ImageRepository.img.Base);
			nebula = new BSprite(0, 0, ImageRepository.img.Nebula);
			stars = new StarMap(800, 500);
			nebula.x = -30;
			nebula.y = -30;
			stars.scrollFactorX = stars.scrollFactorY = 0;
			nebula.scrollFactorX = nebula.scrollFactorY = 0;
			renderables.push(base1, base2, ship);
			
			/*for(var px = 0; px < (_canvas.width / 100); px++) {
				for(var py = 0; py < (_canvas.height / 100); py++) {
					var someStars = new StarMap(100, 100);
					someStars.x = px * 100;
					someStars.y = py * 100;
					someStars.scrollFactorX = someStars.scrollFactorY = 1;
				}
			}*/
			
			for(var n = 0; n < 1; n++) {
				var page = new Page(1000, 500);
				for(var px = 0; px < 1000 / 20; px++) {
					for(var py = 0; py < 500 / 10; py++) {
						var newStars = new StarMap(20, 10);
						page.drawImage(newStars.canvas, px * 20, py * 10);
					}	
				}
				renderables.push(page);
				page.scrollFactorX = page.scrollFactorY = Math.random();
			}
			
			//--Start timer
			_gameTimer = setInterval(Update, (1/_frameRate) * 1000);
			
			//--Key Events
			$(document).keydown(OnKeyDown);
			$(document).keyup(OnKeyUp);
		}
		
		function Update() {
			
			
			_stats.update();
			
			//--Movement
			if(up == true) {
				ship.y += speed * -Math.cos(ship.rotation);
				ship.x += speed * Math.sin(ship.rotation);
			}
			if(down == true) {
				ship.y += speed * Math.cos(ship.rotation);
				ship.x += speed * -Math.sin(ship.rotation);
			}
			if(left == true) {
				ship.rotation -= speed * Math.PI / 180;
			}
			if(right == true) {
				ship.rotation += speed * Math.PI / 180;
			}
			
			if(right || left || down || up) {
				valid = false;
			}
			
			Camera.follow(_canvas, ship);
			
			//--Draw some stuff on the buffer
		    //_bufferContext.fillStyle = "rgb(127,0,0)";
		    //_bufferContext.fillRect(x, y, 100, 85);
		    
		    /*
		    x += 120;
		    _bufferContext.strokeStyle = "rgb(0,0,0)";
		    _bufferContext.strokeRect(x, y, 10, 185);
		    x = 10;
		    y += 120;
		    _bufferContext.fillStyle = "rgb(127,255,0)";
		    _bufferContext.font = "bold 26px sans-serif";
		    _bufferContext.fillText('Test text ', x, y);
		    */
		    
		    
		    	Draw();
		    	valid = true;	
		    
		}
		
		function Draw() {
			_canvasContext.clearRect(0, 0, _canvas.width, _canvas.height);
			
			for(var i = 0; i < renderables.length; i++) {
				renderables[i].render(_canvasContext);
			}
			
			//_canvasContext.clearRect(0, 0, _canvas.width, _canvas.height);
			
			//--Draw our buffer onto our canvas
		    //_canvasContext.drawImage(_canvasBuffer, 0, 0);
		}
		
		function DrawableElement() {
			this.GetImage = function () {
				//implement this method in your sub-class if your element is represented by image
				//this should return an Image object
				return null;
			};
		
			this.GetFillStyle = function () {
				//implement this method in your sub-class if your element is represented by filled rectangle
				//this should return canvas "fillStyle" string
				return null;
			};
		
			this.ImageRepository = null;
		};
	
	};