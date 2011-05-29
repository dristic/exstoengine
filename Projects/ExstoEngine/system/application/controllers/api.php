<?php

class Api extends Controller {

	function Welcome()
	{
            parent::Controller();
	}
	
	function index()
	{
		$this->load->view('welcome_message');
		
		$this->load->database();
		
		$query = $this->db->query('SELECT id, name FROM users');
		
		foreach($query->result() as $row)
		{
			echo $row->id;
			echo ' ';
			echo $row->name;
		}
		
		echo '<br>Total: '.$query->num_rows();
	}

        function session()
        {
            $this->load->library('session');

            $this->session->sess_destroy();

            echo $this->session->userdata('username');
        }
	
	function hello()
	{
		$this->load->view('hello');
	}
	
	function getUsers()
	{
		$this->load->database();
		
		$query = $this->db->query('SELECT id, name FROM users');
		
		foreach($query->result() as $row)
		{
			echo $row->id;
			echo ' ';
			echo $row->name;
		}
		
		echo '<br>Total: '.$query->num_rows();
	}
	
	function login()
	{
		$username = $_POST['email'];
		$password = $_POST['password'];
		
		$this->load->database();
		
		$query = $this->db->query('SELECT id, email, password FROM Login');
		
		$success = false;
		
		foreach($query->result() as $row)
		{
			if($username == $row->email && $password == $row->password)
			{
				$success = true;
			}
		}
		
		$returnObj = array();
		$returnObj['success'] = $success;
		$returnObj['loggedIn'] = $success;
		$returnString = http_build_query($returnObj);
		
		echo $returnString;
	}
}

/* End of file api.php */
/* Location: ./system/application/controllers/api.php */

?>