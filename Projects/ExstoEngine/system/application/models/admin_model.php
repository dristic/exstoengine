<?php 

class Admin_Model extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
		
		$this->key_length = 16;
		$this->salt_length = 10;
	}
	
	public function delete_key($id)
	{
		$this->db->delete('Key', array('Id' => $id));
	}
	
	public function get_keys()
	{
		// Get all keys from the database
		$query = $this->db->select('*')
						  ->from('Key')
						  ->get();
		
	    if($query->num_rows() > 0)
	    {
	    	return $query->result();
	    }
	    else
	    {
	    	return array();
	    }
	}
	
	public function save_key($random_data)
	{
		// Generate key
		$key = $this->generate_key($random_data);
		
		// Format key in readable format
		$key = substr($key, 0, 4).
			    '-'.substr($key, 4, 4).
				'-'.substr($key, 8, 4).
				'-'.substr($key, 12, 4);
		
		$key = strtoupper($key);
		
		// Check for duplicate key
		$query = $this->db->select('Id')
						  ->from('Key')
						  ->where('Key', $key)
						  ->get();
						  
	    if($query->num_rows() > 0)
	    {
	    	$this->model_validation->set_error('This key has already been generated');
	    	return false;
	    }
	    else
	    {
	    	$this->insert_key($key);
	    	
	    	return true;
	    }
	}
	
	private function insert_key($key)
	{
		$data = array(
			'Key' => $key
		);
		
		$this->db->insert('Key', $data);
	}
	
	private function generate_key($key)
	{
		$salt = $this->generate_salt();
		
		return substr(md5($key . $salt), 0, $this->key_length);
	}
	
	private function generate_salt()
	{
		return substr(md5(uniqid(rand(), true)), 0, $this->salt_length);
	}
}