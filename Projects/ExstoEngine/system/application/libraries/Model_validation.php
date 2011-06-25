<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_validation
{
	protected $ci;
	protected $errors = array();
	
	function __construct()
	{
		$this->ci =& get_instance();
		$this->errors = array();
	}
	
	function set_error($message)
	{
		array_push($this->errors, $message);
	}
	
	function has_errors()
	{
		return sizeof($this->errors) > 0;
	}
	
	function get_errors()
	{
		$message = "";
		foreach($this->errors as $error)
		{
			$message .= "$error<br />";
		}
		return $message;
	}
}