<div id="banner">
	<div class="container_12">
		<div class="grid_6">
			<img src="<?=base_url()?>system/application/views/content/images/devices.jpg" width="460" height="334" alt="Devices">
		</div>
		<div class="grid_6">
			<h1 style="color: #333; font-size: 32px;">Seriously Connected Games</h1>
			<h3 style="color: #777">Our engine harnesses open web standards to make your game stand out and bring your gamers closer together.</h3>
		</div>
	</div>
</div>

<div class="clear"></div>

<div id="main">
	<div class="container_12" style="padding-top: 10px">
		<div class="grid_12" style="padding-bottom: 10px">
			<h1>Screenshots</h1>
			<div id="image-strip">
				<a title="Mobile Support Using PhoneGap"><img src="<?=base_url()?>system/application/views/content/images/screens/mobile.png" alt="Mobile" /></a>
				<a title="Using iPhone as a Controller"><img src="<?=base_url()?>system/application/views/content/images/screens/controller.jpg" alt="Controller" /></a>
				<a title="Networking Using node.js"><img src="<?=base_url()?>system/application/views/content/images/screens/socket.png" alt="node.js" /></a>
				<a title="Physics Support"><img src="<?=base_url()?>system/application/views/content/images/screens/physics.png" alt="Physics" /></a>
			</div>
		</div>
		<div class="grid_8">
		    <h1>What is Exsto Engine?</h1>
		
		    <p>
		     	Exsto Engine is a game development engine built with open web standards (HTML5/JavaScript/CSS3) to allow cross browser and platform games to be built without the use of external plugins and libraries. For more information, see our feature list below and our blog in the navigation menu above.
		    </p>
		</div>
	
	
		<div class="grid_4" style="padding-bottom: 10px;">
			<?= form_open('welcome/signup'); ?>
				<h1>Want More Info?</h1>
				<div class="form-field-first">
					<label for="email">Email address</label>
					<br />
					<input type="email" name="email" value="" />
				</div>
				<div class="form-field">
					<label for="comment">What are you interested in hearing about?</label>
					<br />
					<input type="text" name="comment" value="" />
				</div>
				<div class="form-field">
					<input type="submit" value="Send" class="right" />
				</div>
			<?= form_close(); ?>
		</div>
		
		<div class="clear"></div>
		
		<a name="about"></a>
		
		<div class="grid_4">
			<img src="<?=base_url()?>system/application/views/content/images/icons/performance.png" width="64" height="64"/>
			<h3>Cross-Browser & Cross-Platform</h3>
		
			<p>
				Support for IE9, Chrome, FireFox, Safari on PCs. Support for mobile devices such as iPhone, iPad, and Android.
			</p>
			<ul>
				<li>Chrome</li>
				<li>IE 9</li>
				<li>FireFox</li>
			</ul>
		</div>
		
		<div class="grid_4">
			<img src="<?=base_url()?>system/application/views/content/images/icons/connectivity.png" width="64" height="64"/>
			<h3>Integrated Network Capabilities</h3>
		
			<p>
				Multiplayer and MMO support. Take the guess work out of networking with fully featured plugins for node.js and ElectroServer.
			</p>
		</div> 
		
		<div class="grid_4">
			<img src="<?=base_url()?>system/application/views/content/images/icons/styling.png" width="64" height="64"/>
			<h3>Simplex: Easy to Use Editor for Games</h3>
		
			<p>
				Fully featured, easy to use development environment. Edit maps, add events, and test your game all in the same window. 
			</p>
		</div>
	</div>
</div>