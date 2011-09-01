<?php

class Welcome extends Controller {

	function Welcome()
	{
		parent::Controller();
	}
	
	function index()
	{
		$this->template->load('index');
	}
	
	function index2()
	{
		$this->template->load_template('shared/_layout2', 'index2');
	}
	
	function message()
	{
		$this->template->load('shared/message');
	}
}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */