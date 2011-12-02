<?php

class Download extends Controller {

	function Download()
	{
		parent::__construct();
		$this->load->library('form_validation');
	}
	
	function index()
	{
		$this->authentication->authenticate();
		
		$this->form_validation->set_rules('agree', 'Agree', 'true');
		
		if($this->form_validation->run() == false)
		{
			$this->data['message'] = validation_errors();
			$this->template->load('download/index', $this->data);
		}
		else
		{	
			$this->template->load('download/download');	
		}
	}
}