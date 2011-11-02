<div id="banner">
	<div class="container_12">
		<div class="grid_6">
			<img src="<?=base_url()?>/application/views/content/images/devices.jpg" width="408" height="250" alt="Devices">
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
				<a title="Mobile Support Using PhoneGap"><img src="<?=base_url()?>/application/views/content/images/screens/mobile.png" alt="Mobile" /></a>
				<a title="Using iPhone as a Controller"><img src="<?=base_url()?>/application/views/content/images/screens/controller.jpg" alt="Controller" /></a>
				<a title="Networking Using node.js"><img src="<?=base_url()?>/application/views/content/images/screens/socket.png" alt="node.js" /></a>
				<a title="Physics Support"><img src="<?=base_url()?>/application/views/content/images/screens/physics.png" alt="Physics" /></a>
			</div>
		</div>
		<div class="grid_8">
		    <h1>What is Exsto Engine?</h1>
		
		    <p>
		     	Exsto Engine is a game development tool built on top of the latest open web standards using HTML 5 and JavaScript. We want to give web games the power of serious desktop games while having the lightweight flexibility of the web. Our engine also gives users the power to network their game with others over the web and even social networks such as Facebook.
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
			<img src="<?=base_url()?>/application/views/content/images/icons/performance.png" width="64" height="64"/>
			<h3>Powerful Features</h3>
		
			<p>
				Every game has their own needs and we strive to build an easy to use feature for every genre we can think of. We build our features from the ground up to maximize the performance of our engine.
			</p>
			<ul>
				<li>Collision Detection</li>
				<li>Rigid Body Physics</li>
				<li>Animated Sprites</li>
				<li>User Interface Elements</li>
				<li>Asset Management</li>
				<li>Particle Effects</li>
			</ul>
		</div>
		
		<div class="grid_4">
			<img src="<?=base_url()?>/application/views/content/images/icons/connectivity.png" width="64" height="64"/>
			<h3>Integrated Network</h3>
		
			<p>
				With our packaged network capabilities it is easy to handle multiplayer and MMO grade games. Our server is built on top of the popular <a href="http://nodejs.org">node.js</a> which makes it scalable and fast.
			</p>
			<ul>
				<li>User Management (bans, kicks, etc.)</li>
				<li>Authentication</li>
				<li>Persistant Storage</li>
				<li>Room / Game Management</li>
				<li>Remote Management Tools</li>
			</ul>
		</div> 
		
		<div class="grid_4">
			<img src="<?=base_url()?>/application/views/content/images/icons/logo.png" width="64" height="64"/>
			<h3>Cross Platform</h3>
		
			<p>
				The HTML 5 specification allows web apps to be cross platform. This makes our engine supported on almost every major device including the iPhone, iPad, desktop, and Android. 
			</p>
		</div>
	</div>
</div>