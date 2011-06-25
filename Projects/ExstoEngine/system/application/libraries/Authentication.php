<?php if( ! defined('BASEPATH')) exit('No direct script access allowed');

class Authentication {
	
	protected $ci;
	
	function __construct()
	{
		$this->ci =& get_instance();
	}
	
	function admin_only()
	{
		if($this->ci->ion_auth->is_admin() == false)
		{
			$this->ci->session->set_flashdata('message', 'You must be an administrator to view this page');
			redirect('welcome/message');
		}
	}
	
}