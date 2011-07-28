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
			->select('blog_entries.id as entryID, User.username as username, blog_tags.group_id as tagGroup, blog_tags.name as tagName, title, body, date, author_id')
			->from('blog_entries')
			->join('User', 'User.id = blog_entries.author_id')
			->join('blog_entry_tags', 'blog_entry_tags.entry_id = blog_entries.id')
			->join('blog_tags', 'blog_tags.id = blog_entry_tags.tag_id')
			->get();
			
		return $query->result();
	}
	
	function getAllEntriesByGroup($group_id)
	{
		$query = $this->db
			->select('blog_entries.id as entryID, User.username as username, blog_tags.group_id as tagGroup, blog_tags.name as tagName, title, body, date, author_id')
			->from('blog_entries')
			->join('User', 'User.id = blog_entries.author_id')
			->join('blog_entry_tags', 'blog_entry_tags.entry_id = blog_entries.id')
			->join('blog_tags', 'blog_tags.id = blog_entry_tags.tag_id')
			->where('blog_tags.group_id >=', $group_id)
			->get();
			
		return $query->result();
	}
	
	function getEntryById($id)
	{
		$query = $this->db
			->select('blog_entries.id as entryID, User.username as username, blog_tags.group_id as tagGroup, blog_tags.name as tagName, title, body, date, author_id')
			->from('blog_entries')
			->where('blog_entries.id',$id)
			->join('User', 'User.id = blog_entries.author_id')
			->join('blog_entry_tags', 'blog_entry_tags.entry_id = blog_entries.id')
			->join('blog_tags', 'blog_tags.id = blog_entry_tags.tag_id')
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
			->select('blog_entries.id as entryID, title, body, date, author_id')
			->from('blog_entries')
			->like('title', $search)
			->or_like('body', $search)
			->join('User', 'User.id = blog_entries.author_id')
			->get();
			
		return $query->result();
	}
}

?>