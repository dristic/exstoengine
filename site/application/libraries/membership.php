<?php if(! defined('BASEPATH')) exit('No direct script access allowed');

class Membership {
	function __construct()
	{
		
	}
	
	function logged_in_status()
	{
            $CI =& get_instance();
			
            $username = $CI->session->userdata('username');

            if($username == NULL)
            {
                    return "<a href='http://www.danristic.com/catalyst/index.php/account/login'>(Login)</a>";
            }
            else
            {
                    return $username." <a href='http://www.danristic.com/catalyst/index.php/account/logout'>(Log out)</a>";
            }
	}
}
