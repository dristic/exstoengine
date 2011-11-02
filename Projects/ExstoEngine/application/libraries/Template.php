<?php if( ! defined('BASEPATH')) exit('No direct script access allowed');

class Template {
	
	protected $ci;
	
	function __construct()
	{
		$this->ci =& get_instance();
		$this->ci->config->load('template');
	}
	
	function load_template($template, $view = "", $view_data = array(), $return = false)
	{
		return $this->ci->load->view($template, array('content' => $this->ci->load->view($view, $view_data, true)), $return);
	}
	
	function load($view, $view_data = array(), $return = false)
	{
		$this->load_template($this->ci->config->item('template'), $view, $view_data, $return);
	}
	
}