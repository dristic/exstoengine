ex.using([
  'ex.base.GlobalComponent',
  'ex.util.Input'
], function() {
	ex.define("ex.util.InputController", ex.base.GlobalComponent, {
		__alias: 'ex.Input',
	  
	  __statics: {
			/*
			 * Possible Maps:
			 *  - iOS
			 *  - Android
			 *  - Desktop
			 *  
			 *  GameMechanic: [ HardwareInput, <actionList> ]
			 */
			_defaultControlMaps: {},
			
			/*
			 *  Starts with an empty actionList in each game mechanic. When
			 *  controls are bound by entities, it will look as follows:
			 *  map: {
			 *  	jump: [ touchstart jumpButton, [player1.jump, jetpacks.on] ],
			 *  }
			 */
			_selectedControlMap: {},
			
			/*
			 * input class
			 */
			_input: new ex.util.Input(),
			
			/**
	     * Loads a list of controlMaps for different devices.
	     * 
	     * @function
	     * @name loadMaps
	     * @memberOf ex.util.InputController
	     * 
	     * @param {Array} controlMaps
	     */
	    loadMaps: function(controlMaps){
	      this._defaultControlMaps = controlMaps;
	    },
	    
	    /**
	     * Sets the active control map matching the device type passed
	     * into the function.
	     * 
	     * @function
	     * @name setDeviceType
	     * @memberOf ex.util.InputController
	     * 
	     * @param {String} deviceType name of device
	     */
	    setDeviceType: function(deviceType) {
	      this._selectedControlMap = 
	        this._defaultControlMaps[deviceType];
	    },
	    
	    bindAction: function(target, action, input) {
	      // if the input doesn't exist yet, initialize it and add a listener
	      if(this._selectedControlMap[input] == null){
	        this._selectedControlMap[input] = [];
	        this._addListenerToBinding(input);
	      } 
	      
	      // bind the action to the input
	      this._selectedControlMap[input].push(ex.bind(target, action));
	    },
	    
	    _addListenerToBinding: function (input) {
	      console.log('Adding listener to binding ' + input);
	      // Split action into event and key pairs
	      var inputTokens = input.split(' ');
	      var inputCopy = input;
	      var that = this;
	      
        document.addEventListener(inputTokens[0], function(){
          if(that._input.isKeyDown(ex.util.Key[inputTokens[1]])){
            var index = that._selectedControlMap[inputCopy].length;
            while(index--) {
              that._selectedControlMap[inputCopy][index]();
            }
          }
        });
	    }
		}		
	});
});