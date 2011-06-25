<?php

class Download extends Controller {

	function Download()
	{
		parent::Controller();
	}
	
	function index()
	{
		$this->authentication->authenticate();
		
		$this->template->load('download/index');
	}
}