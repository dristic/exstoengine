(function () {	
	ex.using([
          "ex.Engine",
          "ex.novus.NovusClient"
          	], 
  	function () {		
		var client = new ex.novus.NovusClient('http://shadowrule.com:8080');
		client.login('Nic', 'test', function (success) {
			if(success == true) {
				client.createRoom('controller-game');
			}
		});
		
		document.getElementById('left').addEventListener(
				"mousedown", 
				function () { client.messageTo('Joe', 'leftStart'); }, 
				false);
		document.getElementById('left').addEventListener(
				"mouseup", 
				function () { client.messageTo('Joe', 'leftStop'); }, 
				false);
		document.getElementById('right').addEventListener(
				"mousedown", 
				function () { client.messageTo('Joe', 'rightStart'); }, 
				false);
		document.getElementById('right').addEventListener(
				"mouseup", 
				function () { client.messageTo('Joe', 'rightStop'); }, 
				false);
		document.getElementById('jump').addEventListener(
				"click", 
				function () { client.messageTo('Joe', 'jump'); },
				false);
	});
}());