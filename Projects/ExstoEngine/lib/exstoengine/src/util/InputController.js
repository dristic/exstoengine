ex.using([
  'ex.base.GlobalComponent',
  'ex.util.Input'
], function() {
	ex.define("ex.util.UIController", ex.base.GlobalComponent, {
		statics: {
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
			 * Desktop hardware input bindings 
			 */
			_desktopInput: new ex.util.Input()
		},
		
		loadMaps: function(controlMaps){
			this.statics._defaultControlMaps = controlMaps;
		},
		
		setDeviceType: function(deviceType) {
			this.statics._selectedControlMap = 
				this.statics._defaultControlMaps[deviceType];
		}
	});
});