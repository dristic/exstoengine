<!doctype html>
<html lang="en">

<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<title>Exsto Engine - HTML 5 and Javascript Game Engine</title>
	
	<!-- Favicon -->
	<link href="<?=base_url()?>/favicon.png" rel="icon" type="image/png" />
	
	<!-- 960 Grid -->
	<link href="<?=base_url().'system/application/views/style/reset.css'?>" rel="stylesheet" type="text/css" />
	<link href="<?=base_url().'system/application/views/style/text.css'?>" rel="stylesheet" type="text/css" />
	<link href="<?=base_url().'system/application/views/style/960_12_col.css'?>" rel="stylesheet" type="text/css" />
	
	<!-- Main stylesheet -->
	<link href="<?=base_url().'system/application/views/style/main2.css'?>" rel="stylesheet" type="text/css" />
	
	<!-- jQuery library + UI -->
	<!--<link href="<?=base_url().'system/application/views/style/slideshow.css'?>" rel="stylesheet" type="text/css" />-->
	<!--<script src="<?=base_url().'lib/jquery-1.4.4.min.js'?>"></script>-->
	<!--<script src="<?=base_url().'lib/slides.min.jquery.js'?>"></script>-->
	
	<!--[if IE]>
    	<script src="https://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>

<body>
	
	<div id="bg"></div>
	
	
	<header>
		<div class="container_12">
			<div class="grid_4">
				<div id="logo"><span>Exsto Engine</span></div>
			</div>
		
		    <nav class="grid_8">
	            <ul>
	                <li><?= anchor("", "Home") ?></li>
	                <li><?= anchor("", "Documentation") ?></li>
	                <li><?= anchor("blog", "Blog") ?></li>
	                <?php 
	                	if($this->ion_auth->logged_in())
	                	{
	                		?>
	                		<li><?= anchor('download', 'Download') ?></li>
	                		<li>
	                			<?= $this->ion_auth->get_user()->email ?>
	                			<?= anchor("auth/logout", "Logout", 'class="button"', true) ?>
	                	 	</li>
	                	 	<?php
	                	}
	                	else
	                	{
	                		?><li><?= anchor("auth/login", "Login", 'class="button"', true) ?></li><?php
	                	}
	                ?>
	            </ul>
			</nav>
		</div>
	</header>
	
	<section id="main">
		<?= $content ?>
	</section>
	
	<footer class="container_12">
		<div class="grid_4">
			<h2>Heading</h2>
			<ul>
				<li>Link 1</li>
				<li>Link 2</li>
				<li>Link 3</li>
			</ul>
		</div>
		
		<div class="grid_4">
			<h2>Heading</h2>
			<ul>
				<li>Link 1</li>
				<li>Link 2</li>
				<li>Link 3</li>
			</ul>
		</div>
		
		<div class="grid_4">
			<h2>Heading</h2>
			<ul>
				<li>Link 1</li>
				<li>Link 2</li>
				<li>Link 3</li>
			</ul>
		</div>
		
		<div class="grid_12" id="legal">
			<img src="<?=base_url().'system/application/views/content/images/watermark_logo.png'?>" alt="Exsto Engine Watermark" />
			&copy; 2011 Shadow Rule LLC. All rights reserved. <?= anchor("legal", "Terms of Service / Privacy Policy") ?>
		</div>
	</footer>

</body>
</html>
    