<!doctype html>
<html lang="en">

<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<title>Exsto Engine - HTML 5 and Javascript Game Engine</title>
	
	<!-- Favicon -->
	<link href="<?=base_url()?>/favicon.png" rel="icon" type="image/png" />
	
	<!-- Main stylesheet -->
	<link href="<?=base_url().'system/application/views/style/main.css'?>" rel="stylesheet" type="text/css" />
	
	<!-- jQuery library + UI -->
	<script type="text/javascript" src="<?=base_url().'lib/jquery-1.4.4.min.js'?>"></script>
	
	<!--[if IE]>
    	<script src="https://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
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
                <li><?= anchor("blog", "Blog") ?></li>
                <?php 
                	if($this->ion_auth->logged_in())
                	{
                		?>
                		<li><?= anchor('download', 'Download') ?></li>
                		<li>
                			<?= $this->ion_auth->get_user()->email ?>
                			<?= anchor("auth/logout", "Logout", "", true) ?>
                	 	</li>
                	 	<?php
                	}
                	else
                	{
                		?><li><?= anchor("auth/login", "Login", "", true) ?></li><?php
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
		&copy; 2011 Shadow Rule LLC. <?= anchor("legal", "Terms of Service / Privacy Policy") ?>
	</footer>

</body>
</html>
    