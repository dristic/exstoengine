<!DOCTYPE html>
<html lang="en">

<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<title>Exsto Engine - HTML 5 and Javascript Game Engine</title>
	
	<!-- Favicon -->
	<link href="<?=base_url()?>/favicon.png" rel="icon" type="image/png" />
	
	<!-- 960 Grid -->
	<link href="<?=base_url().'/application/views/style/reset.css'?>" rel="stylesheet" type="text/css" />
	<link href="<?=base_url().'/application/views/style/text.css'?>" rel="stylesheet" type="text/css" />
	<link href="<?=base_url().'/application/views/style/960_12_col.css'?>" rel="stylesheet" type="text/css" />
	
	<!-- Main stylesheet -->
	<link href="<?=base_url().'/application/views/style/main.css'?>" rel="stylesheet" type="text/css" />
	
	<!-- jQuery library + UI -->
	<link rel="stylesheet" href="<?=base_url().'/application/views/lib/fancybox/jquery.fancybox-1.3.4.css'?>" type="text/css" media="screen" />
	<!--<link href="<?=base_url().'/application/views/style/slideshow.css'?>" rel="stylesheet" type="text/css" />-->
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
	<script type="text/javascript" src="<?=base_url().'/application/views/lib/fancybox/jquery.fancybox-1.3.4.pack.js'?>"></script>
	<!--<script src="<?=base_url().'lib/slides.min.jquery.js'?>"></script>-->
	
	<!-- Page JS -->
	<script type="text/javascript" src="<?=base_url().'/application/views/scripts/page.js'?>"></script>
	
	<!--[if IE]>
    	<script src="https://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>

<body style="background: #FFF">
	<section id="main">
		<?= $content ?>
	</section>
</body>
</html>
    