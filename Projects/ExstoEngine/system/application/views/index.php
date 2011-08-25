<div style="display: table; margin: 20px auto 0 auto">
	<div style="padding: 0px 0px 0px 5px; display: table-cell; width: 570px; vertical-align: top;">
		<link href="<?=base_url().'system/application/views/style/slideshow.css'?>" rel="stylesheet" type="text/css" />
		<script src="<?=base_url().'lib/jquery-1.4.4.min.js'?>"></script>
		<script src="<?=base_url().'lib/slides.min.jquery.js'?>"></script> 
		<script> 
			$(function(){
				$('#slides').slides({
					preload: true,
					preloadImage: 'img/loading.gif',
					play: 5000,
					pause: 2500,
					hoverPause: true
				});
			});
		</script>
		<div id="slides"> 
			<div class="slides_container"> 
				<a href="http://www.flickr.com/photos/jliba/4665625073/" title="145.365 - Happy Bokeh Thursday! | Flickr - Photo Sharing!" target="_blank"><img src="http://slidesjs.com/examples/standard/img/slide-1.jpg" width="850" height="300" alt="Slide 1"></a> 
				<a href="http://www.flickr.com/photos/stephangeyer/3020487807/" title="Taxi | Flickr - Photo Sharing!" target="_blank"><img src="http://slidesjs.com/examples/standard/img/slide-2.jpg" width="850" height="300" alt="Slide 2"></a> 
				<a href="http://www.flickr.com/photos/childofwar/2984345060/" title="Happy Bokeh raining Day | Flickr - Photo Sharing!" target="_blank"><img src="http://slidesjs.com/examples/standard/img/slide-3.jpg" width="850" height="300" alt="Slide 3"></a> 
				<a href="http://www.flickr.com/photos/b-tal/117037943/" title="We Eat Light | Flickr - Photo Sharing!" target="_blank"><img src="http://slidesjs.com/examples/standard/img/slide-4.jpg" width="850" height="300" alt="Slide 4"></a> 
				<a href="http://www.flickr.com/photos/bu7amd/3447416780/" title="“I must go down to the sea again, to the lonely sea and the sky; and all I ask is a tall ship and a star to steer her by.” | Flickr - Photo Sharing!" target="_blank"><img src="http://slidesjs.com/examples/standard/img/slide-5.jpg" width="850" height="300" alt="Slide 5"></a> 
				<a href="http://www.flickr.com/photos/streetpreacher/2078765853/" title="twelve.inch | Flickr - Photo Sharing!" target="_blank"><img src="http://slidesjs.com/examples/standard/img/slide-6.jpg" width="850" height="300" alt="Slide 6"></a> 
				<a href="http://www.flickr.com/photos/aftab/3152515428/" title="Save my love for loneliness | Flickr - Photo Sharing!" target="_blank"><img src="http://slidesjs.com/examples/standard/img/slide-7.jpg" width="850" height="300" alt="Slide 7"></a> 
			</div> 
			<a href="#" class="prev"><img src="<?=base_url()?>/system/application/views/content/images/arrow-prev.png" width="24" height="43" alt="Arrow Prev"></a> 
			<a href="#" class="next"><img src="<?=base_url()?>/system/application/views/content/images/arrow-next.png" width="24" height="43" alt="Arrow Next"></a> 
		</div> 
	</div>
</div>

<div style="display: table; margin-top: 20px;">
    <div style="padding: 0px 0px 0px 20px; display: table-cell; width: 500px; vertical-align: top;">
        <h1>What is Exsto Engine?</h1>

        <p style="width: 450px; font-size: 1.0em; line-height: 1.5em;">
        	Exsto Engine is a game development engine built with open web standards (HTML5/JavaScript/CSS3) to allow cross browser and platform games to be built without the use of external plugins and libraries. For more information, see our feature list below and our blog in the navigation menu above.
        </p>
    </div>
    <div style="padding: 0px 0px 0px 20px; display: table-cell; width: 500px; text-align: center; vertical-align: bottom">
        <p style="width: 450px; font-size: 1.0em; line-height: 1.5em;">
			Sign up link here!
        </p>
    </div>
</div>

<div style="display: table; margin-top: 20px;">
    <div style="padding: 0px 0px 0px 20px; display: table-cell; width: 500px; vertical-align: top;">
        <h1>Features</h1>

		<div style="padding: 0px 0px 0px 20px; display: table-cell; width: 200px; vertical-align: top;">
	        <img src="<?=base_url()?>/system/application/views/content/images/crossPlatform.png" width="64" height="64"/>
	        <h3>Cross-Browser & Cross-Platform</h3>
	
	        <p style="width: 200px; font-size: 1.0em; line-height: 1.5em;">
	        	Support for IE9, Chrome, FireFox, Safari on PCs. Support for mobile devices such as iPhone, iPad, and Android.
	        </p>
	    </div>
	    <div style="padding: 0px 0px 0px 20px; display: table-cell; width: 200px; vertical-align: top;">
	        <img src="<?=base_url()?>/system/application/views/content/images/network.png" width="64" height="64"/>
	        <h3>Integrated Network Capabilities</h3>
	
	        <p style="width: 200px; font-size: 1.0em; line-height: 1.5em;">
	        	Multiplayer and MMO support. Take the guess work out of networking with a fully featured HTML5 socket library! Now I just need to type more to fill up more space! Bazinga!
	        </p>
	    </div> 
	    <div style="padding: 0px 0px 0px 20px; display: table-cell; width: 200px; vertical-align: top;">
	        <img src="<?=base_url()?>/system/application/views/content/images/layers.png" width="64" height="64"/>
	        <h3>Simplex IDE</h3>
	
	        <p style="width: 200px; font-size: 1.0em; line-height: 1.5em;">
				Fully featured, easy to use development environment. Edit maps, add events, and test your game all in the same window. 
	        </p>
	    </div> 
	    <div style="padding: 0px 0px 0px 20px; display: table-cell; width: 200px; vertical-align: top;">
	        <img src="<?=base_url()?>/system/application/views/content/images/hamster.png" width="64" height="64"/>
	        <h3>Last 20 Users Get A Free Gerbil</h3>
	
	        <p style="width: 200px; font-size: 1.0em; line-height: 1.5em;">
				It's true!
	        </p>
	    </div> 
    </div>
</div>