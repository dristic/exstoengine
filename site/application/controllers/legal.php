<?php

class Legal extends Controller {

	function Legal()
	{
		parent::Controller();
	}
	
	function index()
	{
		$this->template->load('legal/index');
	}
}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */