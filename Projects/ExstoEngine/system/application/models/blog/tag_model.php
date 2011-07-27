<?php

class Tag_model extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}
	
	function getAllTags()
	{
		$query = $this->db
			->select('*')
			->from('blog_tags')
			->orderby('name')
			->get();
		return $query->result();
	}
	
	function insertTag($_POST)
	{
		$this->db->insert('blog_tags', $_POST);
	}
	
	function checkForTag($tag)
	{
		$query = $this->db
			->from('blog_tags')
			->where('name', $tag)
			->limit(1)
			->get();
			
		if($query->num_rows() == 1)
			return true;
		else 
			return false;
	}
	
	function getSearchTags($search)
	{
		$query = $this->db
			->from('blog_tags')
			->like('name', $search, 'after')
			->get();
	}
	
	
}


?>