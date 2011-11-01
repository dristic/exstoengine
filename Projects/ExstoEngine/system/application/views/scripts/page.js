$(document).ready(function () {
	var $imageStrip = $('#image-strip');
	
	$('.grid_4 img').fadeFocus(0.5, function () {
		return this.closest('.grid_4');
	});
	
	$imageStrip.find('img').fadeFocus(0.8);
	
	$imageStrip.children('a').each(function (index, el) {
		var $this = $(this),
			$img = $this.children('img');
		
		$this.attr('href', $img.attr('src'));
		$this.attr('rel', 'imagestrip');
	});
	
	$imageStrip.children('a').fancybox({
		'speedIn'		:	600, 
		'speedOut'		:	200, 
		'overlayShow'	:	true
	});
});

$.fn.fadeFocus = function (opacity, targetFunc) {
	return this.each(function (index, el) {
		var $this = $(this),
			target;
		
		targetFunc = targetFunc || function () { return this; };
		
		target = targetFunc.call($this);
		
		$this.fadeTo(0, opacity);
		target.hover(function (event) {
			$this.clearQueue();
			$this.fadeTo(200, 1);
		}, function (event) {
			$this.clearQueue();
			$this.fadeTo(200, opacity);
		});
	});
};