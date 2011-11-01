<?php 

class NewsletterModel extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	
	public function signup($email, $comment)
	{
		if(strlen($email > 100)) {
			return false;
		} else if(strlen($comment) > 4000) {
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