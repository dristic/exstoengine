<?php

class Tag_model extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}
	
	function getAllTags()
	{
		$this->db->select('*');
		$this->db->from('blog_tags');
		$this->db->orderby('name');
		$query = $this->db->get();
		return $query->results();
	}
	
	function insertTag($_POST)
	{
		$this->db->insert('blog_tags', $_POST);
	}
	
	function checkForTag($tag)
	
	function getSearchTags($search)
	{
		
	}
	
	
}


?>