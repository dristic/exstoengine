<?php

class Welcome extends Controller {

	function Welcome()
	{
		parent::Controller();
		
		$this->load->library('ion_auth');
		$this->load->library('session');
	}
	
	function index()
	{
		$this->load->view('main/header');
		$this->load->view('index');
		$this->load->view('main/footer');
	}
}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */