<?php

class Account extends Controller {

	function Account()
	{
            parent::Controller();

            $this->load->library('session');
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

        function signup()
        {
            $this->load->view('main/header');
            $this->load->view('account/signup');
            $this->load->view('main/footer');
        }
	
	function hello()
	{
		$this->load->view('hello');
	}
	
	function login()
	{
            $viewToLoad = 'account/';

            if($_SERVER['REQUEST_METHOD'] == "POST") {
                    $this->load->database();

                    $query = $this->db->query(
                            "SELECT id, email
                             FROM Login
                             WHERE email = '".$_POST["username"]."' &&
                             password = '".md5($_POST["password"])."'"
                    );

                    if($query->num_rows() > 0)
                    {
                            $data["loggedIn"] = true;
                            $row = $query->row_array();
                            $this->session->set_userdata('username', $row['email']);
                    } else {
                            $data["loggedIn"] = false;
                    }

                    $viewToLoad .= 'loginSubmit';
		} else {
                    $data["loggedIn"] = false;

                    $viewToLoad .= 'login';
		}

		$this->load->view('main/header');
		$this->load->view($viewToLoad, $data);
		$this->load->view('main/footer');
	}
	
	function logout()
	{
            $this->session->set_userdata('username', '');
            $this->session->unset_userdata('username');
            $this->session->sess_destroy();

            $this->load->view('main/header');
            $this->load->view('account/logout');
            $this->load->view('main/footer');
	}
}

/* End of file account.php */
/* Location: ./system/application/controllers/welcome.php */