<?php 

class Newsletter_Model extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	
	public function check_email($email) {
		// Try to find the key in the database
		$query = $this->db->select('*')
							->from('newsletter')
							->where('email', $email)
							->get();
		
		if($query->num_rows() > 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	public function signup($email, $comment)
	{
		if(strlen($email > 100)) {
			return false;
		} else if(strlen($comment) > 4000) {
			return false;
		}
		
		if($this->check_email($email) == true) {
			return false;
		}
		
		$data = array(
			'email' => $email,
			'comment' => $comment
		);
		
		$this->db->insert('newsletter', $data);
		
		return true;
	}
}

?>