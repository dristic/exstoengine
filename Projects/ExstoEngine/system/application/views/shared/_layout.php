<!doctype>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<title>Exsto Engine - HTML 5 and Javascript Game Engine</title>
	
	<!-- Favicon -->
	<link href="<?=base_url()?>/favicon.png" rel="icon" type="image/png" />
	
	<!-- Main stylesheet -->
	<link href="<?=base_url().'system/application/views/style/main.css'?>" rel="stylesheet" type="text/css" />
	
	<!-- jQuery library + UI -->
	<script type="text/javascript" src="<?=base_url().'lib/jquery-1.4.4.min.js'?>"></script>
	<script type="text/javascript" src="<?=base_url().'lib/jquery-ui-1.8.9.custom.min.js'?>"></script>
	<link href="<?=base_url().'/lib/css/ui-lightness/jquery-ui-1.8.9.custom.css'?>" rel="stylesheet" type="text/css" />
	
	<!--[if IE]>
    	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>

<body>
	
	<div id="bar"></div>
	
    <div id="bg"></div>

	<header>
		<div id="logo"></div>
	
	    <nav>
            <ul>
                <li><?= anchor("", "Home") ?></li>
                <li><?= anchor("", "Documentation") ?></li>
                <li><?= anchor("", "Blog") ?></li>
                <?php 
                	if($this->ion_auth->logged_in())
                	{
                		?>
                		<li><?= anchor('download', 'Download') ?></li>
                		<li>
                			<?= $this->ion_auth->get_user()->email ?>
                			<?= anchor("auth/logout", "Logout") ?>
                	 	</li>
                	 	<?php
                	}
                	else
                	{
                		?><li><?= anchor("auth/login", "Login") ?></li><?php
                	}
                ?>
            </ul>
		</nav>
	</header>
	
	<section id="main">
		<?= $content ?>
	</section>
	
	<section id="main-footer">
		
	</section>
	
	<footer>
		© 2011 Shadow Rule LLC.
	</footer>

</body>
</html>
    