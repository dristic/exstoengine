<?php

class Entry_model extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}
	
	function getAllEntries()
	{
		$query = $this->db
			->select('*')
			->from('blog_entries')
			->join('User', 'User.id = blog_entries.author_id')
			->get();
			
		return $query->result();
	}
	
	function getEntryById($id)
	{
		$query = $this->db
			->where('id',$id)
			->from('blog_entries')
			->limit(1)
			->get();
			
		return $query->result();
	}
	
	function insertEntry($_POST)
	{
		$this->db->insert('blog_entries', $_POST);
	}
	
	function searchForEntry($search)
	{
		$query = $this->db
			->from('blog_entries')
			->like('title', $search)
			->or_like('body', $search)
			->join('User', 'User.id = blog_entries.author_id')
			->get();
			
		return $query->result();
	}
}

?>