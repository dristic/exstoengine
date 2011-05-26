<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Kudoster - Achievement System</title>
	
	<link href="<?=base_url().'system/application/views/style/main.css'?>" rel="stylesheet" type="text/css" />
	
	<script type="text/javascript" src="<?=base_url().'lib/jquery-1.4.4.min.js'?>"></script>
	<script type="text/javascript" src="<?=base_url().'lib/jquery-ui-1.8.9.custom.min.js'?>"></script>
	<link href="<?=base_url().'/lib/css/ui-lightness/jquery-ui-1.8.9.custom.css'?>" rel="stylesheet" type="text/css" />
	
<script type="text/javascript">
	$(document).ready(function () {
		resize();

		$(window).resize(function () {
			resize();
		});
	});

	function resize() {
		var height = $("body").height();
		height -= $("#header").height();
		height -= $("#footer").height();
		height -= $("#main").css('paddingTop').replace("px", "");
		height -= 40;

		$("#main").css('min-height', height);

                if($("#main").height() > height)
                {
                    $("#main").css('paddingBottom', '50px');
                }
	}
</script>

</head>

<body>

    <div id="bg-pattern"></div>

<div id="header">
    <div id="title-menu">
        <div id="title"></div>
        
        <div id="sticker"></div>

        <div id="menu">
        	<div id="menu_left"></div>
            <ul>
                <li><?= anchor("", "Home") ?></li>
                <?php if($this->ion_auth->logged_in()) { ?>
                	<li class="navbar-spacer"></li>
                    <li><?= anchor("profile/index", "Profile"); ?></li>
                <?php } ?>
                <li id="loggedIn">
                	<?php
		                $loggedIn = $this->ion_auth->logged_in();
		
		                if($loggedIn == true)
		                {
		                    $currentUser = $this->ion_auth->get_user();
		
		                    echo $currentUser->username." [".anchor("auth/logout", "Logout", array('style' => 'color: #FFF;'))."]";
		                } else {
		                    echo "[".anchor("auth/login", "Login", array('style' => 'color: #FFF;'))."]";
		                }
		            ?>
                </li>
            </ul>
            <div id="menu_right"></div>
        </div>
    </div>
</div>

    <div id="main">
    	<?= $content ?>
    </div>

<div id="main_footer">
	<div id="main_left"></div>
	<div id="main_center"></div>
	<div id="main_right"></div>
</div>

<div id="footer">
	© 2011 Shadow Rule LLC. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</div>

<div id="bg_bottom"></div>

</body>
</html>
    