<?php

class Comment_model extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}
	
	function getAllCommentsFor($entry_id)
	{
		$query = $this->db
			->from('blog_comments')
			->join('User', 'User.id = blog_comments.author_id')
			->where('blog_comments.entry_id', $entry_id)
			->get();
			
		return $query->result();
	}
	
	function insertComment($_POST)
	{
		$this->db->insert('blog_comments', $_POST);
	}
}

?>