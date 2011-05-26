<?php

if ( ! function_exists('achievement'))
{
	function achievement($title, $image, $name, $desc, $points, $date)
	{
		return "<li><div class='achievement-group'>".$title."</div>"
                       ."<div class='achievement'>"
                       ."<div class='achievement-image'>"
                       ."<img src='".base_url()."system/application/views/content/images/achievement_image_bg.png' class='bg' />"
                       ."<img src='".base_url()."system/application/views/content/images/achievements/".$image.".png' />"
                       ."</div>"
                       .$name
                       ."<div class='achievement-description'>".$desc."</div>"
                       ."<div class='achievement-points'>"
                       .$points." <img src='http://kudoster.com/system/application/views/content/images/coin.png' alt='coin' style='vertical-align: text-top' />"
                       ." on ".date("m/d/Y", strtotime($date))
                       ."</div>"
                       ."</div>"
                       ."</li>";
	}
}

/* End of file achievement.php */
/* Location: ./system/application/helpers/achievement.php */