<?php

class Account extends Controller {

	function Account()
	{
        parent::Controller();
			
        $this->load->library('ion_auth');
	}
	
	function index()
	{
		$this->load->view('main/header');
		$this->load->view('hello');
		$this->load->view('main/footer');
	}

        function achievements()
        {
            $this->load->view('main/header');
            $this->load->view('account/achievements');
            $this->load->view('main/footer');
        }
	
	function hello()
	{
		$this->load->view('hello');
	}
}

/* End of file account.php */
/* Location: ./system/application/controllers/welcome.php */