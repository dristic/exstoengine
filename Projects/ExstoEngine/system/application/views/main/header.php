<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Kudoster - Achievement System</title>

<link href="http://kudoster.com/system/application/views/style/main.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="http://danristic.com/catalyst/lib/jquery.js"></script>
<script type="text/javascript" src="http://danristic.com/catalyst/lib/jquery-ui-1.8.9.custom.min.js"></script>
<link href="http://danristic.com/catalyst/lib/css/ui-lightness/jquery-ui-1.8.9.custom.css" rel="stylesheet" type="text/css" />
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
                <li><a href="http://kudoster.com/">Home</a></li>
                <?php if($this->ion_auth->logged_in()) { ?>
                	<li class="navbar-spacer"></li>
                    <li><a href="http://kudoster.com/index.php/profile/index">Profile</a></li>
                <?php } ?>
                <li id="loggedIn">
                	<?php
		                $loggedIn = $this->ion_auth->logged_in();
		
		                if($loggedIn == true)
		                {
		                    $currentUser = $this->ion_auth->get_user();
		
		                    echo $currentUser->username." [<a href='http://kudoster.com/index.php/auth/logout' style='color: #FFF'>Logout</a>]";
		                } else {
		                    echo "[<a href='http://kudoster.com/index.php/auth/login' style='color: #FFF'>Login</a>]";
		                }
		            ?>
                </li>
            </ul>
            <div id="menu_right"></div>
        </div>
    </div>
</div>

    <div id="main">