<?php

function base_url()
{
	$CI =& get_instance();
	return check_secure_url($CI->config->slash_item('base_url'));
}

function anchor($uri = '', $title = '', $attributes = '', $secure = false)
{
	$title = (string) $title;

	if ( ! is_array($uri))
	{
		$site_url = ( ! preg_match('!^\w+://! i', $uri)) ? site_url($uri) : $uri;
	}
	else
	{
		$site_url = site_url($uri);
	}
	
	$site_url = check_secure_url($site_url);
	
	if($secure == true)
	{
		$site_url = secure_url($url);
	}

	if ($title == '')
	{
		$title = $site_url;
	}

	if ($attributes != '')
	{
		$attributes = _parse_attributes($attributes);
	}

	return '<a href="'.$site_url.'"'.$attributes.'>'.$title.'</a>';
}

function check_secure_url($url)
{
	if($_SERVER['SERVER_PORT'] == 443)
	{
		$url = secure_url($url);
	}
	
	return $url;
}

function secure_url($url)
{
	return str_replace('http://', 'https://', $url);
}

?>